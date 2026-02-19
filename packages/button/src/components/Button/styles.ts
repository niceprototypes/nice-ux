import styled from "styled-components"
import { getCoreToken } from "nice-styles"
import type { CellHeightType, BorderWidthType, ModeType } from "nice-styles"
import type { ButtonBorderRadiusType, ButtonStateType, ButtonStatusType } from "./types"
import { getButtonToken } from "../../tokens/getButtonToken"
import { getStatusToken } from "../../helpers/getStatusToken"

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})<{
  $backgroundImage?: string
  $borderColor?: string
  $borderRadius: ButtonBorderRadiusType
  $borderWidth: BorderWidthType
  $disabled: boolean
  $mode?: ModeType
  $size: CellHeightType
  $square: boolean
  $state: ButtonStateType
  $status: ButtonStatusType
}>`
  /* Reset browser button styles */
  position: relative;
  margin: 0;
  outline: none;
  text-decoration: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  text-align: center;

  /* Button-specific styles */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $square, $size }) => !$square && `0 ${getButtonToken("spacing", $size).var}`};
  width: ${({ $square, $size }) => ($square ? getButtonToken("size", $size).var : "auto")};
  height: ${({ $size }) => getButtonToken("size", $size).var};
  padding: ${({ $square, $size }) => ($square ? "0" : `0 ${getButtonToken("spacing", $size).var}`)};
  font-weight: ${getCoreToken("fontWeight", "base").var};

  /* Colors */
  background-color: ${({ $status, $state, $mode }) =>
    getStatusToken($status, $state, "backgroundColor", $mode).var};
  color: ${({ $status, $state, $mode }) => getStatusToken($status, $state, "foregroundColor", $mode).var};

  /* Border */
  border-style: solid;
  border-width: ${({ $borderWidth }) => getCoreToken("borderWidth", $borderWidth).var};
  border-color: ${({ $status, $state, $mode }) => getStatusToken($status, $state, "borderColor", $mode).var};
  border-radius: ${({ $borderRadius }) => getButtonToken("borderRadius", $borderRadius).var};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  /* Transitions */
  transition: all 0.15s ease-in-out;

  /* Overrides */
  ${({ $backgroundImage }) => $backgroundImage && `background-image: ${$backgroundImage};`}
  ${({ $borderColor }) => $borderColor && `border-color: ${$borderColor};`}
`
