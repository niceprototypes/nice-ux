import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseChatCopyAction from "./ChatCopyAction"
import type { ChatCopyActionProps } from "./ChatCopyAction.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const ChatCopyAction: React.FC<WithBreakpointsProps<ChatCopyActionProps>> = withBreakpoints<ChatCopyActionProps>(BaseChatCopyAction)

export { ChatCopyAction }
export * from "./ChatCopyAction.types"
export { default as ChatCopyActionTypes } from "./ChatCopyAction.types"
