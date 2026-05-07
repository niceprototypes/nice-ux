import { SpacingDefinition, Spacing, FlexSpacingShorthandType, FlexSpacingResponsiveType } from "../components/Flex/Flex.types"
import { BREAKPOINT_PHONE, type BreakpointName } from "nice-react-styles"
import { parseSpacingShorthand } from "../utilities/parseSpacingShorthand"
import { isResponsiveObject } from "./isResponsiveObject"

/**
 * Extracts the SpacingDefinition for a specific breakpoint from a spacing prop
 *
 * @function getSpacingValue
 * @param {SpacingProp | undefined} spacing - The spacing prop value
 * @param {BreakpointName} breakpoint - The target breakpoint
 * @returns {SpacingDefinition | null | undefined} The spacing definition for the specified breakpoint
 *
 * @description
 * Handles two possible shapes of the spacing prop:
 * - Shorthand string: "small", "small base", etc. - parsed and applied to "phone" breakpoint
 * - Responsive object: { phone?: string | null, tablet?: string | null, laptop?: string | null, desktop?: string | null }
 *
 * Returns null when spacing is explicitly disabled at a breakpoint.
 * Returns undefined when no spacing is defined for the breakpoint.
 *
 * @example
 * getSpacingValue("small", BREAKPOINT_PHONE) // returns { top: "small", right: "small", bottom: "small", left: "small" }
 * getSpacingValue("small base", BREAKPOINT_PHONE) // returns { top: "small", right: "base", bottom: "small", left: "base" }
 * getSpacingValue("small", BREAKPOINT_TABLET) // returns undefined (shorthand only applies to phone)
 * getSpacingValue({ phone: "base", tablet: null, laptop: "small" }, BREAKPOINT_TABLET) // returns null
 * getSpacingValue({ phone: "base", laptop: "small large" }, BREAKPOINT_LAPTOP) // returns { top: "small", right: "large", bottom: "small", left: "large" }
 */
export const getSpacingValue = (
  spacing: Spacing | undefined,
  breakpoint: BreakpointName
): SpacingDefinition | null | undefined => {
  if (spacing === undefined) return undefined

  // Handle shorthand string (applies to phone only)
  if (typeof spacing === "string") {
    if (breakpoint === BREAKPOINT_PHONE) {
      return parseSpacingShorthand(spacing as FlexSpacingShorthandType)
    }
    return undefined
  }

  // Handle responsive object
  if (isResponsiveObject(spacing)) {
    const responsiveSpacing = spacing as FlexSpacingResponsiveType
    const value = responsiveSpacing[breakpoint]

    if (value === null) return null
    if (value === undefined) return undefined

    if (typeof value === "string") {
      return parseSpacingShorthand(value as FlexSpacingShorthandType)
    }

    return undefined
  }

  return undefined
}