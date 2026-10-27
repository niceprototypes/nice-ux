import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "nice-react-styles"
import BaseLogo from "./Logo"
import type { LogoProps } from "./Logo.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const Logo: React.FC<WithBreakpointsProps<LogoProps>> = withBreakpoints<LogoProps>(BaseLogo)

export default Logo
export * from "./Logo.types"
export { default as LogoTypes } from "./Logo.types"
