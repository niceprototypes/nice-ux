import styled from "styled-components"
import { getReactToken } from "nice-react-styles"

export const DemoImage = styled.img`
  width: 200px;
  border-radius: ${getReactToken("borderRadius", "base").var};
  cursor: pointer;
`
