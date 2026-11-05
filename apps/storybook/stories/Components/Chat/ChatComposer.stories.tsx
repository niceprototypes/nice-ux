import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"
import { expect, fn, userEvent, within } from "storybook/test"
import Button from "@niceprototypes/button"
import { ChatComposer } from "@niceprototypes/chat"
import type { ChatComposerProps } from "@niceprototypes/chat"
import { column } from "./chatStory"

/** `actions` presets; "none" maps to undefined. */
const ACTIONS_OPTIONS = {
  none: undefined,
  attach: (
    <Button
      iconLeft="file"
      size="small"
      ghost
      aria-label="Attach"
    />
  ),
}

const meta = {
  title: "Components/Chat/ChatComposer",
  component: ChatComposer,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ChatComposer>

export default meta

type Story = StoryObj<ChatComposerProps>

export const Playground: Story = {
  args: {
    value: "",
    placeholder: "Ask about this scene",
    busy: false,
    disabled: false,
    maxRows: undefined,
    actions: undefined,
    "aria-label": "Message",
    onChange: fn(),
    onSubmit: fn(),
    onStop: fn(),
  },
  argTypes: {
    value: { control: "text", table: { category: "Content" } },
    placeholder: { control: "text", table: { category: "Content" } },
    busy: { control: "boolean", table: { category: "State" } },
    disabled: { control: "boolean", table: { category: "State" } },
    maxRows: { control: { type: "number", min: 1 }, table: { category: "Appearance" } },
    actions: {
      control: "select",
      options: Object.keys(ACTIONS_OPTIONS),
      mapping: ACTIONS_OPTIONS,
      table: { category: "Content" },
    },
    "aria-label": { control: "text", table: { category: "Accessibility" } },
    onChange: { table: { category: "Events" } },
    onSubmit: { table: { category: "Events" } },
    onStop: { table: { category: "Events" } },
  },
  render: function Render({ value, onChange, ...args }) {
    // Local state drives the render (portable stories under Vitest do not re-render on
    // updateArgs); useArgs keeps the Controls panel in sync.
    const [, updateArgs] = useArgs<ChatComposerProps>()
    const [current, setCurrent] = React.useState(value)
    React.useEffect(() => setCurrent(value), [value])
    return (
      <div style={{ width: column.width }}>
        <ChatComposer
          {...args}
          value={current}
          onChange={(next, event) => {
            onChange(next, event)
            setCurrent(next)
            updateArgs({ value: next })
          }}
        />
      </div>
    )
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const textbox = canvas.getByRole("textbox", { name: "Message" })
    await userEvent.type(textbox, "Hello{Shift>}{Enter}{/Shift}there{Enter}")
    await expect(args.onSubmit).toHaveBeenCalledWith("Hello\nthere")
  },
}

/** `busy`: the send button is a stop button; it and Escape call `onStop`. */
export const Busy: Story = {
  ...Playground,
  args: { ...Playground.args, busy: true, onStop: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByRole("button", { name: "Send" })).not.toBeInTheDocument()
    await userEvent.click(canvas.getByRole("button", { name: "Stop" }))
    await userEvent.type(canvas.getByRole("textbox", { name: "Message" }), "{Escape}")
    await expect(args.onStop).toHaveBeenCalledTimes(2)
  },
}

/** `disabled`: the text field and the button are disabled. */
export const Disabled: Story = {
  ...Playground,
  args: { ...Playground.args, value: "Hi", disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("textbox", { name: "Message" })).toBeDisabled()
    await expect(canvas.getByRole("button", { name: "Send" })).toBeDisabled()
  },
}
