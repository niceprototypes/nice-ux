import { getComponentToken, type TokenResult } from "nice-react-styles"

/**
 * Get a button component token.
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
 */
export function getButtonToken(nameOrPath: string | string[], variantOrMode?: string, mode?: string): TokenResult {
  if (Array.isArray(nameOrPath)) {
    // Path lookup: variantOrMode is mode
    return getComponentToken("button", nameOrPath, variantOrMode)
  }
  return getComponentToken("button", nameOrPath, variantOrMode, mode)
}