import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseCheckbox from "./Checkbox"
import type { CheckboxProps } from "./Checkbox.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const Checkbox: React.FC<WithBreakpointsProps<CheckboxProps>> = withBreakpoints<CheckboxProps>(BaseCheckbox)

export default Checkbox
export * from "./Checkbox.types"
export { default as CheckboxTypes } from "./Checkbox.types"
