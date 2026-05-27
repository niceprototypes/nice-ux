import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--lightbox--…)` reference. */
export function getLightboxToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("lightbox", nameOrPath, variantOrTheme)
  }
  return getComponentToken("lightbox", nameOrPath, variantOrTheme, theme)
}

/** Returns the bare CSS variable name. */
export function getLightboxTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("lightbox", nameOrPath, variantOrTheme)
  }
  return getComponentTokenKey("lightbox", nameOrPath, variantOrTheme, theme)
}

/** Returns the raw underlying value. */
export function getLightboxTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("lightbox", nameOrPath, variantOrTheme)
  }
  return getComponentTokenValue("lightbox", nameOrPath, variantOrTheme, theme)
}
