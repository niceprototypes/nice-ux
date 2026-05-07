import { SpacingDefinition, Spacing } from "../components/Flex/Flex.types";
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
 * - Shorthand string: "small", "small base", etc. - parsed and applied to "phone" breakpoint
 * - Responsive object: { phone?: string | null, tablet?: string | null, laptop?: string | null, desktop?: string | null }
 *
 * Returns null when spacing is explicitly disabled at a breakpoint.
 * Returns undefined when no spacing is defined for the breakpoint.
 *
 * @example
 * getSpacingValue("small", BREAKPOINT_PHONE) // returns { top: "small", right: "small", bottom: "small", left: "small" }
 * getSpacingValue("small base", BREAKPOINT_PHONE) // returns { top: "small", right: "base", bottom: "small", left: "base" }
 * getSpacingValue("small", BREAKPOINT_TABLET) // returns undefined (shorthand only applies to phone)
 * getSpacingValue({ phone: "base", tablet: null, laptop: "small" }, BREAKPOINT_TABLET) // returns null
 * getSpacingValue({ phone: "base", laptop: "small large" }, BREAKPOINT_LAPTOP) // returns { top: "small", right: "large", bottom: "small", left: "large" }
 */
export declare const getSpacingValue: (spacing: Spacing | undefined, breakpoint: BreakpointName) => SpacingDefinition | null | undefined;
//# sourceMappingURL=getSpacingValue.d.ts.map