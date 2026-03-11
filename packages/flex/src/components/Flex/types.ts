import * as React from "react"
import type {
  BreakpointName,
  GapType,
  SpacingShorthandType,
  SpacingDefinitionType,
  SpacingResponsiveType,
  SpacingType,
} from "nice-react-styles"

/**
 * FlexGapSizeType
 *
 * Re-export of GapType from nice-styles for consistency.
 * Uses design tokens that map to CSS custom properties.
 */
export type FlexGapSizeType = GapType

/**
 * FlexModeType
 *
 * Determines whether spacing properties apply as padding or margin.
 *
 * Values:
 * - "padding": Applies spacing as internal padding
 * - "margin": Applies spacing as external margin
 */
export type FlexModeType = "padding" | "margin"

/**
 * FlexBreakpointType
 *
 * Re-export of BreakpointName from nice-styles.
 * Supported breakpoint values: "mobile", "tablet", "desktop"
 */
export type FlexBreakpointType = BreakpointName

/**
 * FlexDirectionType
 *
 * Flex direction values
 */
export type FlexDirectionType = "row" | "column"

/**
 * FlexAlignItemsType
 *
 * Align items on cross axis
 */
export type FlexAlignItemsType = "flex-start" | "flex-end" | "center" | "baseline" | "stretch"

/**
 * FlexJustifyContentType
 *
 * Align items on main axis
 */
export type FlexJustifyContentType = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"

/**
 * FlexWrapType
 *
 * Controls flex wrapping behavior
 */
export type FlexWrapType = "nowrap" | "wrap" | "wrap-reverse"

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
export type FlexSpacingShorthandType = SpacingShorthandType

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
export type FlexSpacingDefinitionType = SpacingDefinitionType

/**
 * FlexSpacingResponsiveType
 *
 * Re-export of SpacingResponsiveType from nice-styles.
 * Responsive spacing configuration where each breakpoint can have:
 * - A shorthand string (e.g., "small base")
 * - null to explicitly disable spacing at that breakpoint
 */
export type FlexSpacingResponsiveType = SpacingResponsiveType

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
export type FlexSpacingType = SpacingType

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
export type FlexProps = {
  mode?: FlexModeType
  gap?: FlexGapSizeType | {
    mobile?: FlexGapSizeType
    tablet?: FlexGapSizeType
    desktop?: FlexGapSizeType
  }
  direction?: FlexDirectionType | {
    mobile?: FlexDirectionType
    tablet?: FlexDirectionType
    desktop?: FlexDirectionType
  }
  alignItems?: FlexAlignItemsType | {
    mobile?: FlexAlignItemsType
    tablet?: FlexAlignItemsType
    desktop?: FlexAlignItemsType
  }
  justifyContent?: FlexJustifyContentType | {
    mobile?: FlexJustifyContentType
    tablet?: FlexJustifyContentType
    desktop?: FlexJustifyContentType
  }
  grow?: number | {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  wrap?: FlexWrapType | {
    mobile?: FlexWrapType
    tablet?: FlexWrapType
    desktop?: FlexWrapType
  }
  spacing?: FlexSpacingType
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

// Legacy exports for backwards compatibility
export type GapSize = FlexGapSizeType
export type FlexMode = FlexModeType
export type Breakpoint = FlexBreakpointType
export type SpacingDefinition = FlexSpacingDefinitionType
export type SpacingShorthand = FlexSpacingShorthandType
export type SpacingResponsive = FlexSpacingResponsiveType
export type Spacing = FlexSpacingType

// Declaration merging: const + namespace creates exportable type namespace
const FlexTypes = {} as const

namespace FlexTypes {
  export type GapSize = FlexGapSizeType
  export type Mode = FlexModeType
  export type Breakpoint = FlexBreakpointType
  export type Direction = FlexDirectionType
  export type AlignItems = FlexAlignItemsType
  export type JustifyContent = FlexJustifyContentType
  export type Wrap = FlexWrapType
  export type SpacingDefinition = FlexSpacingDefinitionType
  export type SpacingShorthand = FlexSpacingShorthandType
  export type SpacingResponsive = FlexSpacingResponsiveType
  export type Spacing = FlexSpacingType
  export type Props = FlexProps
}

export default FlexTypes
