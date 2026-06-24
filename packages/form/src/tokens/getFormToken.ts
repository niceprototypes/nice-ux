import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--form--…)` reference. */
export function getFormToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("form", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentToken("form", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the bare CSS variable name. */
export function getFormTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("form", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenKey("form", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the raw underlying value. */
export function getFormTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("form", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenValue("form", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}
