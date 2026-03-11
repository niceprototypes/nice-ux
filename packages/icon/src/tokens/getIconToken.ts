import { getComponentToken, type TokenResult } from "nice-react-styles"

/**
 * Get an icon component token.
 *
 * @param name - Token name (e.g., "size", "color", "strokeWidth")
 * @param variant - Variant within token (defaults to "base")
 * @param mode - Optional theme mode suffix
 * @returns TokenResult with key, var, and value properties
 */
export function getIconToken(name: string, variant?: string, mode?: string): TokenResult {
  return getComponentToken("icon", name, variant, mode)
}
