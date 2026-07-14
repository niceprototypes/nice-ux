import styled from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"

export const NavigationFlex = styled(Flex).attrs({
  justifyContent: "flex-end",
  gap: "larger",
  padding: "large larger",
})`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  overflow: hidden;

  /* Feathered backdrop: a token-colored screen behind the bar. It's pushed past
     the left/right/bottom viewport edges and blurred, so those edges bleed
     off-screen while only the top edge softly fades into the content above —
     no hard border line. Sits behind the bar's controls (z-index: -1). */
  &::before {
    content: "";
    position: absolute;
    top: -100px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${getToken("backgroundColor")};
    filter: blur(8px);
    z-index: -1;
  }
`

export const NavigationSubFlex = styled(Flex).attrs({
  gap: "large",
})`
  a {
    position: relative;
    color: ${getToken("color", "lighter")} !important;
    
    &:hover {
      color: ${getToken("color")} !important;
    }
  }
`
