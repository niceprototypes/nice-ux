import * as React from "react"
import type { FlexSpacingType, FlexProps } from "nice-react-flex"
import type { Breakpoints, ModeType, GapType } from "nice-react-styles"
import type { TileTypographyProps } from "../TileContent/types"

/**
 * TileMaxWidthValueType
 *
 * Per-breakpoint max-width value. A number caps the inner column at that
 * pixel value; "none" disables the cap and lets the column fill its
 * container.
 */
export type TileMaxWidthValueType = number | "none"

/**
 * TileMaxWidthType
 *
 * Responsive max-width control for the inner content column.
 *
 * Accepts either a bare value applied at every breakpoint, or a breakpoint
 * object specifying per-breakpoint values. Any breakpoint omitted from the
 * object falls back to "none" (no cap).
 */
export type TileMaxWidthType = Breakpoints<TileMaxWidthValueType>

export type { TileTypographyProps }

/**
 * TileAlignItemsType
 *
 * Re-export of the `alignItems` prop shape from nice-react-flex.
 * Accepts a single value or a breakpoint object for responsive alignment.
 */
export type TileAlignItemsType = NonNullable<FlexProps["alignItems"]>

/**
 * TileJustifyContentType
 *
 * Re-export of the `justifyContent` prop shape from nice-react-flex.
 * Accepts a single value or a breakpoint object for responsive justification.
 */
export type TileJustifyContentType = NonNullable<FlexProps["justifyContent"]>

export interface TileProps {
  // Content
  children?: React.ReactNode
  /** Content rendered above the title */
  contentTop?: React.ReactNode
  /** Content rendered between the title and description */
  contentCenter?: React.ReactNode
  contentLeft?: React.ReactNode
  contentRight?: React.ReactNode

  // Header
  title?: React.ReactNode
  titleProps?: TileTypographyProps
  description?: React.ReactNode | string[]
  descriptionProps?: TileTypographyProps

  // Layout
  spacing?: FlexSpacingType
  /**
   * Max-width of the inner content column.
   *
   * - Bare value (`number` or `"none"`) applies at every breakpoint.
   * - Breakpoint object (`{ small, medium, large }`) provides per-breakpoint
   *   values; omitted breakpoints fall back to `"none"` (no cap).
   * - `"none"` removes any cap, letting the column fill its container.
   */
  maxWidth?: TileMaxWidthType
  alignItems?: TileAlignItemsType
  justifyContent?: TileJustifyContentType
  /** Top spacing applied to the Flex that wraps `children` below the title/description block. */
  gap?: GapType

  // Background
  backgroundImage?: string
  backgroundColor?: string
  backgroundPosition?: string
  backgroundSize?: string
  backgroundAttachment?: string

  // Foreground
  foregroundColor?: string
  mode?: ModeType

  // HTML
  className?: string
  style?: React.CSSProperties
}

const TileTypes = {} as const

namespace TileTypes {
  export type Typography = TileTypographyProps
  export type AlignItems = TileAlignItemsType
  export type JustifyContent = TileJustifyContentType
  export type Gap = GapType
  export type MaxWidth = TileMaxWidthType
  export type MaxWidthValue = TileMaxWidthValueType
  export type Props = TileProps
}

export default TileTypes
