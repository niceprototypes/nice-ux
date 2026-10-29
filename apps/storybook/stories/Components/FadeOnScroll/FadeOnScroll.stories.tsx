import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor, within } from "storybook/test"
import { setTokens } from "@niceprototypes/styles"
import { FadeOnScroll, ScrollProvider } from "@niceprototypes/scroll"
import type { FadeOnScrollProps } from "@niceprototypes/scroll"
import Ink from "@niceprototypes/ink"

/** One viewport of scroll room above and below the faded content. */
const getToken = setTokens({ scrollRoom: { base: "100vh" } }, "fadeOnScrollStory")

const SCROLL_ROOM = getToken("fadeOnScrollStory.scrollRoom:base")

const meta = {
  title: "Components/Scroll/FadeOnScroll",
  component: FadeOnScroll,
  parameters: {
    layout: "padded",
  },
  // FadeOnScroll reads the scroll position from ScrollProvider; the scroll room lets the
  // content travel through the whole viewport.
  decorators: [
    Story => (
      <ScrollProvider>
        <div style={{ height: SCROLL_ROOM }} />
        <Story />
        <div style={{ height: SCROLL_ROOM }} />
      </ScrollProvider>
    ),
  ],
} satisfies Meta<typeof FadeOnScroll>

export default meta

type Story = StoryObj<FadeOnScrollProps>

const position = { control: { type: "range", min: -100, max: 200, step: 1 }, table: { category: "Positions" } } as const
const opacity = { control: { type: "range", min: 0, max: 1, step: 0.05 }, table: { category: "Opacity" } } as const

const CONTENT = "Fades in and out as it scrolls"

/** The FadeOnScroll wrapper around the content. */
const wrapper = (canvasElement: HTMLElement) => within(canvasElement).getByText(CONTENT).parentElement!

/**
 * Scroll the window so the wrapper's top sits at `progress` percent of the viewport,
 * measured from the bottom (FadeOnScroll's own scale: 0 at the bottom edge, 100 at the top).
 */
const scrollToProgress = (canvasElement: HTMLElement, progress: number) => {
  const top = wrapper(canvasElement).getBoundingClientRect().top + window.scrollY
  window.scrollTo(0, top - window.innerHeight * (1 - progress / 100))
}

const expectOpacity = (canvasElement: HTMLElement, value: number) =>
  waitFor(() => expect(Number(getComputedStyle(wrapper(canvasElement)).opacity)).toBeCloseTo(value, 2))

export const Playground: Story = {
  args: {
    children: CONTENT,
    startPosition: 0,
    peakPosition: 50,
    endPosition: 100,
    startOpacity: 0,
    peakOpacity: 1,
    endOpacity: 0,
  },
  argTypes: {
    children: { control: "text", table: { category: "Content" } },
    startPosition: position,
    peakPosition: position,
    endPosition: position,
    startOpacity: opacity,
    peakOpacity: opacity,
    endOpacity: opacity,
    className: { table: { disable: true } },
  },
  render: ({ children, ...rest }) => (
    <FadeOnScroll {...rest}>
      <Ink>{children}</Ink>
    </FadeOnScroll>
  ),
  play: async ({ canvasElement }) => {
    // Below the viewport: start opacity. At the middle: peak. Past the top: end.
    window.scrollTo(0, 0)
    await expectOpacity(canvasElement, 0)
    scrollToProgress(canvasElement, 50)
    await expectOpacity(canvasElement, 1)
    scrollToProgress(canvasElement, 25)
    await expectOpacity(canvasElement, 0.5)
    scrollToProgress(canvasElement, 120)
    await expectOpacity(canvasElement, 0)
    window.scrollTo(0, 0)
  },
}

export const Opacities: Story = {
  ...Playground,
  args: { ...Playground.args, startOpacity: 0.25, peakOpacity: 0.5, endOpacity: 0.75 },
  play: async ({ canvasElement }) => {
    window.scrollTo(0, 0)
    await expectOpacity(canvasElement, 0.25)
    scrollToProgress(canvasElement, 50)
    await expectOpacity(canvasElement, 0.5)
    scrollToProgress(canvasElement, 120)
    await expectOpacity(canvasElement, 0.75)
    window.scrollTo(0, 0)
  },
}

export const Positions: Story = {
  ...Playground,
  args: { ...Playground.args, startPosition: 20, peakPosition: 30, endPosition: 40 },
  play: async ({ canvasElement }) => {
    window.scrollTo(0, 0)
    scrollToProgress(canvasElement, 10)
    await expectOpacity(canvasElement, 0)
    scrollToProgress(canvasElement, 30)
    await expectOpacity(canvasElement, 1)
    // Past endPosition: faded out at 50, where the default curve peaks.
    scrollToProgress(canvasElement, 50)
    await expectOpacity(canvasElement, 0)
    window.scrollTo(0, 0)
  },
}
