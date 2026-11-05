import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseChatSuggestions from "./ChatSuggestions"
import type { ChatSuggestionsProps } from "./ChatSuggestions.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const ChatSuggestions: React.FC<WithBreakpointsProps<ChatSuggestionsProps>> = withBreakpoints<ChatSuggestionsProps>(BaseChatSuggestions)

export { ChatSuggestions }
export * from "./ChatSuggestions.types"
export { default as ChatSuggestionsTypes } from "./ChatSuggestions.types"
