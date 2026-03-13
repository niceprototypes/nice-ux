import { FlexGapSizeType, FlexSpacingDefinitionType, FlexSpacingShorthandType } from "../components/Flex/types"

/**
 * Parses a CSS-like spacing shorthand string into a SpacingDefinition object.
 *
 * Follows CSS padding/margin shorthand rules:
 * - 1 value: "small" → { top: "small", right: "small", bottom: "small", left: "small" }
 * - 2 values: "small base" → { top: "small", right: "base", bottom: "small", left: "base" }
 * - 3 values: "small base large" → { top: "small", right: "base", bottom: "large", left: "base" }
 * - 4 values: "small base large smaller" → { top: "small", right: "base", bottom: "large", left: "smaller" }
 *
 * @param shorthand - The spacing shorthand string
 * @returns SpacingDefinition with top, right, bottom, left values
 */
export const parseSpacingShorthand = (shorthand: FlexSpacingShorthandType): FlexSpacingDefinitionType => {
  const values = shorthand.split(" ") as FlexGapSizeType[]

  switch (values.length) {
    case 1:
      // All sides same
      return {
        top: values[0],
        right: values[0],
        bottom: values[0],
        left: values[0],
      }
    case 2:
      // top/bottom, left/right
      return {
        top: values[0],
        right: values[1],
        bottom: values[0],
        left: values[1],
      }
    case 3:
      // top, left/right, bottom
      return {
        top: values[0],
        right: values[1],
        bottom: values[2],
        left: values[1],
      }
    case 4:
      // top, right, bottom, left
      return {
        top: values[0],
        right: values[1],
        bottom: values[2],
        left: values[3],
      }
    default:
      // Fallback: treat as single value
      return {
        top: values[0],
        right: values[0],
        bottom: values[0],
        left: values[0],
      }
  }
}
