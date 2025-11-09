import { TypographyAsType } from "../types"

/**
 * Gets the default font weight for a given element type
 *
 * @param as - The HTML element type
 * @returns Default font weight CSS variable or undefined
 *
 * @internal
 */
const getDefaultFontWeight = (as: TypographyAsType): string | undefined => {
  switch (as) {
    case "h1":
    case "h2":
    case "h3":
      return "var(--typography-weight-heading, 600)"
    default:
      return undefined
  }
}

/**
 * Determines the effective font weight to use
 *
 * Returns the provided weight if specified, otherwise returns
 * the default weight for the element type.
 *
 * @param weight - User-provided font weight
 * @param as - The HTML element type
 * @returns Effective font weight value or undefined
 */
const getEffectiveFontWeight = (
  weight: string | undefined,
  as: TypographyAsType
): string | undefined => {
  return weight !== undefined ? weight : getDefaultFontWeight(as)
}

export default getEffectiveFontWeight
