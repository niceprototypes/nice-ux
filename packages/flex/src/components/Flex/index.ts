import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "nice-react-styles"
import BaseFlex from "./Flex"
import type { FlexProps } from "./types"

// Explicit return-type annotation — without it, TS declaration emit collapses
// the wrapped const to `any` (or to an unbound generic), which erases the
// `breakpoints` prop on consumers.
const Flex: React.FC<WithBreakpointsProps<FlexProps>> = withBreakpoints<FlexProps>(BaseFlex)

export default Flex
export { default as FlexTypes } from "./types"
export * from "./types"
