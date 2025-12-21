import * as React from "react";
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
export type FlexGapSizeType = "smaller" | "small" | "base" | "large" | "larger";
/**
 * FlexTypeType
 *
 * Determines whether spacing properties apply as padding or margin.
 *
 * Values:
 * - "padding": Applies spacing as internal padding
 * - "margin": Applies spacing as external margin
 */
export type FlexTypeType = "padding" | "margin";
/**
 * FlexBreakpointType
 *
 * Supported breakpoint values for responsive styling
 */
export type FlexBreakpointType = "sm" | "md" | "lg";
/**
 * FlexDirectionType
 *
 * Flex direction values
 */
export type FlexDirectionType = "row" | "column";
/**
 * FlexAlignItemsType
 *
 * Align items on cross axis
 */
export type FlexAlignItemsType = "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
/**
 * FlexJustifyContentType
 *
 * Align items on main axis
 */
export type FlexJustifyContentType = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
/**
 * FlexWrapType
 *
 * Controls flex wrapping behavior
 */
export type FlexWrapType = "nowrap" | "wrap" | "wrap-reverse";
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
export type FlexSpacingDefinitionType = {
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
export type FlexSpacingPropType = FlexGapSizeType | FlexSpacingDefinitionType | {
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
export type FlexProps = {
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
export type GapSize = FlexGapSizeType;
export type FlexType = FlexTypeType;
export type Breakpoint = FlexBreakpointType;
export type SpacingDefinition = FlexSpacingDefinitionType;
export type SpacingProp = FlexSpacingPropType;
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
export default FlexTypes;
//# sourceMappingURL=types.d.ts.map