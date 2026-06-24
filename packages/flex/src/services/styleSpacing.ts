import { SpacingDefinition } from "../components/Flex/Flex.types"
import { getGapSize } from "./getGapSize"

/**
 * Generates CSS spacing properties (padding or margin) from a SpacingDefinition
 *
 * @function styleSpacing
 * @param {"padding" | "margin"} type - Whether to generate padding or margin properties
 * @param {SpacingDefinition} [def] - Spacing configuration object with top, right, bottom, left values
 * @returns {string} CSS property declarations separated by newlines
 *
 * @description
 * Generates CSS declarations for each side that has a defined value.
 * The SpacingDefinition is expected to already have individual side values
 * (parsed from shorthand by parseSpacingShorthand).
 *
 * @example
 * styleSpacing("padding", { top: "small", right: "base", bottom: "small", left: "base" })
 * // Returns: "padding-top: var(--core--gap--small);\npadding-right: var(--core--gap);\n..."
 *
 * @example
 * styleSpacing("margin", { top: "large", right: "large", bottom: "large", left: "large" })
 * // Returns: "margin-top: var(--core--gap--large);\nmargin-right: var(--core--gap--large);\n..."
 */
export const styleSpacing = (type: "padding" | "margin", def?: SpacingDefinition | null): string => {
  if (!def) return ""

  const parts: string[] = []

  if (def.top !== undefined) {
    parts.push(`${type}-top: ${getGapSize(def.top)};`)
  }
  if (def.right !== undefined) {
    parts.push(`${type}-right: ${getGapSize(def.right)};`)
  }
  if (def.bottom !== undefined) {
    parts.push(`${type}-bottom: ${getGapSize(def.bottom)};`)
  }
  if (def.left !== undefined) {
    parts.push(`${type}-left: ${getGapSize(def.left)};`)
  }

  return parts.join("\n")
}