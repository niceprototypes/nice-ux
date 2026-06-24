import styled from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"

/**
 * Wrapper for Shiki-rendered code.
 *
 * Each token span carries its own --shiki-light (day) / --shiki-dark (night)
 * color inline; these rules pick which one applies on the [data-theme] pin and
 * set the code font from the token.
 */
export const CodeBlockDiv = styled.div<{ $clickable?: boolean; $inline?: boolean }>`
  position: relative;
  ${({ $clickable }) => $clickable && `cursor: pointer;`}
  flex-grow: 1;
  /* inline: strip the card chrome — margin, padding, border, radius, shadow */
  margin: ${({ $inline }) => ($inline ? "0" : `${getToken("gap", "large")} 0`)} !important;
  padding: ${({ $inline }) => ($inline ? "0" : getToken("gap"))};
  border: ${({ $inline }) => ($inline ? "none" : `1px solid ${getToken("borderColor")}`)};
  border-radius: ${({ $inline }) => ($inline ? "0" : getToken("borderRadius"))};
  box-shadow: ${({ $inline }) => ($inline ? "none" : getToken("boxShadow"))};

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

/** Horizontal scroll container for long code lines, with the scrollbar hidden. */
export const CodeScroll = styled(Flex)`
  max-width: 100%;
  overflow-x: auto;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox, Safari 18.2+, Chromium 121+ */
`
