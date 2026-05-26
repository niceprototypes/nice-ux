import { SpacingDefinition, FlexSpacingType } from "../components/Flex/Flex.types"
import { BREAKPOINT_PHONE, type BreakpointName } from "nice-react-styles"
import { parseSpacingShorthand } from "../utilities/parseSpacingShorthand"

/**
 * Resolves the SpacingDefinition for a specific breakpoint from a shorthand
 * string prop.
 *
 * Spacing is consumed as a single scalar shorthand string (e.g. `"small"`,
 * `"small base"`). The shorthand is parsed and applied at the phone
 * breakpoint; tablet/laptop/desktop overrides flow in through the
 * `breakpoints` prop, which the `withBreakpoints` HOC folds into each
 * breakpoint's props before this function runs.
 *
 * @example
 * getSpacingValue("small", "phone")
 * // → { top: "small", right: "small", bottom: "small", left: "small" }
 *
 * @example
 * getSpacingValue("small base", "phone")
 * // → { top: "small", right: "base", bottom: "small", left: "base" }
 *
 * @example
 * getSpacingValue("small", "tablet")
 * // → undefined (no spacing rule emitted at non-phone breakpoints unless
 * //   the HOC merged a tablet override from the `breakpoints` prop)
 */
export const getSpacingValue = (
  spacing: FlexSpacingType | undefined,
  breakpoint: BreakpointName
): SpacingDefinition | undefined => {
  if (spacing === undefined) return undefined
  if (breakpoint !== BREAKPOINT_PHONE) return undefined
  return parseSpacingShorthand(spacing)
}
