import styled from "styled-components"
import { getToken, resolveColorProp } from "nice-react-styles"
import type { ColorTokenProp } from "nice-react-styles"
import type {
  CheckboxBackgroundColorType,
  CheckboxBorderColorType,
  CheckboxBorderRadiusType,
  CheckboxBorderWidthType,
  CheckboxSizeType,
} from "./Checkbox.types"

/**
 * The root: sized to the box. The nested check icon reads --np--icon--size / --np--icon--color,
 * reassigned here to the checkbox-scoped icon tokens (as Button does for its icons), so
 * overriding --np--checkbox--icon--* restyles the check without touching other icons.
 */
export const StyledCheckbox = styled.span<{ $size: CheckboxSizeType; $disabled: boolean }>`
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: ${({ $size }) => getToken(`checkbox.size:${$size}`)};
  height: ${({ $size }) => getToken(`checkbox.size:${$size}`)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? getToken("checkbox.disabledOpacity:base") : 1)};
  --np--icon--color: ${getToken("checkbox.icon.color:base")};
  --np--icon--size: ${({ $size }) => getToken(`checkbox.icon.size:${$size}`)};
`

/**
 * The root when Checkbox has children: a label around the box and the label text, so clicking
 * the text toggles the checkbox (as Toggle's root label does). It takes the disabled opacity for
 * box and text together, so the box inside drops its own. No checkbox gap token exists; the
 * core small gap is the value Toggle's `toggle.gap` resolves to.
 */
export const StyledCheckboxLabel = styled.label<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${getToken("gap", "small")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? getToken("checkbox.disabledOpacity:base") : 1)};

  & > ${StyledCheckbox} {
    opacity: 1;
  }
`

/** The native checkbox: invisible, but still the focus target, keyboard handler and hit area. */
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

/** Holds the check icon, centered; shown only when checked. */
export const StyledCheck = styled.span`
  display: flex;
  visibility: hidden;
`

/** The drawn box, beside the native checkbox. */
export const StyledBox = styled.span<{
  $backgroundColor: ColorTokenProp<CheckboxBackgroundColorType>
  $borderColor: ColorTokenProp<CheckboxBorderColorType>
  $borderRadius: CheckboxBorderRadiusType
  $borderWidth: CheckboxBorderWidthType
}>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: ${getToken("checkbox.backgroundColor:unchecked")};
  border-style: solid;
  border-width: ${({ $borderWidth }) => getToken(`checkbox.borderWidth:${$borderWidth}`)};
  border-color: ${({ $borderColor }) => resolveColorProp("checkbox", "borderColor", $borderColor)};
  border-radius: ${({ $borderRadius }) => getToken(`checkbox.borderRadius:${$borderRadius}`)};

  /* Checked: the fill paints to the border box and the border goes transparent, so the
     box reads as one solid shape (as a filled Button does). */
  ${StyledInput}:checked + & {
    background-color: ${({ $backgroundColor }) => resolveColorProp("checkbox", "backgroundColor", $backgroundColor)};
    border-color: transparent;
  }

  ${StyledInput}:checked + & ${StyledCheck} {
    visibility: visible;
  }

  /* Keyboard focus ring, on the drawn box; the native checkbox is invisible. */
  ${StyledInput}:focus-visible + & {
    outline: ${getToken("checkbox.focusRing.width:base")} solid ${getToken("checkbox.focusRing.color:base")};
    outline-offset: ${getToken("checkbox.focusRing.offset:base")};
  }
`
