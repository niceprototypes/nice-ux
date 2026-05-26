import * as React from "react"
import type { FlexSpacingType, FlexProps } from "nice-react-flex"
import type {
  ModeType,
  GapType,
  BackgroundColorType,
  BackgroundSizeType,
  ColorType,
} from "nice-react-styles"
import type { TileTypographyProps } from "../TileContent/TileContent.types"

/**
 * TileBackgroundColorType
 *
 * @token Re-export of BackgroundColorType from nice-styles. Token-bound —
 * raw CSS color strings are not accepted. Use `backgroundImage` for
 * gradients or image URLs.
 */
export type TileBackgroundColorType = BackgroundColorType

/**
 * TileBackgroundSizeType
 *
 * @token Re-export of BackgroundSizeType from nice-styles. Token-bound —
 * raw CSS background-size strings are not accepted.
 */
export type TileBackgroundSizeType = BackgroundSizeType

/**
 * TileColorType
 *
 * @token Re-export of ColorType from nice-styles. Token-bound —
 * raw CSS color strings are not accepted.
 */
export type TileColorType = ColorType

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
 * Max-width control for the inner content column. Pass a number to cap at
 * that pixel value, or `"none"` to let the column fill its container.
 *
 * Use the wrapper's `breakpoints` prop to vary per breakpoint:
 * `breakpoints={{ "laptop+": { maxWidth: 980 } }}`.
 */
export type TileMaxWidthType = TileMaxWidthValueType

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
   * - Breakpoint object (`{ phone, tablet, laptop }`) provides per-breakpoint
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
  /** @token Token-bound — accepts BackgroundColorType variants only. */
  backgroundColor?: TileBackgroundColorType
  backgroundPosition?: string
  /** @token Token-bound — accepts BackgroundSizeType variants only. */
  backgroundSize?: TileBackgroundSizeType
  backgroundAttachment?: string

  // Color
  /** @token Token-bound — accepts ColorType variants only. */
  color?: TileColorType
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
  export type BackgroundColor = TileBackgroundColorType
  export type BackgroundSize = TileBackgroundSizeType
  export type Color = TileColorType
  export type Props = TileProps
}

export default TileTypes
