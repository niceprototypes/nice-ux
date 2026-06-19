import styled from "styled-components"
import { getToken } from "nice-styles"

export const IntroDiv = styled.div`
  display: block;
  cursor: pointer;
  border: 1px solid ${getToken("borderColor")};
  border-radius: ${getToken("borderRadius")};
  box-shadow: ${getToken("boxShadow")};
  
  &:hover {
    border: 1px solid ${getToken("color", { variant: "link" })};
  }
`
