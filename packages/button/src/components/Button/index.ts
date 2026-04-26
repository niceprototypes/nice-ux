import { withBreakpoints } from "nice-react-styles"
import BaseButton from "./Button"
import type { ButtonProps } from "./types"

const Button = withBreakpoints<ButtonProps>(BaseButton)

export default Button
export * from "./types"
export { default as ButtonTypes } from "./types"
