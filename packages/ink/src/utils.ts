import { css } from "styled-components"

/**
 * CSS styles for font antialiasing
 *
 * Applies cross-browser font smoothing for improved text rendering:
 * - WebKit/Blink: antialiased font smoothing
 * - Firefox: grayscale font smoothing
 * - All browsers: optimized text rendering for legibility
 */
export const styleAntialiasing = css`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
`