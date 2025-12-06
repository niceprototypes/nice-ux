import type { FontSizeType, BorderWidthType, ForegroundColorType } from "nice-styles"


/**
 * Available icon names in the icon set
 */
export const iconNames = [
  "arrow",
  "attention",
  "box",
  "brush",
  "calendar",
  "cancel",
  "carat",
  "check",
  "cloud",
  "code",
  "cog",
  "contact",
  "content",
  "edit",
  "link",
  "lock",
  "menu",
  "message",
  "pause",
  "placeholder",
  "plus",
  "profile",
  "puzzle",
  "search",
  "shuffle",
  "skip",
  "spinner",
  "trash",
  "upload",
  "x",
] as const

export type IconNameType = (typeof iconNames)[number]

/**
 * Icon size type - uses FontSizeType from nice-styles tokens
 */
export type IconSizeType = FontSizeType

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
  /** Use stroke variant (true) or fill variant (false) */
  stroke?: boolean
  /** Custom SVG URL (overrides name) */
  url?: string
  /** Icon color - uses ForegroundColorType from nice-styles tokens */
  color?: ForegroundColorType
  /** Icon size from nice-styles fontSize tokens */
  size?: IconSizeType
  /** SVG viewBox attribute for built-in icons */
  viewBox?: string
  /** Stroke width for stroke type - uses BorderWidthType from nice-styles tokens */
  strokeWidth?: BorderWidthType
  /** Additional CSS class */
  className?: string
}