import { GapType, SpacingType, SpacingDefinitionType, BreakpointName, SpacingShorthandType, SpacingResponsiveType } from 'nice-react-styles';
import * as React from 'react';

/**
 * FlexGapSizeType
 *
 * Re-export of GapType from nice-styles for consistency.
 * Uses design tokens that map to CSS custom properties.
 */
type FlexGapSizeType = GapType;
/**
 * FlexModeType
 *
 * Determines whether spacing properties apply as padding or margin.
 *
 * Values:
 * - "padding": Applies spacing as internal padding
 * - "margin": Applies spacing as external margin
 */
type FlexModeType = "padding" | "margin";
/**
 * FlexBreakpointType
 *
 * Re-export of BreakpointName from nice-styles.
 * Supported breakpoint values: "small", "medium", "large"
 */
type FlexBreakpointType = BreakpointName;
/**
 * FlexDirectionType
 *
 * Flex direction values
 */
type FlexDirectionType = "row" | "column";
/**
 * FlexAlignItemsType
 *
 * Align items on cross axis
 */
type FlexAlignItemsType = "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
/**
 * FlexJustifyContentType
 *
 * Align items on main axis
 */
type FlexJustifyContentType = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
/**
 * FlexWrapType
 *
 * Controls flex wrapping behavior
 */
type FlexWrapType = "nowrap" | "wrap" | "wrap-reverse";
/**
 * FlexSpacingShorthandType
 *
 * Re-export of SpacingShorthandType from nice-styles.
 * CSS-like shorthand string for spacing using token names.
 * Supports 1-4 space-separated token values following CSS padding/margin shorthand rules:
 * - 1 value: "small" → all sides
 * - 2 values: "small base" → top/bottom, left/right
 * - 3 values: "small base large" → top, left/right, bottom
 * - 4 values: "small base large smaller" → top, right, bottom, left
 *
 * For custom CSS values (px, rem, etc.), use the style prop instead.
 */
type FlexSpacingShorthandType = SpacingShorthandType;
/**
 * FlexSpacingDefinitionType
 *
 * Re-export of SpacingDefinitionType from nice-styles.
 * Provides granular control over spacing on all sides of the component.
 * Individual side values after parsing from shorthand.
 *
 * Properties:
 * - top, right, bottom, left: Individual side control with token values
 */
type FlexSpacingDefinitionType = SpacingDefinitionType;
/**
 * FlexSpacingResponsiveType
 *
 * Re-export of SpacingResponsiveType from nice-styles.
 * Responsive spacing configuration where each breakpoint can have:
 * - A shorthand string (e.g., "small base")
 * - null to explicitly disable spacing at that breakpoint
 */
type FlexSpacingResponsiveType = SpacingResponsiveType;
/**
 * FlexSpacingType
 *
 * Re-export of SpacingType from nice-styles.
 * Union type for the spacing prop, supporting two formats:
 * - Shorthand string: "small", "small base", etc. (applies to small breakpoint)
 * - Responsive object: { small: "base", medium: null, large: "small large" }
 *
 * For custom CSS values, use the style prop on Flex instead.
 */
type FlexSpacingType = SpacingType;
/**
 * FlexProps
 *
 * Complete prop definition for the Flex component.
 * All layout-related props support both static values and responsive breakpoint objects.
 *
 * Breakpoint System:
 * - small: Base styles, always applied
 * - medium: min-width query above small threshold
 * - large: min-width query for large screens
 */
type FlexProps = {
    mode?: FlexModeType;
    gap?: FlexGapSizeType | {
        small?: FlexGapSizeType;
        medium?: FlexGapSizeType;
        large?: FlexGapSizeType;
    };
    direction?: FlexDirectionType | {
        small?: FlexDirectionType;
        medium?: FlexDirectionType;
        large?: FlexDirectionType;
    };
    alignItems?: FlexAlignItemsType | {
        small?: FlexAlignItemsType;
        medium?: FlexAlignItemsType;
        large?: FlexAlignItemsType;
    };
    justifyContent?: FlexJustifyContentType | {
        small?: FlexJustifyContentType;
        medium?: FlexJustifyContentType;
        large?: FlexJustifyContentType;
    };
    grow?: number | {
        small?: number;
        medium?: number;
        large?: number;
    };
    wrap?: FlexWrapType | {
        small?: FlexWrapType;
        medium?: FlexWrapType;
        large?: FlexWrapType;
    };
    spacing?: FlexSpacingType;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
};
type GapSize = FlexGapSizeType;
type FlexMode = FlexModeType;
type Breakpoint = FlexBreakpointType;
type SpacingDefinition = FlexSpacingDefinitionType;
type SpacingShorthand = FlexSpacingShorthandType;
type SpacingResponsive = FlexSpacingResponsiveType;
type Spacing = FlexSpacingType;
declare const FlexTypes: {};
declare namespace FlexTypes {
    type GapSize = FlexGapSizeType;
    type Mode = FlexModeType;
    type Breakpoint = FlexBreakpointType;
    type Direction = FlexDirectionType;
    type AlignItems = FlexAlignItemsType;
    type JustifyContent = FlexJustifyContentType;
    type Wrap = FlexWrapType;
    type SpacingDefinition = FlexSpacingDefinitionType;
    type SpacingShorthand = FlexSpacingShorthandType;
    type SpacingResponsive = FlexSpacingResponsiveType;
    type Spacing = FlexSpacingType;
    type Props = FlexProps;
}

declare const Flex: any;
//# sourceMappingURL=index.d.ts.map

/**
 * Extracts the value for a specific breakpoint from a prop that can be either
 * a simple value or a responsive object
 *
 * @function getBreakpointValue
 * @param {T | { small?: T; medium?: T; large?: T } | undefined} value - The prop value
 * @param {BreakpointName} breakpoint - The target breakpoint
 * @returns {T | undefined} The value for the specified breakpoint
 *
 * @example
 * getBreakpointValue("row", BREAKPOINT_SMALL) // returns "row"
 * getBreakpointValue("row", BREAKPOINT_MEDIUM) // returns undefined (simple values only apply at small)
 * getBreakpointValue({ small: "column", medium: "row" }, BREAKPOINT_MEDIUM) // returns "row"
 */
declare const getBreakpointValue: <T>(value: T | {
    small?: T;
    medium?: T;
    large?: T;
} | undefined, breakpoint: BreakpointName) => T | undefined;

/**
 * Converts a GapSize value to its corresponding CSS value using CSS variables
 *
 * @function getGapSize
 * @param {GapSize} [size] - The gap size token key ("smaller", "small", "base", "large", "larger") or custom string
 * @returns {string | undefined} CSS variable reference or the string value as-is
 *
 * @example
 * getGapSize("smaller") // returns "var(--np--gap--smaller)"
 * getGapSize("base") // returns "var(--np--gap--base)"
 * getGapSize("2rem") // returns "2rem"
 * getGapSize("var(--custom-spacing)") // returns "var(--custom-spacing)"
 * getGapSize(null) // returns undefined
 * getGapSize(undefined) // returns undefined
 */
declare const getGapSize: (size?: GapSize) => string | undefined;

/**
 * Extracts the SpacingDefinition for a specific breakpoint from a spacing prop
 *
 * @function getSpacingValue
 * @param {SpacingProp | undefined} spacing - The spacing prop value
 * @param {BreakpointName} breakpoint - The target breakpoint
 * @returns {SpacingDefinition | null | undefined} The spacing definition for the specified breakpoint
 *
 * @description
 * Handles two possible shapes of the spacing prop:
 * - Shorthand string: "small", "small base", etc. - parsed and applied to "small" breakpoint
 * - Responsive object: { small?: string | null, medium?: string | null, large?: string | null }
 *
 * Returns null when spacing is explicitly disabled at a breakpoint.
 * Returns undefined when no spacing is defined for the breakpoint.
 *
 * @example
 * getSpacingValue("small", BREAKPOINT_SMALL) // returns { top: "small", right: "small", bottom: "small", left: "small" }
 * getSpacingValue("small base", BREAKPOINT_SMALL) // returns { top: "small", right: "base", bottom: "small", left: "base" }
 * getSpacingValue("small", BREAKPOINT_MEDIUM) // returns undefined (shorthand only applies to small)
 * getSpacingValue({ small: "base", medium: null, large: "small" }, BREAKPOINT_MEDIUM) // returns null
 * getSpacingValue({ small: "base", large: "small large" }, BREAKPOINT_LARGE) // returns { top: "small", right: "large", bottom: "small", left: "large" }
 */
declare const getSpacingValue: (spacing: Spacing | undefined, breakpoint: BreakpointName) => SpacingDefinition | null | undefined;

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
declare const isResponsiveObject: (value: unknown) => value is {
    small?: unknown;
    medium?: unknown;
    large?: unknown;
};

/**
 * Generates CSS spacing properties (padding or margin) from a SpacingDefinition
 *
 * @function styleSpacing
 * @param {"padding" | "margin"} mode - Whether to generate padding or margin properties
 * @param {SpacingDefinition} [def] - Spacing configuration object with top, right, bottom, left values
 * @returns {string} CSS property declarations separated by newlines
 *
 * @description
 * Generates CSS declarations for each side that has a defined value.
 * The SpacingDefinition is expected to already have individual side values
 * (parsed from shorthand by parseSpacingShorthand).
 *
 * @example
 * styleSpacing("padding", { top: "small", right: "base", bottom: "small", left: "base" })
 * // Returns: "padding-top: var(--core--gap--small);\npadding-right: var(--core--gap--base);\n..."
 *
 * @example
 * styleSpacing("margin", { top: "large", right: "large", bottom: "large", left: "large" })
 * // Returns: "margin-top: var(--core--gap--large);\nmargin-right: var(--core--gap--large);\n..."
 */
declare const styleSpacing: (mode: "padding" | "margin", def?: SpacingDefinition | null) => string;

/**
 * styleFlex Service
 *
 * Generates CSS styling for a specific breakpoint based on normalized Flex component props.
 * This is the core styling logic that transforms component props into CSS declarations.
 *
 * @function styleFlex
 * @param {Breakpoint} breakpoint - The breakpoint to generate styles for (sm/md/lg)
 * @param {FlexProps} props - The normalized Flex component props
 * @returns {string} CSS declarations separated by newlines
 *
 * @description
 * This service handles the generation of all CSS properties for the Flex component:
 *
 * **Base Display**: Sets `display: flex` only for the 'sm' breakpoint to establish
 * the flexbox context. Higher breakpoints inherit this display value.
 *
 * **Responsive Value Extraction**: For each CSS property, the function extracts
 * the appropriate value based on whether the prop is a simple value or breakpoint object:
 * - Object props: Use the value for the current breakpoint
 * - Simple props: Only use for 'sm' breakpoint (since props are normalized)
 *
 * **CSS Property Generation**: Generates standard CSS flexbox properties:
 * - `flex-direction`: Controls layout direction (row/column)
 * - `align-items`: Aligns items on the cross axis
 * - `justify-content`: Aligns items on the main axis
 * - `flex-grow` & `flex-basis`: Controls item growth behavior
 * - `flex-wrap`: Controls whether items wrap to new lines
 * - `gap`: Sets space between flex items using CSS Grid gap
 *
 * **Spacing Integration**: Uses the styleSpacing helper to generate padding
 * or margin properties with full side-by-side control.
 *
 * The function is designed to work with props that have been processed by
 * the normalizeProps service, ensuring consistent prop structure.
 *
 * @example
 * // Generate small breakpoint styles
 * const props = { direction: { small: "column" }, gap: { small: "small" } }
 * styleFlex(BREAKPOINT_SMALL, props)
 * // Returns: "display: flex;\nflex-direction: column;\ngap: var(--core--gap--small);"
 *
 * @example
 * // Generate medium breakpoint styles
 * const props = {
 *   direction: { small: "column", medium: "row" },
 *   gap: { small: "small", medium: "base" },
 *   spacing: { medium: "small base" }
 * }
 * styleFlex(BREAKPOINT_MEDIUM, props)
 * // Returns: "flex-direction: row;\ngap: var(--core--gap--base);\npadding-top: var(--core--gap--small);\npadding-right: var(--core--gap--base);..."
 */
declare const styleFlex: (breakpoint: BreakpointName, props: FlexProps) => string;

export { FlexTypes, Flex as default, getBreakpointValue, getGapSize, getSpacingValue, isResponsiveObject, styleFlex, styleSpacing };
export type { Breakpoint, FlexAlignItemsType, FlexBreakpointType, FlexDirectionType, FlexGapSizeType, FlexJustifyContentType, FlexMode, FlexModeType, FlexProps, FlexSpacingDefinitionType, FlexSpacingResponsiveType, FlexSpacingShorthandType, FlexSpacingType, FlexWrapType, GapSize, Spacing, SpacingDefinition, SpacingResponsive, SpacingShorthand };
