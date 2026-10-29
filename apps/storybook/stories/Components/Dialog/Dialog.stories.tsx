import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"
import { expect, fn, waitFor, within } from "storybook/test"
import { themeTokensData } from "@niceprototypes/styles"
import Button from "@niceprototypes/button"
import Dialog from "@niceprototypes/dialog"
import type { DialogProps } from "@niceprototypes/dialog"

const THEME_OPTIONS = Object.keys(themeTokensData)

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/** `actions` presets, built in `render` because the buttons close the dialog. */
const ACTIONS_OPTIONS = [NONE, "cancel"] as const

/**
 * PlaygroundArgs
 *
 * DialogProps with `actions` as a preset name. `open` is kept in sync through useArgs:
 * every close path (`onClose`) sets it false.
 */
type PlaygroundArgs = Omit<DialogProps, "actions" | "ref"> & {
  actions: (typeof ACTIONS_OPTIONS)[number]
}

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<PlaygroundArgs>

const HIDDEN = { table: { disable: true } }

export const Playground: Story = {
  args: {
    open: true,
    onClose: fn(),
    title: "Delete invoice?",
    description: "This cannot be undone.",
    children: "Invoice 1042 will be removed.",
    actions: "cancel",
    closeOnBackdropClick: true,
  },
  argTypes: {
    open: { control: "boolean", table: { category: "State" } },
    title: { control: "text", table: { category: "Content" } },
    description: { control: "text", table: { category: "Content" } },
    children: { control: "text", table: { category: "Content" } },
    actions: { control: "select", options: ACTIONS_OPTIONS, table: { category: "Content" } },
    closeOnBackdropClick: { control: "boolean", table: { category: "Behavior" } },
    theme: { control: "select", options: [NONE, ...THEME_OPTIONS], mapping: { [NONE]: undefined }, table: { category: "Appearance" } },
    onClose: { table: { category: "Events" } },
    id: HIDDEN,
  },
  render: function Render({ open, onClose, actions, ...rest }) {
    // Local state drives the render (portable stories under Vitest do not re-render on
    // updateArgs); useArgs keeps the Controls panel in sync.
    const [, updateArgs] = useArgs<PlaygroundArgs>()
    const [isOpen, setOpen] = React.useState(open)
    React.useEffect(() => setOpen(open), [open])
    const close = () => {
      onClose?.()
      setOpen(false)
      updateArgs({ open: false })
    }
    const props: DialogProps = {
      ...rest,
      open: isOpen,
      onClose: close,
      actions: actions === "cancel" ? <Button onClick={close}>Cancel</Button> : undefined,
    }
    return <Dialog {...props} />
  },
  play: async ({ canvasElement, args }) => {
    const dialog = within(canvasElement).getByRole<HTMLDialogElement>("dialog", { name: "Delete invoice?" })
    await expect(dialog).toHaveAccessibleDescription("This cannot be undone.")
    await expect(within(dialog).getByText("Invoice 1042 will be removed.")).toBeInTheDocument()
    // Focus moves to the first focusable descendant.
    await expect(within(dialog).getByRole("button", { name: "Cancel" })).toHaveFocus()
    // Escape reaches Dialog as the native `cancel` event, which a scripted key press does
    // not trigger; requestClose() runs the same close-request steps.
    dialog.requestClose()
    await waitFor(() => expect(args.onClose).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(within(canvasElement).queryByRole("dialog")).not.toBeInTheDocument())
  },
}

/**
 * A press on the backdrop. The ::backdrop belongs to the <dialog>, so a press there targets
 * the dialog element itself rather than its content.
 */
const clickBackdrop = (canvasElement: HTMLElement, userEvent: Parameters<NonNullable<Story["play"]>>[0]["userEvent"]) =>
  userEvent.click(within(canvasElement).getByRole("dialog"))

export const BackdropClick: Story = {
  ...Playground,
  play: async ({ canvasElement, args, userEvent }) => {
    await clickBackdrop(canvasElement, userEvent)
    await expect(args.onClose).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(within(canvasElement).queryByRole("dialog")).not.toBeInTheDocument())
  },
}

export const NoBackdropClose: Story = {
  ...Playground,
  args: { ...Playground.args, closeOnBackdropClick: false },
  play: async ({ canvasElement, args, userEvent }) => {
    await clickBackdrop(canvasElement, userEvent)
    await expect(args.onClose).not.toHaveBeenCalled()
    await expect(within(canvasElement).getByRole("dialog")).toBeVisible()
  },
}

export const Actions: Story = {
  ...Playground,
  play: async ({ canvasElement, args, userEvent }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Cancel" }))
    await expect(args.onClose).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(within(canvasElement).queryByRole("dialog")).not.toBeInTheDocument())
  },
}

export const Closed: Story = {
  ...Playground,
  args: { ...Playground.args, open: false },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole("dialog")).not.toBeInTheDocument()
    await expect(within(canvasElement).queryByText("Delete invoice?")).not.toBeInTheDocument()
  },
}

export const Minimal: Story = {
  ...Playground,
  args: { ...Playground.args, description: undefined, children: undefined, actions: NONE },
  play: async ({ canvasElement }) => {
    const dialog = within(canvasElement).getByRole("dialog", { name: "Delete invoice?" })
    await expect(dialog).not.toHaveAttribute("aria-describedby")
    await expect(within(dialog).queryByRole("button")).not.toBeInTheDocument()
    // Nothing focusable inside: the dialog itself takes focus.
    await expect(dialog).toHaveFocus()
  },
}

export const Theme: Story = {
  ...Playground,
  args: { ...Playground.args, theme: "night" },
  play: async ({ canvasElement }) => {
    const dialog = within(canvasElement).getByRole("dialog", { name: "Delete invoice?" })
    await expect(dialog.closest("[data-theme]")).toHaveAttribute("data-theme", "night")
  },
}
