import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--typography--…)` reference. */
export function getTypographyToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("typography", nameOrPath, variantOrTheme)
  }
  return getComponentToken("typography", nameOrPath, variantOrTheme, theme)
}

/** Returns the bare CSS variable name (no `var(...)` wrapper). */
export function getTypographyTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("typography", nameOrPath, variantOrTheme)
  }
  return getComponentTokenKey("typography", nameOrPath, variantOrTheme, theme)
}

/** Returns the raw underlying value. */
export function getTypographyTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("typography", nameOrPath, variantOrTheme)
  }
  return getComponentTokenValue("typography", nameOrPath, variantOrTheme, theme)
}
