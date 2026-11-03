import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor, within } from "storybook/test"
import { setTokens } from "@niceprototypes/styles"
import { Scroll } from "@niceprototypes/scroll"
import type { ScrollAsType, ScrollAxisType, ScrollProps } from "@niceprototypes/scroll"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import LifecycleStory from "@niceprototypes/docs/components/LifecycleStory"

/** The scroll box, and content taller and wider than it, so it scrolls on either axis. */
const getToken = setTokens(
  {
    boxHeight: { base: "240px" },
    boxWidth: { base: "320px" },
    contentWidth: { base: "640px" },
  },
  "scrollStory",
)

const AXIS_OPTIONS = ["y", "x", "both"] as const satisfies readonly ScrollAxisType[]
const AS_OPTIONS = ["div", "nav", "ul"] as const satisfies readonly ScrollAsType[]

/** `showScrollbar` unset reads the project default (the `scroll.scrollbarWidth` token). */
const SHOW_SCROLLBAR_OPTIONS = { unset: undefined, shown: true, hidden: false } as const

const PARAGRAPH =
  "Scroll is the container every scrolling region renders through. Its scrollbar is hidden by default; the content still scrolls by wheel, touch and keyboard."

/** Paragraphs wider and taller than the box. */
const Content = () => (
  <Flex direction="column" gap="base" style={{ width: getToken("scrollStory.contentWidth:base") }}>
    {Array.from({ length: 8 }, (_, index) => (
      <Ink key={index}>{PARAGRAPH}</Ink>
    ))}
  </Flex>
)

const box = { height: getToken("scrollStory.boxHeight:base"), width: getToken("scrollStory.boxWidth:base") }

const meta = {
  title: "Components/Scroll/Scroll",
  component: Scroll,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Scroll>

export default meta

type Story = StoryObj<ScrollProps>

/** The rendered Scroll. */
const scrollOf = (canvasElement: HTMLElement) => within(canvasElement).getByTestId("scroll")

export const Playground: Story = {
  args: {
    axis: "y",
    showScrollbar: undefined,
    as: "div",
  },
  argTypes: {
    axis: { control: "select", options: AXIS_OPTIONS, table: { category: "Layout" } },
    showScrollbar: {
      control: "select",
      options: Object.keys(SHOW_SCROLLBAR_OPTIONS),
      mapping: SHOW_SCROLLBAR_OPTIONS,
      table: { category: "Appearance" },
    },
    as: { control: "select", options: AS_OPTIONS, table: { category: "Element" } },
    children: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  render: args => (
    <Scroll {...args} data-testid="scroll" style={box}>
      <Content />
    </Scroll>
  ),
  play: async ({ canvasElement }) => {
    const scroll = scrollOf(canvasElement)
    await expect(getComputedStyle(scroll).overflowY).toBe("auto")
    // The library default hides the scrollbar.
    await expect(getComputedStyle(scroll).scrollbarWidth).toBe("none")
    // Hidden, it still scrolls.
    scroll.scrollTop = 100
    await waitFor(() => expect(scroll.scrollTop).toBeGreaterThan(0))
    // The project default is the `scroll.scrollbarWidth` token: overriding it shows the scrollbar.
    scroll.style.setProperty("--np--scroll--scrollbar-width", "auto")
    await expect(getComputedStyle(scroll).scrollbarWidth).toBe("auto")
    scroll.style.removeProperty("--np--scroll--scrollbar-width")
  },
}

/** `showScrollbar` shows this instance's scrollbar, whatever the project default. */
export const ShowScrollbar: Story = {
  ...Playground,
  args: { ...Playground.args, showScrollbar: true },
  play: async ({ canvasElement }) => {
    const scroll = scrollOf(canvasElement)
    await expect(getComputedStyle(scroll).scrollbarWidth).toBe("auto")
    scroll.style.setProperty("--np--scroll--scrollbar-width", "none")
    await expect(getComputedStyle(scroll).scrollbarWidth).toBe("auto")
    scroll.style.removeProperty("--np--scroll--scrollbar-width")
  },
}

/** `showScrollbar={false}` hides this instance's scrollbar, whatever the project default. */
export const HideScrollbar: Story = {
  ...Playground,
  args: { ...Playground.args, showScrollbar: false },
  play: async ({ canvasElement }) => {
    const scroll = scrollOf(canvasElement)
    scroll.style.setProperty("--np--scroll--scrollbar-width", "auto")
    await expect(getComputedStyle(scroll).scrollbarWidth).toBe("none")
    scroll.style.removeProperty("--np--scroll--scrollbar-width")
  },
}

/** `axis="x"` scrolls sideways only. */
export const AxisX: Story = {
  ...Playground,
  args: { ...Playground.args, axis: "x" },
  play: async ({ canvasElement }) => {
    const scroll = scrollOf(canvasElement)
    await expect(getComputedStyle(scroll).overflowX).toBe("auto")
    scroll.scrollLeft = 100
    await waitFor(() => expect(scroll.scrollLeft).toBeGreaterThan(0))
  },
}

/** `axis="both"` scrolls on both axes. */
export const AxisBoth: Story = {
  ...Playground,
  args: { ...Playground.args, axis: "both" },
  play: async ({ canvasElement }) => {
    const scroll = scrollOf(canvasElement)
    await expect(getComputedStyle(scroll).overflowX).toBe("auto")
    await expect(getComputedStyle(scroll).overflowY).toBe("auto")
  },
}

/** `as` sets the element. */
export const As: Story = {
  ...Playground,
  args: { ...Playground.args, as: "nav" },
  play: async ({ canvasElement }) => {
    await expect(scrollOf(canvasElement).tagName).toBe("NAV")
  },
}

/** The props looping: hidden by default, shown, then each axis. */
export const Lifecycle: Story = {
  args: Playground.args,
  render: args => (
    <LifecycleStory
      steps={[
        { label: "scrollbar hidden", props: { showScrollbar: undefined, axis: "y" } },
        { label: "scrollbar shown", props: { showScrollbar: true, axis: "y" } },
        { label: "axis x", props: { showScrollbar: true, axis: "x" } },
        { label: "axis both", props: { showScrollbar: true, axis: "both" } },
      ]}
      render={({ showScrollbar, axis }: Pick<ScrollProps, "showScrollbar" | "axis">) => (
        <Scroll {...args} showScrollbar={showScrollbar} axis={axis} style={box}>
          <Content />
        </Scroll>
      )}
    />
  ),
}
