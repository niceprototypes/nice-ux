import styled from "styled-components"
import Flex from "@niceprototypes/flex"
import { getBreakpoint, getToken } from "@niceprototypes/styles"

// Wraps each row column. Without a width it inherits RowFlex's equal-flex sizing
// (`> * { flex: 1 1 0 }`); with one, it pins the column to that width at tablet+,
// where the row is horizontal. `&&` doubles class specificity so the pin beats
// RowFlex's `> *` rule; the inner cell fills the column via `> * { width: 100% }`.
export const ColumnFlex = styled(Flex)<{ $width?: string | null }>`
  min-width: 0;

  ${getBreakpoint("tablet+")} {
    ${({ $width }) =>
      $width &&
      `
      && {
        flex: 0 0 ${$width};
        width: ${$width};
      }
    `}
  }
`

// Clips a row/header's horizontal bleed. RowFlex pads its cells with an inline
// padding rim plus an equal *negative* inline margin (keeps content aligned while a
// highlight bleeds into the gutter) — but the negative margin makes the row wider
// than its container, which triggers page-level horizontal scrolling. This shared
// column wrapper clips that bleed to the table's width, so the alignment trick
// survives without scrolling the viewport. Both DataTableRow and DataTableHeader
// wrap their RowFlex in it.
export const RowClip = styled(Flex).attrs({ direction: "column" })`
  max-width: 100%;
  overflow-x: hidden;
`

// The row divider — an <hr> rendered by DataTableRows between consecutive rows
// (and under the column header), never after the last row. Replaces the old
// per-row border-top; the render site gates it on `showLines`.
export const RowDivider = styled.hr`
  margin: 0 !important;
`

// `$condensed` removes the top padding (keeping the bottom padding), collapsing
// rows against each other. The dividers are a separate concern — see `showLines`.
export const RowFlex = styled(Flex)<{ $highlighted?: boolean; $condensed?: boolean }>`
  /* Vertical rim from padding="base none"; a base inline padding rim + an equal
     negative inline margin so a highlighted row bleeds into the gutter while its
     content stays aligned with the surrounding rows. */
  padding-inline: ${getToken("gap", "larger")} !important;
  margin-inline: calc(-1 * ${getToken("gap", "larger")}) !important;
  /* condensed: strip the top padding, leaving only the bottom rim. */
  ${({ $condensed }) => $condensed && `padding-block-start: 0 !important;`}
  ${({ $highlighted }) => $highlighted && `background-color: ${getToken("backgroundColor", "highlight")};`}

  .docblock-source {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: ${getToken("gap", "large")};
    padding-top: ${getToken("gap", "large")};
    align-items: flex-start;
    justify-content: center;
    margin: 0;
    border: 0;
    border-bottom: 1px solid ${getToken("borderColor")};
    border-radius: 0;
    box-shadow: none;
    width: 100%;

    > div {
      position: relative;
      align-self: inherit;
      width: 100%;

      &:last-child {
        margin-inline-start: inherit;

        button {
          width: 100%;
          justify-content: center;
          padding: ${getToken("gap")};
          font-size: inherit;
        }
      }
    }

    pre {
      padding: 0 !important;
    }

    button {
      margin: 0;
      padding: ${getToken("gap", "small")} ${getToken("gap")};
      border-radius: ${getToken("borderRadius", "small")} !important;
      border: 1px solid ${getToken("borderColor")};

      &:hover,
      &:focus {
        border-color: ${getToken("borderColor", "stronger")};
      }

      &:focus {
        box-shadow: none;
        background-color: ${getToken("borderColor", "stronger")} !important;
        color: ${getToken("color", "base", { theme: "night" })} !important;
      }
    }
  }

  ${getBreakpoint("tablet+")} {
    > * {
      flex: 1 1 0;
      min-width: 0;
    }

    .docblock-source {
      flex-direction: row;
      border-top: 0;
      padding-top: 0;

      > div:last-child {
        margin-inline-start: auto;
        width: auto;
      }
    }
  }
`