import styled from "styled-components"
import { getToken, resolveColorProp } from "@niceprototypes/styles"
import type { ColorTokenProp } from "@niceprototypes/styles"
import type { RadioBackgroundColorType, RadioBorderColorType, RadioSizeType } from "../RadioGroup/RadioGroup.types"

/** The root: a label around the circle and the label text, so clicking the text checks it. */
export const StyledRadio = styled.label<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${getToken("radio.gap:base")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? getToken("radio.disabledOpacity:base") : 1)};
`

/** Holds the native radio and the drawn circle, sized to the circle. */
export const StyledControl = styled.span<{ $size: RadioSizeType }>`
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: ${({ $size }) => getToken(`radio.size:${$size}`)};
  height: ${({ $size }) => getToken(`radio.size:${$size}`)};
`

/** The native radio: invisible, but still the focus target, keyboard handler and hit area. */
export const StyledInput = styled.input`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: inherit;
`

/** The dot in the circle's center; shown only when checked. */
export const StyledDot = styled.span<{ $size: RadioSizeType }>`
  width: ${({ $size }) => getToken(`radio.dot.size:${$size}`)};
  height: ${({ $size }) => getToken(`radio.dot.size:${$size}`)};
  border-radius: 50%;
  background-color: ${getToken("radio.dot.color:base")};
  visibility: hidden;
`

/** The drawn circle, beside the native radio. */
export const StyledCircle = styled.span<{
  $backgroundColor: ColorTokenProp<RadioBackgroundColorType>
  $borderColor: ColorTokenProp<RadioBorderColorType>
}>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 50%;
  background-color: ${getToken("radio.backgroundColor:unchecked")};
  border-style: solid;
  border-width: ${getToken("radio.borderWidth:base")};
  border-color: ${({ $borderColor }) => resolveColorProp("radio", "borderColor", $borderColor)};

  /* Checked: the fill paints to the border box and the border goes transparent, so the
     circle reads as one solid shape around the dot (as Checkbox's box does). */
  ${StyledInput}:checked + & {
    background-color: ${({ $backgroundColor }) => resolveColorProp("radio", "backgroundColor", $backgroundColor)};
    border-color: transparent;
  }

  ${StyledInput}:checked + & ${StyledDot} {
    visibility: visible;
  }

  /* Keyboard focus ring, on the drawn circle; the native radio is invisible. */
  ${StyledInput}:focus-visible + & {
    outline: ${getToken("radio.focusRing.width:base")} solid ${getToken("radio.focusRing.color:base")};
    outline-offset: ${getToken("radio.focusRing.offset:base")};
  }
`
