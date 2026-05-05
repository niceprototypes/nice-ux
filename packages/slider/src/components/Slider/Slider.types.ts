import * as React from "react"

/**
 * SliderChildrenType
 *
 * Array of slide elements to render. Each entry becomes one positioned
 * slide; the active slide is selected by `currentIndex`.
 */
export type SliderChildrenType = React.ReactNode[]

/**
 * SliderCurrentIndexType
 *
 * Zero-based index of the currently active slide. Driving this value
 * up or down triggers the slide transition.
 */
export type SliderCurrentIndexType = number

/**
 * SliderIsAnimatingType
 *
 * Whether a slide transition is in progress. While true, the component
 * schedules an `onAnimationComplete` callback once the CSS transition
 * window elapses.
 */
export type SliderIsAnimatingType = boolean

/**
 * SliderOnAnimationCompleteType
 *
 * Callback fired after the slide transition finishes. The duration is
 * driven by the `animationDuration.base` token from nice-styles.
 */
export type SliderOnAnimationCompleteType = () => void

/**
 * SliderProps
 *
 * Complete prop definition for the Slider component.
 */
export interface SliderProps {
  /** Slide elements to render */
  children: SliderChildrenType
  /** Active slide index (zero-based) */
  currentIndex?: SliderCurrentIndexType
  /** Whether a transition is currently in progress */
  isAnimating?: SliderIsAnimatingType
  /** Fired after the transition window elapses */
  onAnimationComplete?: SliderOnAnimationCompleteType
  /** Inline styles applied to the root element */
  style?: React.CSSProperties
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
