import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "nice-react-styles"
import BaseDateField from "./DateField"
import type { DateFieldProps } from "./DateField.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an
// unbound generic `<P>` in dist or collapse to `any`, erasing the `breakpoints`
// prop on consumers. Mirrors the standard bearer (nice-react-ink).
const DateField: React.FC<WithBreakpointsProps<DateFieldProps>> = withBreakpoints<DateFieldProps>(BaseDateField)

export { DateField }
export * from "./DateField.types"
export { default as DateFieldTypes } from "./DateField.types"
