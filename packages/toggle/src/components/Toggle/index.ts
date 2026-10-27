import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseToggle from "./Toggle"
import type { ToggleProps } from "./Toggle.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const Toggle: React.FC<WithBreakpointsProps<ToggleProps>> = withBreakpoints<ToggleProps>(BaseToggle)

export default Toggle
export * from "./Toggle.types"
export { default as ToggleTypes } from "./Toggle.types"
