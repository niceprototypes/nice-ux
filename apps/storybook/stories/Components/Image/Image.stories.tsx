import type { Meta, StoryObj } from "@storybook/react-vite"
import Image from "nice-react-image"
import BasicStory from "./stories/Basic.story"
import BackgroundSizeStory from "./stories/BackgroundSize.story"
import BackgroundPositionStory from "./stories/BackgroundPosition.story"
import BorderRadiusStory from "./stories/BorderRadius.story"
import AsStory from "./stories/As.story"

const meta = {
  title: "React/Components/Image",
  component: Image,
  parameters: {
    layout: "padded",
    docs: {
      source: { code: null },
      canvas: { sourceState: "none" },
    },
  },
  argTypes: {
    as: {
      description: "Rendering mode: img element or div with background-image",
      control: "select",
      options: ["img", "div"],
      table: {
        type: { summary: '"img" | "div"' },
        defaultValue: { summary: '"img"' },
      },
    },
    src: {
      description: "Image source URL",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    alt: {
      description: "Alternative text for accessibility",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    width: {
      description: "Width of the image container (any valid CSS value)",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    height: {
      description: "Height of the image container (any valid CSS value)",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    backgroundSize: {
      description: "How the image fits within its container",
      control: "select",
      options: ["contain", "cover", "fill", "none", "scale-down"],
      table: {
        type: { summary: '"contain" | "cover" | "fill" | "none" | "scale-down"' },
      },
    },
    backgroundPosition: {
      description: "Position of the image within its container",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    borderRadius: {
      description: "Border radius from nice-styles tokens",
      control: "select",
      options: ["smaller", "small", "base", "large", "larger"],
      table: {
        type: { summary: '"smaller" | "small" | "base" | "large" | "larger"' },
      },
    },
    children: {
      description: "Content rendered inside the div (only when as=\"div\")",
      control: false,
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
  },
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: "basic",
  render: BasicStory,
}

export const BackgroundSize: Story = {
  name: "backgroundSize",
  render: BackgroundSizeStory,
}

export const BackgroundPosition: Story = {
  name: "backgroundPosition",
  render: BackgroundPositionStory,
}

export const BorderRadius: Story = {
  name: "borderRadius",
  render: BorderRadiusStory,
}

export const As: Story = {
  name: "as",
  render: AsStory,
}
