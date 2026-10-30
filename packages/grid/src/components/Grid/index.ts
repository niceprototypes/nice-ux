import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseGrid from "./Grid"
import type { GridProps } from "./Grid.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const Grid: React.FC<WithBreakpointsProps<GridProps>> = withBreakpoints<GridProps>(BaseGrid)

export { Grid }
export * from "./Grid.types"
export { default as GridTypes } from "./Grid.types"
