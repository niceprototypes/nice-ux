import styled from "styled-components"
import Flex from "nice-react-flex"
import { getCodeToken } from "../../tokens/getCodeToken"
import { LabelFlex } from "../CodeLabel/CodeLabel.styles"
import type { CodeMarginType } from "./Code.types"

/**
 * Card wrapper for Shiki-rendered code.
 *
 * Each token span carries its own --shiki-light (day) / --shiki-dark (night)
 * color inline; these rules pick which one applies on the [data-theme] pin and
 * set the code font from the code tokens.
 */
export const CodeDiv = styled.div<{ $clickable?: boolean; $inlined?: boolean; $fit?: boolean; $margin?: CodeMarginType }>`
  position: relative;
  background-color: ${({ $inlined }) => ($inlined ? "transparent" : getCodeToken("backgroundColor", "base"))};
  ${({ $clickable }) => $clickable && `cursor: pointer;`}
  flex-grow: 1;
  border: ${({ $inlined }) => ($inlined ? "none" : `1px solid ${getCodeToken("borderColor", "base")}`)};
  border-radius: ${({ $inlined }) => ($inlined ? "0" : getCodeToken("borderRadius", "base"))};
  box-shadow: ${({ $inlined }) => ($inlined ? "none" : getCodeToken("boxShadow", "base"))};
  max-width: 720px;
  overflow: hidden;

  /* fit: size the card to its content and lay the code + label out in a centered row. */
  ${({ $fit }) =>
    $fit &&
    `display: flex;
    align-items: center;
    gap: ${getCodeToken("gap", "base")};
    width: max-content;
    flex-grow: 0;`}

  /* Clickable card: border + language label become link-colored on hover to imply
     it's interactive. Inline blocks have no border/label to recolor. */
  ${({ $clickable, $inlined }) =>
    $clickable &&
    !$inlined &&
    `&:hover {
      border-color: ${getCodeToken("color", "link")};
    }
    &:hover ${LabelFlex} * {
      color: ${getCodeToken("color", "link")};
    }`}

  .shiki {
    .line {
      span {
        color: var(--shiki-light);
        font-family: ${getCodeToken("fontFamily", "code")};
        font-size: ${getCodeToken("fontSize", "small")};
        line-height: ${getCodeToken("lineHeight", "expanded")};
        letter-spacing: -0.01em;
      }
    }
  }

  [data-theme="night"] & .shiki {
    .line {
      span {
        color: var(--shiki-dark);
      }
    }
  }
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
