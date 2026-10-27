import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "nice-react-styles"
import BaseField from "./Field"
import type { FieldProps } from "./Field.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an
// unbound generic `<P>` in dist or collapse to `any`, erasing the `breakpoints`
// prop on consumers. Mirrors the standard bearer (nice-react-ink).
const Field: React.FC<WithBreakpointsProps<FieldProps>> = withBreakpoints<FieldProps>(BaseField)

export { Field }
export { FieldContext } from "./FieldContext"
export * from "./Field.types"
export { default as FieldTypes } from "./Field.types"
