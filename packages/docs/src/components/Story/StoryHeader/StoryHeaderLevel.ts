import * as React from "react"

/**
 * The heading element StoryHeader renders its title as. A page renders its own header as
 * `h1`; ComponentDocs sets `h2` for the sections it stacks under that header.
 */
export const StoryHeaderLevel = React.createContext<"h1" | "h2">("h1")
