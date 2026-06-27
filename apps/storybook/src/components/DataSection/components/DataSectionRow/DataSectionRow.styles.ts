import styled from "styled-components"
import Flex from "nice-react-flex"
import { getBreakpoint, getToken } from "nice-react-styles"

// Wraps each row column. Without a width it inherits RowFlex's equal-flex sizing
// (`> * { flex: 1 1 0 }`); with one, it pins the column to that width at tablet+,
// where the row is horizontal. `&&` doubles class specificity so the pin beats
// RowFlex's `> *` rule; the inner cell fills the column via `> * { width: 100% }`.
export const Column = styled.div<{ $width?: string | null }>`
  min-width: 0;

  > * {
    width: 100%;
  }

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

export const RowFlex = styled(Flex).attrs({ spacing: "base none" })<{ $highlighted?: boolean }>`
  /* Vertical rim from spacing="base none"; a base inline padding rim + an equal
     negative inline margin so a highlighted row bleeds into the gutter while its
     content stays aligned with the surrounding rows. */
  padding-inline: ${getToken("gap", "larger")} !important;
  margin-inline: calc(-1 * ${getToken("gap", "larger")}) !important;
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
        border-color: ${getToken("borderColor", "darker")};
      }

      &:focus {
        box-shadow: none;
        background-color: ${getToken("borderColor", "darker")} !important;
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