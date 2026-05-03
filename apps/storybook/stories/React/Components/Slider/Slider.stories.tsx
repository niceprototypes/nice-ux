import type { Meta, StoryObj } from "@storybook/react-vite"
import DefaultStory from "./stories/Default.story"
import CurrentIndexStory from "./stories/CurrentIndex.story"
import IsAnimatingStory from "./stories/IsAnimating.story"
import OnAnimationCompleteStory from "./stories/OnAnimationComplete.story"

const meta = {
  title: "React/Components/Slider",
  parameters: {
    layout: "fullscreen",
    docs: {
      source: { code: null },
      canvas: { sourceState: "none" },
    },
  },

  argTypes: {
    children: {
      description: "Array of slide elements to display",
      table: {
        type: { summary: "React.ReactNode[]" },
      },
    },
    currentIndex: {
      description: "Index of the currently visible slide (zero-indexed)",
      control: "number",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    isAnimating: {
      description: "Whether the slider is currently animating between slides",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onAnimationComplete: {
      description:
        "Callback fired when slide transition animation completes (after 300ms)",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "Slider",
  render: DefaultStory,
}

export const CurrentIndex: Story = {
  name: "currentIndex",
  render: CurrentIndexStory,
}

export const IsAnimating: Story = {
  name: "isAnimating",
  render: IsAnimatingStory,
}

export const OnAnimationComplete: Story = {
  name: "onAnimationComplete",
  render: OnAnimationCompleteStory,
}
