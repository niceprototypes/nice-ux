import { ALIASES } from "./utilities/highlightCode"

/** The fence languages the highlighter maps to a grammar; any other `language` renders as plain text. */
export const codeLanguages = Object.keys(ALIASES)
