import styled from "styled-components"
import Flex from "nice-react-flex"
import { getBreakpoint, getToken } from "nice-react-styles"

export const PreviewWrapper = styled.div<{ $width?: string }>`
  ${({ $width }) => ($width ? `width: ${$width};` : "")}
`

export const RowFlex = styled(Flex).attrs({ spacing: "large none" })`

  &:not(:last-child) {
    border-bottom: 1px solid ${getToken("borderColor", "base").var};
  }

  .docblock-source {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: ${getToken("gap", "large").var};
    padding-top: ${getToken("gap", "large").var};
    align-items: flex-start;
    justify-content: center;
    margin: 0;
    border: 0;
    border-top: 1px solid ${getToken("borderColor").var};
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
          padding: ${getToken("gap", "base").var};
          font-size: inherit;
        }
      }
    }

    pre {
      padding: 0 !important;
    }

    button {
      margin: 0;
      padding: ${getToken("gap", "small").var} ${getToken("gap").var};
      border-radius: ${getToken("borderRadius", "small").var} !important;
      border: 1px solid ${getToken("borderColor").var};

      &:hover,
      &:focus {
        border-color: ${getToken("borderColor", "darker").var};
      }

      &:focus {
        box-shadow: none;
        background-color: ${getToken("borderColor", "darker").var} !important;
        color: ${getToken("foregroundColor", "base", "night").var} !important;
      }
    }
  }

  ${getBreakpoint("tablet").query} {
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