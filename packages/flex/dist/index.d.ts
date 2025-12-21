import * as React from 'react';

/**
 * FlexGapSizeType
 *
 * Defines the available size values for gaps and spacing throughout the component.
 * Uses design tokens from nice-styles that map to CSS custom properties.
 *
 * Values:
 * - "smaller", "small", "base", "large", "larger": Design token keys from nice-styles gap tokens
 * - string: Custom CSS value (e.g., "2rem", "var(--custom-spacing)", "100px")
 * - null: Explicitly disable gap/spacing (useful for responsive breakpoints)
 */
type FlexGapSizeType = "smaller" | "small" | "base" | "large" | "larger";
/**
 * FlexTypeType
 *
 * Determines whether spacing properties apply as padding or margin.
 *
 * Values:
 * - "padding": Applies spacing as internal padding
 * - "margin": Applies spacing as external margin
 */
type FlexTypeType = "padding" | "margin";
/**
 * FlexBreakpointType
 *
 * Supported breakpoint values for responsive styling
 */
type FlexBreakpointType = "sm" | "md" | "lg";
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
 * FlexSpacingDefinitionType
 *
 * Provides granular control over spacing on all sides of the component.
 * Supports shortcuts for common patterns while allowing individual side control.
 *
 * Properties:
 * - all: Applies spacing to all four sides
 * - horizontal: Applies spacing to left and right sides
 * - vertical: Applies spacing to top and bottom sides
 * - top, right, bottom, left: Individual side control
 *
 * Priority order (highest to lowest):
 * 1. Individual sides (top, right, bottom, left)
 * 2. Axis shortcuts (horizontal, vertical)
 * 3. All sides (all)
 */
type FlexSpacingDefinitionType = {
    all?: FlexGapSizeType;
    horizontal?: FlexGapSizeType;
    vertical?: FlexGapSizeType;
    top?: FlexGapSizeType;
    right?: FlexGapSizeType;
    bottom?: FlexGapSizeType;
    left?: FlexGapSizeType;
};
/**
 * FlexSpacingPropType
 *
 * Union type for the spacing prop, supporting three formats:
 * - GapSize: Simple gap size applied to all sides
 * - SpacingDefinition: Granular control per side
 * - Responsive object: Different SpacingDefinition per breakpoint
 */
type FlexSpacingPropType = FlexGapSizeType | FlexSpacingDefinitionType | {
    sm?: FlexSpacingDefinitionType;
    md?: FlexSpacingDefinitionType;
    lg?: FlexSpacingDefinitionType;
};
/**
 * FlexProps
 *
 * Complete prop definition for the Flex component.
 * All layout-related props support both static values and responsive breakpoint objects.
 *
 * Breakpoint System:
 * - sm: Small screens (mobile) - always applied as base
 * - md: Medium screens (tablet) - min-width: 980px
 * - lg: Large screens (desktop) - min-width: 1280px
 */
type FlexProps = {
    type?: FlexTypeType;
    gap?: FlexGapSizeType | {
        sm?: FlexGapSizeType;
        md?: FlexGapSizeType;
        lg?: FlexGapSizeType;
    };
    direction?: FlexDirectionType | {
        sm?: FlexDirectionType;
        md?: FlexDirectionType;
        lg?: FlexDirectionType;
    };
    alignItems?: FlexAlignItemsType | {
        sm?: FlexAlignItemsType;
        md?: FlexAlignItemsType;
        lg?: FlexAlignItemsType;
    };
    justifyContent?: FlexJustifyContentType | {
        sm?: FlexJustifyContentType;
        md?: FlexJustifyContentType;
        lg?: FlexJustifyContentType;
    };
    grow?: number | {
        sm?: number;
        md?: number;
        lg?: number;
    };
    wrap?: FlexWrapType | {
        sm?: FlexWrapType;
        md?: FlexWrapType;
        lg?: FlexWrapType;
    };
    spacing?: FlexSpacingPropType;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
};
type GapSize = FlexGapSizeType;
type FlexType = FlexTypeType;
type Breakpoint = FlexBreakpointType;
type SpacingDefinition = FlexSpacingDefinitionType;
type SpacingProp = FlexSpacingPropType;
declare const FlexTypes: {};
declare namespace FlexTypes {
    type GapSize = FlexGapSizeType;
    type Type = FlexTypeType;
    type Breakpoint = FlexBreakpointType;
    type Direction = FlexDirectionType;
    type AlignItems = FlexAlignItemsType;
    type JustifyContent = FlexJustifyContentType;
    type Wrap = FlexWrapType;
    type SpacingDefinition = FlexSpacingDefinitionType;
    type SpacingProp = FlexSpacingPropType;
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
 * <Flex direction="row" gap={2} alignItems="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 *
 * @example
 * // Responsive usage with breakpoint-based props
 * <Flex
 *   direction={{ sm: "column", md: "row" }}
 *   gap={{ sm: 1, md: 2, lg: 3 }}
 *   alignItems="center"
 * >
 *   <div>Responsive Item 1</div>
 *   <div>Responsive Item 2</div>
 * </Flex>
 *
 * @example
 * // Using spacing for padding/margin
 * <Flex
 *   type="padding"
 *   spacing={{ all: 2 }}
 *   gap={1}
 * >
 *   <div>Padded content</div>
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
 *    or responsive objects with sm/md/lg breakpoints
 *
 * 2. **Automatic Prop Normalization**: The component automatically normalizes props
 *    to ensure consistent behavior. Simple values are converted to breakpoint objects
 *    with the value applied to the 'sm' breakpoint.
 *
 * 3. **Spacing Management**: Supports both padding and margin with granular control
 *    over all sides (top, right, bottom, left) or shortcuts (horizontal, vertical, all)
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
 * Breakpoint Constants
 *
 * Defines the responsive breakpoint system used throughout the Flex component.
 * These values determine when different responsive styles are applied.
 */
/** Small breakpoint - mobile devices */
declare const BREAKPOINT_SM = 480;
/** Medium breakpoint - tablets and small desktops */
declare const BREAKPOINT_MD = 980;
/** Large breakpoint - large desktops */
declare const BREAKPOINT_LG = 1280;
/**
 * Media Queries
 *
 * Pre-built media query strings for responsive design.
 * These are used in styled-components to apply styles at different screen sizes.
 */
/** Media query for medium screens and up (tablets+) */
declare const MEDIA_MIN_MD = "@media (min-width: 980px)";
/** Media query for large screens and up (desktops+) */
declare const MEDIA_MIN_LG = "@media (min-width: 1280px)";

/**
 * Extracts the value for a specific breakpoint from a prop that can be either
 * a simple value or a responsive object
 *
 * @function getBreakpointValue
 * @param {T | { sm?: T; md?: T; lg?: T } | undefined} value - The prop value
 * @param {Breakpoint} breakpoint - The target breakpoint
 * @returns {T | undefined} The value for the specified breakpoint
 *
 * @example
 * getBreakpointValue("row", "sm") // returns "row"
 * getBreakpointValue("row", "md") // returns undefined (simple values only apply at sm)
 * getBreakpointValue({ sm: "column", md: "row" }, "md") // returns "row"
 */
declare const getBreakpointValue: <T>(value: T | {
    sm?: T;
    md?: T;
    lg?: T;
} | undefined, breakpoint: Breakpoint) => T | undefined;

/**
 * Converts a GapSize value to its corresponding CSS value using CSS variables
 *
 * @function getGapSize
 * @param {GapSize} [size] - The gap size token key ("smaller", "small", "base", "large", "larger") or custom string
 * @returns {string | undefined} CSS variable reference or the string value as-is
 *
 * @example
 * getGapSize("smaller") // returns "var(--gap-smaller)"
 * getGapSize("base") // returns "var(--gap-base)"
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
 * @returns {SpacingDefinition | undefined} The spacing definition for the specified breakpoint
 *
 * @description
 * Handles the three possible shapes of the spacing prop:
 * - GapSize string: Not a SpacingDefinition, returns undefined
 * - SpacingDefinition object: Returns the object only for "sm" breakpoint
 * - Responsive object: Returns the SpacingDefinition for the specified breakpoint
 *
 * @example
 * getSpacingValue({ all: "base" }, "sm") // returns { all: "base" }
 * getSpacingValue({ all: "base" }, "md") // returns undefined
 * getSpacingValue({ sm: { all: "small" }, md: { all: "base" } }, "md") // returns { all: "base" }
 * getSpacingValue("base", "sm") // returns undefined (GapSize, not SpacingDefinition)
 */
declare const getSpacingValue: (spacing: SpacingProp | undefined, breakpoint: Breakpoint) => SpacingDefinition | undefined;

/**
 * Checks if a value is a responsive breakpoint object (has sm, md, or lg keys)
 *
 * @function isResponsiveObject
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is an object with breakpoint keys
 *
 * @example
 * isResponsiveObject({ sm: "column", md: "row" }) // true
 * isResponsiveObject({ all: "base" }) // false
 * isResponsiveObject("row") // false
 * isResponsiveObject(null) // false
 */
declare const isResponsiveObject: (value: unknown) => value is {
    sm?: unknown;
    md?: unknown;
    lg?: unknown;
};

/**
 * Generates CSS spacing properties (padding or margin) from a SpacingDefinition
 *
 * @function styleSpacing
 * @param {"padding" | "margin"} type - Whether to generate padding or margin properties
 * @param {SpacingDefinition} [def] - Spacing configuration object
 * @returns {string} CSS property declarations separated by newlines
 *
 * @description
 * This function applies spacing values with a priority system:
 * 1. Individual sides (top, right, bottom, left) - highest priority
 * 2. Axis shortcuts (horizontal→left+right, vertical→top+bottom)
 * 3. All sides (all) - lowest priority
 *
 * The function only generates CSS for sides that have defined values,
 * allowing for partial spacing definitions.
 *
 * @example
 * // Simple all-sides spacing
 * styleSpacing("padding", { all: 2 })
 * // Returns: "padding-top: var(--gap-size-2);\npadding-right: var(--gap-size-2);\n..."
 *
 * @example
 * // Mixed priority spacing
 * styleSpacing("margin", { all: 1, horizontal: 2, top: 3 })
 * // Returns: "margin-top: var(--gap-size-3);\nmargin-right: var(--gap-size-2);\n..."
 * // (top=3 overrides all=1, horizontal=2 overrides all=1 for left/right)
 */
declare const styleSpacing: (type: "padding" | "margin", def?: SpacingDefinition) => string;

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
 * const props = { direction: { sm: "column" }, gap: { sm: 2 } }
 * styleFlex("sm", props)
 * // Returns: "display: flex;\nflex-direction: column;\ngap: var(--gap-size-2);"
 *
 * @example
 * // Generate medium breakpoint styles
 * const props = {
 *   direction: { sm: "column", md: "row" },
 *   gap: { sm: 1, md: 3 },
 *   spacing: { md: { horizontal: 2 } }
 * }
 * styleFlex("md", props)
 * // Returns: "flex-direction: row;\ngap: var(--gap-size-3);\npadding-left: var(--gap-size-2);\npadding-right: var(--gap-size-2);"
 */
declare const styleFlex: (breakpoint: Breakpoint, props: FlexProps) => string;

export { BREAKPOINT_LG, BREAKPOINT_MD, BREAKPOINT_SM, FlexTypes, MEDIA_MIN_LG, MEDIA_MIN_MD, Flex as default, getBreakpointValue, getGapSize, getSpacingValue, isResponsiveObject, styleFlex, styleSpacing };
export type { Breakpoint, FlexAlignItemsType, FlexBreakpointType, FlexDirectionType, FlexGapSizeType, FlexJustifyContentType, FlexProps, FlexSpacingDefinitionType, FlexSpacingPropType, FlexType, FlexTypeType, FlexWrapType, GapSize, SpacingDefinition, SpacingProp };
