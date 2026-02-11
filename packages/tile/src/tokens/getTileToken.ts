import { getComponentToken, type TokenResult } from "nice-styles"

/**
 * Get a tile component token.
 *
 * @param name - Token name (e.g., "backgroundColor", "foregroundColor")
 * @param variant - Variant within token (defaults to "base")
 * @param mode - Optional theme mode suffix
 * @returns TokenResult with key, var, and value properties
 */
export function getTileToken(name: string, variant?: string, mode?: string): TokenResult {
  return getComponentToken("tile", name, variant, mode)
}