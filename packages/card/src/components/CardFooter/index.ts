import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseCardFooter from "./CardFooter"
import type { CardFooterProps } from "./CardFooter.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const CardFooter: React.FC<WithBreakpointsProps<CardFooterProps>> = withBreakpoints<CardFooterProps>(BaseCardFooter)

export { CardFooter }
export * from "./CardFooter.types"
export { default as CardFooterTypes } from "./CardFooter.types"
