import styled from "styled-components"
import Flex from "nice-react-flex"
import { getBreakpoint, getToken } from "nice-react-styles"

export const PreviewWrapper = styled.div<{ $width?: string }>`
  ${({ $width }) =>
    $width
      ? `width: ${$width};`
      : `${getBreakpoint("tablet")} { width: 45%; }`}
`

export const RowFlex = styled(Flex).attrs({ spacing: "large none" })`

  &:not(:last-child) {
    border-bottom: 1px solid ${getToken("borderColor", "base")};
  }

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
    border-top: 1px solid ${getToken("borderColor")};
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
          padding: ${getToken("gap", "base")};
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
        color: ${getToken("color", "base", "night")} !important;
      }
    }
  }

  ${getBreakpoint("tablet")} {
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