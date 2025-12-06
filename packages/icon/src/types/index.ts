import * as React from "react"
import type { FontSizeType, BorderWidthType, ForegroundColorType } from "nice-styles"

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
 * Icon size type - uses FontSizeType from nice-styles tokens
 */
export type IconSizeType = FontSizeType

/**
 * Border radius size type
 */
export type IconBorderRadiusType = 1 | 2 | 3

/**
 * Color property types for styling
 */
export type ColorPropertyType = "color" | "background-color" | "stroke" | "border-color" | "fill"

/**
 * Props for the Icon component
 */
export interface IconProps {
  /** Icon name from the built-in icon set */
  name: IconNameType
  /** Icon variant - fill or stroke */
  variant?: IconVariant
  /** Custom SVG URL (overrides name) */
  url?: string
  /** Custom render function that receives imageSize and returns a React element (overrides url and name) */
  renderImage?: (imageSize: string) => React.ReactElement
  /** Icon color - uses ForegroundColorType from nice-styles tokens */
  color?: ForegroundColorType
  /** Background color for the icon container */
  backgroundColor?: string
  /** Icon size from nice-styles fontSize tokens */
  size?: IconSizeType
  /** Border radius for the icon container */
  borderRadius?: IconBorderRadiusType
  /** Image size as percentage of container */
  imageSize?: string
  /** SVG viewBox attribute for built-in icons */
  viewBox?: string
  /** Whether the icon should spin */
  spinning?: boolean
  /** Rotation angle in degrees */
  rotation?: number
  /** Stroke width for stroke variant - uses BorderWidthType from nice-styles tokens */
  strokeWidth?: BorderWidthType
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