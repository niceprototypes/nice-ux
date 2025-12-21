import { SpacingDefinition } from "../types"
import { getGapSize } from "./getGapSize"

/**
 * Generates CSS spacing properties (padding or margin) from a SpacingDefinition
 *
 * @function styleSpacing
 * @param {"padding" | "margin"} type - Whether to generate padding or margin properties
 * @param {SpacingDefinition} [def] - Spacing configuration object
 * @returns {string} CSS property declarations separated by newlines
 *
 * @description
 * This function applies spacing values with a priority system:
 * 1. Individual sides (top, right, bottom, left) - highest priority
 * 2. Axis shortcuts (horizontal→left+right, vertical→top+bottom)
 * 3. All sides (all) - lowest priority
 *
 * The function only generates CSS for sides that have defined values,
 * allowing for partial spacing definitions.
 *
 * @example
 * // Simple all-sides spacing
 * styleSpacing("padding", { all: 2 })
 * // Returns: "padding-top: var(--gap-size-2);\npadding-right: var(--gap-size-2);\n..."
 *
 * @example
 * // Mixed priority spacing
 * styleSpacing("margin", { all: 1, horizontal: 2, top: 3 })
 * // Returns: "margin-top: var(--gap-size-3);\nmargin-right: var(--gap-size-2);\n..."
 * // (top=3 overrides all=1, horizontal=2 overrides all=1 for left/right)
 */
export const styleSpacing = (type: "padding" | "margin", def?: SpacingDefinition): string => {
  if (!def) return ""
  const prefix = type

  // Apply priority system: individual > axis shortcuts > all
  const styles = {
    top: def.top ?? def.vertical ?? def.all,
    right: def.right ?? def.horizontal ?? def.all,
    bottom: def.bottom ?? def.vertical ?? def.all,
    left: def.left ?? def.horizontal ?? def.all,
  }

  const parts: string[] = []

  // Generate CSS declarations only for defined values
  if (styles.top !== undefined) {
    parts.push(`${prefix}-top: ${getGapSize(styles.top)};`)
  }
  if (styles.right !== undefined) {
    parts.push(`${prefix}-right: ${getGapSize(styles.right)};`)
  }
  if (styles.bottom !== undefined) {
    parts.push(`${prefix}-bottom: ${getGapSize(styles.bottom)};`)
  }
  if (styles.left !== undefined) {
    parts.push(`${prefix}-left: ${getGapSize(styles.left)};`)
  }

  return parts.join("\n")
}