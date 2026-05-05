import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "nice-react-styles"
import BaseButton from "./Button"
import type { ButtonProps } from "./Button.types"

// Explicit return-type annotation — without it, TS declaration emit can leave
// an unbound generic `<P>` in dist or collapse to `any`, erasing the
// `breakpoints` prop on consumers.
const Button: React.FC<WithBreakpointsProps<ButtonProps>> = withBreakpoints<ButtonProps>(BaseButton)

export default Button
export * from "./Button.types"
export { default as ButtonTypes } from "./Button.types"
