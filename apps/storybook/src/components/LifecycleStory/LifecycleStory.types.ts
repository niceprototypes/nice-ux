import type * as React from "react"
import type { LifecycleStepVariant } from "../../nice/tokens"

/**
 * One state of a component's UX lifecycle.
 * - label: state name shown in the caption under the demo ("rest", "selected", …)
 * - props: props handed to `render` for this state. A state is reached through
 *   props or controlled state only, never synthetic DOM events
 * - duration: `lifecycleStep` token variant this state is held for. @default "base"
 */
export interface LifecycleStep<P> {
  label: string
  props: P
  duration?: LifecycleStepVariant
}

export interface LifecycleStoryProps<P> {
  /** States in lifecycle order; the story loops back to the first after the last */
  steps: ReadonlyArray<LifecycleStep<P>>
  /** Renders the real component for one step's props */
  render: (props: P) => React.ReactNode
}
