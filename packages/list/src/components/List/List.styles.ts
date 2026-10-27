import styled, { css } from "styled-components"
import { getToken } from "@niceprototypes/styles"

/**
 * The list root. UA list styling, margin and padding are removed; colours
 * come from the `list.*` base tokens. `$scrollable` caps the height at
 * `list.maxHeight` and scrolls vertically.
 */
export const StyledList = styled.ul<{ $scrollable: boolean }>`
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: ${getToken("list.backgroundColor:base")};
  color: ${getToken("list.color:base")};

  ${({ $scrollable }) =>
    $scrollable &&
    css`
      overflow-y: auto;
      max-height: ${getToken("list.maxHeight:base")};
    `}
`

/** Presentational `<li>` that holds a divider `<hr>`. */
export const StyledListDivider = styled.li`
  margin: 0;
  padding: 0;
`

/** The divider rule: block-start border only, no margin. */
export const StyledListDividerRule = styled.hr`
  margin: 0;
  border: 0;
  border-block-start: ${getToken("list.divider.width:base")} solid ${getToken("list.divider.color:base")};
`
