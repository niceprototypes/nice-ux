import styled from "styled-components"
import { getBreakpoint, getToken, BREAKPOINT_TABLET } from "nice-react-styles"
import type { CellHeightType, BorderWidthType, BorderColorType } from "nice-react-styles"
import type { ButtonBorderRadiusType, ButtonStateType, ButtonStatusType } from "./Button.types"
import { getButtonToken } from "../../tokens/getButtonToken"
import { getStatusToken } from "../../utilities/getStatusToken"

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})<{
  $backgroundImage?: string
  $borderColor?: BorderColorType
  $borderRadius: ButtonBorderRadiusType
  $borderWidth: BorderWidthType
  $disabled: boolean
  $isHovered: boolean
  $isFocused: boolean
  $isPressed: boolean
  $link: boolean
  $size: CellHeightType
  $square: boolean
  $state: ButtonStateType
  $status: ButtonStatusType
}>`
  /* Reset */
  position: relative;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  outline: none;
  text-align: center;
  text-decoration: none;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  -webkit-tap-highlight-color: transparent;

  ${({
    $link,
    $square,
    $size,
    $status,
    $state,
    $borderWidth,
    $borderRadius,
    $backgroundImage,
    $borderColor,
    $disabled,
  }) =>
    !$link &&
    `
    gap: ${$square ? "0" : `0 ${getButtonToken("spacing", $size)}`};
    height: ${getButtonToken("size", $size)};
    width: 100%;
    padding: ${$square ? "0" : `0 ${getButtonToken("spacing", $size)}`};
    font-weight: ${getToken("fontWeight", "base")};
    background-color: ${getStatusToken($status, $state, "backgroundColor")};
    color: ${getStatusToken($status, $state, "color")};
    border-style: solid;
    border-width: ${getButtonToken("borderWidth", $borderWidth)};
    border-color: ${getStatusToken($status, $state, "borderColor")};
    border-radius: ${getButtonToken("borderRadius", $borderRadius)};
    transition: all 0.15s ease-in-out;
    ${$backgroundImage ? `background-image: ${$backgroundImage};` : ""}
    ${$borderColor ? `border-color: ${getButtonToken("borderColor", $borderColor)};` : ""}
  `}

  ${({ $link, $square, $size }) =>
    !$link &&
    `
    ${getBreakpoint(BREAKPOINT_TABLET)} {
      width: ${$square ? getButtonToken("size", $size) : "auto"};
    }
  `}

  ${({ $link }) =>
    $link &&
    `
    color: ${getToken("color", "link")};
    gap: ${getToken("gap", "small")};
  `}
`
