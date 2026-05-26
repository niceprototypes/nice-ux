import { FlexProps } from "../components/Flex/Flex.types";
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
export declare const normalizeProps: (props: FlexProps) => FlexProps;
//# sourceMappingURL=normalizeProps.d.ts.map