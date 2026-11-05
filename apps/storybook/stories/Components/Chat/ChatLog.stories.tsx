import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"
import Flex from "@niceprototypes/flex"
import { ChatComposer, ChatLog } from "@niceprototypes/chat"
import type { ChatLogProps } from "@niceprototypes/chat"
import LifecycleStory from "@niceprototypes/docs/components/LifecycleStory"
import { CONVERSATION, QUESTION, STREAM, TurnMessage, column, type Turn } from "./chatStory"

/** `children` presets: the Playground's messages. */
const CHILDREN_OPTIONS = {
  conversation: CONVERSATION.map(turn => <TurnMessage key={turn.id} {...turn} />),
  one: <TurnMessage {...CONVERSATION[0]} />,
  empty: undefined,
}

const meta = {
  title: "Components/Chat/ChatLog",
  component: ChatLog,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ChatLog>

export default meta

type Story = StoryObj<ChatLogProps>

export const Playground: Story = {
  args: {
    "aria-label": "Conversation",
    streaming: false,
    children: CHILDREN_OPTIONS.conversation,
  },
  argTypes: {
    "aria-label": { control: "text", table: { category: "Accessibility" } },
    streaming: { control: "boolean", table: { category: "State" } },
    children: {
      control: "select",
      options: Object.keys(CHILDREN_OPTIONS),
      mapping: CHILDREN_OPTIONS,
      table: { category: "Content" },
    },
  },
  render: args => (
    <Flex
      direction="column"
      style={column}
    >
      <ChatLog {...args} />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const log = canvas.getByRole("log", { name: "Conversation" })
    await expect(log).not.toHaveAttribute("aria-busy")
    // Opens at the end: no end button.
    await expect(canvas.queryByRole("button", { name: "Scroll to latest" })).not.toBeInTheDocument()
    log.scrollTop = 0
    const end = await canvas.findByRole("button", { name: "Scroll to latest" })
    await userEvent.click(end)
    await waitFor(() => expect(canvas.queryByRole("button", { name: "Scroll to latest" })).not.toBeInTheDocument())
  },
}

/** `streaming` sets `aria-busy` on the log. */
export const Streaming: Story = {
  ...Playground,
  args: { ...Playground.args, streaming: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("log")).toHaveAttribute("aria-busy", "true")
  },
}

type ExchangeStep = { draft: string; turns: Turn[]; busy: boolean }

const ASK: Turn = { id: "q", role: "user", text: QUESTION }

/** A scripted exchange: a question typed and sent, the reply streaming in, then its actions. */
const EXCHANGE: { label: string; props: ExchangeStep; duration?: "base" | "long" }[] = [
  { label: "empty", props: { draft: "", turns: [], busy: false } },
  { label: "typed", props: { draft: QUESTION, turns: [], busy: false } },
  { label: "sent", props: { draft: "", turns: [ASK], busy: true } },
  ...STREAM.slice(0, -1).map((text, index) => ({
    label: `streaming ${index + 1}`,
    props: { draft: "", turns: [ASK, { id: "a", role: "assistant" as const, text, status: "streaming" as const }], busy: true },
  })),
  {
    label: "actions",
    props: { draft: "", turns: [ASK, { id: "a", role: "assistant", text: STREAM[STREAM.length - 1] }], busy: false },
    duration: "long",
  },
]

/** The exchange on a loop: a user message, the assistant reply streaming in, then its actions appearing. */
export const Lifecycle: Story = {
  args: { "aria-label": "Conversation" },
  render: args => (
    <LifecycleStory
      steps={EXCHANGE}
      render={({ draft, turns, busy }: ExchangeStep) => (
        <Flex
          direction="column"
          gap="base"
          style={column}
        >
          <ChatLog
            aria-label={args["aria-label"]}
            streaming={busy}
          >
            {turns.map(turn => (
              <TurnMessage
                key={turn.id}
                {...turn}
              />
            ))}
          </ChatLog>
          <ChatComposer
            value={draft}
            onChange={() => {}}
            onSubmit={() => {}}
            onStop={() => {}}
            busy={busy}
            placeholder="Ask about this scene"
          />
        </Flex>
      )}
    />
  ),
}
