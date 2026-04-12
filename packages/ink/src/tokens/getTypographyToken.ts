import { getComponentToken, type TokenResult } from "nice-react-styles"

/**
 * Get a typography component token.
 *
 * Flat lookup — for tokens at depth 1 (e.g., "fontSize", "fontFamily"):
 * ```ts
 * getTypographyToken("fontSize", "base")
 * ```
 *
 * Path lookup — for nested tokens:
 * ```ts
 * getTypographyToken(["group", "variant", "parameter"])
 * ```
 */
export function getTypographyToken(nameOrPath: string | string[], variantOrMode?: string, mode?: string): TokenResult {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("typography", nameOrPath, variantOrMode)
  }
  return getComponentToken("typography", nameOrPath, variantOrMode, mode)
}