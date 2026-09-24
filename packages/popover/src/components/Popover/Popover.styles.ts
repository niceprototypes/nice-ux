import styled from "styled-components"
import { getToken } from "nice-react-styles"

/**
 * The popover surface. Rendered in a portal at `<body>` and positioned with
 * `position: fixed` + inline coordinates from `computeAnchorPosition`, so it is
 * never clipped by a scrolling or overflow-hidden ancestor. Surface colour,
 * radius, shadow and stacking all come from core tokens.
 */
export const StyledPopover = styled.div`
  position: fixed;
  z-index: ${getToken("zIndex", "higher")};
  background-color: ${getToken("backgroundColor", "raised")};
  color: ${getToken("color", "base")};
  border-radius: ${getToken("borderRadius", "base")};
  box-shadow: ${getToken("boxShadow", "base")};
`
