import { withBreakpoints } from "nice-react-styles"
import BaseImage from "./Image"
import type { ImageProps } from "./types"

const Image = withBreakpoints<ImageProps>(BaseImage)

export default Image
export * from "./types"
export { default as ImageTypes } from "./types"