import styled from "styled-components"
import { getToken } from "nice-styles"
import type { CellHeightType, BorderWidthType } from "nice-styles"
import { ButtonStateType, ButtonStatusType, ButtonBorderRadiusType } from "./types"
import { getButtonToken } from "../../tokens/getButtonToken"
import { capitalize } from "../../helpers/capitalize"

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})<{
  $borderRadius: ButtonBorderRadiusType
  $borderWidth: BorderWidthType
  $disabled: boolean
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

  /* Button-specific styles */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $square, $size }) => !$square && `0 ${getButtonToken("spacing", $size).var}`};
  width: ${({ $square, $size }) => ($square ? getButtonToken("size", $size).var : "auto")};
  height: ${({ $size }) => getButtonToken("size", $size).var};
  padding: ${({ $square, $size }) => ($square ? "0" : `0 ${getButtonToken("spacing", $size).var}`)};
  font-weight: ${getToken("fontWeight", "base").var};

  /* Colors based on status and state */
  background-color: ${({ $status, $state }) =>
    getButtonToken(
      `status${capitalize($status)}${capitalize($state)}` as `status${Capitalize<ButtonStatusType>}${Capitalize<ButtonStateType>}`,
      "backgroundColor"
    ).var};
  color: ${({ $status, $state }) =>
    getButtonToken(
      `status${capitalize($status)}${capitalize($state)}` as `status${Capitalize<ButtonStatusType>}${Capitalize<ButtonStateType>}`,
      "foregroundColor"
    ).var};

  border-style: solid;
  border-width: ${({ $borderWidth }) => getToken("borderWidth", $borderWidth).var};
  border-color: ${({ $status, $state }) =>
    getButtonToken(
      `status${capitalize($status)}${capitalize($state)}` as `status${Capitalize<ButtonStatusType>}${Capitalize<ButtonStateType>}`,
      "borderColor"
    ).var};
  border-radius: ${({ $borderRadius }) => getButtonToken("borderRadius", $borderRadius).var};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  text-align: center;

  /* Smooth transitions */
  transition: all 0.15s ease-in-out;
`
