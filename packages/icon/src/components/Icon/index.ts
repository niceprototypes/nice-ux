import { withBreakpoints } from "@niceprototypes/styles"
import BaseIcon from "./Icon"
import type { IconProps } from "./Icon.types"

const Icon = withBreakpoints<IconProps>(BaseIcon)

export default Icon
export * from "./Icon.types"
export { default as IconTypes } from "./Icon.types"
