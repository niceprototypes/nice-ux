import styled from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"

export const FooterFlex = styled(Flex).attrs({
  gap: "larger",
  padding: "base larger",
  justifyContent: "space-evenly",
})`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: ${getToken("backgroundColor")};
`

export const FooterSubFlex = styled(Flex).attrs({
  gap: "large",
  grow: 1,
})`
  a {
    color: ${getToken("color", "lighter")} !important;
    
    &:hover {
      color: ${getToken("color")} !important;
    }
  }
`
