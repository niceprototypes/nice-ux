import type { Meta, StoryObj } from "@storybook/react-vite"
import Flex from "nice-react-flex"
import BasicStory from "./stories/Basic.story"
import DirectionStory from "./stories/Direction.story"
import GapStory from "./stories/Gap.story"
import SpacingStory from "./stories/Spacing.story"
import ModeStory from "./stories/Mode.story"
import GrowStory from "./stories/Grow.story"
import JustifyContentStory from "./stories/JustifyContent.story"
import AlignItemsStory from "./stories/AlignItems.story"
import WrapStory from "./stories/Wrap.story"

const meta = {
  title: "React/Components/Flex",
  component: Flex,
  parameters: {
    layout: "padded",
    docs: {
      source: { code: null },
      canvas: { sourceState: "none" },
    },
  },

  argTypes: {
    children: {
      name: "children",
      description: "",
      control: "text",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    alignItems: {
      description: "",
      control: "select",
      options: ["flex-start", "flex-end", "center", "baseline", "stretch"],
      table: {
        type: {
          summary:
            '"flex-start" | "flex-end" | "center" | "baseline" | "stretch"',
        },
      },
    },
    className: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    direction: {
      description: "",
      control: "select",
      options: ["row", "column"],
      table: {
        type: { summary: '"row" | "column"' },
      },
    },
    gap: {
      description: "[`Tokens.gap`](/?path=/story/styles-tokens--gap)",
      control: "select",
      options: ["smaller", "small", "base", "large", "larger"],
      table: {
        type: { summary: null },
      },
    },
    grow: {
      description: "",
      control: "number",
      table: {
        type: { summary: "number" },
      },
    },
    justifyContent: {
      description: "",
      control: "select",
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
      ],
      table: {
        type: {
          summary:
            '"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"',
        },
      },
    },
    spacing: {
      description: "[`Tokens.gap`](/?path=/story/styles-tokens--gap)",
      table: {
        type: { summary: null },
      },
    },
    style: {
      description: "",
      table: {
        type: { summary: "object" },
      },
    },
    mode: {
      description: "",
      control: "select",
      options: ["padding", "margin"],
      table: {
        type: { summary: '"padding" | "margin"' },
        defaultValue: { summary: "padding" },
      },
    },
    wrap: {
      description: "",
      control: "select",
      options: ["nowrap", "wrap", "wrap-reverse"],
      table: {
        type: { summary: '"nowrap" | "wrap" | "wrap-reverse"' },
      },
    },
  },
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: "basic",
  render: BasicStory,
}

export const Direction: Story = {
  name: "direction",
  render: DirectionStory,
}

export const Gap: Story = {
  name: "gap",
  render: GapStory,
}

export const Spacing: Story = {
  name: "spacing",
  render: SpacingStory,
}

export const Mode: Story = {
  name: "mode",
  render: ModeStory,
}

export const Grow: Story = {
  name: "grow",
  render: GrowStory,
}

export const JustifyContent: Story = {
  name: "justifyContent",
  render: JustifyContentStory,
}

export const AlignItems: Story = {
  name: "alignItems",
  render: AlignItemsStory,
}

export const Wrap: Story = {
  name: "wrap",
  render: WrapStory,
}
