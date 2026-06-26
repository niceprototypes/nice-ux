import * as React from "react"
import type {
  BreakpointName,
  GapType,
  SpacingShorthandType,
  SpacingDefinitionType,
} from "nice-react-styles"

/**
 * FlexGapSizeType
 *
 * Re-export of GapType from nice-styles for consistency.
 * Uses design tokens that map to CSS custom properties.
 */
export type FlexGapSizeType = GapType

/**
 * FlexTypeType
 *
 * Determines whether spacing properties apply as padding or margin.
 *
 * Values:
 * - "padding": Applies spacing as internal padding
 * - "margin": Applies spacing as external margin
 */
export type FlexTypeType = "padding" | "margin"

/**
 * FlexBreakpointType
 *
 * Re-export of BreakpointName from nice-styles.
 * Supported breakpoint values: "phone", "tablet", "laptop", "desktop"
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
 * FlexSpacingType
 *
 * CSS-like shorthand string for spacing using token names. Supports 1-4
 * space-separated token values following CSS padding/margin shorthand rules:
 * - 1 value: "small" → all sides
 * - 2 values: "small base" → top/bottom, left/right
 * - 3 values: "small base large" → top, left/right, bottom
 * - 4 values: "small base large smaller" → top, right, bottom, left
 *
 * For per-breakpoint overrides, use the wrapper's `breakpoints` prop. For
 * custom CSS values (px, rem, etc.), use the `style` prop instead.
 */
export type FlexSpacingType = SpacingShorthandType

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
 * FlexProps
 *
 * Complete prop definition for the Flex component.
 * All layout-related props support both static values and responsive breakpoint objects.
 *
 * Breakpoint System:
 * - phone: Base styles, always applied
 * - tablet: min-width query above phone threshold
 * - laptop: min-width query for laptop screens
 * - desktop: min-width query for desktop screens
 */
export type FlexProps = {
  /** Whether spacing applies as padding or margin */
  type?: FlexTypeType
  gap?: FlexGapSizeType
  direction?: FlexDirectionType
  alignItems?: FlexAlignItemsType
  justifyContent?: FlexJustifyContentType
  grow?: number
  shrink?: number
  wrap?: FlexWrapType
  /** Shrink the container to its content via `width: max-content`. @default false */
  fit?: boolean
  spacing?: FlexSpacingType
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

// Legacy exports for backwards compatibility
export type GapSize = FlexGapSizeType
export type Breakpoint = FlexBreakpointType
export type SpacingDefinition = FlexSpacingDefinitionType
export type Spacing = FlexSpacingType

// Declaration merging: const + namespace creates exportable type namespace
const FlexTypes = {} as const

namespace FlexTypes {
  export type GapSize = FlexGapSizeType
  export type Type = FlexTypeType
  export type Breakpoint = FlexBreakpointType
  export type Direction = FlexDirectionType
  export type AlignItems = FlexAlignItemsType
  export type JustifyContent = FlexJustifyContentType
  export type Wrap = FlexWrapType
  export type SpacingDefinition = FlexSpacingDefinitionType
  export type Spacing = FlexSpacingType
  export type Props = FlexProps
}

export default FlexTypes
