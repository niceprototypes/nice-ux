import { Breakpoint } from "../types"

/**
 * Extracts the value for a specific breakpoint from a prop that can be either
 * a simple value or a responsive object
 *
 * @function getBreakpointValue
 * @param {T | { sm?: T; md?: T; lg?: T } | undefined} value - The prop value
 * @param {Breakpoint} breakpoint - The target breakpoint
 * @returns {T | undefined} The value for the specified breakpoint
 *
 * @example
 * getBreakpointValue("row", "sm") // returns "row"
 * getBreakpointValue("row", "md") // returns undefined (simple values only apply at sm)
 * getBreakpointValue({ sm: "column", md: "row" }, "md") // returns "row"
 */
export const getBreakpointValue = <T>(
  value: T | { sm?: T; md?: T; lg?: T } | undefined,
  breakpoint: Breakpoint
): T | undefined => {
  if (value === undefined) return undefined
  if (typeof value === "object" && value !== null && ("sm" in value || "md" in value || "lg" in value)) {
    return (value as { sm?: T; md?: T; lg?: T })[breakpoint]
  }
  return breakpoint === "sm" ? (value as T) : undefined
}