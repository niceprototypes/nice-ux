import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"
import { expect, fn, waitFor, within } from "storybook/test"
import { setTokens } from "@niceprototypes/styles"
import Slider from "@niceprototypes/slider"
import type { SliderProps } from "@niceprototypes/slider"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"

/** The canvas height: Slider fills its parent, and its slides are absolutely positioned. */
const getToken = setTokens({ canvasHeight: { base: "320px" } }, "sliderStory")

/** The slide titles from Slider/Slider.mdx; `slideCount` takes the first n. */
const SLIDES = ["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5"]

/**
 * PlaygroundArgs
 *
 * SliderProps with `children` replaced by `slideCount`, recomposed in `render`.
 * `currentIndex` and `isAnimating` are controlled through useArgs: changing `currentIndex`
 * sets `isAnimating`, and `onAnimationComplete` clears it.
 */
type PlaygroundArgs = Omit<SliderProps, "children"> & {
  slideCount: number
  /** Replaced by `slideCount`; hidden from Controls. */
  children?: never
}

const meta = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    Story => (
      <Flex
        direction="column"
        style={{ height: getToken("sliderStory.canvasHeight:base") }}
      >
        <Story />
      </Flex>
    ),
  ],
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<PlaygroundArgs>

const HIDDEN = { table: { disable: true } }

/** The positioned slide wrapping the slide titled `title`. */
const slide = (canvasElement: HTMLElement, title: string) => {
  let element = within(canvasElement).getByText(title)
  while (getComputedStyle(element).position !== "absolute") element = element.parentElement!
  return element
}

export const Playground: Story = {
  args: {
    slideCount: 3,
    currentIndex: 0,
    isAnimating: false,
    onAnimationComplete: fn(),
  },
  argTypes: {
    slideCount: { control: { type: "range", min: 1, max: SLIDES.length, step: 1 }, table: { category: "Content" } },
    currentIndex: { control: { type: "range", min: 0, max: SLIDES.length - 1, step: 1 }, table: { category: "State" } },
    isAnimating: { control: "boolean", table: { category: "State" } },
    onAnimationComplete: { table: { category: "Events" } },
    children: HIDDEN,
    className: HIDDEN,
    style: HIDDEN,
  },
  render: function Render({ slideCount, currentIndex, isAnimating, onAnimationComplete }) {
    const [, updateArgs] = useArgs<PlaygroundArgs>()
    // Local mirror of `isAnimating`: the test runner renders without a manager, so
    // updateArgs alone does not re-render there.
    const [animating, setAnimating] = useState(isAnimating)
    useEffect(() => setAnimating(isAnimating), [isAnimating])
    const props: SliderProps = {
      currentIndex,
      isAnimating: animating,
      onAnimationComplete: () => {
        onAnimationComplete?.()
        setAnimating(false)
        updateArgs({ isAnimating: false })
      },
      children: SLIDES.slice(0, slideCount).map(title => (
        <Ink
          key={title}
          as="h2"
          weight="bold"
          size="larger"
        >
          {title}
        </Ink>
      )),
    }
    return <Slider {...props} />
  },
  play: async ({ canvasElement, args }) => {
    const first = slide(canvasElement, "Slide 1")
    const second = slide(canvasElement, "Slide 2")
    const viewport = first.parentElement!
    await expect(viewport.children).toHaveLength(3)
    await expect(viewport.getBoundingClientRect().height).toBeGreaterThan(0)
    // The current slide covers the viewport; the next one sits one viewport height below.
    await expect(first.getBoundingClientRect().top).toBe(viewport.getBoundingClientRect().top)
    await expect(second.getBoundingClientRect().top).toBe(viewport.getBoundingClientRect().bottom)
    await expect(args.onAnimationComplete).not.toHaveBeenCalled()
  },
}

export const CurrentIndex: Story = {
  ...Playground,
  args: { ...Playground.args, currentIndex: 1 },
  play: async ({ canvasElement }) => {
    const viewport = slide(canvasElement, "Slide 1").parentElement!
    await expect(slide(canvasElement, "Slide 2").getBoundingClientRect().top).toBe(viewport.getBoundingClientRect().top)
    await expect(slide(canvasElement, "Slide 1").getBoundingClientRect().bottom).toBe(viewport.getBoundingClientRect().top)
  },
}

export const Animating: Story = {
  ...Playground,
  args: { ...Playground.args, currentIndex: 2, isAnimating: true },
  play: async ({ args }) => {
    // onAnimationComplete fires once the animationDuration.base window has elapsed.
    await expect(args.onAnimationComplete).not.toHaveBeenCalled()
    await waitFor(() => expect(args.onAnimationComplete).toHaveBeenCalledTimes(1))
  },
}
