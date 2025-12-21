import { Breakpoint, SpacingDefinition, SpacingProp } from "../types"
import { isResponsiveObject } from "./isResponsiveObject"

/**
 * Extracts the SpacingDefinition for a specific breakpoint from a spacing prop
 *
 * @function getSpacingValue
 * @param {SpacingProp | undefined} spacing - The spacing prop value
 * @param {Breakpoint} breakpoint - The target breakpoint
 * @returns {SpacingDefinition | undefined} The spacing definition for the specified breakpoint
 *
 * @description
 * Handles the three possible shapes of the spacing prop:
 * - GapSize string: Not a SpacingDefinition, returns undefined
 * - SpacingDefinition object: Returns the object only for "sm" breakpoint
 * - Responsive object: Returns the SpacingDefinition for the specified breakpoint
 *
 * @example
 * getSpacingValue({ all: "base" }, "sm") // returns { all: "base" }
 * getSpacingValue({ all: "base" }, "md") // returns undefined
 * getSpacingValue({ sm: { all: "small" }, md: { all: "base" } }, "md") // returns { all: "base" }
 * getSpacingValue("base", "sm") // returns undefined (GapSize, not SpacingDefinition)
 */
export const getSpacingValue = (
  spacing: SpacingProp | undefined,
  breakpoint: Breakpoint
): SpacingDefinition | undefined => {
  if (spacing === undefined || spacing === null) return undefined
  if (typeof spacing !== "object") return undefined

  if (isResponsiveObject(spacing)) {
    return (spacing as { sm?: SpacingDefinition; md?: SpacingDefinition; lg?: SpacingDefinition })[breakpoint]
  }

  return breakpoint === "sm" ? (spacing as SpacingDefinition) : undefined
}