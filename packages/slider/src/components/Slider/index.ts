import { withBreakpoints } from "nice-react-styles"
import BaseSlider from "./Slider"
import type { SliderProps } from "./Slider.types"

const Slider = withBreakpoints<SliderProps>(BaseSlider)

export default Slider
export * from "./Slider.types"
export { default as SliderTypes } from "./Slider.types"