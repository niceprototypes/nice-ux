// Re-export component
export { default } from "./Slider"

// Re-export types (both individual and namespace)
export type {
  SliderProps,
  SliderChildrenType,
  SliderCurrentIndexType,
  SliderIsAnimatingType,
  SliderOnAnimationCompleteType,
} from "./types"
export { default as SliderTypes } from "./types"
