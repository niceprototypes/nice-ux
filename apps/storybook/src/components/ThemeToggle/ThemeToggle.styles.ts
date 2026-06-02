import styled from "styled-components"
import { getToken } from "nice-react-styles"

export const Fab = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 80px;
  height: 80px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${getToken("borderColor", "base")};
  background-color: ${getToken("backgroundColor", "base")};
  color: ${getToken("color", "base")};
  cursor: pointer;
  z-index: 9999;

  &:hover {
    border-color: ${getToken("borderColor", "darker")};
  }
`
