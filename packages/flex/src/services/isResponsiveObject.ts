/**
 * Checks if a value is a responsive breakpoint object (has sm, md, or lg keys)
 *
 * @function isResponsiveObject
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is an object with breakpoint keys
 *
 * @example
 * isResponsiveObject({ sm: "column", md: "row" }) // true
 * isResponsiveObject({ all: "base" }) // false
 * isResponsiveObject("row") // false
 * isResponsiveObject(null) // false
 */
export const isResponsiveObject = (value: unknown): value is { sm?: unknown; md?: unknown; lg?: unknown } =>
  typeof value === "object" &&
  value !== null &&
  ("sm" in value || "md" in value || "lg" in value)