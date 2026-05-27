import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--input--…)` reference. */
export function getInputToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("input", nameOrPath, variantOrTheme)
  }
  return getComponentToken("input", nameOrPath, variantOrTheme, theme)
}

/** Returns the bare CSS variable name. */
export function getInputTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("input", nameOrPath, variantOrTheme)
  }
  return getComponentTokenKey("input", nameOrPath, variantOrTheme, theme)
}

/** Returns the raw underlying value. */
export function getInputTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("input", nameOrPath, variantOrTheme)
  }
  return getComponentTokenValue("input", nameOrPath, variantOrTheme, theme)
}
