/**
 * Checks if a value is a responsive breakpoint object (has mobile, tablet, or desktop keys)
 *
 * @function isResponsiveObject
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is an object with breakpoint keys
 *
 * @example
 * isResponsiveObject({ mobile: "column", tablet: "row" }) // true
 * isResponsiveObject({ all: "base" }) // false
 * isResponsiveObject("row") // false
 * isResponsiveObject(null) // false
 */
export declare const isResponsiveObject: (value: unknown) => value is {
    mobile?: unknown;
    tablet?: unknown;
    desktop?: unknown;
};
//# sourceMappingURL=isResponsiveObject.d.ts.map