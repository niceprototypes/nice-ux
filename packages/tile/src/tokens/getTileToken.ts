import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--tile--…)` reference. */
export function getTileToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("tile", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentToken("tile", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the bare CSS variable name. */
export function getTileTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("tile", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenKey("tile", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the raw underlying value. */
export function getTileTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("tile", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenValue("tile", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}
