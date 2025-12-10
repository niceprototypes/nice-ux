import styled, { css } from "styled-components"
import { getToken } from "nice-styles"
import type { CellHeightType, BorderWidthType } from "nice-styles"
import { ButtonStateType, ButtonStatusType, ButtonBorderRadiusType } from "./types"
import { ButtonTokens, getButtonToken } from "./services"

/**
 * Overlay element for border rendering (positioned behind content)
 */
export const ButtonOverlay = styled.div<{
  $borderWidth: BorderWidthType
  $status: ButtonStatusType
  $state: ButtonStateType
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-style: solid;
  border-width: ${({ $borderWidth }) => getToken("borderWidth", $borderWidth).var};
  border-color: ${({ $status, $state }) => getButtonToken("status", $status, $state, "border-color").var};
  border-radius: inherit;
  pointer-events: none;
`

/**
 * Inner wrapper for button content
 */
export const ButtonInner = styled.div<{
  $size: CellHeightType
}>`
  position: relative;
`

/**
 * Main button element with all styling
 */
export const ButtonOuter = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})<{
  $borderRadius: ButtonBorderRadiusType
  $size: CellHeightType
  $status: ButtonStatusType
  $state: ButtonStateType
  $disabled: boolean
  $hasIcon: boolean
  $isSquare: boolean
}>`
  /* Button tokens */
  ${ButtonTokens}

  /* Reset browser button styles */
  position: relative;
  margin: 0;
  outline: none;
  text-decoration: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;

  /* Button-specific styles */
  display: block;
  padding: ${({ $size }) => `0 ${getToken("gap", $size).var}`};
  width: auto;
  font-weight: ${getToken("fontWeight", "base").var};

  /* Square button styles (icon-only) */
  ${({ $isSquare, $size }) =>
    $isSquare &&
    css`
      padding: 0;
      width: ${getButtonToken("height", $size).var};
      aspect-ratio: 1;
    `}

  /* Colors based on status and state */
  background-color: ${({ $status, $state }) =>
    getButtonToken("status", $status, $state, "background-color").var};
  color: ${({ $status, $state }) => getButtonToken("status", $status, $state, "foreground-color").var};

  border: none;
  border-radius: ${({ $borderRadius }) => getButtonToken("border-radius", $borderRadius).var};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  text-align: center;

  /* Smooth transitions */
  transition: all 0.15s ease-in-out;
`

/**
 * Text content wrapper
 */
export const ButtonContent = styled.div<{ $size: CellHeightType }>`
  ${ButtonTokens}
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ $size }) => getButtonToken("height", $size).var};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

/**
 * Positioned icon wrapper
 */
export const ButtonIconPositioned = styled.div<{ $size: CellHeightType }>`
  ${ButtonTokens}
  position: absolute;
  right: 0;
  top: 0;
  width: ${({ $size }) => getButtonToken("height", $size).var};
  height: ${({ $size }) => getButtonToken("height", $size).var};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`
