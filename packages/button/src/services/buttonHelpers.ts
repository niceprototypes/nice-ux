import { css } from "styled-components"
import { ButtonProps, ButtonTheme } from "../types"
import { mergeTheme } from "../utils"

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