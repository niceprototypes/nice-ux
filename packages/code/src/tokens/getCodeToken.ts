import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/**
 * Get a code component token.
 *
 * Flat lookup — for tokens at depth 1 (e.g. "backgroundColor", "borderColor"):
 * ```ts
 * getCodeToken("fontSize", "small")
 * ```
 *
 * Path lookup — for nested tokens:
 * ```ts
 * getCodeToken(["group", "variant"])
 * ```
 *
 * Returns the `var(--np--code--…)` reference.
 */
export function getCodeToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("code", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentToken("code", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the bare CSS variable name (no `var(...)` wrapper). */
export function getCodeTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("code", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenKey("code", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the raw underlying value. */
export function getCodeTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("code", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenValue("code", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}
