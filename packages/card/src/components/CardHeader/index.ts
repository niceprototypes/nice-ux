import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseCardHeader from "./CardHeader"
import type { CardHeaderProps } from "./CardHeader.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const CardHeader: React.FC<WithBreakpointsProps<CardHeaderProps>> = withBreakpoints<CardHeaderProps>(BaseCardHeader)

export { CardHeader }
export * from "./CardHeader.types"
export { default as CardHeaderTypes } from "./CardHeader.types"
