import * as React from "react"
import type { FlexSpacingType } from "nice-react-flex"
import type { ModeType } from "nice-styles"
import type { AlignType, AsType } from "nice-react-typography"

/**
 * Responsive alignment type for header text
 * Allows different alignments at different breakpoints
 */
export type TileHeaderAlignType =
  | AlignType
  | { mobile?: AlignType; tablet?: AlignType; desktop?: AlignType }

export interface TileProps {
  children?: React.ReactNode
  maxWidthTablet?: number
  maxWidthDesktop?: number
  className?: string
  style?: React.CSSProperties
  backgroundImage?: string
  backgroundColor?: string
  foregroundColor?: string
  backgroundPosition?: string
  backgroundSize?: string
  backgroundAttachment?: string
  contentLeft?: React.ReactNode
  contentRight?: React.ReactNode
  spacing?: FlexSpacingType

  /** Title text displayed at the top of the tile */
  title?: string
  /** HTML element for the title (default: "h2") */
  titleAs?: AsType
  /** Description text displayed below the title */
  description?: string
  /** Alignment for title and description (default: "center") */
  align?: TileHeaderAlignType
  /** Pin token resolution to a specific mode instead of responding to media query */
  mode?: ModeType
}