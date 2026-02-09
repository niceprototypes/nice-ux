import { getConstant } from "nice-styles"
import { GapSize } from "../types"

/**
 * Converts a GapSize value to its corresponding CSS value using CSS variables
 *
 * @function getGapSize
 * @param {GapSize} [size] - The gap size token key ("smaller", "small", "base", "large", "larger") or custom string
 * @returns {string | undefined} CSS variable reference or the string value as-is
 *
 * @example
 * getGapSize("smaller") // returns "var(--np--gap--smaller)"
 * getGapSize("base") // returns "var(--np--gap--base)"
 * getGapSize("2rem") // returns "2rem"
 * getGapSize("var(--custom-spacing)") // returns "var(--custom-spacing)"
 * getGapSize(null) // returns undefined
 * getGapSize(undefined) // returns undefined
 */
export const getGapSize = (size?: GapSize): string | undefined => {
  if (size === undefined || size === null) return undefined

  // Handle "none" as zero spacing
  if (size === "none") {
    return "0"
  }

  // Check if it's a valid token key
  if (size === "smaller" || size === "small" || size === "base" || size === "large" || size === "larger") {
    return getConstant("gap", size).var
  }

  // Otherwise return the custom string as-is
  return size
}