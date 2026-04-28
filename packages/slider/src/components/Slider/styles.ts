import { getToken } from "nice-react-styles"
import styled from "styled-components"
import { styleHideScrollbar } from "../../utilities/styleHideScrollbar"

export const SliderItemStyled = styled.div<{
  $index: number
  $currentIndex: number
  $isAnimating: boolean
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  overflow-y: auto;
  ${styleHideScrollbar}
  transform: translateY(${(props) => (props.$index - props.$currentIndex) * 100}%);
  transition: transform ${getToken("animationDuration", "base").var} ${getToken("animationEasing", "base").var};
`

export const SliderOuterStyled = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  overflow: hidden;
`
