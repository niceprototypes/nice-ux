/**
 * Typography Token Map
 *
 * Component-specific design tokens for the Typography component.
 * These tokens provide component-specific styling options that can be
 * overridden via CSS custom properties following the pattern:
 * --typography--{token}--{variant}
 */

import { createTokens, getToken, type ComponentTokens } from "nice-react-styles"

export const TypographyTokenMap = {
  fontSize: {
    smaller: getToken("fontSize", "smaller").var,
    small: getToken("fontSize", "small").var,
    base: getToken("fontSize", "base").var,
    large: getToken("fontSize", "large").var,
    larger: getToken("fontSize", "larger").var,
  },
  fontFamily: {
    base: getToken("fontFamily", "base").var,
    code: getToken("fontFamily", "code").var,
    heading: getToken("fontFamily", "heading").var,
  },
  fontWeight: {
    light: getToken("fontWeight", "light").var,
    base: getToken("fontWeight", "base").var,
    medium: getToken("fontWeight", "medium").var,
    semibold: getToken("fontWeight", "semibold").var,
    bold: getToken("fontWeight", "bold").var,
    extrabold: getToken("fontWeight", "extrabold").var,
    black: getToken("fontWeight", "black").var,
  },
  lineHeight: {
    condensed: getToken("lineHeight", "condensed").var,
    base: getToken("lineHeight", "base").var,
    expanded: getToken("lineHeight", "expanded").var,
  },
  letterSpacing: {
    tight: getToken("letterSpacing", "tight").var,
    base: getToken("letterSpacing", "base").var,
    wide: getToken("letterSpacing", "wide").var,
    wider: getToken("letterSpacing", "wider").var,
  },
  color: {
    lighter: getToken("foregroundColor", "lighter").var,
    light: getToken("foregroundColor", "light").var,
    medium: getToken("foregroundColor", "medium").var,
    heavy: getToken("foregroundColor", "heavy").var,
    base: getToken("foregroundColor", "base").var,
    disabled: getToken("foregroundColor", "disabled").var,
    link: getToken("foregroundColor", "link").var,
    success: getToken("foregroundColor", "success").var,
    warning: getToken("foregroundColor", "warning").var,
    error: getToken("foregroundColor", "error").var,
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