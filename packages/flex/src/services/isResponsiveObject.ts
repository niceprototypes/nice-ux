import {
  BREAKPOINT_SMALL,
  BREAKPOINT_MEDIUM,
  BREAKPOINT_LARGE,
} from "nice-react-styles"

/**
 * Checks if a value is a responsive breakpoint object (has small, medium, or large keys)
 *
 * @function isResponsiveObject
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is an object with breakpoint keys
 *
 * @example
 * isResponsiveObject({ small: "column", medium: "row" }) // true
 * isResponsiveObject({ all: "base" }) // false
 * isResponsiveObject("row") // false
 * isResponsiveObject(null) // false
 */
export const isResponsiveObject = (value: unknown): value is { small?: unknown; medium?: unknown; large?: unknown } =>
  typeof value === "object" &&
  value !== null &&
  (BREAKPOINT_SMALL in value || BREAKPOINT_MEDIUM in value || BREAKPOINT_LARGE in value)
