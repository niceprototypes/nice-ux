import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BasePopover from "./Popover"
import type { PopoverProps } from "./Popover.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an
// unbound generic `<P>` in dist or collapse to `any`, erasing the `breakpoints`
// prop on consumers. Mirrors the standard bearer (@niceprototypes/ink).
const Popover: React.FC<WithBreakpointsProps<PopoverProps>> = withBreakpoints<PopoverProps>(BasePopover)

export default Popover
export * from "./Popover.types"
export { default as PopoverTypes } from "./Popover.types"
