import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseGridItem from "./GridItem"
import type { GridItemProps } from "./GridItem.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const GridItem: React.FC<WithBreakpointsProps<GridItemProps>> = withBreakpoints<GridItemProps>(BaseGridItem)

export { GridItem }
export * from "./GridItem.types"
export { default as GridItemTypes } from "./GridItem.types"
