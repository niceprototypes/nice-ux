import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseContents from "./Contents"
import type { ContentsProps } from "./Contents.types"

// Explicit return-type annotation — without it, TS declaration emit can leave
// an unbound generic `<P>` in dist or collapse to `any`, erasing the
// `breakpoints` prop on consumers.
const Contents: React.FC<WithBreakpointsProps<ContentsProps>> = withBreakpoints<ContentsProps>(BaseContents)

export default Contents
export * from "./Contents.types"
export { default as ContentsTypes } from "./Contents.types"
