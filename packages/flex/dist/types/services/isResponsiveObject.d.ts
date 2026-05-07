/**
 * Checks if a value is a responsive breakpoint object (has phone, tablet, laptop, or desktop keys)
 *
 * @function isResponsiveObject
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is an object with breakpoint keys
 *
 * @example
 * isResponsiveObject({ phone: "column", tablet: "row" }) // true
 * isResponsiveObject({ all: "base" }) // false
 * isResponsiveObject("row") // false
 * isResponsiveObject(null) // false
 */
export declare const isResponsiveObject: (value: unknown) => value is {
    phone?: unknown;
    tablet?: unknown;
    laptop?: unknown;
    desktop?: unknown;
};
//# sourceMappingURL=isResponsiveObject.d.ts.map