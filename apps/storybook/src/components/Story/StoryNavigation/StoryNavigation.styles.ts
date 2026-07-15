import styled from "styled-components"
import Flex from "nice-react-flex"
import { getHSLA } from "nice-react-styles"

export const NavigationFlex = styled(Flex).attrs({
  justifyContent: "flex-end",
  gap: "large",
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
    background-color: ${getHSLA({ module: "backgroundColor", values: [null, null, null, 0.98] })};
    filter: blur(8px);
    z-index: -1;
  }
`