import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseDialog from "./Dialog"
import type { DialogProps } from "./Dialog.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an
// unbound generic `<P>` in dist or collapse to `any`, erasing the `breakpoints`
// prop on consumers. Mirrors the standard bearer (@niceprototypes/ink).
const Dialog: React.FC<WithBreakpointsProps<DialogProps>> = withBreakpoints<DialogProps>(BaseDialog)

export default Dialog
export * from "./Dialog.types"
export { default as DialogTypes } from "./Dialog.types"
