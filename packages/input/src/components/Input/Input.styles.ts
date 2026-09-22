import styled, { css } from "styled-components"
import { getToken } from "nice-react-styles"
import type { SizeType, BorderWidthType } from "nice-react-styles"
import type { InputBorderRadiusType, InputStatusType } from "./Input.types"

/**
 * Border color: status name maps 1:1 to a core --np--border-color variant.
 * Outline inputs fall back to the base border when disabled; filled inputs have
 * no border unless the status is semantic (error / success / warning).
 */
function getBorderColor(status: InputStatusType, filled: boolean): string {
  if (status === "base" || status === "disabled") {
    return filled ? "transparent" : getToken("borderColor", "base")
  }
  return getToken("borderColor", status)
}

export const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})<{
  $backgroundColor?: string
  $borderColor?: string
  $borderRadius: InputBorderRadiusType
  $borderWidth: BorderWidthType
  $disabled: boolean
  $filled: boolean
  $isFocused: boolean
  $size: SizeType
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
    $filled,
    $borderWidth,
    $borderRadius,
    $backgroundColor,
    $borderColor,
    $disabled,
  }) => css`
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: ${getToken(`input.size:${$size}`)};
    padding: 0 ${getToken(`input.spacing:${$size}`)};
    font-weight: ${getToken("fontWeight", "base")};
    background-color: ${getToken("backgroundColor", $filled ? "raised" : "base")};
    color: ${getToken("color", $disabled ? "disabled" : "base")};
    border-style: solid;
    border-width: ${getToken(`input.borderWidth:${$borderWidth}`)};
    border-color: ${getBorderColor($status, $filled)};
    border-radius: ${getToken(`input.borderRadius:${$borderRadius}`)};
    transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
    cursor: ${$disabled ? "not-allowed" : "text"};
    ${$backgroundColor ? `background-color: ${$backgroundColor};` : ""}
    ${$borderColor ? `border-color: ${$borderColor};` : ""}

    &::placeholder {
      color: ${getToken("color", $disabled ? "disabled" : "lighter")};
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