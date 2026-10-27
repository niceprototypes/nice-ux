import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseLine from "./Line"
import type { LineProps } from "./Line.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const Line: React.FC<WithBreakpointsProps<LineProps>> = withBreakpoints<LineProps>(BaseLine)

export default Line
export * from "./Line.types"
export { default as LineTypes } from "./Line.types"
