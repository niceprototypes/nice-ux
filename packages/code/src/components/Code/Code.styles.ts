import styled from "styled-components"
import Flex from "@niceprototypes/flex"
import { getToken } from "@niceprototypes/styles"
import { LabelFlex } from "../CodeLabel/CodeLabel.styles"
import type { CodeMarginType } from "./Code.types"

/**
 * Card wrapper for Shiki-rendered code.
 *
 * Each token span carries its `code.syntaxColor` var inline (highlightCode), so
 * the cascade picks the day or night value; these rules set the code font from
 * the code tokens.
 */
export const CodeDiv = styled.div<{ $clickable?: boolean; $inlined?: boolean; $fit?: boolean; $margin?: CodeMarginType }>`
  position: relative;
  background-color: ${({ $inlined }) => ($inlined ? "transparent" : getToken("code.backgroundColor:base"))};
  ${({ $clickable }) => $clickable && `cursor: pointer;`}
  flex-grow: 1;
  border: ${({ $inlined }) => ($inlined ? "none" : `1px solid ${getToken("code.borderColor:base")}`)};
  border-radius: ${({ $inlined }) => ($inlined ? "0" : getToken("code.borderRadius:base"))};
  box-shadow: ${({ $inlined }) => ($inlined ? "none" : getToken("code.boxShadow:base"))};
  max-width: 720px;
  overflow: hidden;

  /* fit: size the card to its content; the code and the Show more toggle stack. */
  ${({ $fit }) =>
    $fit &&
    `display: flex;
    flex-direction: column;
    gap: ${getToken("code.gap:base")};
    width: max-content;
    flex-grow: 0;`}

  /* Clickable card: border + language label become link-colored on hover to imply
     it's interactive. Inline blocks have no border/label to recolor. */
  ${({ $clickable, $inlined }) =>
    $clickable &&
    !$inlined &&
    `&:hover {
      border-color: ${getToken("code.color:link")};
    }
    &:hover ${LabelFlex} * {
      color: ${getToken("code.color:link")};
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

/**
 * Height limit around the scroll container. `$maxHeight` caps it while
 * collapsed; `$faded` masks the bottom out from the `code.fadeStart` stop when
 * the code overflows the cap.
 */
export const CollapseDiv = styled.div<{ $maxHeight?: string; $faded?: boolean }>`
  ${({ $maxHeight }) =>
    $maxHeight &&
    `max-height: ${$maxHeight};
    overflow: hidden;`}
  ${({ $faded }) =>
    $faded &&
    `mask-image: linear-gradient(black ${getToken("code.fadeStart:base")}, transparent);`}
`

/**
 * Horizontal scroll container for long code lines, with the scrollbar hidden.
 * Only card (non-inlined) blocks use it — inlined blocks render the code as plain
 * text with no scroll container — so it always carries the base padding.
 */
export const ScrollDiv = styled(Flex).attrs({ padding: "base" })`
  padding-right: 5em;
  max-width: 100%;
  overflow-x: auto;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox, Safari 18.2+, Chromium 121+ */
`
