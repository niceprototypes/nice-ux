import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseForm from "./Form"
import type { FormProps } from "./Form.types"

// Explicit return-type annotation — without it, TS declaration emit can leave
// an unbound generic `<P>` in dist or collapse to `any`, erasing the
// `breakpoints` prop on consumers.
const Form: React.FC<WithBreakpointsProps<FormProps>> = withBreakpoints<FormProps>(BaseForm)

export default Form
export * from "./Form.types"
export { default as FormTypes } from "./Form.types"
