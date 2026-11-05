import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"
import { ChatCopyAction } from "@niceprototypes/chat"
import type { ChatCopyActionProps } from "@niceprototypes/chat"

const meta = {
  title: "Components/Chat/ChatCopyAction",
  component: ChatCopyAction,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ChatCopyAction>

export default meta

type Story = StoryObj<ChatCopyActionProps>

export const Playground: Story = {
  args: {
    text: "transition: transform 240ms ease-out;",
  },
  argTypes: {
    text: { control: "text", table: { category: "Content" } },
  },
  play: async ({ canvasElement, args }) => {
    const writes: string[] = []
    const original = navigator.clipboard.writeText
    navigator.clipboard.writeText = async (text: string) => {
      writes.push(text)
    }
    try {
      await userEvent.click(within(canvasElement).getByRole("button", { name: "Copy" }))
      await waitFor(() => expect(writes).toEqual([args.text]))
    } finally {
      navigator.clipboard.writeText = original
    }
  },
}
