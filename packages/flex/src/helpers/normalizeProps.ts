import { FlexProps, GapSize, SpacingDefinition } from "../types"

/**
 * List of props that accept breakpoint values
 * These props can be specified as either simple values or breakpoint objects.
 * Note: spacing is handled separately due to its more complex structure
 */
const BREAKPOINT_PROPS = ["gap", "direction", "grow", "wrap", "alignItems", "justifyContent"] as const

/**
 * normalizeProps Helper
 *
 * Transforms component props to ensure consistent structure for styling logic.
 * Converts simple prop values into breakpoint objects to simplify downstream processing.
 *
 * @function normalizeProps
 * @param {FlexProps} props - The raw props passed to the Flex component
 * @returns {FlexProps} Normalized props with consistent breakpoint structure
 *
 * @description
 * This helper performs two main transformations:
 *
 * 1. **Simple Value Normalization**: Converts simple prop values into breakpoint objects
 *    - Example: `gap={2}` becomes `gap={{ sm: 2 }}`
 *    - Example: `direction="row"` becomes `direction={{ sm: "row" }}`
 *    - This ensures the styling logic only needs to handle one format
 *
 * 2. **Spacing Normalization**: Handles the special case of the spacing prop
 *    - Simple number: `spacing={3}` → `spacing={{ sm: { all: 3 } }}`
 *    - SpacingDefinition: `spacing={{ all: 3 }}` → `spacing={{ sm: { all: 3 } }}`
 *    - Already normalized: `spacing={{ sm: {...} }}` → unchanged
 *
 * Why this normalization is important:
 * - **Consistency**: The styling logic (styleFlex) only needs to handle one format
 * - **Simplicity**: Reduces complexity in the styled-components implementation
 * - **Flexibility**: Users can provide props in the most convenient format
 * - **Type Safety**: Maintains TypeScript type safety throughout the transformation
 *
 * @example
 * // Input: Simple values
 * normalizeProps({
 *   gap: 2,
 *   direction: "row",
 *   children: <div />
 * })
 * // Output: Breakpoint objects
 * {
 *   gap: { sm: 2 },
 *   direction: { sm: "row" },
 *   children: <div />
 * }
 *
 * @example
 * // Input: Mixed simple and responsive values
 * normalizeProps({
 *   gap: 2,
 *   direction: { sm: "column", md: "row" },
 *   spacing: { all: 3 },
 *   children: <div />
 * })
 * // Output: All values normalized to breakpoint format
 * {
 *   gap: { sm: 2 },
 *   direction: { sm: "column", md: "row" },
 *   spacing: { sm: { all: 3 } },
 *   children: <div />
 * }
 */
export const normalizeProps = (props: FlexProps): FlexProps => {
  // Create a shallow copy to avoid mutating the original props
  const normalizedProps = { ...props }

  // Process standard breakpoint props (gap, direction, grow)
  // These props can be either simple values or breakpoint objects
  BREAKPOINT_PROPS.forEach((propName) => {
    const value = props[propName as keyof FlexProps]
    if (value !== undefined) {
      if (typeof value !== "object") {
        // Special handling for gap prop: only normalize numbers, not strings
        // TODO: Remove this conditional logic once migration to string-only gap values is complete
        if (propName === "gap") {
          if (typeof value === "number") {
            // Convert simple number to breakpoint object with sm value
            ;(normalizedProps as any)[propName] = { sm: value }
          }
          // If gap is a string, leave as-is (no normalization)
        } else {
          // Convert simple value to breakpoint object with sm value
          // The semicolon at the start prevents ASI issues with the bracket notation
          ;(normalizedProps as any)[propName] = { sm: value }
        }
      } else if (propName === "gap") {
        // Handle breakpoint objects for gap: normalize number values, leave strings as-is
        // TODO: Remove this normalization logic once migration to string-only gap values is complete
        const breakpointObj = value as Record<string, any>
        const normalizedBreakpoints: Record<string, any> = {}
        let hasChanges = false

        Object.keys(breakpointObj).forEach((breakpoint) => {
          const bpValue = breakpointObj[breakpoint]
          if (typeof bpValue === "number") {
            // Normalize number to string or keep as number based on your normalization logic
            normalizedBreakpoints[breakpoint] = bpValue
          } else {
            // Keep string values as-is
            normalizedBreakpoints[breakpoint] = bpValue
            hasChanges = true
          }
        })

        // Only update if we found string values (to preserve reference equality when possible)
        if (hasChanges || Object.keys(normalizedBreakpoints).length > 0) {
          ;(normalizedProps as any)[propName] = normalizedBreakpoints
        }
      }
    }
  })

  // Special handling for the spacing prop due to its nested structure
  // TODO: Remove number normalization logic once migration to string-only spacing values is complete
  if (props.spacing !== undefined) {
    if (typeof props.spacing === "number") {
      // Simple number becomes a SpacingDefinition at sm breakpoint
      // spacing={3} -> spacing={{ sm: { all: 3 } }}
      normalizedProps.spacing = { sm: { all: props.spacing as GapSize } }
    } else if (typeof props.spacing === "string") {
      // String values are left as-is (no normalization)
      // This allows direct CSS values like "10px" or "1rem"
    } else if (props.spacing !== null && !("sm" in props.spacing || "md" in props.spacing || "lg" in props.spacing)) {
      // SpacingDefinition object becomes breakpoint-wrapped
      // Check if values in SpacingDefinition are numbers - if so, normalize; if strings, wrap as-is
      const spacingDef = props.spacing as SpacingDefinition
      const hasNumbers = Object.values(spacingDef).some(v => typeof v === "number")

      if (hasNumbers) {
        // spacing={{ all: 3 }} -> spacing={{ sm: { all: 3 } }}
        normalizedProps.spacing = { sm: spacingDef }
      }
      // If all values are strings, leave as-is (no normalization needed)
    } else {
      // Has breakpoint keys (sm/md/lg) - check if individual spacing values need normalization
      // This handles cases like: spacing={{ sm: { all: 2 }, md: { all: "16px" } }}
      const breakpointSpacing = props.spacing as Record<string, SpacingDefinition>
      const normalizedSpacing: Record<string, SpacingDefinition> = {}

      Object.keys(breakpointSpacing).forEach((breakpoint) => {
        const spacingDef = breakpointSpacing[breakpoint]
        // Always include the spacing definition, whether it has numbers or strings
        normalizedSpacing[breakpoint] = spacingDef
      })

      normalizedProps.spacing = normalizedSpacing
    }
  }

  return normalizedProps
}