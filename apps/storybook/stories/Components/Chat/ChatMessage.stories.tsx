import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import Ink from "@niceprototypes/ink"
import Markdown from "@niceprototypes/markdown"
import { ChatCopyAction, ChatMessage } from "@niceprototypes/chat"
import type { ChatMessageProps, ChatMessageRoleType, ChatMessageStatusType } from "@niceprototypes/chat"
import { QUESTION, REPLY, column } from "./chatStory"

const ROLE_OPTIONS = ["user", "assistant"] as const satisfies readonly ChatMessageRoleType[]
const STATUS_OPTIONS = ["base", "streaming", "error"] as const satisfies readonly ChatMessageStatusType[]

/** `children` presets. */
const CHILDREN_OPTIONS = {
  question: <Ink>{QUESTION}</Ink>,
  reply: <Markdown>{REPLY}</Markdown>,
}

/** `actions` presets; "none" maps to undefined. */
const ACTIONS_OPTIONS = { none: undefined, copy: <ChatCopyAction text={REPLY} /> }

const meta = {
  title: "Components/Chat/ChatMessage",
  component: ChatMessage,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ChatMessage>

export default meta

type Story = StoryObj<ChatMessageProps>

export const Playground: Story = {
  args: {
    role: "assistant",
    status: "base",
    children: CHILDREN_OPTIONS.reply,
    actions: ACTIONS_OPTIONS.copy,
  },
  argTypes: {
    role: { control: "select", options: ROLE_OPTIONS, table: { category: "Appearance" } },
    status: { control: "select", options: STATUS_OPTIONS, table: { category: "State" } },
    children: {
      control: "select",
      options: Object.keys(CHILDREN_OPTIONS),
      mapping: CHILDREN_OPTIONS,
      table: { category: "Content" },
    },
    actions: {
      control: "select",
      options: Object.keys(ACTIONS_OPTIONS),
      mapping: ACTIONS_OPTIONS,
      table: { category: "Content" },
    },
  },
  render: args => (
    <div style={{ width: column.width }}>
      <ChatMessage {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    // The last (here, only) message shows its actions.
    const copy = within(canvasElement).getByRole("button", { name: "Copy" })
    await expect(getComputedStyle(copy.parentElement as HTMLElement).opacity).toBe("1")
  },
}

/** A user message: an end-aligned bubble on the raised background. */
export const User: Story = {
  ...Playground,
  args: { ...Playground.args, role: "user", children: CHILDREN_OPTIONS.question, actions: undefined },
  play: async ({ canvasElement }) => {
    const bubble = within(canvasElement).getByText(QUESTION).parentElement as HTMLElement
    const message = bubble.parentElement as HTMLElement
    await expect(getComputedStyle(message).alignItems).toBe("flex-end")
    await expect(bubble.getBoundingClientRect().right).toBeCloseTo(message.getBoundingClientRect().right, 0)
  },
}

/** `status="streaming"`: busy, and the actions row is withheld. */
export const Streaming: Story = {
  ...Playground,
  args: { ...Playground.args, status: "streaming" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole("button", { name: "Copy" })).not.toBeInTheDocument()
    await expect(canvasElement.querySelector("[aria-busy=true]")).not.toBeNull()
  },
}
