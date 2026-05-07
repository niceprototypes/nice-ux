import { getComponentToken, type TokenResult } from "nice-react-styles"

/**
 * Get an input component token.
 *
 * Flat lookup — for tokens at depth 1 (e.g., "size", "spacing", "borderRadius"):
 * ```ts
 * getInputToken("size", "base")
 * ```
 *
 * Path lookup — for nested tokens (e.g., status variants):
 * ```ts
 * getInputToken(["status", "primary", "base", "backgroundColor"])
 * ```
 */
export function getInputToken(nameOrPath: string | string[], variantOrMode?: string, mode?: string): TokenResult {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("input", nameOrPath, variantOrMode)
  }
  return getComponentToken("input", nameOrPath, variantOrMode, mode)
}