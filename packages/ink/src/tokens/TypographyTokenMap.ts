/**
 * Typography Token Map
 *
 * Component-specific design tokens for the Typography component.
 * These tokens provide component-specific styling options that can be
 * overridden via CSS custom properties following the pattern:
 * --typography--{token}--{variant}
 */

import { createTokens, type ComponentTokens } from "nice-react-styles"

export const TypographyTokenMap = {
  /**
   * Letter spacing (tracking) variants
   * Controls the space between characters
   */
  letterSpacing: {
    tight: "-0.025em",
    base: "0",
    wide: "0.025em",
    wider: "0.05em",
  },
  /**
   * Maximum width for optimal readability
   * Based on the "45-75 characters per line" rule
   */
  maxWidth: {
    prose: "65ch",
    wide: "80ch",
    full: "none",
  },
} as const

export const typographyTokens: ComponentTokens<typeof TypographyTokenMap> = createTokens(TypographyTokenMap, "typography")