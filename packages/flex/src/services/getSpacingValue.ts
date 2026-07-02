import { SpacingDefinition, FlexSpacingType } from "../components/Flex/Flex.types"
import { parseSpacingShorthand } from "../utilities/parseSpacingShorthand"

/**
 * Resolves a SpacingDefinition from a shorthand string prop (e.g. `"small"`,
 * `"small base"`), or undefined when no spacing is set. Responsive overrides
 * flow in through the `breakpoints` prop, which the `withBreakpoints` HOC
 * resolves to flat props before this runs.
 *
 * @example
 * getSpacingValue("small")
 * // → { top: "small", right: "small", bottom: "small", left: "small" }
 *
 * @example
 * getSpacingValue("small base")
 * // → { top: "small", right: "base", bottom: "small", left: "base" }
 */
export const getSpacingValue = (
  spacing: FlexSpacingType | undefined
): SpacingDefinition | undefined => {
  if (spacing === undefined) return undefined
  return parseSpacingShorthand(spacing)
}
