import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--ink--…)` reference. */
export function getInkToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("ink", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentToken("ink", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the bare CSS variable name (no `var(...)` wrapper). */
export function getInkTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("ink", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenKey("ink", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the raw underlying value. */
export function getInkTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("ink", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenValue("ink", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}
