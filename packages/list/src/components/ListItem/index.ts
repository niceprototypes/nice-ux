import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "nice-react-styles"
import BaseListItem from "./ListItem"
import type { ListItemProps } from "./ListItem.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an
// unbound generic `<P>` in dist or collapse to `any`, erasing the `breakpoints`
// prop on consumers. Mirrors the standard bearer (nice-react-ink).
const ListItem: React.FC<WithBreakpointsProps<ListItemProps>> = withBreakpoints<ListItemProps>(BaseListItem)

export { ListItem }
export * from "./ListItem.types"
export { default as ListItemTypes } from "./ListItem.types"
