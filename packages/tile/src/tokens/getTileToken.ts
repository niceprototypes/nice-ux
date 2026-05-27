import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--tile--…)` reference. */
export function getTileToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("tile", nameOrPath, variantOrTheme)
  }
  return getComponentToken("tile", nameOrPath, variantOrTheme, theme)
}

/** Returns the bare CSS variable name. */
export function getTileTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("tile", nameOrPath, variantOrTheme)
  }
  return getComponentTokenKey("tile", nameOrPath, variantOrTheme, theme)
}

/** Returns the raw underlying value. */
export function getTileTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("tile", nameOrPath, variantOrTheme)
  }
  return getComponentTokenValue("tile", nameOrPath, variantOrTheme, theme)
}
