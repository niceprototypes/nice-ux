import styled from "styled-components"
import Flex from "nice-react-flex"
import { getToken, type GapType } from "nice-react-styles"
import { LabelFlex } from "./CodeBlockLabel/CodeBlockLabel.styles"

/**
 * Wrapper for Shiki-rendered code.
 *
 * Each token span carries its own --shiki-light (day) / --shiki-dark (night)
 * color inline; these rules pick which one applies on the [data-theme] pin and
 * set the code font from the token.
 */
export const CodeBlockDiv = styled.div<{ $clickable?: boolean; $inlined?: boolean; $fit?: boolean; $margin?: GapType }>`
  position: relative;
  background-color: ${({ $inlined }) => ($inlined ? "transparent" : getToken("backgroundColor"))};
  ${({ $clickable }) => $clickable && `cursor: pointer;`}
  flex-grow: 1;
  border: ${({ $inlined }) => ($inlined ? "none" : `1px solid ${getToken("borderColor")}`)};
  border-radius: ${({ $inlined }) => ($inlined ? "0" : getToken("borderRadius"))};
  box-shadow: ${({ $inlined }) => ($inlined ? "none" : getToken("boxShadow"))};
  max-width: 720px;
  overflow: hidden;

  /* fit: size the card to its content and lay the code + label out in a centered
     row. Replaces the former outer (<Flex fit>) and inner (<Flex alignItems gap>)
     wrappers — both were plain CSS, so they live on the card itself now. */
  ${({ $fit }) =>
    $fit &&
    `display: flex;
    align-items: center;
    gap: ${getToken("gap")};
    width: max-content;
    flex-grow: 0;`}

  /* Same affordance as Getting Started/Welcome's link cards: when the block is
     clickable (copyOnClick) and has card chrome, the border and the language
     label (default lightest) both become link-colored on hover to imply it's
     interactive. inline blocks have no border/label to recolor. The label's
     color is set on its inner Typography, so override that element directly. */
  ${({ $clickable, $inlined }) =>
    $clickable &&
    !$inlined &&
    `&:hover {
      border-color: ${getToken("color", "link")};
    }
    &:hover ${LabelFlex} * {
      color: ${getToken("color", "link")};
    }`}

  .shiki {
    .line {
      span {
        color: var(--shiki-light);
        font-family: ${getToken("fontFamily", "code")};
        font-size: ${getToken("fontSize", "small")};
        line-height: ${getToken("lineHeight", "expanded")};
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
 * Padding applies only to card (non-inlined) blocks; inlined blocks sit flush.
 */
export const ScrollDiv = styled(Flex).attrs<{ $inlined?: boolean }>(({ $inlined }) => ({
  padding: $inlined ? undefined : "base",
}))`
  padding-right: 5em;
  max-width: 100%;
  overflow-x: auto;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox, Safari 18.2+, Chromium 121+ */
`