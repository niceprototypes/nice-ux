import { SpacingDefinition, FlexSpacingType } from "../components/Flex/Flex.types";
/**
 * Resolves a SpacingDefinition from a shorthand string prop (e.g. `"small"`,
 * `"small base"`), or undefined when no spacing is set. Responsive overrides
 * flow in through the `breakpoints` prop, which the `withBreakpoints` HOC
 * resolves to flat props before this runs.
 *
 * @example
 * getSpacingValue("small")
 * // → { top: "small", right: "small", bottom: "small", left: "small" }
 *
 * @example
 * getSpacingValue("small base")
 * // → { top: "small", right: "base", bottom: "small", left: "base" }
 */
export declare const getSpacingValue: (spacing: FlexSpacingType | undefined) => SpacingDefinition | undefined;
//# sourceMappingURL=getSpacingValue.d.ts.map