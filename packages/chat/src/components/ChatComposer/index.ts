import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseChatComposer from "./ChatComposer"
import type { ChatComposerProps } from "./ChatComposer.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const ChatComposer: React.FC<WithBreakpointsProps<ChatComposerProps>> = withBreakpoints<ChatComposerProps>(BaseChatComposer)

export { ChatComposer }
export * from "./ChatComposer.types"
export { default as ChatComposerTypes } from "./ChatComposer.types"
