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
  box-sizing: content-box;
  position: absolute;
  top: ${getToken("gap")};
  right: ${getToken("gap")};
  background-color: ${getToken("backgroundColor")};
  border-radius: ${getToken("borderRadius", "small")};
  text-transform: uppercase;
  height: calc(${getToken("fontSize")} * ${getToken("lineHeight")});
  user-select: none;
  pointer-events: none;

  span {
    margin-top: 0.333em;
  }
`

/** Badge text — small semibold lightest label (replaces the former Ink span). */
export const LabelText = styled.span`
  font-family: ${getToken("fontFamily")};
  font-size: ${getToken("fontSize", "smaller")};
  font-weight: ${getToken("fontWeight", "semibold")};
  color: ${getToken("color", "lightest")};
`
