import { css } from "styled-components"
import { ButtonProps, ButtonTheme } from "../types"
import { mergeTheme } from "../utils"

/**
 * Generates CSS styles for different button status variants.
 *
 * This function handles the visual styling for various button variants that define
 * the button's role and prominence in the UI hierarchy. Each status represents
 * a different semantic meaning and visual weight, from primary call-to-action
 * buttons to subtle muted buttons.
 *
 * Status variants include:
 * - primary: High emphasis, inverse colors for call-to-action
 * - secondary: Medium emphasis, standard colors with borders
 * - muted: Low emphasis, minimal styling for subtle actions
 * - highlighted: Special emphasis with highlight colors
 * - default: Standard button appearance
 *
 * @param status - The button variant/status (primary, secondary, muted, highlighted, default)
 * @param theme - Optional theme configuration to override default styling
 * @returns CSS template literal with status-specific styles
 *
 * @example
 * ```tsx
 * const MyButton = styled.button`
 *   ${({ status, theme }) => getStatusStyles(status, theme)}
 * `
 * ```
 */
const getStatusStyles = (status?: ButtonProps["status"], theme?: ButtonTheme) => {
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

export default getStatusStyles