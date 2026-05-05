import styled from "styled-components"
import { getBreakpoint, getToken, BREAKPOINT_MEDIUM } from "nice-react-styles"
import type { CellHeightType, BorderWidthType, ModeType } from "nice-react-styles"
import type { ButtonBorderRadiusType, ButtonStateType, ButtonStatusType } from "./Button.types"
import { getButtonToken } from "../../tokens/getButtonToken"
import { getStatusToken } from "../../utilities/getStatusToken"

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})<{
  $backgroundImage?: string
  $borderColor?: string
  $borderRadius: ButtonBorderRadiusType
  $borderWidth: BorderWidthType
  $disabled: boolean
  $isHovered: boolean
  $isFocused: boolean
  $isPressed: boolean
  $link: boolean
  $mode?: ModeType
  $size: CellHeightType
  $square: boolean
  $state: ButtonStateType
  $status: ButtonStatusType
}>`
  /* Reset */
  position: relative;
  margin: 0;
  outline: none;
  text-decoration: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  -webkit-tap-highlight-color: transparent;

  ${({
    $link,
    $square,
    $size,
    $status,
    $state,
    $mode,
    $borderWidth,
    $borderRadius,
    $backgroundImage,
    $borderColor,
    $disabled,
  }) =>
    !$link &&
    `
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${!$square ? `0 ${getButtonToken("spacing", $size).var}` : "0"};
    height: ${getButtonToken("size", $size).var};
    width: 100%;
    padding: ${$square ? "0" : `0 ${getButtonToken("spacing", $size).var}`};
    font-weight: ${getToken("fontWeight", "base").var};
    background-color: ${getStatusToken($status, $state, "backgroundColor", $mode).var};
    color: ${getStatusToken($status, $state, "foregroundColor", $mode).var};
    border-style: solid;
    border-width: ${getToken("borderWidth", $borderWidth).var};
    border-color: ${getStatusToken($status, $state, "borderColor", $mode).var};
    border-radius: ${getButtonToken("borderRadius", $borderRadius).var};
    transition: all 0.15s ease-in-out;
    ${$backgroundImage ? `background-image: ${$backgroundImage};` : ""}
    ${$borderColor ? `border-color: ${$borderColor};` : ""}
  `}

  ${({ $link, $square, $size }) =>
    !$link &&
    `
    ${getBreakpoint(BREAKPOINT_MEDIUM).query} {
      width: ${$square ? getButtonToken("size", $size).var : "auto"};
    }
  `}
`
