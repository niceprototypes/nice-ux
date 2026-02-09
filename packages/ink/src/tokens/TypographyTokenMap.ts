/**
 * Typography Token Map
 *
 * Component-specific design tokens for the Typography component.
 * These tokens provide component-specific styling options that can be
 * overridden via CSS custom properties following the pattern:
 * --typography--{token}--{variant}
 */

import { createTokens, mapCoreToken, type ComponentTokens } from "nice-react-styles"

export const TypographyTokenMap = {
  fontSize: mapCoreToken("fontSize"),
  fontFamily: mapCoreToken("fontFamily"),
  fontWeight: mapCoreToken("fontWeight"),
  lineHeight: mapCoreToken("lineHeight"),
  letterSpacing: mapCoreToken("letterSpacing"),
  color: mapCoreToken("foregroundColor"),
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