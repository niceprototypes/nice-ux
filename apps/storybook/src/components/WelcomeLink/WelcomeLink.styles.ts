import styled from "styled-components"
import { getToken } from "nice-styles"

export const WelcomeLinkDiv = styled.div`
  display: block;
  cursor: pointer;
  border: 1px solid ${getToken("borderColor")};
  border-radius: ${getToken("borderRadius")};
  box-shadow: ${getToken("boxShadow")};
  max-width: 32em;

  h3 {
    line-height: ${getToken("size", "small")};
  }

  &:hover {
    border: 1px solid ${getToken("color", "link")};
    color: ${getToken("color", "link")};
    
    h3, span {
      color: inherit;
    }
    
    svg * {
      stroke: ${getToken("color", "link")};
    }
  }
`