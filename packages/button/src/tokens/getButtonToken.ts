import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/**
 * Button component token getters.
 *
 * Flat lookup — for tokens at depth 1 (e.g., "size", "spacing"):
 * ```ts
 * getButtonToken("size", "base")
 * ```
 *
 * Path lookup — for nested tokens (e.g., the icon color layer):
 * ```ts
 * getButtonToken(["icon", "color", "base"])
 * ```
 *
 * Three sibling functions return the three accessor forms.
 */

/** Returns the `var(--np--button--…)` reference. */
export function getButtonToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("button", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentToken("button", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the bare CSS variable name (no `var(...)` wrapper). */
export function getButtonTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("button", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenKey("button", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the raw underlying value. */
export function getButtonTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("button", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenValue("button", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}