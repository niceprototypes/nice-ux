import * as React from "react"

/**
 * Children slides for the slider
 */
export type SliderChildrenType = React.ReactNode[]

/**
 * Current slide index
 */
export type SliderCurrentIndexType = number

/**
 * Whether the slider is currently animating
 */
export type SliderIsAnimatingType = boolean

/**
 * Callback when animation completes
 */
export type SliderOnAnimationCompleteType = () => void

/**
 * Props for Slider component
 */
export interface SliderProps {
  children: SliderChildrenType
  currentIndex?: SliderCurrentIndexType
  isAnimating?: SliderIsAnimatingType
  onAnimationComplete?: SliderOnAnimationCompleteType
}

// Declaration merging: const + namespace creates exportable type namespace
const SliderTypes = {} as const

namespace SliderTypes {
  export type Children = SliderChildrenType
  export type CurrentIndex = SliderCurrentIndexType
  export type IsAnimating = SliderIsAnimatingType
  export type OnAnimationComplete = SliderOnAnimationCompleteType
  export type Props = SliderProps
}

export default SliderTypes
