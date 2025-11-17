/**
 * Utility Functions and Styles
 *
 * Common utilities and CSS snippets used across the Typography component.
 *
 * @module utils
 */

import { css } from "styled-components"

/**
 * Anti-aliasing styles for smoother text rendering
 *
 * Applies font smoothing optimizations across different browsers:
 * - `-webkit-font-smoothing: antialiased` - Makes text smoother on WebKit browsers (Safari, Chrome)
 * - `-moz-osx-font-smoothing: grayscale` - Enables grayscale antialiasing on Firefox for macOS
 * - `text-rendering: optimizeLegibility` - Enables kerning and ligatures for better typography
 *
 * @remarks
 * Use the `antialiased` prop on Typography component to enable these styles.
 * Best for light text on dark backgrounds.
 */
export const styleAntialiasing = css`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
`