import type { Meta, StoryObj } from "@storybook/react"
import Lightbox from "nice-react-lightbox"
import BasicStory from "./stories/Basic.story"
import CaptionStory from "./stories/Caption.story"

const meta = {
  title: "React/Components/Lightbox",
  component: Lightbox,
  parameters: {
    layout: "padded",
    docs: {
      source: { code: null },
      canvas: { sourceState: "none" },
    },
  },

  argTypes: {
    imageUrl: {
      description: "URL of the image to display fullscreen",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    alt: {
      description: "Alt text for the image",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    title: {
      description: "Title shown below the image in the overlay",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    description: {
      description: "Description shown below the title in the overlay",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    children: {
      description: "Content that triggers the lightbox on click",
      control: false,
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
  },
  args: {
    imageUrl: "https://picsum.photos/id/10/800/600",
  },
} satisfies Meta<typeof Lightbox>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: "basic",
  render: BasicStory,
}

export const WithCaption: Story = {
  name: "caption",
  render: CaptionStory,
}