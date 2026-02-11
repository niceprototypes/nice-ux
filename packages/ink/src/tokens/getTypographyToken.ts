import { getComponentToken, type TokenResult } from "nice-styles"

/**
 * Get a typography component token.
 *
 * @param name - Token name (e.g., "fontSize", "fontFamily", "color", "maxWidth")
 * @param variant - Variant within token (defaults to "base")
 * @param mode - Optional theme mode suffix
 * @returns TokenResult with key, var, and value properties
 */
export function getTypographyToken(name: string, variant?: string, mode?: string): TokenResult {
  return getComponentToken("typography", name, variant, mode)
}