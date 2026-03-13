import { Breakpoint } from "../components/Flex/types";
/**
 * Extracts the value for a specific breakpoint from a prop that can be either
 * a simple value or a responsive object
 *
 * @function getBreakpointValue
 * @param {T | { mobile?: T; tablet?: T; desktop?: T } | undefined} value - The prop value
 * @param {Breakpoint} breakpoint - The target breakpoint
 * @returns {T | undefined} The value for the specified breakpoint
 *
 * @example
 * getBreakpointValue("row", "mobile") // returns "row"
 * getBreakpointValue("row", "tablet") // returns undefined (simple values only apply at mobile)
 * getBreakpointValue({ mobile: "column", tablet: "row" }, "tablet") // returns "row"
 */
export declare const getBreakpointValue: <T>(value: T | {
    mobile?: T;
    tablet?: T;
    desktop?: T;
} | undefined, breakpoint: Breakpoint) => T | undefined;
//# sourceMappingURL=getBreakpointValue.d.ts.map