import styled from "styled-components"
import Flex from "nice-react-flex"
import { getBreakpoint, getToken } from "nice-react-styles"

/**
 * Shared responsive grid primitives for the code-table system. `RowFlex` is the
 * row container and `Column` is a cell within it; both `CodeRow` (each data row)
 * and `CodeTable` (its header row) compose from them, so they live here rather
 * than inside either component's own styles.
 */

// Wraps each row column. Without a width it inherits RowFlex's equal-flex
// sizing (`> * { flex: 1 1 0 }`); with one, it pins the column to that width —
// but only at tablet+, where the row is horizontal. On phone the row stacks
// (flex-direction: column), so a flex-basis would set height, not width; the
// media-query gate keeps the override off the stacked layout. `&&` doubles the
// class specificity so the pin beats RowFlex's `> *` rule regardless of source
// order. The inner cell fills the column via `> * { width: 100% }`.
export const Column = styled.div<{ $width?: string | null }>`
  min-width: 0;

  > * {
    width: 100%;
  }

  ${getBreakpoint("tablet")} {
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

export const RowFlex = styled(Flex).attrs<{ spacing?: string; $highlighted?: boolean }>((p: { spacing?: string }) => ({
  spacing: p.spacing ?? "base none",
}))<{ $highlighted?: boolean }>`
  ${({ $highlighted }) => $highlighted && `background-color: yellow;`}

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
        border-color: ${getToken("borderColor", "darker")};
      }

      &:focus {
        box-shadow: none;
        background-color: ${getToken("borderColor", "darker")} !important;
        color: ${getToken("color", "base", { theme: "night" })} !important;
      }
    }
  }

  ${getBreakpoint("tablet")} {
    /* Equal-width cells: preview + each code block share the row evenly */
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
