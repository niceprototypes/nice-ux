import {
  BREAKPOINT_PHONE,
  BREAKPOINT_TABLET,
  BREAKPOINT_LAPTOP,
  BREAKPOINT_DESKTOP,
} from "nice-react-styles"

/**
 * Checks if a value is a responsive breakpoint object (has phone, tablet, laptop, or desktop keys)
 *
 * @function isResponsiveObject
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is an object with breakpoint keys
 *
 * @example
 * isResponsiveObject({ phone: "column", tablet: "row" }) // true
 * isResponsiveObject({ all: "base" }) // false
 * isResponsiveObject("row") // false
 * isResponsiveObject(null) // false
 */
export const isResponsiveObject = (
  value: unknown
): value is { phone?: unknown; tablet?: unknown; laptop?: unknown; desktop?: unknown } =>
  typeof value === "object" &&
  value !== null &&
  (BREAKPOINT_PHONE in value ||
    BREAKPOINT_TABLET in value ||
    BREAKPOINT_LAPTOP in value ||
    BREAKPOINT_DESKTOP in value)