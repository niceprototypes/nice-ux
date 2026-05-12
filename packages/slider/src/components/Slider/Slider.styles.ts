import { getReactToken } from "nice-react-styles"
import styled, { css } from "styled-components"

const styleHideScrollbar = css`
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

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
  transition: transform ${getReactToken("animationDuration", "base").var} ${getReactToken("animationEasing", "base").var};
`

export const SliderOuterStyled = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  overflow: hidden;
`
