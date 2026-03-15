import type { Meta, StoryObj } from "@storybook/react-vite"
import Icon from "nice-react-icon"
import NameStory from "./stories/Name.story"
import SizeStory from "./stories/Size.story"
import OutlinedStory from "./stories/Outlined.story"
import ColorStory from "./stories/Color.story"
import StrokeWidthStory from "./stories/StrokeWidth.story"
import StrokeScalingStory from "./stories/StrokeScaling.story"

const meta = {
  title: "React/Components/Icon",
  component: Icon,
  parameters: {
    layout: "padded",
    docs: {
      source: { code: null },
      canvas: { sourceState: "none" },
    },
  },

  argTypes: {
    name: {
      description: "",
      control: "select",
      options: [
        "placeholder",
        "arrow",
        "attention",
        "box",
        "brush",
        "calendar",
        "cancel",
        "carat",
        "check",
        "cloud",
        "code",
        "cog",
        "contact",
        "content",
        "edit",
        "link",
        "lock",
        "menu",
        "message",
        "pause",
        "plus",
        "profile",
        "puzzle",
        "search",
        "shuffle",
        "skip",
        "spinner",
        "trash",
        "upload",
        "x",
      ],
      table: {
        type: { summary: "IconNameType" },
      },
    },
    outlined: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    url: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    color: {
      description:
        "[`Tokens.foregroundColor`](/?path=/story/styles-tokens--foreground-color)",
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
        defaultValue: { summary: '"base"' },
      },
    },
    size: {
      description:
        "[`Tokens.fontSize`](/?path=/story/styles-tokens--font-size)",
      control: "select",
      options: ["smaller", "small", "base", "large", "larger"],
      table: {
        type: { summary: null },
        defaultValue: { summary: '"base"' },
      },
    },
    viewBox: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"0 0 16 16"' },
      },
    },
    strokeWidth: {
      description:
        "[`Tokens.borderWidth`](/?path=/story/styles-tokens--border-width)",
      control: "select",
      options: ["small", "base", "large"],
      table: {
        type: { summary: null },
        defaultValue: { summary: '"base"' },
      },
    },
    className: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    strokeScaling: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Name: Story = {
  name: "name",
  render: NameStory,
}

export const Size: Story = {
  name: "size",
  render: SizeStory,
}

export const Outlined: Story = {
  name: "outlined",
  render: OutlinedStory,
}

export const Color: Story = {
  name: "color",
  render: ColorStory,
}

export const StrokeWidth: Story = {
  name: "strokeWidth",
  render: StrokeWidthStory,
}

export const StrokeScaling: Story = {
  name: "strokeScaling",
  render: StrokeScalingStory,
}
