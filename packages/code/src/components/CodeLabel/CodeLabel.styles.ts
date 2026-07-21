import styled from "styled-components"
import Flex from "nice-react-flex"
import { getCodeToken } from "../../tokens/getCodeToken"

/**
 * Language badge pinned to the top-right of a code block.
 *
 * Uses code component tokens (background/radius/color), so it inverts on the
 * [data-theme="night"] pin via the cascade — no per-mode override needed.
 */
export const LabelFlex = styled(Flex).attrs({ alignItems: "center" })`
  box-sizing: content-box;
  position: absolute;
  top: ${getCodeToken("gap", "base")};
  right: ${getCodeToken("gap", "base")};
  background-color: ${getCodeToken("backgroundColor", "base")};
  border-radius: ${getCodeToken("borderRadius", "small")};
  text-transform: uppercase;
  height: calc(${getCodeToken("fontSize", "base")} * ${getCodeToken("lineHeight", "base")});
  user-select: none;
  pointer-events: none;

  span {
    margin-top: 0.333em;
  }
`

/** Badge text — small semibold lightest label (replaces the former Ink span). */
export const LabelText = styled.span`
  font-family: ${getCodeToken("fontFamily", "base")};
  font-size: ${getCodeToken("fontSize", "smaller")};
  font-weight: ${getCodeToken("fontWeight", "semibold")};
  color: ${getCodeToken("color", "lightest")};
`
