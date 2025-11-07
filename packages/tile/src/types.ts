import * as React from "react"
import type { GapSize, SpacingDefinition } from "nice-react-flex"

export interface TileProps {
  children: React.ReactNode
  breakpointMd?: number
  breakpointLg?: number
  className?: string
  style?: React.CSSProperties
  backgroundImage?: string
  backgroundColor?: string
  backgroundPosition?: string
  backgroundSize?: string
  backgroundAttachment?: string
  fullWidth?: boolean
  title?: string | React.ReactNode
  titleAlign?: "left" | "center" | "right"
  titleColor?: string
  contentLeft?: React.ReactNode
  contentRight?: React.ReactNode
  spacing?: GapSize | SpacingDefinition | {
    sm?: SpacingDefinition
    md?: SpacingDefinition
    lg?: SpacingDefinition
  }
}