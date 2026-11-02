import styled from "styled-components"
import { getBreakpoint, getToken, type BreakpointName } from "@niceprototypes/styles"

// The media query for the band in which this item is the active viewport. A
// bare key is the exact band, so adjacent bands never light up together: phone
// resolves to max-width, tablet/laptop to bounded bands, desktop to min-width.
const activeQuery = (breakpoint: BreakpointName) => getBreakpoint(breakpoint)

export const ItemDiv = styled.div<{ $breakpoint: BreakpointName }>`
  opacity: 0.5;
  padding: ${getToken("gap", "small")} ${getToken("gap", "base")};
  border: ${getToken("borderWidth")} solid transparent;
  border-radius: ${getToken("borderRadius")};
  color: ${getToken("color", "lighter")};
  white-space: nowrap;

  /* Active band — darker border, bold, full-strength text when this item's breakpoint is the current viewport */
  ${({ $breakpoint }) => `
    ${activeQuery($breakpoint)} {
      opacity: 1;
      border-color: ${getToken("borderColor", "strong")};
      color: ${getToken("color")};
    }
  `}
`
