import * as React from "react"

export interface TileProps {
  children: React.ReactNode
  breakpointMd?: number
  breakpointLg?: number
  className?: string
  style?: React.CSSProperties
  backgroundImage?: string
  backgroundColor?: string
  isMobile?: boolean
}