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
 * Path lookup — for nested tokens (e.g., status variants):
 * ```ts
 * getButtonToken(["status", "primary", "backgroundColor", "base"])
 * ```
 *
 * Three sibling functions return the three accessor forms.
 */

/** Returns the `var(--np--button--…)` reference. */
export function getButtonToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("button", nameOrPath, variantOrTheme)
  }
  return getComponentToken("button", nameOrPath, variantOrTheme, theme)
}

/** Returns the bare CSS variable name (no `var(...)` wrapper). */
export function getButtonTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("button", nameOrPath, variantOrTheme)
  }
  return getComponentTokenKey("button", nameOrPath, variantOrTheme, theme)
}

/** Returns the raw underlying value. */
export function getButtonTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("button", nameOrPath, variantOrTheme)
  }
  return getComponentTokenValue("button", nameOrPath, variantOrTheme, theme)
}