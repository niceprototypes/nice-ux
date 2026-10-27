import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "nice-react-styles"
import BaseCode from "./Code"
import type { CodeProps } from "./Code.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an
// unbound generic `<P>` in dist or collapse to `any`, erasing the `breakpoints`
// prop on consumers. Mirrors the standard bearer (nice-react-ink).
const Code: React.FC<WithBreakpointsProps<CodeProps>> = withBreakpoints<CodeProps>(BaseCode)

export default Code
export * from "./Code.types"
export { default as CodeTypes } from "./Code.types"
