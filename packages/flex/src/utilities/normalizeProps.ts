import { FlexProps } from "../components/Flex/Flex.types"
import { BREAKPOINT_PHONE } from "nice-react-styles"

/**
 * Per-breakpoint props that get wrapped into phone-keyed objects so the
 * downstream styling pipeline can iterate breakpoints uniformly. Spacing
 * is handled separately by `getSpacingValue`, which parses shorthand at
 * render time without going through this normalization step.
 */
const breakpointProps = ["gap", "direction", "grow", "shrink", "wrap", "fit", "alignItems", "justifyContent"] as const

/**
 * normalizeProps
 *
 * Wraps every scalar per-breakpoint prop into a `{ phone: value }` object
 * so `styleFlex` can call `getBreakpointValue(prop, breakpoint)` uniformly
 * regardless of which breakpoint it's emitting CSS for. Tablet/laptop/
 * desktop overrides flow through the `breakpoints` prop merged in by the
 * `withBreakpoints` HOC, not through this function.
 *
 * @example
 * normalizeProps({ gap: "base", direction: "row" })
 * // → { gap: { phone: "base" }, direction: { phone: "row" } }
 */
export const normalizeProps = (props: FlexProps): FlexProps => {
  const normalizedProps = { ...props }

  breakpointProps.forEach((propName) => {
    const value = props[propName as keyof FlexProps]
    if (value !== undefined) {
      ;(normalizedProps as any)[propName] = { [BREAKPOINT_PHONE]: value }
    }
  })

  return normalizedProps
}
