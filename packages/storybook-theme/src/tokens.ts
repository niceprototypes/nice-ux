import { getToken } from "@niceprototypes/styles"

/** The token groups this addon owns. Consumers spread them into their one `setTokens` call. */
export const TOKENS = {
  /** The sidebar's active colour: the selected row and its branch line. */
  highlight: { base: getToken("color:link") },
} as const
