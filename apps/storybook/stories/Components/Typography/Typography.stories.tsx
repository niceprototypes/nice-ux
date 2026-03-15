import type { Meta, StoryObj } from "@storybook/react-vite"
import Typography from "nice-react-typography"
import AlignStory from "./stories/Align.story"
import AntialiasedStory from "./stories/Antialiased.story"
import AsStory from "./stories/As.story"
import CodeStory from "./stories/Code.story"
import ColorStory from "./stories/Color.story"
import LegibilityOptimizedStory from "./stories/LegibilityOptimized.story"
import LineHeightStory from "./stories/LineHeight.story"
import SizeStory from "./stories/Size.story"
import WeightStory from "./stories/Weight.story"

const meta = {
  title: "React/Components/Typography",
  component: Typography,
  parameters: {
    layout: "padded",
    docs: {
      source: { code: null },
      canvas: { sourceState: "none" },
    },
  },

  argTypes: {
    children: {
      name: "children *",
      description: "",
      control: "text",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    align: {
      description: "",
      control: "select",
      options: ["left", "center", "right", "justify"],
      table: {
        type: { summary: '"left" | "center" | "right" | "justify"' },
        defaultValue: { summary: "left" },
      },
    },
    antialiased: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    as: {
      description: "",
      control: "select",
      options: ["h1", "h2", "h3", "h4", "p", "span"],
      table: {
        type: { summary: '"h1" | "h2" | "h3" | "h4" | "p" | "span"' },
        defaultValue: { summary: "p" },
      },
    },
    className: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    code: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    color: {
      description: "[`Tokens.foregroundColor`](/?path=/story/styles-tokens--foreground-color)",
      control: "select",
      options: [
        "lightest",
        "lighter",
        "light",
        "base",
        "disabled",
        "link",
        "success",
        "warning",
        "error",
      ],
      table: {
        type: { summary: null },
      },
    },
    legibilityOptimized: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    lineHeight: {
      description: "[`Tokens.lineHeight`](/?path=/story/styles-tokens--line-height)",
      control: "select",
      options: ["condensed", "base", "expanded"],
      table: {
        type: { summary: null },
        defaultValue: { summary: "conditional" },
      },
    },
    size: {
      description: "[`Tokens.fontSize`](/?path=/story/styles-tokens--font-size)",
      control: "text",
      table: {
        type: { summary: null },
        defaultValue: { summary: "conditional" },
      },
    },
    weight: {
      description: "[`Tokens.fontWeight`](/?path=/story/styles-tokens--font-weight)",
      control: "text",
      table: {
        type: { summary: null },
        defaultValue: { summary: "conditional" },
      },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Align: Story = {
  name: "align",
  render: AlignStory,
}

export const Antialiased: Story = {
  name: "antialiased",
  render: AntialiasedStory,
}

export const As: Story = {
  name: "as",
  render: AsStory,
}

export const Code: Story = {
  name: "code",
  render: CodeStory,
}

export const Color: Story = {
  name: "color",
  render: ColorStory,
}

export const LegibilityOptimized: Story = {
  name: "legibilityOptimized",
  render: LegibilityOptimizedStory,
}

export const LineHeight: Story = {
  name: "lineHeight",
  render: LineHeightStory,
}

export const Size: Story = {
  name: "size",
  render: SizeStory,
}

export const Weight: Story = {
  name: "weight",
  render: WeightStory,
}
