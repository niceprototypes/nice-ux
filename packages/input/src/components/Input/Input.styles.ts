import styled, { css } from "styled-components"
import { getToken } from "nice-react-styles"
import type { CellHeightType, BorderWidthType, ModeType } from "nice-react-styles"
import type { InputBorderRadiusType, InputStateType, InputStatusType } from "./Input.types"
import { getInputToken } from "../../tokens/getInputToken"
import { getStatusToken } from "../../utilities/getStatusToken"

export const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})<{
  $backgroundColor?: string
  $borderColor?: string
  $borderRadius: InputBorderRadiusType
  $borderWidth: BorderWidthType
  $disabled: boolean
  $isFocused: boolean
  $mode?: ModeType
  $size: CellHeightType
  $state: InputStateType
  $status: InputStatusType
}>`
  /* Reset */
  margin: 0;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  line-height: 1;
  -webkit-tap-highlight-color: transparent;
  appearance: none;
  -webkit-appearance: none;

  ${({
    $size,
    $status,
    $state,
    $mode,
    $borderWidth,
    $borderRadius,
    $backgroundColor,
    $borderColor,
    $disabled,
  }) => css`
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: ${getInputToken("size", $size).var};
    padding: 0 ${getInputToken("spacing", $size).var};
    font-size: ${getToken("fontSize", $size).var};
    font-weight: ${getToken("fontWeight", "base").var};
    background-color: ${getStatusToken($status, $state, "backgroundColor", $mode).var};
    color: ${getStatusToken($status, $state, "foregroundColor", $mode).var};
    border-style: solid;
    border-width: ${getToken("borderWidth", $borderWidth).var};
    border-color: ${getStatusToken($status, $state, "borderColor", $mode).var};
    border-radius: ${getInputToken("borderRadius", $borderRadius).var};
    transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
    cursor: ${$disabled ? "not-allowed" : "text"};
    ${$backgroundColor ? `background-color: ${$backgroundColor};` : ""}
    ${$borderColor ? `border-color: ${$borderColor};` : ""}

    &::placeholder {
      color: ${getStatusToken($status, $state, "placeholderColor", $mode).var};
      opacity: 1;
    }

    &:focus {
      border-color: ${getToken("foregroundColor", "base").var};
    }

    &:disabled {
      cursor: not-allowed;
    }

    &::-webkit-search-cancel-button,
    &::-webkit-search-decoration {
      -webkit-appearance: none;
    }
  `}
`