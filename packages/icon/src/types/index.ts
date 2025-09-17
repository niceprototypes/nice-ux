import * as React from "react"

/**
 * Icon variant - fill or stroke style
 */
export type IconVariant = "fill" | "stroke"

/**
 * Available icon names in the icon set
 */
export type IconNameType =
  | "arrow"
  | "attention"
  | "box"
  | "brush"
  | "calendar"
  | "cancel"
  | "carat"
  | "check"
  | "cloud"
  | "code"
  | "cog"
  | "contact"
  | "content"
  | "edit"
  | "link"
  | "lock"
  | "menu"
  | "message"
  | "pause"
  | "placeholder"
  | "plus"
  | "profile"
  | "puzzle"
  | "search"
  | "shuffle"
  | "skip"
  | "spinner"
  | "trash"
  | "upload"
  | "x"

/**
 * Icon size type - maps to CSS variables
 */
export type IconSizeType = 1 | 2 | 3 | 4

/**
 * Border radius size type
 */
export type IconBorderRadiusType = 1 | 2 | 3

/**
 * Status types for theming
 */
export type StatusType =
  | "active"
  | "success"
  | "error"
  | "warning"
  | "default"
  | "muted"
  | "highlighted"
  | "primary"
  | "secondary"

/**
 * Color property types for styling
 */
export type ColorPropertyType = "color" | "background-color" | "stroke" | "border-color"

/**
 * Props for the Icon component
 */
export interface IconProps {
  /** Icon name from the built-in icon set */
  name?: IconNameType
  /** Icon variant - fill or stroke */
  variant?: IconVariant
  /** Custom SVG URL (overrides name) */
  url?: string
  /** Icon color (CSS value) */
  color?: string
  /** Background color for the icon container */
  backgroundColor?: string
  /** Icon size (1-4, smallest to largest) */
  size?: IconSizeType
  /** Border radius for the icon container */
  borderRadius?: IconBorderRadiusType
  /** Image size as percentage of container */
  imageSize?: string
  /** Status for automatic color theming */
  status?: StatusType
  /** Whether the icon should spin */
  spinning?: boolean
  /** Rotation angle in degrees */
  rotation?: number
  /** Stroke width for stroke variant */
  strokeWidth?: 1 | 2
  /** Whether the icon is in active state */
  isActive?: boolean
  /** Additional CSS class */
  className?: string
}

/**
 * Theme configuration for icons
 */
export interface IconTheme {
  /** CSS variable overrides for colors */
  colors?: {
    primary?: string
    secondary?: string
    success?: string
    error?: string
    warning?: string
  }
  /** CSS variable names for theming */
  cssVariables?: {
    strokeColorPrimary?: string
    strokeColorDefault?: string
    cellHeight?: {
      1?: string
      2?: string
      3?: string
      4?: string
    }
    borderRadius?: {
      1?: string
      2?: string
      3?: string
    }
    strokeWidth?: {
      1?: string
      2?: string
    }
    animationDuration?: string
    animationEasing?: string
  }
}