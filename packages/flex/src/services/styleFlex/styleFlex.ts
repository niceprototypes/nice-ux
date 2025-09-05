import { FlexProps, GapSize, SpacingDefinition } from "../../types"

/**
 * Supported breakpoint values for responsive styling
 * @type {"sm" | "md" | "lg"}
 */
type Breakpoint = "sm" | "md" | "lg"

/**
 * Converts a GapSize value to its corresponding CSS custom property
 * 
 * @function getGapSize
 * @param {GapSize} [size] - The gap size (0-6)
 * @returns {string | undefined} CSS custom property string or "0" for zero values
 * 
 * @example
 * getGapSize(0) // returns "0"
 * getGapSize(3) // returns "var(--gap-size-3)"
 * getGapSize(undefined) // returns undefined
 */
const getGapSize = (size?: GapSize) =>
  size !== undefined ? (size === 0 ? "0" : `var(--gap-size-${size})`) : undefined

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
const styleSpacing = (type: "padding" | "margin", def?: SpacingDefinition) => {
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
 * - `gap`: Sets space between flex items using CSS Grid gap
 * 
 * **Spacing Integration**: Uses the styleSpacing helper to generate padding
 * or margin properties with full side-by-side control.
 * 
 * The function is designed to work with props that have been processed by
 * the normalizeProps service, ensuring consistent prop structure.
 * 
 * @example
 * // Generate small breakpoint styles
 * const props = { direction: { sm: "column" }, gap: { sm: 2 } }
 * styleFlex("sm", props)
 * // Returns: "display: flex;\nflex-direction: column;\ngap: var(--gap-size-2);"
 * 
 * @example
 * // Generate medium breakpoint styles
 * const props = { 
 *   direction: { sm: "column", md: "row" }, 
 *   gap: { sm: 1, md: 3 },
 *   spacing: { md: { horizontal: 2 } }
 * }
 * styleFlex("md", props)
 * // Returns: "flex-direction: row;\ngap: var(--gap-size-3);\npadding-left: var(--gap-size-2);\npadding-right: var(--gap-size-2);"
 */
export const styleFlex = (breakpoint: Breakpoint, props: FlexProps): string => {
  const styles: string[] = []

  // Extract values for this specific breakpoint
  // For object props, get the breakpoint-specific value
  // For simple props, only apply at 'sm' breakpoint (since props are normalized)
  
  const direction =
    typeof props.direction === "object"
      ? props.direction[breakpoint]
      : breakpoint === "sm" && typeof props.direction === "string"
        ? props.direction
        : undefined

  const gap =
    typeof props.gap === "object"
      ? props.gap[breakpoint]
      : breakpoint === "sm" && typeof props.gap === "number"
        ? props.gap
        : undefined

  const grow =
    typeof props.grow === "object"
      ? props.grow[breakpoint]
      : breakpoint === "sm" && typeof props.grow === "number"
        ? props.grow
        : undefined

  const alignItems =
    typeof props.alignItems === "object"
      ? props.alignItems[breakpoint]
      : breakpoint === "sm" && typeof props.alignItems === "string"
        ? props.alignItems
        : undefined

  const justifyContent =
    typeof props.justifyContent === "object"
      ? props.justifyContent[breakpoint]
      : breakpoint === "sm" && typeof props.justifyContent === "string"
        ? props.justifyContent
        : undefined

  // Spacing requires checking for breakpoint structure
  const spacing =
    typeof props.spacing === "object" &&
    ("sm" in props.spacing || "md" in props.spacing || "lg" in props.spacing)
      ? (props.spacing as any)[breakpoint]
      : undefined

  // Base flex display - only set for small breakpoint
  // Higher breakpoints inherit the flex display value
  if (breakpoint === "sm") {
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

  // Gap between flex items using CSS Grid gap property
  if (gap !== undefined) {
    styles.push(`gap: var(--gap-size-${gap});`)
  }

  // Spacing (padding/margin) using the spacing helper
  if (spacing) {
    const spacingStyles = styleSpacing(props.type || "padding", spacing)
    if (spacingStyles) {
      styles.push(spacingStyles)
    }
  }

  return styles.join("\n")
}

export default styleFlex
