/**
 * Checks if a value is a responsive breakpoint object (has mobile, tablet, or desktop keys)
 *
 * @function isResponsiveObject
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is an object with breakpoint keys
 *
 * @example
 * isResponsiveObject({ mobile: "column", tablet: "row" }) // true
 * isResponsiveObject({ all: "base" }) // false
 * isResponsiveObject("row") // false
 * isResponsiveObject(null) // false
 */
export const isResponsiveObject = (value: unknown): value is { mobile?: unknown; tablet?: unknown; desktop?: unknown } =>
  typeof value === "object" &&
  value !== null &&
  ("mobile" in value || "tablet" in value || "desktop" in value)