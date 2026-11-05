import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseChatMessage from "./ChatMessage"
import type { ChatMessageProps } from "./ChatMessage.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const ChatMessage: React.FC<WithBreakpointsProps<ChatMessageProps>> = withBreakpoints<ChatMessageProps>(BaseChatMessage)

export { ChatMessage }
export * from "./ChatMessage.types"
export { default as ChatMessageTypes } from "./ChatMessage.types"
