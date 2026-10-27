import styled from "styled-components"
import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"

/**
 * Language badge pinned to the top-right of a code block.
 *
 * Incidental chrome — styled with semantic tokens (getToken), not the `code`
 * component tokens: a language label isn't part of the code component's
 * themeable surface. Uses background/border/color only, so it inverts on the
 * [data-theme="night"] pin via the cascade — no per-mode override needed.
 */
export const LabelFlex = styled(Flex).attrs({ alignItems: "center" })`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${getToken("gap")};
  background-color: ${getToken("backgroundColor")};
  box-shadow: 0 0 1em 0.5em ${getToken("backgroundColor")};
  text-transform: uppercase;
  user-select: none;
  pointer-events: none;
  
  span {
    line-height: ${getToken("size", "smaller")};
    padding-top: 0.1em;
  }
`