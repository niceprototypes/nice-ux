import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--image--…)` reference. */
export function getImageToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("image", nameOrPath, variantOrTheme)
  }
  return getComponentToken("image", nameOrPath, variantOrTheme, theme)
}

/** Returns the bare CSS variable name. */
export function getImageTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("image", nameOrPath, variantOrTheme)
  }
  return getComponentTokenKey("image", nameOrPath, variantOrTheme, theme)
}

/** Returns the raw underlying value. */
export function getImageTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("image", nameOrPath, variantOrTheme)
  }
  return getComponentTokenValue("image", nameOrPath, variantOrTheme, theme)
}
