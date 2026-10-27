import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "nice-react-styles"
import BaseSelect from "./Select"
import type { SelectProps } from "./Select.types"

// Explicit return-type annotation — without it, TS declaration emit can leave
// an unbound generic `<P>` in dist or collapse to `any`, erasing the
// `breakpoints` prop on consumers.
const Select: React.FC<WithBreakpointsProps<SelectProps>> =
  withBreakpoints<SelectProps>(BaseSelect)

export default Select
export * from "./Select.types"
export { default as SelectTypes } from "./Select.types"
