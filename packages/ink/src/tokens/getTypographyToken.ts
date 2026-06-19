import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--typography--…)` reference. */
export function getTypographyToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("typography", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentToken("typography", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the bare CSS variable name (no `var(...)` wrapper). */
export function getTypographyTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("typography", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenKey("typography", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the raw underlying value. */
export function getTypographyTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("typography", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenValue("typography", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}
