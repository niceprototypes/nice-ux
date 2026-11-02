// Slider example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). ComponentDocs renders each entry as a section of the
// Slider docs page, sorted by name.
import { useState } from "react"
import type { ReactNode } from "react"
import Slider from "@niceprototypes/slider"
import Button from "@niceprototypes/button"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import { setTokens } from "@niceprototypes/styles"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/** The frame each preview gives Slider: it fills its parent, and its slides are absolutely positioned. */
const getToken = setTokens({ frame: { width: "320px", height: "120px" } }, "sliderExample")

/** The slide titles; a variant takes the first n. */
const SLIDES = ["Slide 1", "Slide 2", "Slide 3"]

/** One slide: its title. */
const Slide = ({ title }: { title: string }) => (
  <Flex padding="small">
    <Ink
      weight="bold"
      size="larger"
    >
      {title}
    </Ink>
  </Flex>
)

/** Sizes the Slider's parent from the sliderExample.frame tokens. */
const Frame = ({ children }: { children: ReactNode }) => (
  <Flex
    direction="column"
    style={{
      width: getToken("sliderExample.frame:width"),
      height: getToken("sliderExample.frame:height"),
    }}
  >
    {children}
  </Flex>
)

/** The slides' JSX in code snippets, indented one level. */
const slidesCode = (count: number) =>
  SLIDES.slice(0, count)
    .map(title => `  <Slide title="${title}" />`)
    .join("\n")

/**
 * A Slider driven by a Next button: Next sets currentIndex and isAnimating, onAnimationComplete
 * clears isAnimating. `report` shows how many times onAnimationComplete fired.
 */
const NavigatedSlider = ({ report }: { report?: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [completed, setCompleted] = useState(0)
  return (
    <Flex
      direction="column"
      gap="small"
    >
      <Frame>
        <Slider
          currentIndex={currentIndex}
          isAnimating={isAnimating}
          onAnimationComplete={() => {
            setIsAnimating(false)
            setCompleted(count => count + 1)
          }}
        >
          {SLIDES.map(title => (
            <Slide
              key={title}
              title={title}
            />
          ))}
        </Slider>
      </Frame>
      <Flex
        gap="small"
        alignItems="center"
      >
        <Button
          disabled={isAnimating}
          onClick={() => {
            setIsAnimating(true)
            setCurrentIndex(index => (index + 1) % SLIDES.length)
          }}
        >
          Next
        </Button>
        {report ? <Ink code>{`onAnimationComplete × ${completed}`}</Ink> : null}
      </Flex>
    </Flex>
  )
}

const NAVIGATED_CODE = `const [currentIndex, setCurrentIndex] = useState(0)
const [isAnimating, setIsAnimating] = useState(false)

<Slider
  currentIndex={currentIndex}
  isAnimating={isAnimating}
  onAnimationComplete={() => setIsAnimating(false)}
>
${slidesCode(SLIDES.length)}
</Slider>
<Button
  disabled={isAnimating}
  onClick={() => {
    setIsAnimating(true)
    setCurrentIndex(index => (index + 1) % 3)
  }}
>
  Next
</Button>`

export const sliderChildren = {
  name: "children",
  description: "Required. The slides, in order: each entry becomes one slide, stacked vertically and as tall as the Slider.",
  variants: ["2", "3"],
  default: "3",
  preview: variant => (
    <Frame>
      <Slider currentIndex={Number(variant) - 1}>
        {SLIDES.slice(0, Number(variant)).map(title => (
          <Slide
            key={title}
            title={title}
          />
        ))}
      </Slider>
    </Frame>
  ),
  code: variant => `<Slider currentIndex={${Number(variant) - 1}}>
${slidesCode(Number(variant))}
</Slider>`,
} satisfies ComponentExample

export const sliderCurrentIndex = {
  name: "currentIndex",
  description: "Zero-based index of the slide in view. Changing it slides the slides vertically over the animationDuration.base token.",
  variants: ["0", "1", "2"],
  default: "0",
  preview: variant => (
    <Frame>
      <Slider currentIndex={Number(variant)}>
        {SLIDES.map(title => (
          <Slide
            key={title}
            title={title}
          />
        ))}
      </Slider>
    </Frame>
  ),
  code: variant => `<Slider${variant === "0" ? "" : ` currentIndex={${variant}}`}>
${slidesCode(SLIDES.length)}
</Slider>`,
} satisfies ComponentExample

export const sliderIsAnimating = {
  name: "isAnimating",
  description:
    "Whether a transition is in progress. While true, Slider calls onAnimationComplete once the animationDuration.base window elapses. Set it with currentIndex; the slide motion itself runs on every currentIndex change.",
  variants: ["navigation"],
  default: "navigation",
  preview: () => <NavigatedSlider />,
  code: () => NAVIGATED_CODE,
} satisfies ComponentExample

export const sliderOnAnimationComplete = {
  name: "onAnimationComplete",
  description: "Called once the transition window elapses while isAnimating is true. Clear isAnimating in it.",
  variants: ["handler"],
  default: "handler",
  preview: () => <NavigatedSlider report />,
  code: () => NAVIGATED_CODE,
} satisfies ComponentExample

/** Every Slider example facet — each one a section of the Slider docs page. */
export const sliderExamples = {
  children: sliderChildren,
  currentIndex: sliderCurrentIndex,
  isAnimating: sliderIsAnimating,
  onAnimationComplete: sliderOnAnimationComplete,
} satisfies Record<string, ComponentExample>
