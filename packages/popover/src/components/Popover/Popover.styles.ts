import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"

/**
 * The popover surface. Rendered in a portal at `<body>` and positioned with
 * `position: fixed` + inline coordinates from `computeAnchorPosition`, so it is
 * never clipped by a scrolling or overflow-hidden ancestor. Radius, shadow,
 * stacking and max height come from the `popover.*` component tokens; content
 * taller than the max height scrolls. Surface colours stay on core tokens.
 */
export const StyledPopover = styled.div`
  position: fixed;
  z-index: ${getToken("popover.zIndex")};
  max-height: ${getToken("popover.maxHeight")};
  overflow: auto;
  background-color: ${getToken("backgroundColor", "raised")};
  color: ${getToken("color", "base")};
  border-radius: ${getToken("popover.borderRadius")};
  box-shadow: ${getToken("popover.boxShadow")};
`
