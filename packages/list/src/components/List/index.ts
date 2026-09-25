import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "nice-react-styles"
import BaseList from "./List"
import type { ListProps } from "./List.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an
// unbound generic `<P>` in dist or collapse to `any`, erasing the `breakpoints`
// prop on consumers. Mirrors the standard bearer (nice-react-ink).
const List: React.FC<WithBreakpointsProps<ListProps>> = withBreakpoints<ListProps>(BaseList)

export { List }
export { ListContext } from "./ListContext"
export * from "./List.types"
export { default as ListTypes } from "./List.types"
