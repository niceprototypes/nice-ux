/**
 * Typography Component Tokens
 *
 * Component-specific design tokens for the Typography component.
 * Uses createTokens from nice-react-styles to generate CSS custom properties
 * following the pattern: --typography--{token}--{variant}
 *
 * @module tokens
 */

import { createTokens } from "nice-react-styles"

/**
 * Typography token definitions
 *
 * These tokens provide component-specific styling options that can be
 * overridden via CSS custom properties.
 */
export const TypographyTokenMap = {
  /**
   * Letter spacing (tracking) variants
   * Controls the space between characters
   */
  letterSpacing: {
    name: "letter-spacing",
    items: {
      tight: "-0.025em",
      base: "0",
      wide: "0.025em",
      wider: "0.05em",
    },
  },
  /**
   * Maximum width for optimal readability
   * Based on the "45-75 characters per line" rule
   */
  maxWidth: {
    name: "max-width",
    items: {
      prose: "65ch",
      wide: "80ch",
      full: "none",
    },
  },
} as const

export const {
  GlobalStyles: TypographyStyles,
  getComponentToken: getTypographyToken,
} = createTokens("typography", TypographyTokenMap)