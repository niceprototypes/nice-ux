import { getComponentToken, type TokenResult } from "nice-styles"

/**
 * Get a button component token.
 *
 * @param name - Token name (e.g., "size", "spacing", "statusPrimaryBase")
 * @param variant - Variant within token (defaults to "base")
 * @param mode - Optional theme mode suffix
 * @returns TokenResult with key, var, and value properties
 */
export function getButtonToken(name: string, variant?: string, mode?: string): TokenResult {
  return getComponentToken("button", name, variant, mode)
}