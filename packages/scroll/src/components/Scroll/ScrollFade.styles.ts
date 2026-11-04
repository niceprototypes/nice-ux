import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"

/** The faded content's wrapper. */
export const StyledScrollFade = styled.div<{ $opacity: number }>`
  opacity: ${({ $opacity }) => $opacity};
  transition: opacity ${getToken("scroll.fade.animationDuration")} ${getToken("scroll.fade.animationEasing")};
  will-change: opacity;
`
