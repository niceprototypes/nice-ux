import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--lightbox--…)` reference. */
export function getLightboxToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("lightbox", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentToken("lightbox", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the bare CSS variable name. */
export function getLightboxTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("lightbox", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenKey("lightbox", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the raw underlying value. */
export function getLightboxTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("lightbox", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenValue("lightbox", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}
