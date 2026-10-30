import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseRadio from "./Radio"
import type { RadioProps } from "./Radio.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const Radio: React.FC<WithBreakpointsProps<RadioProps>> = withBreakpoints<RadioProps>(BaseRadio)

export { Radio }
export * from "./Radio.types"
export { default as RadioTypes } from "./Radio.types"
