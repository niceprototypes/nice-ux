import * as React from "react"
import type { ForegroundColorType, FontSizeType, FontWeightType, LineHeightType, ModeType } from "nice-styles"

/**
 * TypographyAlignType
 *
 * Text alignment options for horizontal text positioning.
 *
 * Values:
 * - "left": Align text to the left edge
 * - "center": Center text horizontally
 * - "right": Align text to the right edge
 * - "justify": Stretch lines to fill the container width
 */
export type TypographyAlignType = "left" | "center" | "right" | "justify"

/**
 * TypographyAsType
 *
 * HTML element types supported by the Typography component.
 * Determines semantic meaning and default styling.
 *
 * Values:
 * - "h1" through "h4": Heading elements for document structure
 * - "p": Paragraph element for body text
 * - "span": Inline element for text within other elements
 */
export type TypographyAsType = "h1" | "h2" | "h3" | "h4" | "p" | "span"

/**
 * TypographyColorType
 *
 * Re-export of ForegroundColorType from nice-styles.
 * Text color values using design tokens.
 */
export type TypographyColorType = ForegroundColorType

/**
 * TypographySizeType
 *
 * Re-export of FontSizeType from nice-styles.
 * Font size values using design tokens.
 */
export type TypographySizeType = FontSizeType

/**
 * TypographyWeightType
 *
 * Re-export of FontWeightType from nice-styles.
 * Font weight values using design tokens.
 */
export type TypographyWeightType = FontWeightType

/**
 * TypographyLineHeightType
 *
 * Re-export of LineHeightType from nice-styles.
 * Line height values using design tokens.
 */
export type TypographyLineHeightType = LineHeightType

/**
 * TypographyModeType
 *
 * Re-export of ModeType from nice-styles.
 * Pin token resolution to a specific mode instead of responding to media query.
 *
 * Built-in values:
 * - "day": Force day/light mode tokens
 * - "night": Force night/dark mode tokens
 *
 * Consumers may define additional custom modes.
 */
export type TypographyModeType = ModeType

/**
 * TypographyLineClampType
 *
 * Line clamping to truncate text after a specified number of lines.
 * Based on CSS line-clamp property (CSS Overflow Module Level 4).
 *
 * Values:
 * - "none": No line limit, display all content
 * - number (1-∞): Maximum number of lines before truncation with ellipsis
 */
export type TypographyLineClampType = "none" | number

/**
 * TypographyWordBreakType
 *
 * Controls line break behavior for overflowing text.
 * Based on CSS word-break property.
 *
 * Values:
 * - "normal": Default word breaking rules
 * - "break-all": Allow breaks between any two characters
 * - "keep-all": Prevent breaks in CJK text, normal for others
 * - "break-word": Deprecated, use overflow-wrap instead
 */
export type TypographyWordBreakType = "normal" | "break-all" | "keep-all" | "break-word"

/**
 * TypographyProps
 *
 * Complete prop definition for the Typography component.
 * All typography-related props support design tokens from nice-styles.
 */
export type TypographyProps = {
  /** Text alignment */
  align?: TypographyAlignType

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

  /** Text color from nice-styles tokens */
  color?: TypographyColorType

  /** Pin token resolution to a specific mode instead of responding to media query */
  mode?: TypographyModeType

  /** Apply legibility optimizations (hardware acceleration, 3D transforms) */
  legibilityOptimized?: boolean

  /**
   * Truncate text after specified number of lines with ellipsis.
   * Set to "none" or omit to show all content.
   */
  lineClamp?: TypographyLineClampType

  /** Line height setting (defaults based on element type) */
  lineHeight?: TypographyLineHeightType

  /** Font size from nice-styles tokens */
  size?: TypographySizeType

  /** Inline styles */
  style?: React.CSSProperties

  /** Font weight from nice-styles tokens */
  weight?: TypographyWeightType

  /**
   * Controls line break behavior for overflowing text.
   * Useful for handling long words or URLs.
   */
  wordBreak?: TypographyWordBreakType
}

// Legacy exports for backwards compatibility
export type AlignType = TypographyAlignType
export type AsType = TypographyAsType

// Declaration merging: const + namespace creates exportable type namespace
const TypographyTypes = {} as const

namespace TypographyTypes {
  export type Align = TypographyAlignType
  export type As = TypographyAsType
  export type Color = TypographyColorType
  export type Size = TypographySizeType
  export type Weight = TypographyWeightType
  export type LineHeight = TypographyLineHeightType
  export type LineClamp = TypographyLineClampType
  export type Mode = TypographyModeType
  export type WordBreak = TypographyWordBreakType
  export type Props = TypographyProps
}

export default TypographyTypes