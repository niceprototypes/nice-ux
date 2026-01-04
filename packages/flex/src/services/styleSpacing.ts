import { SpacingDefinition } from "../types"
import { getGapSize } from "./getGapSize"

/**
 * Generates CSS spacing properties (padding or margin) from a SpacingDefinition
 *
 * @function styleSpacing
 * @param {"padding" | "margin"} mode - Whether to generate padding or margin properties
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
 * // Returns: "padding-top: var(--gap-small);\npadding-right: var(--gap-base);\n..."
 *
 * @example
 * styleSpacing("margin", { top: "large", right: "large", bottom: "large", left: "large" })
 * // Returns: "margin-top: var(--gap-large);\nmargin-right: var(--gap-large);\n..."
 */
export const styleSpacing = (mode: "padding" | "margin", def?: SpacingDefinition | null): string => {
  if (!def) return ""

  const parts: string[] = []

  if (def.top !== undefined) {
    parts.push(`${mode}-top: ${getGapSize(def.top)};`)
  }
  if (def.right !== undefined) {
    parts.push(`${mode}-right: ${getGapSize(def.right)};`)
  }
  if (def.bottom !== undefined) {
    parts.push(`${mode}-bottom: ${getGapSize(def.bottom)};`)
  }
  if (def.left !== undefined) {
    parts.push(`${mode}-left: ${getGapSize(def.left)};`)
  }

  return parts.join("\n")
}