import { withBreakpoints } from "nice-react-styles"
import BaseIcon from "./Icon"
import type { IconProps } from "./types"

const Icon = withBreakpoints<IconProps>(BaseIcon)

export default Icon
export * from "./types"
export { default as IconTypes } from "./types"
