import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseMarkdown from "./Markdown"
import type { MarkdownProps } from "./Markdown.types"

// Explicit return-type annotation — without it, TS declaration emit can leave
// an unbound generic `<P>` in dist or collapse to `any`, erasing the
// `breakpoints` prop on consumers.
const Markdown: React.FC<WithBreakpointsProps<MarkdownProps>> = withBreakpoints<MarkdownProps>(BaseMarkdown)

export default Markdown
export * from "./Markdown.types"
export { default as MarkdownTypes } from "./Markdown.types"
