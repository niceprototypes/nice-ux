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
 * getButtonToken(["status", "primary", "base", "backgroundColor"])
 * ```
 *
 * Three sibling functions return the three accessor forms.
 */

/** Returns the `var(--np--button--…)` reference. */
export function getButtonToken(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("button", nameOrPath, variantOrMode)
  }
  return getComponentToken("button", nameOrPath, variantOrMode, mode)
}

/** Returns the bare CSS variable name (no `var(...)` wrapper). */
export function getButtonTokenKey(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("button", nameOrPath, variantOrMode)
  }
  return getComponentTokenKey("button", nameOrPath, variantOrMode, mode)
}

/** Returns the raw underlying value. */
export function getButtonTokenValue(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("button", nameOrPath, variantOrMode)
  }
  return getComponentTokenValue("button", nameOrPath, variantOrMode, mode)
}
