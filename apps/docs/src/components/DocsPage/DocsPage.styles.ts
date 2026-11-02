import styled from "styled-components"
import { getBreakpoint } from "@niceprototypes/styles"
import { getToken } from "../../tokens"

/** The sections column: capped at `docs.columnWidth` when wrapped, else the width Contents leaves; a wider table scrolls sideways. */
export const StyledDocsPageMain = styled.div<{ $wrapped: boolean }>`
  flex: ${({ $wrapped }) => ($wrapped ? `0 1 ${getToken("docs", "columnWidth")}` : "1 1 auto")};
  min-width: 0;
  overflow-x: auto;
`

/** One section: scrolled to one page padding below the top, where Contents sticks. */
export const StyledDocsPageSection = styled.section`
  scroll-margin-top: ${getToken("contents.top")};
`

/** The Contents column: tablet and up, where there is room beside the sections. */
export const StyledDocsPageAside = styled.aside`
  display: none;
  flex: none;
  width: ${getToken("docs", "contentsWidth")};

  ${getBreakpoint("tablet+")} {
    display: flex;
    flex-direction: column;
  }
`
