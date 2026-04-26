import { withBreakpoints } from "nice-react-styles"
import BaseFlex from "./Flex"
import type { FlexProps } from "./types"

const Flex = withBreakpoints<FlexProps>(BaseFlex)

export default Flex
export { default as FlexTypes } from "./types"
export * from "./types"
