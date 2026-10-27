import styled from "styled-components"
import { getToken } from "nice-react-styles"
import type { LineColorType } from "./Line.types"

/** Fills the positioned parent; never takes pointer events from it. */
export const StyledLine = styled.span`
  position: absolute;
  inset: 0;
  display: block;
  pointer-events: none;
`

/** Drawn over the box's edge: half of each dash sits outside the parent. */
export const StyledSvg = styled.svg`
  position: absolute;
  inset: 0;
  overflow: visible;
`

/** The rim: the dash pattern, wider by the rim on each side, under the dashes. */
export const StyledRim = styled.path`
  fill: none;
  stroke: ${getToken("line.rimColor:base")};
  stroke-width: calc(${getToken("line.width:base")} + 2 * ${getToken("line.rimWidth:base")});
  stroke-linecap: round;
`

/** The dashes: round caps make each one a pill. */
export const StyledDash = styled.path<{ $color: LineColorType }>`
  fill: none;
  stroke: ${({ $color }) => getToken(`line.borderColor:${$color}`)};
  stroke-width: ${getToken("line.width:base")};
  stroke-linecap: round;
`
