import styled from "styled-components"
import { getToken } from "nice-react-styles"

export const ThemeButton = styled.button`
  position: fixed;
  bottom: ${getToken("gap")};
  right: ${getToken("gap")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: ${getToken("gap")};
  border: 1px solid ${getToken("borderColor")};
  background-color: ${getToken("backgroundColor")};
  color: ${getToken("color")};
  cursor: pointer;
  z-index: 9999;

  &:hover {
    border-color: ${getToken("borderColor", "darker")};
  }
`
