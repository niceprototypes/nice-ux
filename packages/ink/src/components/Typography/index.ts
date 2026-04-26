import { withBreakpoints } from "nice-react-styles"
import BaseTypography from "./Typography"
import type { TypographyProps } from "./types"

const Typography = withBreakpoints<TypographyProps>(BaseTypography)

export default Typography
export * from "./types"
export { default as TypographyTypes } from "./types"