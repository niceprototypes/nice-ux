import type { GapType } from "nice-react-styles"

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
 * Whether to show the language label in the top-right corner.
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
 * Shrink the card to its content (`width: max-content`) so it sits inline beside
 * other content rather than filling the row.
 */
export type CodeFitType = boolean

/**
 * CodeMarginType
 *
 * Re-export of GapType from nice-styles. Top/bottom margin variant. Use "none"
 * for blocks embedded in a layout that owns its own spacing.
 */
export type CodeMarginType = GapType

/**
 * CodeClassNameType
 *
 * CSS class name applied to the root element.
 */
export type CodeClassNameType = string

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
  /** Show the language label in the top-right corner. @default true */
  showLabel?: CodeShowLabelType
  /** Copy the code to the clipboard on click. @default true */
  copyOnClick?: CodeCopyOnClickType
  /** Strip card chrome and render flush inline as plain code text. @default false */
  inlined?: CodeInlinedType
  /** Shrink the card to its content width. @default true */
  fit?: CodeFitType
  /** Top/bottom margin as a `gap` token variant. @default "large" */
  margin?: CodeMarginType
  /** CSS class name applied to the root element. */
  className?: CodeClassNameType
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
  export type ClassName = CodeClassNameType
  export type Props = CodeProps
}

export default CodeTypes
