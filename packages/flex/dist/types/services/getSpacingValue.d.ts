import { Breakpoint, SpacingDefinition, Spacing } from "../components/Flex/types";
/**
 * Extracts the SpacingDefinition for a specific breakpoint from a spacing prop
 *
 * @function getSpacingValue
 * @param {SpacingProp | undefined} spacing - The spacing prop value
 * @param {Breakpoint} breakpoint - The target breakpoint
 * @returns {SpacingDefinition | null | undefined} The spacing definition for the specified breakpoint
 *
 * @description
 * Handles two possible shapes of the spacing prop:
 * - Shorthand string: "small", "small base", etc. - parsed and applied to "mobile" breakpoint
 * - Responsive object: { mobile?: string | null, tablet?: string | null, desktop?: string | null }
 *
 * Returns null when spacing is explicitly disabled at a breakpoint.
 * Returns undefined when no spacing is defined for the breakpoint.
 *
 * @example
 * getSpacingValue("small", "mobile") // returns { top: "small", right: "small", bottom: "small", left: "small" }
 * getSpacingValue("small base", "mobile") // returns { top: "small", right: "base", bottom: "small", left: "base" }
 * getSpacingValue("small", "tablet") // returns undefined (shorthand only applies to mobile)
 * getSpacingValue({ mobile: "base", tablet: null, desktop: "small" }, "tablet") // returns null
 * getSpacingValue({ mobile: "base", desktop: "small large" }, "desktop") // returns { top: "small", right: "large", bottom: "small", left: "large" }
 */
export declare const getSpacingValue: (spacing: Spacing | undefined, breakpoint: Breakpoint) => SpacingDefinition | null | undefined;
//# sourceMappingURL=getSpacingValue.d.ts.map