import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseRadioGroup from "./RadioGroup"
import type { RadioGroupProps } from "./RadioGroup.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const RadioGroup: React.FC<WithBreakpointsProps<RadioGroupProps>> = withBreakpoints<RadioGroupProps>(BaseRadioGroup)

export { RadioGroup }
export * from "./RadioGroup.types"
export { default as RadioGroupTypes } from "./RadioGroup.types"
