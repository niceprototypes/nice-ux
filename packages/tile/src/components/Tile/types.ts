import * as React from "react"
import type { FlexSpacingType } from "nice-react-flex"
import type { GapType, ModeType } from "nice-react-styles"
import type { AlignType, AsType } from "nice-react-typography"
import type { TileTypographyProps } from "../TileContent/types"

export type { TileTypographyProps }

/**
 * Responsive alignment type for header text
 * Allows different alignments at different breakpoints
 */
export type TileHeaderAlignType =
  | AlignType
  | { mobile?: AlignType; tablet?: AlignType; desktop?: AlignType }

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
  titleAs?: AsType
  titleProps?: TileTypographyProps
  description?: React.ReactNode | string[]
  descriptionProps?: TileTypographyProps
  align?: TileHeaderAlignType
  gap?: GapType

  // Layout
  spacing?: FlexSpacingType
  maxWidthTablet?: number
  maxWidthDesktop?: number

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
  export type HeaderAlign = TileHeaderAlignType
  export type Typography = TileTypographyProps
  export type Props = TileProps
}

export default TileTypes
