import { FlexSpacingDefinitionType, FlexSpacingShorthandType } from "../types";
/**
 * Parses a CSS-like spacing shorthand string into a SpacingDefinition object.
 *
 * Follows CSS padding/margin shorthand rules:
 * - 1 value: "small" → { top: "small", right: "small", bottom: "small", left: "small" }
 * - 2 values: "small base" → { top: "small", right: "base", bottom: "small", left: "base" }
 * - 3 values: "small base large" → { top: "small", right: "base", bottom: "large", left: "base" }
 * - 4 values: "small base large smaller" → { top: "small", right: "base", bottom: "large", left: "smaller" }
 *
 * @param shorthand - The spacing shorthand string
 * @returns SpacingDefinition with top, right, bottom, left values
 */
export declare const parseSpacingShorthand: (shorthand: FlexSpacingShorthandType) => FlexSpacingDefinitionType;
//# sourceMappingURL=parseSpacingShorthand.d.ts.map