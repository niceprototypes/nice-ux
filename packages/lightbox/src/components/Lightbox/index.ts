import { withBreakpoints } from "nice-react-styles"
import BaseLightbox from "./Lightbox"
import type { LightboxProps } from "./Lightbox.types"

const Lightbox = withBreakpoints<LightboxProps>(BaseLightbox)

export default Lightbox
export { default as LightboxTypes } from "./Lightbox.types"
export * from "./Lightbox.types"
