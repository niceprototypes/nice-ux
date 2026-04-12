import { getComponentToken, type TokenResult } from "nice-react-styles"

/**
 * Get an image component token.
 *
 * Flat lookup — for tokens at depth 1 (e.g., "borderRadius", "objectFit"):
 * ```ts
 * getImageToken("borderRadius", "base")
 * ```
 *
 * Path lookup — for nested tokens:
 * ```ts
 * getImageToken(["group", "variant", "parameter"])
 * ```
 */
export function getImageToken(nameOrPath: string | string[], variantOrMode?: string, mode?: string): TokenResult {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("image", nameOrPath, variantOrMode)
  }
  return getComponentToken("image", nameOrPath, variantOrMode, mode)
}