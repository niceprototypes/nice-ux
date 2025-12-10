import styled, { css } from "styled-components"
import { getToken } from "nice-styles"
import type { CellHeightType, BorderRadiusType } from "nice-styles"
import { ButtonStateType } from "../types"
import { generateTokens } from "nice-react-styles"
import { ButtonTokens } from "./Button.tokens"

/**
 * Overlay element for border rendering (positioned behind content)
 */
export const ButtonOverlay = styled.div<{
  $borderWidth?: string
  $state?: ButtonStateType
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: none;
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
  $size: CellHeightType
  $state: ButtonStateType
  $disabled?: boolean
  $hasIcon?: boolean
  $isSquare?: boolean
}>`
  /* Button tokens */
  ${generateTokens(ButtonTokens)}
  /* Reset browser button styles */
  position: relative;
  padding: ${({ $size, $hasIcon, $isSquare }) => {
    if ($isSquare) return "0"
    const height = getToken("cellHeight", $size).var
    return `0 calc(${height}) 0 calc(${height} / 2)`
  }};
  margin: 0;
  outline: none;
  text-decoration: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;

  /* Button-specific styles */
  display: block;
  width: ${({ $isSquare, $size }) => {
    if ($isSquare) return getToken("cellHeight", $size).var
    return "auto"
  }};
  aspect-ratio: ${({ $isSquare }) => ($isSquare ? "1" : "auto")};
  font-weight: ${getToken("fontWeight", "base").var};

  /* Colors based on state */
  background-color: var(--button-primary-base-background-color);

  color: ${({ $state }) => {
    if ($state === "disabled") return getToken("foregroundColor", "disabled").var
    return getToken("backgroundColor", "base").var
  }};

  border: none;
  border-radius: ${({ $size }) => getToken("borderRadius", $size)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  text-align: center;

  /* Smooth transitions */
  transition: all 0.15s ease-in-out;
`

/**
 * Text content wrapper
 */
export const ButtonText = styled.div<{ $size: CellHeightType }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ $size }) => getToken("cellHeight", $size).var};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

/**
 * Positioned icon wrapper
 */
export const ButtonIconPositioned = styled.div<{ $size: CellHeightType }>`
  position: absolute;
  right: 0;
  top: 0;
  width: ${({ $size }) => getToken("cellHeight", $size).var};
  height: ${({ $size }) => getToken("cellHeight", $size).var};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`
