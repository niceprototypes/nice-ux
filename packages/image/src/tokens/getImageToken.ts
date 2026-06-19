import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--image--…)` reference. */
export function getImageToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("image", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentToken("image", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the bare CSS variable name. */
export function getImageTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("image", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenKey("image", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the raw underlying value. */
export function getImageTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("image", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenValue("image", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}
