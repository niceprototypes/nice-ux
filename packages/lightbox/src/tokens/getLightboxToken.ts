import { getComponentToken, type TokenResult } from "nice-react-styles"

/**
 * Get a lightbox component token.
 *
 * Flat lookup — for tokens at depth 1 (e.g., "backgroundColor", "zIndex"):
 * ```ts
 * getLightboxToken("backgroundColor", "base")
 * ```
 *
 * Path lookup — for nested tokens:
 * ```ts
 * getLightboxToken(["group", "variant", "parameter"])
 * ```
 */
export function getLightboxToken(nameOrPath: string | string[], variantOrMode?: string, mode?: string): TokenResult {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("lightbox", nameOrPath, variantOrMode)
  }
  return getComponentToken("lightbox", nameOrPath, variantOrMode, mode)
}