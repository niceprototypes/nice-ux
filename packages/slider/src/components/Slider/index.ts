import { withBreakpoints } from "nice-react-styles"
import BaseSlider from "./Slider"
import type { SliderProps } from "./types"

const Slider = withBreakpoints<SliderProps>(BaseSlider)

export default Slider
export * from "./types"
export { default as SliderTypes } from "./types"