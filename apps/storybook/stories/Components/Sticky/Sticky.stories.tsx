import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, waitFor, within } from "storybook/test"
import { setTokens } from "@niceprototypes/styles"
import { Sticky, StickyProvider } from "@niceprototypes/scroll"
import type { StickyProps } from "@niceprototypes/scroll"

/** Scroll room below the sticky element, so it can scroll past its place and stick. */
const getToken = setTokens({ scrollRoom: { base: "300vh" } }, "stickyStory")

const meta = {
  title: "Components/Scroll/Sticky",
  component: Sticky,
  parameters: {
    layout: "fullscreen",
  },
  // Sticky stacks through StickyProvider; without one it renders its children in place.
  decorators: [
    Story => (
      <StickyProvider>
        <Story />
        <div style={{ height: getToken("stickyStory.scrollRoom:base") }} />
      </StickyProvider>
    ),
  ],
} satisfies Meta<typeof Sticky>

export default meta

type Story = StoryObj<StickyProps>

/** The fixed wrapper holding `text`. */
const stuck = (canvasElement: HTMLElement, text: string) => within(canvasElement).getByText(text)

export const Playground: Story = {
  args: {
    children: "Header",
    order: 0,
    onStickyChange: fn(),
  },
  argTypes: {
    children: { control: "text", table: { category: "Content" } },
    order: { control: { type: "number", step: 1 }, table: { category: "Stacking" } },
    onStickyChange: { table: { category: "Events" } },
    className: { table: { disable: true } },
  },
  play: async ({ canvasElement, args }) => {
    window.scrollTo(0, 0)
    const header = stuck(canvasElement, "Header")
    await expect(getComputedStyle(header).position).toBe("fixed")
    await expect(header.getBoundingClientRect().top).toBe(0)
    // The spacer holds the header's place in the flow.
    await expect((header.previousElementSibling as HTMLElement).offsetHeight).toBe(header.offsetHeight)
    await waitFor(() => expect(args.onStickyChange).toHaveBeenLastCalledWith(false))

    // Scrolling down past the spacer: sticky, and the header slides out of view.
    window.scrollTo(0, window.innerHeight / 2)
    await waitFor(() => expect(args.onStickyChange).toHaveBeenLastCalledWith(true))
    await waitFor(() => expect(header.getBoundingClientRect().bottom).toBeLessThanOrEqual(0))

    // Scrolling up: the header slides back in.
    window.scrollTo(0, window.innerHeight / 4)
    await waitFor(() => expect(header.getBoundingClientRect().top).toBe(0))

    window.scrollTo(0, 0)
    await waitFor(() => expect(args.onStickyChange).toHaveBeenLastCalledWith(false))
  },
}

/** Sticky order from Sticky order.mdx: a Header at order 0 above this Subheader at order 1. */
export const Order: Story = {
  ...Playground,
  args: { ...Playground.args, children: "Subheader", order: 1 },
  decorators: [
    Story => (
      <>
        <Sticky order={0}>Header</Sticky>
        <Story />
      </>
    ),
  ],
  play: async ({ canvasElement }) => {
    window.scrollTo(0, 0)
    const header = stuck(canvasElement, "Header")
    const subheader = stuck(canvasElement, "Subheader")
    // Lower orders stack above higher ones: the Subheader starts at the Header's bottom.
    await waitFor(() => expect(subheader.getBoundingClientRect().top).toBe(header.getBoundingClientRect().bottom))
  },
}
