import { type BreakpointName } from "nice-react-styles";
/**
 * Extracts the value for a specific breakpoint from a prop that can be either
 * a simple value or a responsive object
 *
 * @function getBreakpointValue
 * @param {T | { phone?: T; tablet?: T; laptop?: T; desktop?: T } | undefined} value - The prop value
 * @param {BreakpointName} breakpoint - The target breakpoint
 * @returns {T | undefined} The value for the specified breakpoint
 *
 * @example
 * getBreakpointValue("row", BREAKPOINT_PHONE) // returns "row"
 * getBreakpointValue("row", BREAKPOINT_TABLET) // returns undefined (simple values only apply at phone)
 * getBreakpointValue({ phone: "column", tablet: "row" }, BREAKPOINT_TABLET) // returns "row"
 */
export declare const getBreakpointValue: <T>(value: T | {
    phone?: T;
    tablet?: T;
    laptop?: T;
    desktop?: T;
} | undefined, breakpoint: BreakpointName) => T | undefined;
//# sourceMappingURL=getBreakpointValue.d.ts.map