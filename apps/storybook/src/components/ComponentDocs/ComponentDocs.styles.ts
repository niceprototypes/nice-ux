import styled from "styled-components"
import { getBreakpoint } from "@niceprototypes/styles"
import { Scroll } from "@niceprototypes/scroll"
import { getToken } from "@niceprototypes/docs/nice/tokens"

/** The sections column, capped at `docs.columnWidth`; a wider table scrolls sideways. */
export const StyledMain = styled(Scroll).attrs({ axis: "x" })`
  flex: 0 1 ${getToken("docs", "columnWidth")};
  min-width: 0;
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
