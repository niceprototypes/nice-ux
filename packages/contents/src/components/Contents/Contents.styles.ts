import styled, { css } from "styled-components"
import { getToken } from "@niceprototypes/styles"
import { Scroll } from "@niceprototypes/scroll"

const railWidth = getToken("contents.rail.width")

/**
 * The `<nav>` root, a Scroll: sticks `contents.top` below the top of its scroll container and
 * scrolls on its own when taller than the viewport. The rail beside the heading and every
 * row is painted in its start padding, inside the scroll clip, so the active row's
 * indicator can cover it.
 */
export const StyledContents = styled(Scroll).attrs({ forwardedAs: "nav" })`
  padding-inline-start: ${railWidth};
  box-shadow: inset ${railWidth} 0 0 ${getToken("contents.rail.color")};
  position: sticky;
  top: ${getToken("contents.top")};
  max-block-size: calc(100vh - 2 * ${getToken("contents.top")});
`

/**
 * The heading row; sticks to the top of the nav while the rows scroll under it, stacked
 * over their positioned links.
 */
export const StyledContentsHeading = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  z-index: ${getToken("zIndex", "low")};
  padding-block-end: ${getToken("contents.heading.paddingBlock")};
  padding-inline-start: ${getToken("contents.item.paddingInline")};
  background-color: ${getToken("contents.backgroundColor")};
  color: ${getToken("contents.heading.color")};
  font-weight: ${getToken("contents.heading.fontWeight")};
`

/** A level's rows; nesting shows in the links' indent, so every row's indicator meets the rail. */
export const StyledContentsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

/** A row and its nested rows. */
export const StyledContentsItem = styled.li`
  margin: 0;
`

/**
 * A row's link, indented one `contents.indent` per level; flex, so its height is the
 * label's line box rather than the inherited font's. The active row takes the active
 * colour and weight, and an indicator bar over the rail.
 */
export const StyledContentsLink = styled.a<{ $depth: number; $active: boolean }>`
  position: relative;
  display: flex;
  padding-block: ${getToken("contents.item.paddingBlock")};
  padding-inline-start: calc(
    ${getToken("contents.item.paddingInline")} + ${({ $depth }) => $depth} * ${getToken("contents.indent")}
  );
  color: ${({ $active }) => getToken(`contents.color:${$active ? "active" : "base"}`)};
  font-weight: ${({ $active }) => getToken(`contents.fontWeight:${$active ? "active" : "base"}`)};
  text-decoration: none;

  &:hover {
    color: ${getToken("contents.color:active")};
  }

  ${({ $active }) =>
    $active &&
    css`
      &::before {
        content: "";
        position: absolute;
        inset-block: 0;
        inset-inline-start: calc(-1 * ${railWidth});
        width: ${getToken("contents.indicator.width")};
        background-color: ${getToken("contents.indicator.color")};
      }
    `}
`
