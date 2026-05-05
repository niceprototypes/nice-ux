import { withBreakpoints } from "nice-react-styles"
import BaseImage from "./Image"
import type { ImageProps } from "./Image.types"

const Image = withBreakpoints<ImageProps>(BaseImage)

export default Image
export * from "./Image.types"
export { default as ImageTypes } from "./Image.types"