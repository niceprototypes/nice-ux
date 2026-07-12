import styled from "styled-components"
import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"

/**
 * Language badge pinned to the top-right of a code block.
 *
 * Uses semantic tokens only (background/border/color), so it inverts on the
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
    margin-top: .333em;
  }
`
