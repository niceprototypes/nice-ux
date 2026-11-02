/**
 * CodeCopyLanguageType
 *
 * Language as authored on the code fence (e.g. "ts", "bash"). Names the icon for screen readers
 * ("Copy TS"); without one it is "Copy".
 */
export type CodeCopyLanguageType = string

/**
 * CodeCopyCodeType
 *
 * The code the button copies.
 */
export type CodeCopyCodeType = string

/**
 * CodeCopyProps
 *
 * Props for the copy icon pinned to the top-right of a code block.
 */
export interface CodeCopyProps {
  /** The code to copy */
  code: CodeCopyCodeType
  /** Language as authored on the code fence */
  language?: CodeCopyLanguageType
}

// Declaration merging: const + namespace creates an exportable type namespace.
const CodeCopyTypes = {} as const

namespace CodeCopyTypes {
  export type Code = CodeCopyCodeType
  export type Language = CodeCopyLanguageType
  export type Props = CodeCopyProps
}

export default CodeCopyTypes
