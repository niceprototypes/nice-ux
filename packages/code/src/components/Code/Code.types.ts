import type * as React from "react"
import type { GapType, TokenVariants } from "@niceprototypes/styles"

/**
 * CodeCodeType
 *
 * The source string to highlight and render.
 */
export type CodeCodeType = string

/**
 * CodeLanguageType
 *
 * Fence language used to pick the Shiki grammar (e.g. "tsx", "css", "bash").
 * Unmapped values fall back to plain text.
 */
export type CodeLanguageType = string

/**
 * CodeShowLabelType
 *
 * Whether to show the copy icon (named "Copy TSX" for screen readers) in the top-right corner.
 */
export type CodeShowLabelType = boolean

/**
 * CodeCopyOnClickType
 *
 * Whether clicking the block copies its code to the clipboard.
 */
export type CodeCopyOnClickType = boolean

/**
 * CodeInlinedType
 *
 * Strip the card chrome — border, radius, box-shadow, padding — and render the
 * highlighted code flush as plain text (no scroll container).
 */
export type CodeInlinedType = boolean

/**
 * CodeFitType
 *
 * Shrink the card to its content (`width: max-content`) so it sits beside other
 * content. Off (the default), the card fills its container, capped by `code.maxWidth`
 * (100% unless set narrower), and long lines scroll inside it.
 */
export type CodeFitType = boolean

/**
 * CodeMarginType
 *
 * Re-export of GapType from @niceprototypes/styles. Top/bottom margin variant. Use "none"
 * for blocks embedded in a layout that owns its own spacing.
 */
export type CodeMarginType = GapType

/**
 * CodeMaxHeightType
 *
 * Collapsed height of a card block, as a `code.maxHeight` token variant. Taller
 * code is cut off with a fade above a drag bar that sets the visible height between
 * this cap and the full code (pointer, or arrow keys, Home and End); shorter code
 * renders in full with no bar. "none" never collapses.
 */
export type CodeMaxHeightType = "none" | TokenVariants["code.maxHeight"]

/**
 * CodeClassNameType
 *
 * CSS class name applied to the root element.
 */
export type CodeClassNameType = string

/**
 * CodeChildrenType
 *
 * A live demo of the code, shown above it in the same block (a card block only): with the
 * code's padding on the block's surface, one divider in the border's colour between them.
 */
export type CodeChildrenType = React.ReactNode

/**
 * CodeProps
 *
 * Complete prop definition for the Code component.
 */
export interface CodeProps {
  /** The source string to highlight and render. */
  code: CodeCodeType
  /** Fence language (e.g. "tsx", "css", "bash"). */
  language?: CodeLanguageType
  /** Show the copy icon in the top-right corner. @default true */
  showLabel?: CodeShowLabelType
  /** Copy the code to the clipboard on click. @default true */
  copyOnClick?: CodeCopyOnClickType
  /** Strip card chrome and render flush inline as plain code text. @default false */
  inlined?: CodeInlinedType
  /** Shrink the card to its content width. @default false */
  fit?: CodeFitType
  /** Top/bottom margin as a `gap` token variant. @default "large" */
  margin?: CodeMarginType
  /** Collapse card blocks taller than this `code.maxHeight` token, with a fade and a drag bar. @default "base" */
  maxHeight?: CodeMaxHeightType
  /** CSS class name applied to the root element. */
  className?: CodeClassNameType
  /** A live demo of the code, shown above it in the same block (card blocks only). */
  children?: CodeChildrenType
}

// Declaration merging: const + namespace creates an exportable type namespace.
const CodeTypes = {} as const

namespace CodeTypes {
  export type Code = CodeCodeType
  export type Language = CodeLanguageType
  export type ShowLabel = CodeShowLabelType
  export type CopyOnClick = CodeCopyOnClickType
  export type Inlined = CodeInlinedType
  export type Fit = CodeFitType
  export type Margin = CodeMarginType
  export type MaxHeight = CodeMaxHeightType
  export type ClassName = CodeClassNameType
  export type Children = CodeChildrenType
  export type Props = CodeProps
}

export default CodeTypes
