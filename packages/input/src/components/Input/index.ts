import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "nice-react-styles"
import BaseInput from "./Input"
import type { InputProps } from "./Input.types"

// Explicit return-type annotation — without it, TS declaration emit can leave
// an unbound generic `<P>` in dist or collapse to `any`, erasing the
// `breakpoints` prop on consumers.
const Input: React.FC<WithBreakpointsProps<InputProps>> = withBreakpoints<InputProps>(BaseInput)

export default Input
export * from "./Input.types"
export { default as InputTypes } from "./Input.types"