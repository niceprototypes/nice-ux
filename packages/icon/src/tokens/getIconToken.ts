import { getComponentToken, type TokenResult } from "nice-react-styles"

/**
 * Get an icon component token.
 *
 * Flat lookup — for tokens at depth 1 (e.g., "size", "color"):
 * ```ts
 * getIconToken("size", "base")
 * ```
 *
 * Path lookup — for nested tokens:
 * ```ts
 * getIconToken(["group", "variant", "parameter"])
 * ```
 */
export function getIconToken(nameOrPath: string | string[], variantOrMode?: string, mode?: string): TokenResult {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("icon", nameOrPath, variantOrMode)
  }
  return getComponentToken("icon", nameOrPath, variantOrMode, mode)
}
