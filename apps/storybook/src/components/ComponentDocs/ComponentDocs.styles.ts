import styled from "styled-components"
import { getBreakpoint } from "@niceprototypes/styles"
import { getToken } from "../../nice/tokens"

/** The sections column: takes the room Contents leaves; a table wider than that scrolls sideways. */
export const StyledMain = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  overflow-x: auto;
`

/** One section: scrolled to just below the fixed navigation bar. */
export const StyledSection = styled.section`
  scroll-margin-top: ${getToken("docs", "barHeight")};
`

/** The Contents column: tablet and up (measured in the preview frame), where there is room beside the page. */
export const StyledAside = styled.aside`
  display: none;
  flex: none;
  width: ${getToken("docs", "contentsWidth")};

  ${getBreakpoint("tablet+")} {
    display: flex;
    flex-direction: column;
  }
`
