import * as React from "react"
import type { ForegroundColorType, FontSizeType, FontWeightType, LineHeightType } from "nice-styles"

/**
 * Text alignment options
 */
export type AlignType = "left" | "center" | "right" | "justify"

/**
 * HTML element types supported by the Typography component
 */
export type AsType = "h1" | "h2" | "h3" | "h4" | "p" | "span"

/**
 * Props for the Typography component
 */
export type TypographyProps = {
  /** Text alignment */
  align?: AlignType

  /** Enable font antialiasing for smoother text rendering */
  antialiased?: boolean

  /** HTML element to render */
  as?: AsType

  /** Text content or child elements */
  children: React.ReactNode

  /** CSS class name for styling */
  className?: string

  /** Apply monospace font for code snippets */
  code?: boolean

  /** Text color from nice-styles tokens (lighter, light, medium, heavy, base, disabled, link, success, warning, error) */
  color?: ForegroundColorType

  /** Apply legibility optimizations (hardware acceleration, 3D transforms) */
  legibilityOptimized?: boolean

  /** Line height setting (defaults based on element type) */
  lineHeight?: LineHeightType

  /** Font size from nice-styles tokens */
  size?: FontSizeType

  /** Font weight from nice-styles tokens */
  weight?: FontWeightType
}
