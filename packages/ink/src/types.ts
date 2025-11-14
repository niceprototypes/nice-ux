import * as React from "react"

/**
 * Text alignment options
 */
export type AlignType = "left" | "center" | "right" | "justify"

/**
 * Line height options using CSS custom properties
 * - `default`: Standard line height (1.5) for body text
 * - `condensed`: Tighter line height (1.25) for headings
 */
export type LineHeightType = "default" | "condensed"

/**
 * Semantic status colors mapped to CSS custom properties
 * - **Core status colors (from nice-styles v3.0.0+)**: `active`, `error`, `success`, `warning` → `--status-color-*`
 * - **Shade variants (from nice-styles v3.0.0+)**: `darker`, `dark`, `default`, `light`, `lighter` → `--content-color-*`
 * - **Extended (custom)**: `disabled`, `highlighted`, `primary`, `secondary` → `--content-color-*`
 */
export type StatusType =
  | "active"
  | "dark"
  | "darker"
  | "default"
  | "disabled"
  | "error"
  | "highlighted"
  | "light"
  | "lighter"
  | "primary"
  | "secondary"
  | "success"
  | "warning"

/**
 * HTML element types supported by the Typography component
 */
export type TypographyAsType = "h1" | "h2" | "h3" | "h4" | "p" | "span"

/**
 * Props for the Typography component
 */
export type TypographyProps = {
  /** Text alignment */
  align?: AlignType

  /** Enable font antialiasing for smoother text rendering */
  antialiased?: boolean

  /** HTML element to render */
  as?: TypographyAsType

  /** Text content or child elements */
  children: React.ReactNode

  /** CSS class name for styling */
  className?: string

  /** Apply monospace font for code snippets */
  code?: boolean

  /** Custom text color (any valid CSS color value) */
  color?: string

  /** Apply legibility optimizations (hardware acceleration, 3D transforms) */
  legibilityOptimized?: boolean

  /** Line height setting (defaults based on element type) */
  lineHeight?: LineHeightType

  /** Font size (any valid CSS size value or CSS variable) */
  size?: string

  /** Semantic status color (overrides color prop) */
  status?: StatusType

  /** Font weight (any valid CSS weight value or CSS variable) */
  weight?: string
}
