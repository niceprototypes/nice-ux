import * as React from "react"
import type { ColorTokenProp, ColorType, FontSizeType, FontWeightType, LineHeightType, ThemeType, TokenVariants } from "@niceprototypes/styles"

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
 * - "h1" through "h6": Heading elements for document structure
 * - "p": Paragraph element for body text
 * - "span": Inline element for text within other elements
 * - "a": Link; takes `href`, and the link color unless `color` is set
 * - "li": List item, inside a `ul` or `ol`
 * - "blockquote": Quoted block
 * - "cite": Title of a cited work
 * - "mark": Highlighted text
 * - "s": Text that is no longer accurate (struck through)
 */
export type InkAsType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "a" | "li" | "blockquote" | "cite" | "mark" | "s"

/**
 * InkHrefType
 *
 * Link destination. Applied only when `as` is "a".
 */
export type InkHrefType = string

/**
 * InkDecorationType
 *
 * Text decoration line (CSS `text-decoration-line`).
 * Not token-bound: a decoration line is a CSS keyword, not a design value.
 *
 * Values:
 * - "none": No line (e.g. removes the line from `s`)
 * - "underline": Line below the text
 * - "line-through": Line through the text
 * - "overline": Line above the text
 */
export type InkDecorationType = "none" | "underline" | "line-through" | "overline"

/**
 * InkTruncateType
 *
 * Whether the text stays on one line and ends in an ellipsis when it overflows.
 * Inline elements render as blocks so the overflow has a width to clip at.
 */
export type InkTruncateType = boolean

/**
 * InkLetterSpacingType
 *
 * Letter spacing from the `ink.letterSpacing` component tokens.
 *
 * Values:
 * - "tight", "base", "wide", "wider"
 */
export type InkLetterSpacingType = TokenVariants["ink.letterSpacing"]

/**
 * InkMaxWidthType
 *
 * Maximum line length from the `ink.maxWidth` component tokens.
 *
 * Values:
 * - "prose": Comfortable reading measure
 * - "wide": Longer measure
 * - "full": No limit
 */
export type InkMaxWidthType = TokenVariants["ink.maxWidth"]

/**
 * InkColorType
 *
 * Re-export of ColorType from @niceprototypes/styles.
 * Text color values using design tokens.
 */
export type InkColorType = ColorType

/**
 * InkSizeType
 *
 * Re-export of FontSizeType from @niceprototypes/styles.
 * Font size values using design tokens.
 */
export type InkSizeType = FontSizeType

/**
 * InkWeightType
 *
 * Re-export of FontWeightType from @niceprototypes/styles.
 * Font weight values using design tokens.
 */
export type InkWeightType = FontWeightType

/**
 * InkLineHeightType
 *
 * Re-export of LineHeightType from @niceprototypes/styles.
 * Line height values using design tokens.
 */
export type InkLineHeightType = LineHeightType

/**
 * InkThemeType
 *
 * Re-export of ThemeType from @niceprototypes/styles.
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
 * InkItalicType
 *
 * Whether the text renders in italics (`font-style: italic`).
 * Not token-bound: font-style is a CSS keyword, not a design value.
 */
export type InkItalicType = boolean

/**
 * InkProps
 *
 * Complete prop definition for the Ink component.
 * All Ink-related props support design tokens from @niceprototypes/styles.
 */
export type InkProps = {
  /** Text alignment */
  align?: InkAlignType

  /** Enable font antialiasing for smoother text rendering */
  antialiased?: boolean

  /** HTML element to render. @default "span" */
  as?: InkAsType

  /** Text content or child elements */
  children: React.ReactNode

  /** CSS class name for styling */
  className?: string

  /** Apply monospace font for code snippets */
  code?: boolean

  /** Text decoration line */
  decoration?: InkDecorationType

  /** Link destination; applied when `as` is "a" */
  href?: InkHrefType

  /** Element id, e.g. an anchor target for in-page links */
  id?: string

  /** Render the text in italics. @default false */
  italic?: InkItalicType

  /**
   * Text color from @niceprototypes/styles tokens. Either the variant name, or an object
   * adding effects: `{ name: "highlight", transform: [null, null, 40, null] }`.
   */
  color?: ColorTokenProp<InkColorType>

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

  /** Letter spacing from the `ink.letterSpacing` tokens */
  letterSpacing?: InkLetterSpacingType

  /** Maximum line length from the `ink.maxWidth` tokens */
  maxWidth?: InkMaxWidthType

  /** Font size from @niceprototypes/styles tokens. Defaults by `as`: h1 "larger", h2 "large", others "base" */
  size?: InkSizeType

  /** Inline styles */
  style?: React.CSSProperties

  /** Keep the text on one line, ending in an ellipsis when it overflows. @default false */
  truncate?: InkTruncateType

  /** Font weight from @niceprototypes/styles tokens */
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
  export type Decoration = InkDecorationType
  export type Href = InkHrefType
  export type Italic = InkItalicType
  export type LetterSpacing = InkLetterSpacingType
  export type MaxWidth = InkMaxWidthType
  export type Truncate = InkTruncateType
  export type Size = InkSizeType
  export type Weight = InkWeightType
  export type LineHeight = InkLineHeightType
  export type LineClamp = InkLineClampType
  export type Theme = InkThemeType
  export type WordBreak = InkWordBreakType
  export type Props = InkProps
}

export default InkTypes
