import styled from "styled-components"
import { getToken } from "nice-styles"
import type { CellHeightType, BorderWidthType } from "nice-styles"
import { ButtonStateType, ButtonStatusType, ButtonBorderRadiusType } from "./types"
import { getButtonToken, getButtonStatusToken } from "./tokens"
import Flex, { FlexProps } from "nice-react-flex"

/**
 * Main button element with all styling
 */
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
  width: ${({ $square, $size }) =>
    $square ? getButtonToken("height", $size).var : "auto"};
  height: ${({ $size }) => getButtonToken("height", $size).var};
  padding: ${({ $square, $size }) =>
    $square ? "0" : `0 ${getButtonToken("spacing", $size).var}`};
  font-weight: ${getToken("fontWeight", "base").var};

  /* Colors based on status and state */
  background-color: ${({ $status, $state }) =>
    getButtonStatusToken($status, $state, "backgroundColor").var};
  color: ${({ $status, $state }) =>
    getButtonStatusToken($status, $state, "foregroundColor").var};

  border-style: solid;
  border-width: ${({ $borderWidth }) => getToken("borderWidth", $borderWidth).var};
  border-color: ${({ $status, $state }) =>
    getButtonStatusToken($status, $state, "borderColor").var};
  border-radius: ${({ $borderRadius }) => getButtonToken("borderRadius", $borderRadius).var};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  text-align: center;

  /* Smooth transitions */
  transition: all 0.15s ease-in-out;
`
