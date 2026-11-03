import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"
import { Scroll } from "@niceprototypes/scroll"
import type { CodeMarginType } from "./Code.types"

/** The inline chip's surface: the text colour at a low alpha, so it reads one step off the page in either theme. */
const INLINE_BACKGROUND = getToken("code.color:base", { transform: [null, null, null, 0.08] })

/** The inline chip's surface under the pointer: one step further off the page. */
const INLINE_BACKGROUND_HOVER = getToken("code.color:base", { transform: [null, null, null, 0.14] })

/**
 * Card wrapper for Shiki-rendered code.
 *
 * Each token span carries its `code.syntaxColor` var inline (highlightCode), so
 * the cascade picks the day or night value; these rules set the code font from
 * the code tokens.
 */
export const CodeDiv = styled.div<{ $clickable?: boolean; $inlined?: boolean; $fit?: boolean; $margin?: CodeMarginType }>`
  position: relative;
  background-color: ${({ $inlined }) => ($inlined ? INLINE_BACKGROUND : getToken("code.backgroundColor:base"))};
  ${({ $clickable }) => $clickable && `cursor: pointer;`}
  flex-grow: 1;
  border: ${({ $inlined }) => ($inlined ? "none" : `1px solid ${getToken("code.borderColor:base")}`)};
  border-radius: ${({ $inlined }) => getToken("code.borderRadius", $inlined ? "small" : "base")};
  box-shadow: ${({ $inlined }) => ($inlined ? "none" : getToken("code.boxShadow:base"))};
  max-width: ${getToken("code.maxWidth:base")};
  overflow: hidden;

  /* Inline: a chip around the code (em padding, so it scales with the code), a step off the surface, lighter again under the pointer. */
  ${({ $inlined, $clickable }) =>
    $inlined &&
    `display: inline-flex;
    vertical-align: baseline;
    font-size: ${getToken("code.fontSize:small")};
    padding: ${getToken("code.inline.paddingBlock:base")} ${getToken("code.inline.paddingInline:base")};
    ${$clickable ? `&:hover { background-color: ${INLINE_BACKGROUND_HOVER}; }` : ""}`}

  /* fit: size the card to its content; the code and the Show more toggle stack. */
  ${({ $fit, $inlined }) =>
    $fit &&
    !$inlined &&
    `display: flex;
    flex-direction: column;
    gap: ${getToken("code.gap:base")};
    width: max-content;
    flex-grow: 0;`}

  /* Clickable card: the border becomes link-coloured on hover to imply it's interactive. */
  ${({ $clickable, $inlined }) =>
    $clickable &&
    !$inlined &&
    `&:hover {
      border-color: ${getToken("code.color:link")};
    }`}

  .shiki {
    .line {
      span {
        font-family: ${getToken("code.fontFamily:code")};
        font-size: ${getToken("code.fontSize:small")};
        line-height: ${getToken("code.lineHeight:expanded")};
        letter-spacing: -0.01em;
      }
    }
  }
`

/** The code beside the copy icon: the icon takes its own space, so it never covers code. */
export const BodyDiv = styled.div`
  display: flex;
  align-items: flex-start;
  min-width: 0;
`

/**
 * Height limit around the scroll container. `$maxHeight` caps it until the handle
 * is dragged, which sets its height between the cap and the full code; `$faded`
 * masks the bottom out from the `code.fadeStart` stop while code is clipped.
 */
export const CollapseDiv = styled.div<{ $maxHeight?: string; $dragged?: boolean; $faded?: boolean }>`
  flex: 1 1 auto;
  min-width: 0;
  /* The cap until the handle is dragged; then the dragged height (the style attribute) applies. */
  ${({ $maxHeight, $dragged }) =>
    $maxHeight &&
    !$dragged &&
    `max-height: ${$maxHeight};`}
  ${({ $maxHeight }) => $maxHeight && `overflow: hidden;`}
  ${({ $faded }) =>
    $faded &&
    `mask-image: linear-gradient(black ${getToken("code.fadeStart:base")}, transparent);`}
`

/**
 * Horizontal scroll container for long code lines, a Scroll (scrollbar hidden by default).
 * Only card (non-inlined) blocks use it — inlined blocks render the code as plain
 * text with no scroll container — so it always carries the base padding.
 */
export const ScrollDiv = styled(Scroll).attrs({ axis: "x" })`
  display: flex;
  max-width: 100%;
  padding: ${getToken("gap")};
`

/**
 * The drag bar along the block's bottom edge: a pill centred in a hit area. Dragging
 * it, or its arrow keys, sets the visible height between the cap and the full code.
 */
export const HandleDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-block: ${getToken("gap", "small")};
  cursor: row-resize;
  touch-action: none;
  outline: none;

  &::before {
    content: "";
    width: ${getToken("size", "base")};
    height: ${getToken("borderWidth", "larger")};
    border-radius: ${getToken("borderWidth", "larger")};
    background-color: ${getToken("code.borderColor:base")};
  }

  &:hover::before,
  &:focus-visible::before {
    background-color: ${getToken("code.color:link")};
  }
`

/**
 * Inline code: the token spans in the code font, the box trimmed to cap top and baseline so
 * the chip's even padding centres the text, and the chip's baseline is the text's.
 */
export const InlineCode = styled.code`
  display: block;
  font-family: ${getToken("code.fontFamily:code")};
  font-size: inherit;
  line-height: 1;
  text-box: trim-both cap alphabetic;
  white-space: pre;
`
