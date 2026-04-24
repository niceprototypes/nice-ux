/**
 * Checks if a value is a responsive breakpoint object (has small, medium, or large keys)
 *
 * @function isResponsiveObject
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is an object with breakpoint keys
 *
 * @example
 * isResponsiveObject({ small: "column", medium: "row" }) // true
 * isResponsiveObject({ all: "base" }) // false
 * isResponsiveObject("row") // false
 * isResponsiveObject(null) // false
 */
export declare const isResponsiveObject: (value: unknown) => value is {
    small?: unknown;
    medium?: unknown;
    large?: unknown;
};
//# sourceMappingURL=isResponsiveObject.d.ts.map