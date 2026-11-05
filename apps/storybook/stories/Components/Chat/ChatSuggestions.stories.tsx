import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { ChatSuggestions } from "@niceprototypes/chat"
import type { ChatSuggestionsItemsType, ChatSuggestionsProps } from "@niceprototypes/chat"

/** `items` presets. */
const ITEMS_OPTIONS: Record<string, ChatSuggestionsItemsType> = {
  three: [
    { id: "stiff", label: "Why does the slide feel stiff?" },
    { id: "fade", label: "Add a fade" },
    { id: "spring", label: "Try a spring curve" },
  ],
  one: [{ id: "explain", label: "Explain this scene" }],
}

const meta = {
  title: "Components/Chat/ChatSuggestions",
  component: ChatSuggestions,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ChatSuggestions>

export default meta

type Story = StoryObj<ChatSuggestionsProps>

export const Playground: Story = {
  args: {
    items: ITEMS_OPTIONS.three,
    onPick: fn(),
  },
  argTypes: {
    items: {
      control: "select",
      options: Object.keys(ITEMS_OPTIONS),
      mapping: ITEMS_OPTIONS,
      table: { category: "Content" },
    },
    onPick: { table: { category: "Events" } },
  },
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Add a fade" }))
    await expect(args.onPick).toHaveBeenCalledWith(ITEMS_OPTIONS.three[1])
  },
}
