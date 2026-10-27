import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseTooltip from "./Tooltip"
import type { TooltipProps } from "./Tooltip.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an
// unbound generic `<P>` in dist or collapse to `any`, erasing the `breakpoints`
// prop on consumers. Mirrors the standard bearer (@niceprototypes/ink).
const Tooltip: React.FC<WithBreakpointsProps<TooltipProps>> = withBreakpoints<TooltipProps>(BaseTooltip)

export default Tooltip
export * from "./Tooltip.types"
export { default as TooltipTypes } from "./Tooltip.types"
