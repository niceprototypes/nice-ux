import { type BreakpointName } from "nice-react-styles";
/**
 * Extracts the value for a specific breakpoint from a normalized prop.
 *
 * After `normalizeProps`, every per-breakpoint prop is wrapped into a phone-
 * keyed object (`{ phone: value }`). Tablet/laptop/desktop overrides are
 * folded in by the `withBreakpoints` HOC before `styleFlex` runs, so this
 * function simply returns the per-breakpoint value or undefined.
 *
 * @example
 * getBreakpointValue({ phone: "row" }, "phone")   // → "row"
 * getBreakpointValue({ phone: "row" }, "tablet")  // → undefined
 * getBreakpointValue({ phone: "column", tablet: "row" }, "tablet") // → "row"
 */
export declare const getBreakpointValue: <T>(value: {
    phone?: T;
    tablet?: T;
    laptop?: T;
    desktop?: T;
} | undefined, breakpoint: BreakpointName) => T | undefined;
//# sourceMappingURL=getBreakpointValue.d.ts.map