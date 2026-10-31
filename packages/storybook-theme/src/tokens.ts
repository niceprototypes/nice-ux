import { getToken } from "@niceprototypes/styles"

/** The token groups this addon owns. Consumers spread them into their one `setTokens` call. */
export const TOKENS = {
  contentMaxWidth: { base: { phone: "100%", tablet: "100%", "laptop+": "720px" } },
  /** The sidebar's active colour: the selected row and its branch line. */
  highlight: { base: getToken("color:link") },
} as const

/** The docs content width cap as a CSS value, for styled components and inline styles. */
export const contentMaxWidth: string = getToken(["contentMaxWidth" satisfies keyof typeof TOKENS])
