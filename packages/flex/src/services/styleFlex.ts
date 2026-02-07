import { Breakpoint, FlexProps } from "../types"
import { getBreakpointValue } from "./getBreakpointValue"
import { getGapSize } from "./getGapSize"
import { getSpacingValue } from "./getSpacingValue"
import { styleSpacing } from "./styleSpacing"

/**
 * styleFlex Service
 *
 * Generates CSS styling for a specific breakpoint based on normalized Flex component props.
 * This is the core styling logic that transforms component props into CSS declarations.
 *
 * @function styleFlex
 * @param {Breakpoint} breakpoint - The breakpoint to generate styles for (sm/md/lg)
 * @param {FlexProps} props - The normalized Flex component props
 * @returns {string} CSS declarations separated by newlines
 *
 * @description
 * This service handles the generation of all CSS properties for the Flex component:
 *
 * **Base Display**: Sets `display: flex` only for the 'sm' breakpoint to establish
 * the flexbox context. Higher breakpoints inherit this display value.
 *
 * **Responsive Value Extraction**: For each CSS property, the function extracts
 * the appropriate value based on whether the prop is a simple value or breakpoint object:
 * - Object props: Use the value for the current breakpoint
 * - Simple props: Only use for 'sm' breakpoint (since props are normalized)
 *
 * **CSS Property Generation**: Generates standard CSS flexbox properties:
 * - `flex-direction`: Controls layout direction (row/column)
 * - `align-items`: Aligns items on the cross axis
 * - `justify-content`: Aligns items on the main axis
 * - `flex-grow` & `flex-basis`: Controls item growth behavior
 * - `flex-wrap`: Controls whether items wrap to new lines
 * - `gap`: Sets space between flex items using CSS Grid gap
 *
 * **Spacing Integration**: Uses the styleSpacing helper to generate padding
 * or margin properties with full side-by-side control.
 *
 * The function is designed to work with props that have been processed by
 * the normalizeProps service, ensuring consistent prop structure.
 *
 * @example
 * // Generate mobile breakpoint styles
 * const props = { direction: { mobile: "column" }, gap: { mobile: "small" } }
 * styleFlex("mobile", props)
 * // Returns: "display: flex;\nflex-direction: column;\ngap: var(--core--gap--small);"
 *
 * @example
 * // Generate tablet breakpoint styles
 * const props = {
 *   direction: { mobile: "column", tablet: "row" },
 *   gap: { mobile: "small", tablet: "base" },
 *   spacing: { tablet: "small base" }
 * }
 * styleFlex("tablet", props)
 * // Returns: "flex-direction: row;\ngap: var(--core--gap--base);\npadding-top: var(--core--gap--small);\npadding-right: var(--core--gap--base);..."
 */
export const styleFlex = (breakpoint: Breakpoint, props: FlexProps): string => {
  const styles: string[] = []

  // Extract values for this specific breakpoint using the helper function
  const direction = getBreakpointValue(props.direction, breakpoint)
  const gap = getBreakpointValue(props.gap, breakpoint)
  const grow = getBreakpointValue(props.grow, breakpoint)
  const alignItems = getBreakpointValue(props.alignItems, breakpoint)
  const justifyContent = getBreakpointValue(props.justifyContent, breakpoint)
  const wrap = getBreakpointValue(props.wrap, breakpoint)

  const spacing = getSpacingValue(props.spacing, breakpoint)

  // Base flex display - only set for mobile breakpoint
  // Higher breakpoints inherit the flex display value
  if (breakpoint === "mobile") {
    styles.push("display: flex;")
  }

  // Flex direction - controls main axis direction
  if (direction) {
    styles.push(`flex-direction: ${direction};`)
  }

  // Alignment properties
  if (alignItems) {
    styles.push(`align-items: ${alignItems};`)
  }

  if (justifyContent) {
    styles.push(`justify-content: ${justifyContent};`)
  }

  // Flex growth - when grow is set, also set flex-basis to 0 for proper behavior
  if (grow !== undefined) {
    styles.push(`flex-grow: ${grow};`)
    styles.push("flex-basis: 0;")
  }

  // Flex wrap - controls whether items wrap to new lines
  if (wrap) {
    styles.push(`flex-wrap: ${wrap};`)
  }

  // Gap between flex items using CSS Grid gap property
  if (gap !== undefined) {
    const gapValue = getGapSize(gap)
    if (gapValue) {
      styles.push(`gap: ${gapValue};`)
    }
  }

  // Spacing (padding/margin) using the spacing helper
  if (spacing) {
    const spacingStyles = styleSpacing(props.mode || "padding", spacing)
    if (spacingStyles) {
      styles.push(spacingStyles)
    }
  }

  return styles.join("\n")
}