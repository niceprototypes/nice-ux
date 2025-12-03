import styled from "styled-components"
import { getToken } from "nice-styles"
import type { CellHeightType, BorderRadiusType } from "nice-styles"
import { ButtonModeType, ButtonStatusType, ButtonStateType } from "../types"

/**
 * Get border radius based on size or custom value
 */
const getBorderRadius = (size: CellHeightType, customRadius?: string): string => {
  if (customRadius) return customRadius
  // Default to same token as size for pill-like buttons
  return getToken("borderRadius", size as BorderRadiusType).var
}

/**
 * Overlay element for border rendering (positioned behind content)
 */
export const ButtonOverlay = styled.div<{
  $bordered?: boolean
  $borderColor?: string
  $borderWidth?: string
  $mode?: ButtonModeType
  $status?: ButtonStatusType
  $state?: ButtonStateType
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: ${({ $bordered, $borderColor, $borderWidth, $mode, $status }) => {
    if ($bordered === false) return "none"
    const width = $borderWidth || getToken("borderWidth", "base").var
    const color = $borderColor || ($status === "secondary"
      ? getToken("borderColor", "base").var
      : "transparent")
    return `${width} solid ${color}`
  }};
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
  $mode: ButtonModeType
  $status: ButtonStatusType
  $state: ButtonStateType
  $disabled?: boolean
  $fullWidth?: boolean
  $hasIcon?: boolean
  $isSquare?: boolean
  $borderRadius?: string
  $backgroundColor?: string
  $backgroundImage?: string
  $borderColor?: string
  $bordered?: boolean
  $condensed?: boolean
}>`
  /* Reset browser button styles */
  position: relative;
  padding: ${({ $size, $condensed, $hasIcon, $isSquare }) => {
    if ($isSquare) return "0"
    const height = getToken("cellHeight", $size).var
    const divisor = $condensed ? 2 : 1
    const rightDivisor = $condensed && !$hasIcon ? 2 : 1
    return `0 calc(${height} / ${rightDivisor}) 0 calc(${height} / ${divisor})`
  }};
  margin: 0;
  outline: none;
  text-decoration: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;

  /* Button-specific styles */
  display: block;
  width: ${({ $fullWidth, $isSquare, $size }) => {
    if ($fullWidth) return "100%"
    if ($isSquare) return getToken("cellHeight", $size).var
    return "auto"
  }};
  aspect-ratio: ${({ $isSquare }) => ($isSquare ? "1" : "auto")};
  font-weight: ${getToken("fontWeight", "base").var};

  /* Colors based on mode/status/state */
  background-color: ${({ $backgroundColor, $mode, $status, $state }) => {
    if ($backgroundColor) return $backgroundColor
    if ($state === "disabled") return getToken("backgroundColor", "alternate").var
    if ($status === "secondary") return "transparent"
    // Primary button
    return $mode === "dark"
      ? getToken("foregroundColor", "base").var
      : getToken("foregroundColor", "base").var
  }};

  color: ${({ $mode, $status, $state }) => {
    if ($state === "disabled") return getToken("foregroundColor", "disabled").var
    if ($status === "secondary") return getToken("foregroundColor", "base").var
    // Primary button - inverted color
    return $mode === "dark"
      ? getToken("backgroundColor", "base").var
      : getToken("backgroundColor", "base").var
  }};

  background-image: ${({ $backgroundImage }) => $backgroundImage || "none"};
  border: none;
  border-radius: ${({ $size, $borderRadius }) => getBorderRadius($size, $borderRadius)};
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
export const ButtonIconPositioned = styled.div<{ $size: CellHeightType; $isLeft: boolean }>`
  position: absolute;
  ${({ $isLeft }) => ($isLeft ? "left: 0;" : "right: 0;")}
  top: 0;
  width: ${({ $size }) => getToken("cellHeight", $size).var};
  height: ${({ $size }) => getToken("cellHeight", $size).var};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`