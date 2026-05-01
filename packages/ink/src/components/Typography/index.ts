import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "nice-react-styles"
import BaseTypography from "./Typography"
import type { TypographyProps } from "./types"

// Explicit return-type annotation — without it, TS declaration emit can leave
// an unbound generic `<P>` in dist or collapse to `any`, erasing the
// `breakpoints` prop on consumers.
const Typography: React.FC<WithBreakpointsProps<TypographyProps>> = withBreakpoints<TypographyProps>(BaseTypography)

export default Typography
export * from "./types"
export { default as TypographyTypes } from "./types"