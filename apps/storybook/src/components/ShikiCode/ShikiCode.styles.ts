import styled from "styled-components"
import { getToken } from "nice-react-styles"

/**
 * Wrapper for Shiki-rendered code.
 *
 * Each token span carries its own --shiki-light (day) / --shiki-dark (night)
 * color inline; these rules pick which one applies on the [data-theme] pin and
 * set the code font from the token.
 */
export const ShikiDiv = styled.div`
  margin: ${getToken("gap", "large")} 0 !important;
  padding: ${getToken("gap")};
  border: 1px solid ${getToken("borderColor")};
  border-radius: ${getToken("borderRadius")};
  box-shadow: ${getToken("boxShadow")};

  .shiki {
    .line {
      span {
        color: var(--shiki-light);
        font-family: ${getToken("fontFamily", "code")};
        font-size: ${getToken("fontSize", "small")};
        font-weight: ${getToken("fontWeight", "medium")};
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
