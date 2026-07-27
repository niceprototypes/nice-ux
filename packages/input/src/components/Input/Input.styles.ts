import styled, { css } from "styled-components"
import { getToken } from "nice-react-styles"
import type { SizeType, BorderWidthType } from "nice-react-styles"
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
  $size: SizeType
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
    $borderWidth,
    $borderRadius,
    $backgroundColor,
    $borderColor,
    $disabled,
  }) => css`
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: ${getInputToken("size", $size)};
    padding: 0 ${getInputToken("spacing", $size)};
    font-weight: ${getToken("fontWeight", "base")};
    background-color: ${getStatusToken($status, $state, "backgroundColor")};
    color: ${getStatusToken($status, $state, "color")};
    border-style: solid;
    border-width: ${getInputToken("borderWidth", $borderWidth)};
    border-color: ${getStatusToken($status, $state, "borderColor")};
    border-radius: ${getInputToken("borderRadius", $borderRadius)};
    transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
    cursor: ${$disabled ? "not-allowed" : "text"};
    ${$backgroundColor ? `background-color: ${$backgroundColor};` : ""}
    ${$borderColor ? `border-color: ${$borderColor};` : ""}

    &::placeholder {
      color: ${getStatusToken($status, $state, "placeholderColor")};
      opacity: 1;
    }

    &:focus {
      border-color: ${getToken("color", "base")};
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