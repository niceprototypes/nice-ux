import styled from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"

export const RowFlex = styled(Flex)`
  align-items: center;
  gap: ${getToken("gap", "larger").var};
  border-bottom: 1px solid ${getToken("borderColor", "base").var};

  .docblock-source {
    display: flex;
    flex-grow: 1;
    align-items: center;
    margin: 0;
    border: 0;
    border-radius: 0;
    box-shadow: none;

    > div {
      position: relative;
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
`