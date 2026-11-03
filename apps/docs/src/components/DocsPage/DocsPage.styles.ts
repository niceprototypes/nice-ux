import styled from "styled-components"
import { getBreakpoint } from "@niceprototypes/styles"
import { Scroll } from "@niceprototypes/scroll"
import { getToken } from "../../tokens"

/** The page's columns side by side, centred, `docs.columnGap` apart; the settings row wraps above them below tablet. */
export const StyledDocsPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${getToken("docs", "columnGap")};

  ${getBreakpoint("tablet+")} {
    flex-wrap: nowrap;
  }
`

/**
 * The sections column: capped at `docs.columnWidth` when wrapped, else the width Contents leaves; a
 * wider table scrolls sideways. From tablet up its auto margin shares the free space with the
 * settings column's, so the sections and Contents stay near the centre.
 */
export const StyledDocsPageMain = styled(Scroll).attrs({ axis: "x" })<{ $wrapped: boolean }>`
  flex: ${({ $wrapped }) => ($wrapped ? `0 1 ${getToken("docs", "columnWidth")}` : "1 1 auto")};
  min-width: 0;

  ${getBreakpoint("tablet+")} {
    margin-inline-start: auto;
  }
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

/**
 * The settings column, rightmost, `docs.settingsWidth` wide, its content sticky with Contents.
 * From tablet up it sits at the page's right edge (an auto margin takes the free space the centred
 * columns leave) with its content at its right, so the page padding alone separates it from the
 * edge, as it does from the top. Below tablet it is a row above the sections, at their right.
 */
export const StyledDocsPageSettings = styled.aside`
  order: -1;
  flex: 1 0 100%;
  display: flex;
  justify-content: flex-end;

  ${getBreakpoint("tablet+")} {
    order: 0;
    flex: none;
    width: ${getToken("docs", "settingsWidth")};
    margin-inline-start: auto;
  }
`

/** The settings, sticky at the height Contents sticks at. */
export const StyledDocsPageSettingsContent = styled.div`
  position: sticky;
  top: ${getToken("contents.top")};
`
