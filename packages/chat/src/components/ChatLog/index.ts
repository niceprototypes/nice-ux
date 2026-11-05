import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseChatLog from "./ChatLog"
import type { ChatLogProps } from "./ChatLog.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const ChatLog: React.FC<WithBreakpointsProps<ChatLogProps>> = withBreakpoints<ChatLogProps>(BaseChatLog)

export { ChatLog }
export * from "./ChatLog.types"
export { default as ChatLogTypes } from "./ChatLog.types"
