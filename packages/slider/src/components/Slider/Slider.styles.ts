import { getToken } from "@niceprototypes/styles"
import styled from "styled-components"
import { Scroll } from "@niceprototypes/scroll"

/** A slide: a Scroll, its scrollbar hidden by default. */
export const SliderItemStyled = styled(Scroll)<{
  $index: number
  $currentIndex: number
  $isAnimating: boolean
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  transform: translateY(${(props) => (props.$index - props.$currentIndex) * 100}%);
  transition: transform ${getToken("animationDuration", "base")} ${getToken("animationEasing", "base")};
`

export const SliderOuterStyled = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  overflow: hidden;
`
