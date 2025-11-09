import { TypographyAsType } from "../types"

/**
 * Determines the effective line height to use
 *
 * Returns the provided line height if specified, otherwise returns
 * the default line height for the element type:
 * - Headings (h1-h4): `condensed`
 * - Body text (p, span): `default`
 *
 * @param lineHeight - User-provided line height
 * @param as - The HTML element type
 * @returns Effective line height value
 */
const getEffectiveLineHeight = (
  lineHeight: "default" | "condensed" | undefined,
  as: TypographyAsType
): "default" | "condensed" => {
  if (lineHeight) return lineHeight

  return as === "h1" || as === "h2" || as === "h3" || as === "h4" ? "condensed" : "default"
}

export default getEffectiveLineHeight
