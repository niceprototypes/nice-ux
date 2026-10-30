import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseCardBody from "./CardBody"
import type { CardBodyProps } from "./CardBody.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const CardBody: React.FC<WithBreakpointsProps<CardBodyProps>> = withBreakpoints<CardBodyProps>(BaseCardBody)

export { CardBody }
export * from "./CardBody.types"
export { default as CardBodyTypes } from "./CardBody.types"
