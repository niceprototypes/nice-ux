import styled from "styled-components"
import getCssVariable from "../services/getCssVariable"
import getBorderRadius from "../services/getBorderRadius"
import { ThemeDesignValues } from "../types/themes"

/**
 * Inner wrapper for button content
 */
export const ButtonInner = styled.div<{ $borderWidth?: string }>`
  margin: calc(${(props) => props.$borderWidth || "1px"} * -1)
    calc(${(props) => props.$borderWidth || "1px"} * -1) 0;
`

/**
 * Main button element with all styling
 */
export const ButtonOuter = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})<{
  $size: number
  $themeStyles: ThemeDesignValues
  $disabled?: boolean
  $fullWidth?: boolean
  $hasIcon?: boolean
  $borderRadius?: string
  $backgroundColor?: string
  $backgroundImage?: string
  $borderColor?: string
}>`
  /* Reset browser button styles */
  background: none;
  padding: 0;
  margin: 0;
  outline: none;
  text-decoration: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;

  /* Button-specific styles */
  display: block;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  font-weight: ${getCssVariable("font-weight", 2)};
  background-color: ${({ $backgroundColor, $themeStyles }) =>
    $backgroundColor || $themeStyles.backgroundColor};
  background-image: ${({ $backgroundImage }) => $backgroundImage || "none"};
  border: ${({ $themeStyles }) => $themeStyles.borderWidth || "1px"} solid
    ${({ $borderColor, $themeStyles }) => $borderColor || $themeStyles.borderColor};
  color: ${({ $themeStyles }) => $themeStyles.color};
  border-radius: ${({ $size, $borderRadius }) => getBorderRadius($size, $borderRadius)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  text-align: center;

  /* Smooth transitions */
  transition: all 0.15s ease-in-out;

  /* Focus styles */
  &:focus-visible {
    outline: 2px solid var(--color-focus, #3b82f6);
    outline-offset: 2px;
  }

  /* Hover styles */
  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  /* Active styles */
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`

/**
 * Text content wrapper
 */
export const ButtonText = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
