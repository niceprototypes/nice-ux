import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"
import { expect, fn, waitFor, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import Button from "@niceprototypes/button"
import Popover from "@niceprototypes/popover"
import type { PopoverAlignType, PopoverPositionType, PopoverProps } from "@niceprototypes/popover"

const POSITION_OPTIONS = ["top", "bottom", "left", "right"] as const satisfies readonly PopoverPositionType[]
const ALIGN_OPTIONS = ["start", "center", "end"] as const satisfies readonly PopoverAlignType[]
const ROLE_OPTIONS = ["dialog", "region", "menu", "listbox", "presentation"] as const satisfies readonly NonNullable<PopoverProps["role"]>[]
const THEME_OPTIONS = Object.keys(themeTokensData)

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/**
 * PlaygroundArgs
 *
 * PopoverProps without the refs, which the render owns:
 * - `anchorRef`: the "Anchor" button, which toggles `open`
 * - `ignoreOutsideRefs`: when `ignoreOutside` is on, an "Ignored" button whose presses do not dismiss
 * `open` is kept in sync through useArgs: every `onOpenChange` sets it.
 */
type PlaygroundArgs = Omit<PopoverProps, "anchorRef" | "ignoreOutsideRefs" | "ref"> & {
  ignoreOutside: boolean
}

const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<PlaygroundArgs>

const HIDDEN = { table: { disable: true } }

/**
 * Room above and to the left of the anchor, so a top or left placement fits
 * without flipping: the Vitest browser renders the anchor at the canvas corner.
 */
const withRoom: NonNullable<Story["decorators"]> = [
  Story => (
    <div style={{ paddingTop: getToken("popover.maxHeight"), paddingLeft: getToken("popover.maxHeight") }}>
      <Story />
    </div>
  ),
]

export const Playground: Story = {
  args: {
    open: true,
    onOpenChange: fn(),
    children: "Popover content",
    position: "bottom",
    align: "start",
    matchAnchorWidth: false,
    role: "dialog",
    "aria-label": "Details",
    ignoreOutside: false,
  },
  argTypes: {
    open: { control: "boolean", table: { category: "State" } },
    children: { control: "text", table: { category: "Content" } },
    position: { control: "select", options: POSITION_OPTIONS, table: { category: "Placement" } },
    align: { control: "select", options: ALIGN_OPTIONS, table: { category: "Placement" } },
    matchAnchorWidth: { control: "boolean", table: { category: "Placement" } },
    ignoreOutside: { control: "boolean", table: { category: "Behavior" } },
    theme: { control: "select", options: [NONE, ...THEME_OPTIONS], mapping: { [NONE]: undefined }, table: { category: "Appearance" } },
    role: { control: "select", options: ROLE_OPTIONS, table: { category: "Accessibility" } },
    "aria-label": { control: "text", table: { category: "Accessibility" } },
    "aria-labelledby": { control: "text", table: { category: "Accessibility" } },
    onOpenChange: { table: { category: "Events" } },
    id: HIDDEN,
    className: HIDDEN,
  },
  render: function Render({ open, onOpenChange, ignoreOutside, ...rest }) {
    // Local state drives the render (portable stories under Vitest do not re-render on
    // updateArgs); useArgs keeps the Controls panel in sync.
    const [, updateArgs] = useArgs<PlaygroundArgs>()
    const [isOpen, setOpen] = React.useState(open)
    React.useEffect(() => setOpen(open), [open])
    const anchorRef = React.useRef<HTMLButtonElement>(null)
    const ignoredRef = React.useRef<HTMLButtonElement>(null)
    const change = (next: boolean) => {
      setOpen(next)
      updateArgs({ open: next })
    }
    const props: PopoverProps = {
      ...rest,
      open: isOpen,
      anchorRef,
      ignoreOutsideRefs: ignoreOutside ? [ignoredRef] : undefined,
      onOpenChange: next => {
        onOpenChange?.(next)
        change(next)
      },
    }
    return (
      <>
        <Button ref={anchorRef} onClick={() => change(!isOpen)}>
          Anchor
        </Button>
        {ignoreOutside && <Button ref={ignoredRef}>Ignored</Button>}
        <Popover {...props} />
      </>
    )
  },
  play: async ({ args, userEvent }) => {
    // The popover is portalled to <body>.
    const popover = within(document.body).getByRole("dialog", { name: "Details" })
    await expect(popover).toHaveTextContent("Popover content")
    await userEvent.keyboard("{Escape}")
    await expect(args.onOpenChange).toHaveBeenCalledWith(false)
    await expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument()
  },
}

/** The popover and anchor boxes, once the popover has been measured and shown. */
const boxes = async (role = "dialog") => {
  const popover = within(document.body).getByRole(role)
  await waitFor(() => expect(popover).toBeVisible())
  return {
    popover: popover.getBoundingClientRect(),
    anchor: within(document.body).getByRole("button", { name: "Anchor" }).getBoundingClientRect(),
  }
}

export const OutsidePress: Story = {
  ...Playground,
  play: async ({ canvasElement, args, userEvent }) => {
    await userEvent.click(within(document.body).getByRole("dialog"))
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Anchor" }))
    // Presses on the popover and anchor do not dismiss (the anchor's own click toggles it).
    await expect(args.onOpenChange).not.toHaveBeenCalled()
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Anchor" }))
    await userEvent.click(document.body)
    await expect(args.onOpenChange).toHaveBeenCalledWith(false)
    await expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument()
  },
}

export const IgnoreOutsideRefs: Story = {
  ...Playground,
  args: { ...Playground.args, ignoreOutside: true },
  play: async ({ canvasElement, args, userEvent }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Ignored" }))
    await expect(args.onOpenChange).not.toHaveBeenCalled()
    await expect(within(document.body).getByRole("dialog")).toBeInTheDocument()
  },
}

export const Closed: Story = {
  ...Playground,
  args: { ...Playground.args, open: false },
  play: async ({ canvasElement, userEvent }) => {
    await expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument()
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Anchor" }))
    await expect(within(document.body).getByRole("dialog", { name: "Details" })).toBeInTheDocument()
  },
}

export const BottomStart: Story = {
  ...Playground,
  play: async () => {
    const { popover, anchor } = await boxes()
    await expect(popover.top).toBeGreaterThanOrEqual(anchor.bottom)
    await expect(Math.round(popover.left)).toBe(Math.round(anchor.left))
  },
}

export const TopEnd: Story = {
  ...Playground,
  args: { ...Playground.args, position: "top", align: "end" },
  decorators: withRoom,
  play: async () => {
    const { popover, anchor } = await boxes()
    await expect(popover.bottom).toBeLessThanOrEqual(anchor.top)
    await expect(Math.round(popover.right)).toBe(Math.round(anchor.right))
  },
}

export const RightCenter: Story = {
  ...Playground,
  args: { ...Playground.args, position: "right", align: "center" },
  play: async () => {
    const { popover, anchor } = await boxes()
    await expect(popover.left).toBeGreaterThanOrEqual(anchor.right)
    await expect(Math.round(popover.top + popover.height / 2)).toBe(Math.round(anchor.top + anchor.height / 2))
  },
}

export const Left: Story = {
  ...Playground,
  args: { ...Playground.args, position: "left" },
  decorators: withRoom,
  play: async () => {
    const { popover, anchor } = await boxes()
    await expect(popover.right).toBeLessThanOrEqual(anchor.left)
  },
}

/** At the canvas's top edge, a top popover flips below the anchor. */
export const FlipAtEdge: Story = {
  ...Playground,
  args: { ...Playground.args, position: "top" },
  parameters: { layout: "padded" },
  play: async () => {
    const { popover, anchor } = await boxes()
    await expect(popover.top).toBeGreaterThanOrEqual(anchor.bottom)
  },
}

export const MatchAnchorWidth: Story = {
  ...Playground,
  args: { ...Playground.args, matchAnchorWidth: true, children: "" },
  play: async () => {
    const { popover, anchor } = await boxes()
    await expect(Math.round(popover.width)).toBeGreaterThanOrEqual(Math.round(anchor.width))
  },
}

export const Role: Story = {
  ...Playground,
  args: { ...Playground.args, role: "region", "aria-label": undefined, "aria-labelledby": "popover-label", id: "popover-id" },
  play: async () => {
    const popover = within(document.body).getByRole("region")
    await expect(popover).toHaveAttribute("aria-labelledby", "popover-label")
    await expect(popover).toHaveAttribute("id", "popover-id")
  },
}

export const Theme: Story = {
  ...Playground,
  args: { ...Playground.args, theme: "night" },
  play: async () => {
    const popover = within(document.body).getByRole("dialog", { name: "Details" })
    await expect(popover.closest("[data-theme]")).toHaveAttribute("data-theme", "night")
  },
}
