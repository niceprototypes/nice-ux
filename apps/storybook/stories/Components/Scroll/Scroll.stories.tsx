import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, waitFor, within } from "storybook/test"
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
    // Page room around the sticky and fade stories, so they travel through the whole viewport.
    fadeRoom: { base: "100vh" },
    stickyRoom: { base: "300vh" },
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
    follow: false,
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
    follow: { control: "boolean", table: { category: "Behaviour" } },
    children: { table: { disable: true } },
    ref: { table: { disable: true } },
    root: { table: { disable: true } },
    sticky: { table: { disable: true } },
    fade: { table: { disable: true } },
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

/** One log line per row. */
const Rows = ({ count }: { count: number }) =>
  Array.from({ length: count }, (_, index) => <Ink key={index}>{`Row ${index + 1}`}</Ink>)

/** Whether the scroll position is at the end of the content. */
const isAtEnd = (scroll: HTMLElement) => scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight <= 1

/** Add a row the way streamed content arrives: straight into the DOM, no re-render. */
const appendRow = (scroll: HTMLElement) => {
  const row = scroll.lastElementChild!.cloneNode(true) as HTMLElement
  row.textContent = `Row ${scroll.children.length + 1}`
  scroll.append(row)
}

/** `follow`: pinned to the end while rows are added; scrolling up releases, the end pins again. */
export const Follow: Story = {
  args: { follow: true },
  render: args => (
    <Scroll {...args} data-testid="scroll" style={box}>
      <Rows count={12} />
    </Scroll>
  ),
  play: async ({ canvasElement }) => {
    const scroll = scrollOf(canvasElement)
    // Opens at the end.
    await waitFor(() => expect(isAtEnd(scroll)).toBe(true))
    appendRow(scroll)
    await waitFor(() => expect(isAtEnd(scroll)).toBe(true))
    // Scrolled up, added rows do not move the view.
    scroll.scrollTop = 0
    await waitFor(() => expect(scroll.scrollTop).toBe(0))
    appendRow(scroll)
    await new Promise(resolve => setTimeout(resolve, 300))
    await expect(scroll.scrollTop).toBe(0)
    // Back at the end, it follows again.
    scroll.scrollTop = scroll.scrollHeight
    await waitFor(() => expect(isAtEnd(scroll)).toBe(true))
    appendRow(scroll)
    await waitFor(() => expect(isAtEnd(scroll)).toBe(true))
  },
}

/** `follow` looping: rows are added each step and the view stays on the newest. */
export const FollowLifecycle: Story = {
  args: { follow: true },
  render: args => (
    <LifecycleStory
      steps={Array.from({ length: 8 }, (_, index) => ({ label: `${8 + index * 2} rows`, props: { count: 8 + index * 2 } }))}
      render={({ count }: { count: number }) => (
        <Scroll {...args} style={box}>
          <Rows count={count} />
        </Scroll>
      )}
    />
  ),
}

/** The sticky bar holding `text`. */
const barOf = (canvasElement: HTMLElement, text: string) => within(canvasElement).getByText(text)

/** `sticky` under a window root: fixed at the top once the page passes it, hidden while scrolling down. */
export const Sticky: Story = {
  args: { sticky: { order: 0, onChange: fn() } },
  parameters: { layout: "fullscreen" },
  render: args => (
    <Scroll root>
      <Scroll sticky={args.sticky}>Header</Scroll>
      <div style={{ height: getToken("scrollStory.stickyRoom:base") }} />
    </Scroll>
  ),
  play: async ({ canvasElement, args }) => {
    const onChange = (args.sticky as { onChange: (isSticky: boolean) => void }).onChange
    window.scrollTo(0, 0)
    const header = barOf(canvasElement, "Header")
    await expect(getComputedStyle(header).position).toBe("fixed")
    await expect(header.getBoundingClientRect().top).toBe(0)
    // The spacer holds the header's place in the flow.
    await expect((header.previousElementSibling as HTMLElement).offsetHeight).toBe(header.offsetHeight)
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith(false))

    // Scrolling down past the spacer: sticky, and the header slides out of view.
    window.scrollTo(0, window.innerHeight / 2)
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith(true))
    await waitFor(() => expect(header.getBoundingClientRect().bottom).toBeLessThanOrEqual(0))

    // Scrolling up: the header slides back in.
    window.scrollTo(0, window.innerHeight / 4)
    await waitFor(() => expect(header.getBoundingClientRect().top).toBe(0))

    window.scrollTo(0, 0)
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith(false))
  },
}

/** `sticky.order`: a Header at order 0 stacks above a Subheader at order 1. */
export const StickyOrder: Story = {
  args: { sticky: { order: 1 } },
  parameters: { layout: "fullscreen" },
  render: args => (
    <Scroll root>
      <Scroll sticky={{ order: 0 }}>Header</Scroll>
      <Scroll sticky={args.sticky}>Subheader</Scroll>
      <div style={{ height: getToken("scrollStory.stickyRoom:base") }} />
    </Scroll>
  ),
  play: async ({ canvasElement }) => {
    window.scrollTo(0, 0)
    const header = barOf(canvasElement, "Header")
    const subheader = barOf(canvasElement, "Subheader")
    await waitFor(() => expect(subheader.getBoundingClientRect().top).toBe(header.getBoundingClientRect().bottom))
  },
}

const FADE_CONTENT = "Fades in and out as it scrolls"

/** The fade wrapper around the content. */
const fadeOf = (canvasElement: HTMLElement) => within(canvasElement).getByText(FADE_CONTENT).parentElement!

/** Scroll the window so the wrapper's top sits at `progress` percent of the viewport, from the bottom. */
const scrollToProgress = (canvasElement: HTMLElement, progress: number) => {
  const top = fadeOf(canvasElement).getBoundingClientRect().top + window.scrollY
  window.scrollTo(0, top - window.innerHeight * (1 - progress / 100))
}

const expectOpacity = (canvasElement: HTMLElement, value: number) =>
  waitFor(() => expect(Number(getComputedStyle(fadeOf(canvasElement)).opacity)).toBeCloseTo(value, 2))

/** `fade` under a window root: opacity follows the content's place in the viewport. */
export const Fade: Story = {
  args: { fade: { start: 0, peak: 50, end: 100, opacity: [0, 1, 0] } },
  render: args => (
    <Scroll root>
      <div style={{ height: getToken("scrollStory.fadeRoom:base") }} />
      <Scroll fade={args.fade}>
        <Ink>{FADE_CONTENT}</Ink>
      </Scroll>
      <div style={{ height: getToken("scrollStory.fadeRoom:base") }} />
    </Scroll>
  ),
  play: async ({ canvasElement }) => {
    // Below the viewport: the first opacity. At the middle: the peak. Past the top: the last.
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

/** `fade.opacity`: the opacities before start, at peak and after end. */
export const FadeOpacity: Story = {
  ...Fade,
  args: { fade: { opacity: [0.25, 0.5, 0.75] } },
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

/** `fade.start`, `peak` and `end`: where the fade begins, peaks and completes. */
export const FadePositions: Story = {
  ...Fade,
  args: { fade: { start: 20, peak: 30, end: 40 } },
  play: async ({ canvasElement }) => {
    window.scrollTo(0, 0)
    scrollToProgress(canvasElement, 10)
    await expectOpacity(canvasElement, 0)
    scrollToProgress(canvasElement, 30)
    await expectOpacity(canvasElement, 1)
    scrollToProgress(canvasElement, 50)
    await expectOpacity(canvasElement, 0)
    window.scrollTo(0, 0)
  },
}
