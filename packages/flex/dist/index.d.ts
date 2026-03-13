import * as React from 'react';
import { GapType, SpacingType, BreakpointName, SpacingDefinitionType, SpacingShorthandType, SpacingResponsiveType } from 'nice-react-styles';

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
 * Supported breakpoint values: "mobile", "tablet", "desktop"
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
 * - Shorthand string: "small", "small base", etc. (applies to mobile breakpoint)
 * - Responsive object: { mobile: "base", tablet: null, desktop: "small large" }
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
 * - mobile: Base styles, always applied
 * - tablet: min-width query above mobile threshold
 * - desktop: min-width query for large screens
 */
type FlexProps = {
    mode?: FlexModeType;
    gap?: FlexGapSizeType | {
        mobile?: FlexGapSizeType;
        tablet?: FlexGapSizeType;
        desktop?: FlexGapSizeType;
    };
    direction?: FlexDirectionType | {
        mobile?: FlexDirectionType;
        tablet?: FlexDirectionType;
        desktop?: FlexDirectionType;
    };
    alignItems?: FlexAlignItemsType | {
        mobile?: FlexAlignItemsType;
        tablet?: FlexAlignItemsType;
        desktop?: FlexAlignItemsType;
    };
    justifyContent?: FlexJustifyContentType | {
        mobile?: FlexJustifyContentType;
        tablet?: FlexJustifyContentType;
        desktop?: FlexJustifyContentType;
    };
    grow?: number | {
        mobile?: number;
        tablet?: number;
        desktop?: number;
    };
    wrap?: FlexWrapType | {
        mobile?: FlexWrapType;
        tablet?: FlexWrapType;
        desktop?: FlexWrapType;
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

/**
 * Flex Component
 *
 * A highly flexible and responsive flexbox container component that provides
 * comprehensive layout control with breakpoint-based responsive design.
 *
 * @component
 * @example
 * // Basic usage with static props
 * <Flex direction="row" gap="base" alignItems="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 *
 * @example
 * // Responsive usage with breakpoint-based props
 * <Flex
 *   direction={{ mobile: "column", tablet: "row" }}
 *   gap={{ mobile: "small", tablet: "base", desktop: "large" }}
 *   alignItems="center"
 * >
 *   <div>Responsive Item 1</div>
 *   <div>Responsive Item 2</div>
 * </Flex>
 *
 * @example
 * // Using spacing with CSS-like shorthand
 * <Flex spacing="small base" gap="small">
 *   <div>Padded content (top/bottom: small, left/right: base)</div>
 * </Flex>
 *
 * @example
 * // Responsive spacing with margin mode
 * <Flex
 *   mode="margin"
 *   spacing={{ mobile: "small", tablet: "base large", desktop: "small base large smaller" }}
 * >
 *   <div>Responsive margins</div>
 * </Flex>
 *
 * @param {FlexProps} props - The component props
 * @returns {JSX.Element} A styled div element with flexbox properties
 *
 * @description
 * The Flex component serves as a versatile container that leverages CSS Flexbox
 * for creating responsive layouts. It supports:
 *
 * 1. **Responsive Design**: All layout props can be specified as either static values
 *    or responsive objects with mobile/tablet/desktop breakpoints
 *
 * 2. **Automatic Prop Normalization**: The component automatically normalizes props
 *    to ensure consistent behavior. Simple values are converted to breakpoint objects
 *    with the value applied to the 'mobile' breakpoint.
 *
 * 3. **CSS-like Spacing Shorthand**: Supports 1-4 token values like CSS padding/margin:
 *    - "small" → all sides
 *    - "small base" → top/bottom, left/right
 *    - "small base large" → top, left/right, bottom
 *    - "small base large smaller" → top, right, bottom, left
 *
 * 4. **Gap Support**: Uses CSS gap property for consistent spacing between flex items
 *
 * 5. **Growth Control**: Allows flex items to grow with configurable flex-grow values
 *
 * The component uses styled-components for styling and filters out style props before
 * passing them to the DOM to avoid React warnings about unknown DOM properties.
 */
declare const Flex: React.FC<FlexProps>;
//# sourceMappingURL=Flex.d.ts.map

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
declare const getBreakpointValue: <T>(value: T | {
    mobile?: T;
    tablet?: T;
    desktop?: T;
} | undefined, breakpoint: Breakpoint) => T | undefined;

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
 * @param {Breakpoint} breakpoint - The target breakpoint
 * @returns {SpacingDefinition | null | undefined} The spacing definition for the specified breakpoint
 *
 * @description
 * Handles two possible shapes of the spacing prop:
 * - Shorthand string: "small", "small base", etc. - parsed and applied to "mobile" breakpoint
 * - Responsive object: { mobile?: string | null, tablet?: string | null, desktop?: string | null }
 *
 * Returns null when spacing is explicitly disabled at a breakpoint.
 * Returns undefined when no spacing is defined for the breakpoint.
 *
 * @example
 * getSpacingValue("small", "mobile") // returns { top: "small", right: "small", bottom: "small", left: "small" }
 * getSpacingValue("small base", "mobile") // returns { top: "small", right: "base", bottom: "small", left: "base" }
 * getSpacingValue("small", "tablet") // returns undefined (shorthand only applies to mobile)
 * getSpacingValue({ mobile: "base", tablet: null, desktop: "small" }, "tablet") // returns null
 * getSpacingValue({ mobile: "base", desktop: "small large" }, "desktop") // returns { top: "small", right: "large", bottom: "small", left: "large" }
 */
declare const getSpacingValue: (spacing: Spacing | undefined, breakpoint: Breakpoint) => SpacingDefinition | null | undefined;

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
declare const isResponsiveObject: (value: unknown) => value is {
    mobile?: unknown;
    tablet?: unknown;
    desktop?: unknown;
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
 * // Generate mobile breakpoint styles
 * const props = { direction: { mobile: "column" }, gap: { mobile: "small" } }
 * styleFlex("mobile", props)
 * // Returns: "display: flex;\nflex-direction: column;\ngap: var(--core--gap--small);"
 *
 * @example
 * // Generate tablet breakpoint styles
 * const props = {
 *   direction: { mobile: "column", tablet: "row" },
 *   gap: { mobile: "small", tablet: "base" },
 *   spacing: { tablet: "small base" }
 * }
 * styleFlex("tablet", props)
 * // Returns: "flex-direction: row;\ngap: var(--core--gap--base);\npadding-top: var(--core--gap--small);\npadding-right: var(--core--gap--base);..."
 */
declare const styleFlex: (breakpoint: Breakpoint, props: FlexProps) => string;

export { FlexTypes, Flex as default, getBreakpointValue, getGapSize, getSpacingValue, isResponsiveObject, styleFlex, styleSpacing };
export type { Breakpoint, FlexAlignItemsType, FlexBreakpointType, FlexDirectionType, FlexGapSizeType, FlexJustifyContentType, FlexMode, FlexModeType, FlexProps, FlexSpacingDefinitionType, FlexSpacingResponsiveType, FlexSpacingShorthandType, FlexSpacingType, FlexWrapType, GapSize, Spacing, SpacingDefinition, SpacingResponsive, SpacingShorthand };
