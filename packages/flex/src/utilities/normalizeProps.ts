import { FlexProps } from "../components/Flex/types"

/**
 * List of props that accept breakpoint values.
 * These props can be specified as either simple values or breakpoint objects.
 * Spacing is handled directly by getSpacingValue and doesn't need normalization.
 */
const breakpointProps = ["gap", "direction", "grow", "wrap", "alignItems", "justifyContent"] as const

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
 * Converts simple prop values into breakpoint objects:
 * - Example: `gap="base"` becomes `gap={{ mobile: "base" }}`
 * - Example: `direction="row"` becomes `direction={{ mobile: "row" }}`
 *
 * Note: The spacing prop is NOT normalized here. It's handled directly by
 * getSpacingValue which parses shorthand strings at render time.
 */
export const normalizeProps = (props: FlexProps): FlexProps => {
  const normalizedProps = { ...props }

  breakpointProps.forEach((propName) => {
    const value = props[propName as keyof FlexProps]
    if (value !== undefined && typeof value !== "object") {
      ;(normalizedProps as any)[propName] = { mobile: value }
    }
  })

  return normalizedProps
}
