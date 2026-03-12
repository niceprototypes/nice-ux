import styled from "styled-components"
import { getToken } from "nice-react-styles"

export const DemoImage = styled.img`
  width: 200px;
  border-radius: ${getToken("borderRadius", "base").var};
  cursor: pointer;
`