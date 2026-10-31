import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseListbox from "./Listbox"
import type { ListboxProps } from "./Listbox.types"

// Explicit return-type annotation — without it, TS declaration emit can leave
// an unbound generic `<P>` in dist or collapse to `any`, erasing the
// `breakpoints` prop on consumers.
const Listbox: React.FC<WithBreakpointsProps<ListboxProps>> = withBreakpoints<ListboxProps>(BaseListbox)

export default Listbox
export * from "./Listbox.types"
export { default as ListboxTypes } from "./Listbox.types"
