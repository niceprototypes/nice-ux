import styled from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"

export const OuterFlex = styled(Flex).attrs({
  alignItems: "center",
  justifyContent: "space-between",
  gap: "large",
  padding: "none larger",
})`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: ${getToken("cellHeight", "larger")};
  z-index: ${getToken("zIndex", "higher")};
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
    /* Keep the token var() (so it flips day/night via the [data-theme] cascade)
       and just drop the alpha to 0.98 — relative-color syntax, not getHSLA, which
       would bake a static day-mode color. */
    background-color: hsl(from ${getToken("backgroundColor")} h s l / 0.98);
    filter: blur(8px);
    z-index: -1;
  }
`

export const SpacerDiv = styled.div`
  height: ${getToken("cellHeight", "larger")};
`