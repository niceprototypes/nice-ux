import { css } from "styled-components"
import { ButtonProps, ButtonTheme } from "../types"
import { mergeTheme } from "../utils"

/**
 * Generates CSS styles for different button states.
 *
 * This function handles visual feedback for various interactive states that a button
 * can be in, such as disabled, success, error, warning, and active states.
 * Each state applies specific styling to communicate the button's current condition
 * to the user through visual cues like color changes and cursor modifications.
 *
 * @param state - The current state of the button (disabled, success, error, warning, active)
 * @param theme - Optional theme configuration to override default styling
 * @returns CSS template literal with state-specific styles
 *
 * @example
 * ```tsx
 * const MyButton = styled.button`
 *   ${({ state, theme }) => getStateStyles(state, theme)}
 * `
 * ```
 */
const getStateStyles = (state?: ButtonProps["state"], theme?: ButtonTheme) => {
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

export default getStateStyles