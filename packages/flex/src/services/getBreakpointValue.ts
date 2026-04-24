import { BREAKPOINT_SMALL, type BreakpointName } from "nice-react-styles"
import { isResponsiveObject } from "./isResponsiveObject"

/**
 * Extracts the value for a specific breakpoint from a prop that can be either
 * a simple value or a responsive object
 *
 * @function getBreakpointValue
 * @param {T | { small?: T; medium?: T; large?: T } | undefined} value - The prop value
 * @param {BreakpointName} breakpoint - The target breakpoint
 * @returns {T | undefined} The value for the specified breakpoint
 *
 * @example
 * getBreakpointValue("row", BREAKPOINT_SMALL) // returns "row"
 * getBreakpointValue("row", BREAKPOINT_MEDIUM) // returns undefined (simple values only apply at small)
 * getBreakpointValue({ small: "column", medium: "row" }, BREAKPOINT_MEDIUM) // returns "row"
 */
export const getBreakpointValue = <T>(
  value: T | { small?: T; medium?: T; large?: T } | undefined,
  breakpoint: BreakpointName
): T | undefined => {
  if (value === undefined) return undefined
  if (isResponsiveObject(value)) {
    return (value as { small?: T; medium?: T; large?: T })[breakpoint]
  }
  return breakpoint === BREAKPOINT_SMALL ? (value as T) : undefined
}