import * as React from "react"
import Flex from "@niceprototypes/flex"
import Ink from "../../nice/Ink"
import { getToken } from "../../nice/tokens"
import { DemoRegion } from "./LifecycleStory.styles"
import type { LifecycleStoryProps } from "./LifecycleStory.types"

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches

/** A CSS time value ("1200ms", "1.2s") in milliseconds. */
const toMilliseconds = (time: string) =>
  time.endsWith("ms") ? parseFloat(time) : parseFloat(time) * 1000

/**
 * The real component, driven automatically through its UX lifecycle. Each step
 * hands its props to `render` and is held for its `lifecycleStep` token
 * duration; after the last step the story loops to the first. The demo region
 * is inert with pointer events off, so viewers watch but cannot interact; the
 * caption under it names the current state.
 *
 * With `prefers-reduced-motion: reduce` the story does not advance: it shows
 * the first step and lists every step's label, the current one emphasized.
 */
function LifecycleStory<P>({ steps, render }: LifecycleStoryProps<P>) {
  const reducedMotion = React.useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)
  const [index, setIndex] = React.useState(0)
  const step = steps[reducedMotion ? 0 : index]

  React.useEffect(() => {
    if (reducedMotion || steps.length < 2) return
    const duration = toMilliseconds(getToken("lifecycleStep", step.duration ?? "base", { as: "value" }))
    const timer = setTimeout(() => setIndex(current => (current + 1) % steps.length), duration)
    return () => clearTimeout(timer)
  }, [reducedMotion, step, steps.length])

  return (
    <Flex
      direction="column"
      gap="base"
    >
      <DemoRegion inert>{render(step.props)}</DemoRegion>
      {reducedMotion ? (
        <Flex
          gap="small"
          wrap="wrap"
        >
          {steps.map((item, itemIndex) => (
            <Ink
              key={item.label}
              size="small"
              color={itemIndex === 0 ? "base" : "lighter"}
              weight={itemIndex === 0 ? "bold" : undefined}
            >
              {item.label}
            </Ink>
          ))}
        </Flex>
      ) : (
        <Ink
          size="small"
          color="lighter"
        >
          {`${index + 1} / ${steps.length} · ${step.label}`}
        </Ink>
      )}
    </Flex>
  )
}

export default LifecycleStory
