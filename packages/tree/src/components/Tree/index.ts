import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseTree from "./Tree"
import type { TreeProps } from "./Tree.types"

// Explicit return-type annotation — without it, TS declaration emit can leave
// an unbound generic `<P>` in dist or collapse to `any`, erasing the
// `breakpoints` prop on consumers.
const Tree: React.FC<WithBreakpointsProps<TreeProps>> = withBreakpoints<TreeProps>(BaseTree)

export default Tree
export * from "./Tree.types"
export { default as TreeTypes } from "./Tree.types"
