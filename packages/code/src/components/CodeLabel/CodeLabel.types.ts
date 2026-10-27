/**
 * CodeLabelLanguageType
 *
 * Language as authored on the code fence (e.g. "ts", "bash"). Keys the friendly
 * display label; unknown-but-present values are upper-cased.
 */
export type CodeLabelLanguageType = string

/**
 * CodeLabelProps
 *
 * Props for the language badge pinned to the top-right of a code block.
 */
export interface CodeLabelProps {
  /** Language as authored on the code fence (e.g. "ts", "bash"). */
  language?: CodeLabelLanguageType
}

// Declaration merging: const + namespace creates an exportable type namespace.
const CodeLabelTypes = {} as const

namespace CodeLabelTypes {
  export type Language = CodeLabelLanguageType
  export type Props = CodeLabelProps
}

export default CodeLabelTypes
