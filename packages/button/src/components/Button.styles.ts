import styled, { css } from "styled-components"
import { ButtonProps, ButtonTheme } from "../types"
import { getCssVariable, mergeTheme } from "../utils"

/**
 * Generates styles for button state
 */
export const getStateStyles = (state?: ButtonProps["state"], theme?: ButtonTheme) => {
  const mergedTheme = mergeTheme(theme)

  switch (state) {
    case "disabled":
      return css`
        color: var(--content-color-3);
        background-color: transparent;
        border-color: ${mergedTheme.cssVariables?.borderColor};
        cursor: not-allowed;
        pointer-events: none;
      `
    case "success":
      return css`
        border-color: ${mergedTheme.colors?.success || "var(--color-success)"};
      `
    case "error":
      return css`
        border-color: ${mergedTheme.colors?.error || "var(--color-error)"};
      `
    case "warning":
      return css`
        border-color: ${mergedTheme.colors?.warning || "var(--color-warning)"};
      `
    case "active":
      return css`
        opacity: 0.8;
      `
    default:
      return css``
  }
}

/**
 * Generates styles for button status/variant
 */
export const getStatusStyles = (status?: ButtonProps["status"], theme?: ButtonTheme) => {
  const mergedTheme = mergeTheme(theme)

  switch (status) {
    case "primary":
      return css`
        background-color: ${mergedTheme.cssVariables?.backgroundColorInverse};
        color: ${mergedTheme.cssVariables?.contentColorInverse};
        border-color: ${mergedTheme.cssVariables?.backgroundColorInverse};
      `
    case "secondary":
      return css`
        background-color: ${mergedTheme.cssVariables?.backgroundColor};
        color: ${mergedTheme.cssVariables?.contentColor};
        border-color: ${mergedTheme.cssVariables?.borderColor};
      `
    case "muted":
      return css`
        background-color: transparent;
        color: var(--content-color-3);
        border-color: transparent;
      `
    case "highlighted":
      return css`
        background-color: var(--color-highlight, #f0f9ff);
        color: var(--content-color-1);
        border-color: var(--color-highlight-border, #0ea5e9);
      `
    case "default":
    default:
      return css`
        background-color: ${mergedTheme.cssVariables?.backgroundColor};
        color: ${mergedTheme.cssVariables?.contentColor};
        border-color: ${mergedTheme.cssVariables?.borderColor};
      `
  }
}

/**
 * Inner wrapper for button content
 */
export const ButtonInner = styled.div`
  margin: calc(${props => props.theme?.cssVariables?.borderWidth || "var(--border-width-1)"} * -1)
          calc(${props => props.theme?.cssVariables?.borderWidth || "var(--border-width-1)"} * -1) 0;
`

/**
 * Main button element with all styling
 */
export const ButtonOuter = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})<{
  $size: number
  $state?: ButtonProps["state"]
  $status?: ButtonProps["status"]
  $disabled?: boolean
  $fullWidth?: boolean
  $hasIcon?: boolean
  $theme?: ButtonTheme
}>`
  /* Reset browser button styles */
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;

  /* Button-specific styles */
  display: block;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  height: ${({ $size }) => getCssVariable("cell-height", $size)};
  font-weight: 500;
  border: ${({ $theme }) => $theme?.cssVariables?.borderWidth || "var(--border-width-1)"} solid
         ${({ $theme }) => $theme?.cssVariables?.borderColor || "var(--border-color-default)"};
  border-radius: calc(${({ $size }) => getCssVariable("cell-height", $size)} / 2);
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  text-align: center;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

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

  /* Apply status styles */
  ${({ $status, $theme }) => getStatusStyles($status, $theme)}

  /* Apply state styles */
  ${({ $state, $theme }) => getStateStyles($state, $theme)}
`

/**
 * Text content wrapper
 */
export const ButtonText = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`