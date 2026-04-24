import * as React from "react"
import type { FlexSpacingType, FlexProps } from "nice-react-flex"
import type { ModeType } from "nice-react-styles"
import type { TileTypographyProps } from "../TileContent/types"

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
  maxWidthTablet?: number
  maxWidthDesktop?: number
  alignItems?: TileAlignItemsType
  justifyContent?: TileJustifyContentType

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
  export type Props = TileProps
}

export default TileTypes
