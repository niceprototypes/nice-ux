import * as React from "react"
import type { ColorType, FontSizeType, FontWeightType, LineHeightType, ThemeType } from "nice-react-styles"

/**
 * InkAlignType
 *
 * Text alignment options for horizontal text positioning.
 *
 * Values:
 * - "left": Align text to the left edge
 * - "center": Center text horizontally
 * - "right": Align text to the right edge
 * - "justify": Stretch lines to fill the container width
 */
export type InkAlignType = "left" | "center" | "right" | "justify"

/**
 * InkAsType
 *
 * HTML element types supported by the Ink component.
 * Determines semantic meaning and default styling.
 *
 * Values:
 * - "h1" through "h4": Heading elements for document structure
 * - "p": Paragraph element for body text
 * - "span": Inline element for text within other elements
 */
export type InkAsType = "h1" | "h2" | "h3" | "h4" | "p" | "span"

/**
 * InkColorType
 *
 * Re-export of ColorType from nice-styles.
 * Text color values using design tokens.
 */
export type InkColorType = ColorType

/**
 * InkSizeType
 *
 * Re-export of FontSizeType from nice-styles.
 * Font size values using design tokens.
 */
export type InkSizeType = FontSizeType

/**
 * InkWeightType
 *
 * Re-export of FontWeightType from nice-styles.
 * Font weight values using design tokens.
 */
export type InkWeightType = FontWeightType

/**
 * InkLineHeightType
 *
 * Re-export of LineHeightType from nice-styles.
 * Line height values using design tokens.
 */
export type InkLineHeightType = LineHeightType

/**
 * InkThemeType
 *
 * Re-export of ThemeType from nice-styles.
 * Pin token resolution to a specific theme instead of responding to media query.
 *
 * Built-in values:
 * - "day": Force day/light theme tokens
 * - "night": Force night/dark theme tokens
 *
 * Consumers may define additional custom themes.
 */
export type InkThemeType = ThemeType

/**
 * InkLineClampType
 *
 * Line clamping to truncate text after a specified number of lines.
 * Based on CSS line-clamp property (CSS Overflow Module Level 4).
 *
 * Values:
 * - "none": No line limit, display all content
 * - number (1-∞): Maximum number of lines before truncation with ellipsis
 */
export type InkLineClampType = "none" | number

/**
 * InkWordBreakType
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
export type InkWordBreakType = "normal" | "break-all" | "keep-all" | "break-word"

/**
 * InkProps
 *
 * Complete prop definition for the Ink component.
 * All Ink-related props support design tokens from nice-styles.
 */
export type InkProps = {
  /** Text alignment */
  align?: InkAlignType

  /** Enable font antialiasing for smoother text rendering */
  antialiased?: boolean

  /** HTML element to render */
  as?: InkAsType

  /** Text content or child elements */
  children: React.ReactNode

  /** CSS class name for styling */
  className?: string

  /** Apply monospace font for code snippets */
  code?: boolean

  /** Text color from nice-styles tokens */
  color?: InkColorType

  /** Pin token resolution to a specific theme instead of responding to media query */
  theme?: InkThemeType

  /** Apply legibility optimizations (hardware acceleration, 3D transforms) */
  legibilityOptimized?: boolean

  /**
   * Truncate text after specified number of lines with ellipsis.
   * Set to "none" or omit to show all content.
   */
  lineClamp?: InkLineClampType

  /** Line height setting (defaults based on element type) */
  lineHeight?: InkLineHeightType

  /** Font size from nice-styles tokens */
  size?: InkSizeType

  /** Inline styles */
  style?: React.CSSProperties

  /** Font weight from nice-styles tokens */
  weight?: InkWeightType

  /**
   * Controls line break behavior for overflowing text.
   * Useful for handling long words or URLs.
   */
  wordBreak?: InkWordBreakType
}

// Legacy exports for backwards compatibility
export type AlignType = InkAlignType
export type AsType = InkAsType

// Declaration merging: const + namespace creates exportable type namespace
const InkTypes = {} as const

namespace InkTypes {
  export type Align = InkAlignType
  export type As = InkAsType
  export type Color = InkColorType
  export type Size = InkSizeType
  export type Weight = InkWeightType
  export type LineHeight = InkLineHeightType
  export type LineClamp = InkLineClampType
  export type Theme = InkThemeType
  export type WordBreak = InkWordBreakType
  export type Props = InkProps
}

export default InkTypes
