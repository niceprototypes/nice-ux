import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import Button from "@niceprototypes/button"
import Tooltip from "@niceprototypes/tooltip"
import type { TooltipAnchorType, TooltipPositionType, TooltipTriggerType } from "@niceprototypes/tooltip"

const TRIGGER_OPTIONS = ["hover", "click"] as const satisfies readonly TooltipTriggerType[]
const POSITION_OPTIONS = ["top", "bottom", "left", "right"] as const satisfies readonly TooltipPositionType[]
const ANCHOR_OPTIONS = ["trigger", "cursor"] as const satisfies readonly TooltipAnchorType[]
const THEME_OPTIONS = Object.keys(themeTokensData)

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/** `children` presets: the trigger the bubble describes. */
const CHILDREN_PRESETS = {
  button: <Button>Trigger</Button>,
  text: "Trigger",
}

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  args: {
    content: "Tooltip content",
    children: "button",
    trigger: "hover",
    position: "top",
    anchor: "trigger",
    delayShow: 0,
    delayHide: 0,
  },
  argTypes: {
    content: { control: "text", table: { category: "Content" } },
    children: { control: "select", options: Object.keys(CHILDREN_PRESETS), mapping: CHILDREN_PRESETS, table: { category: "Content" } },
    trigger: { control: "select", options: TRIGGER_OPTIONS, table: { category: "Behavior" } },
    delayShow: { control: "number", table: { category: "Behavior" } },
    delayHide: { control: "number", table: { category: "Behavior" } },
    position: { control: "select", options: POSITION_OPTIONS, table: { category: "Placement" } },
    anchor: { control: "select", options: ANCHOR_OPTIONS, table: { category: "Placement" } },
    open: { control: "boolean", table: { category: "State" } },
    theme: { control: "select", options: [NONE, ...THEME_OPTIONS], mapping: { [NONE]: undefined }, table: { category: "Appearance" } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Room above and to the left of the trigger, so a top or left bubble fits
 * without flipping or shifting: the Vitest browser renders the trigger at the
 * canvas corner.
 */
const withRoom: NonNullable<Story["decorators"]> = [
  Story => (
    <div style={{ paddingTop: getToken("tooltip.maxWidth"), paddingLeft: getToken("tooltip.maxWidth") }}>
      <Story />
    </div>
  ),
]

/** The trigger wrapper: the element that carries the bubble's aria-describedby. */
const triggerWrapper = (canvasElement: HTMLElement) => within(canvasElement).getByText("Trigger").closest("button")!.parentElement!

/** The bubble, portalled to <body>. */
const bubble = () => within(document.body).getByRole("tooltip")

export const Playground: Story = {
  play: async ({ canvasElement, userEvent }) => {
    const wrapper = triggerWrapper(canvasElement)
    await userEvent.hover(wrapper)
    await expect(bubble()).toHaveTextContent("Tooltip content")
    await expect(wrapper).toHaveAttribute("aria-describedby", bubble().id)
    await userEvent.unhover(wrapper)
    await waitFor(() => expect(within(document.body).queryByRole("tooltip")).not.toBeInTheDocument())
    await expect(wrapper).not.toHaveAttribute("aria-describedby")
  },
}

export const Focus: Story = {
  play: async ({ canvasElement, userEvent }) => {
    await userEvent.tab()
    await expect(within(canvasElement).getByRole("button", { name: "Trigger" })).toHaveFocus()
    await waitFor(() => expect(bubble()).toBeInTheDocument())
    // Escape dismisses immediately (WCAG 1.4.13).
    await userEvent.keyboard("{Escape}")
    await expect(within(document.body).queryByRole("tooltip")).not.toBeInTheDocument()
  },
}

export const FocusText: Story = {
  args: { children: "text" },
  play: async ({ canvasElement, userEvent }) => {
    const wrapper = within(canvasElement).getByText("Trigger")
    await userEvent.tab()
    await expect(wrapper).toHaveFocus()
    await waitFor(() => expect(bubble()).toBeInTheDocument())
    await expect(wrapper).toHaveAttribute("aria-describedby", bubble().id)
  },
}

export const ClickTrigger: Story = {
  args: { trigger: "click", children: "text" },
  play: async ({ canvasElement, userEvent }) => {
    const wrapper = within(canvasElement).getByText("Trigger")
    await userEvent.hover(wrapper)
    await expect(within(document.body).queryByRole("tooltip")).not.toBeInTheDocument()
    await userEvent.click(wrapper)
    await waitFor(() => expect(bubble()).toHaveTextContent("Tooltip content"))
    await userEvent.click(wrapper)
    await waitFor(() => expect(within(document.body).queryByRole("tooltip")).not.toBeInTheDocument())
  },
}

export const ClickTriggerKeyboard: Story = {
  args: { trigger: "click", children: "text" },
  play: async ({ canvasElement, userEvent }) => {
    const wrapper = within(canvasElement).getByText("Trigger")
    await userEvent.tab()
    await expect(wrapper).toHaveFocus()
    await expect(within(document.body).queryByRole("tooltip")).not.toBeInTheDocument()
    await userEvent.keyboard("{Enter}")
    await waitFor(() => expect(bubble()).toBeInTheDocument())
    await userEvent.keyboard(" ")
    await waitFor(() => expect(within(document.body).queryByRole("tooltip")).not.toBeInTheDocument())
  },
}

export const Open: Story = {
  args: { open: true },
  play: async ({ canvasElement, userEvent }) => {
    await expect(bubble()).toHaveTextContent("Tooltip content")
    await userEvent.keyboard("{Escape}")
    await userEvent.unhover(triggerWrapper(canvasElement))
    await expect(bubble()).toBeInTheDocument()
  },
}

export const Themed: Story = {
  args: { open: true, theme: "night" },
  play: async () => {
    await expect(bubble().parentElement).toHaveAttribute("data-theme", "night")
  },
}

/** At the canvas's top-left corner, a top bubble flips below and shifts right into the viewport. */
export const ViewportEdge: Story = {
  args: { open: true },
  parameters: { layout: "padded" },
  play: async ({ canvasElement }) => {
    const box = bubble().getBoundingClientRect()
    await expect(box.top).toBeGreaterThanOrEqual(triggerWrapper(canvasElement).getBoundingClientRect().bottom)
    await expect(box.left).toBeGreaterThanOrEqual(0)
  },
}

export const Delay: Story = {
  args: { delayShow: 300, delayHide: 300 },
  play: async ({ canvasElement, userEvent }) => {
    const wrapper = triggerWrapper(canvasElement)
    await userEvent.hover(wrapper)
    await expect(within(document.body).queryByRole("tooltip")).not.toBeInTheDocument()
    await waitFor(() => expect(bubble()).toBeInTheDocument(), { timeout: 1000 })
    await userEvent.unhover(wrapper)
    await expect(bubble()).toBeInTheDocument()
    await waitFor(() => expect(within(document.body).queryByRole("tooltip")).not.toBeInTheDocument(), { timeout: 1000 })
  },
}

/** Bubble and trigger boxes while the bubble is shown. */
const showBoxes = async (canvasElement: HTMLElement, userEvent: Parameters<NonNullable<Story["play"]>>[0]["userEvent"]) => {
  const wrapper = triggerWrapper(canvasElement)
  await userEvent.hover(wrapper)
  return { bubble: bubble().getBoundingClientRect(), trigger: wrapper.getBoundingClientRect() }
}

export const Top: Story = {
  decorators: withRoom,
  play: async ({ canvasElement, userEvent }) => {
    const { bubble, trigger } = await showBoxes(canvasElement, userEvent)
    await expect(bubble.bottom).toBeLessThanOrEqual(trigger.top)
    await expect(Math.round(bubble.left + bubble.width / 2)).toBe(Math.round(trigger.left + trigger.width / 2))
  },
}

export const Bottom: Story = {
  args: { position: "bottom" },
  play: async ({ canvasElement, userEvent }) => {
    const { bubble, trigger } = await showBoxes(canvasElement, userEvent)
    await expect(bubble.top).toBeGreaterThanOrEqual(trigger.bottom)
  },
}

export const Left: Story = {
  args: { position: "left" },
  decorators: withRoom,
  play: async ({ canvasElement, userEvent }) => {
    const { bubble, trigger } = await showBoxes(canvasElement, userEvent)
    await expect(bubble.right).toBeLessThanOrEqual(trigger.left)
  },
}

export const Right: Story = {
  args: { position: "right" },
  play: async ({ canvasElement, userEvent }) => {
    const { bubble, trigger } = await showBoxes(canvasElement, userEvent)
    await expect(bubble.left).toBeGreaterThanOrEqual(trigger.right)
  },
}

export const CursorAnchor: Story = {
  args: { anchor: "cursor" },
  decorators: withRoom,
  play: async ({ canvasElement, userEvent }) => {
    const wrapper = triggerWrapper(canvasElement)
    const { left, top } = wrapper.getBoundingClientRect()
    const pointer = { clientX: Math.round(left) + 4, clientY: Math.round(top) + 4 }
    await userEvent.pointer({ target: wrapper, coords: pointer })
    // Centred on the pointer, above it.
    const box = bubble().getBoundingClientRect()
    await expect(Math.round(box.left + box.width / 2)).toBe(pointer.clientX)
    await expect(box.bottom).toBeLessThanOrEqual(pointer.clientY)
  },
}
