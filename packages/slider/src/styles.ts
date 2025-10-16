import styled from "styled-components"
import styleHideScrollbar from "./styleHideScrollbar"

export const ItemStyled = styled.div<{
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
  transition: transform 0.3s ease-in-out;
`

export const OuterStyled = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  overflow: hidden;
`
