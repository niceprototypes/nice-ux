import { withBreakpoints } from "nice-react-styles"
import BaseLightbox from "./Lightbox"
import type { LightboxProps } from "./types"

const Lightbox = withBreakpoints<LightboxProps>(BaseLightbox)

export default Lightbox
export { default as LightboxTypes } from "./types"
export * from "./types"
