import { SpacingDefinition, Spacing } from "../components/Flex/types";
import { type BreakpointName } from "nice-react-styles";
/**
 * Extracts the SpacingDefinition for a specific breakpoint from a spacing prop
 *
 * @function getSpacingValue
 * @param {SpacingProp | undefined} spacing - The spacing prop value
 * @param {BreakpointName} breakpoint - The target breakpoint
 * @returns {SpacingDefinition | null | undefined} The spacing definition for the specified breakpoint
 *
 * @description
 * Handles two possible shapes of the spacing prop:
 * - Shorthand string: "small", "small base", etc. - parsed and applied to "small" breakpoint
 * - Responsive object: { small?: string | null, medium?: string | null, large?: string | null }
 *
 * Returns null when spacing is explicitly disabled at a breakpoint.
 * Returns undefined when no spacing is defined for the breakpoint.
 *
 * @example
 * getSpacingValue("small", BREAKPOINT_SMALL) // returns { top: "small", right: "small", bottom: "small", left: "small" }
 * getSpacingValue("small base", BREAKPOINT_SMALL) // returns { top: "small", right: "base", bottom: "small", left: "base" }
 * getSpacingValue("small", BREAKPOINT_MEDIUM) // returns undefined (shorthand only applies to small)
 * getSpacingValue({ small: "base", medium: null, large: "small" }, BREAKPOINT_MEDIUM) // returns null
 * getSpacingValue({ small: "base", large: "small large" }, BREAKPOINT_LARGE) // returns { top: "small", right: "large", bottom: "small", left: "large" }
 */
export declare const getSpacingValue: (spacing: Spacing | undefined, breakpoint: BreakpointName) => SpacingDefinition | null | undefined;
//# sourceMappingURL=getSpacingValue.d.ts.map