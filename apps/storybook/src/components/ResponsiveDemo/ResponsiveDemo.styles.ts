import styled from "styled-components"
import { getBreakpoint, getToken, type BreakpointName } from "nice-react-styles"

// The media query for the band in which this item is the active viewport.
// Tablet and laptop are bounded (exact) so adjacent bands never light up
// together; phone (max-width) and desktop (min-width) are open-ended.
const activeQuery = (breakpoint: BreakpointName) =>
  getBreakpoint(breakpoint, breakpoint === "tablet" || breakpoint === "laptop")

export const ItemDiv = styled.div<{ $breakpoint: BreakpointName }>`
  padding: ${getToken("gap", { variant: "small" })} ${getToken("gap", { variant: "base" })};
  border: ${getToken("borderWidth")} solid ${getToken("borderColor", { variant: "base" })};
  border-radius: ${getToken("borderRadius")};
  color: ${getToken("color", { variant: "lighter" })};
  font-weight: ${getToken("fontWeight", { variant: "base" })};
  white-space: nowrap;

  /* Active band — darker border, bold, full-strength text when this item's breakpoint is the current viewport */
  ${({ $breakpoint }) => `
    ${activeQuery($breakpoint)} {
      border-color: ${getToken("borderColor", { variant: "dark" })};
      color: ${getToken("color", { variant: "base" })};
      font-weight: ${getToken("fontWeight", { variant: "bold" })};
    }
  `}
`
