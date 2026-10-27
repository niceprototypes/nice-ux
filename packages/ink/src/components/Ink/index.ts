import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "nice-react-styles"
import BaseInk from "./Ink"
import type { InkProps } from "./Ink.types"

// Explicit return-type annotation — without it, TS declaration emit can leave
// an unbound generic `<P>` in dist or collapse to `any`, erasing the
// `breakpoints` prop on consumers.
const Ink: React.FC<WithBreakpointsProps<InkProps>> = withBreakpoints<InkProps>(BaseInk)

export default Ink
export * from "./Ink.types"
export { default as InkTypes } from "./Ink.types"