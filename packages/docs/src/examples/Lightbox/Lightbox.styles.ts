import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"

export const DemoImage = styled.img`
  width: 200px;
  border-radius: ${getToken("borderRadius")};
  cursor: pointer;
`
