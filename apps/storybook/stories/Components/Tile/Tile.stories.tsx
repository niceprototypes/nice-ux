import type { Meta, StoryObj } from "@storybook/react"
import Tile from "nice-react-tile"
import { generateDescriptionString } from "../../../src/services"
import BasicStory from "./stories/Basic.story"
import BackgroundColorStory from "./stories/BackgroundColor.story"
import SpacingStory from "./stories/Spacing.story"
import BreakpointLgStory from "./stories/BreakpointLg.story"
import FullWidthStory from "./stories/FullWidth.story"
import ContentLeftStory from "./stories/ContentLeft.story"
import ContentRightStory from "./stories/ContentRight.story"
import TitleStory from "./stories/Title.story"
import DescriptionStory from "./stories/Description.story"
import LayoutStory from "./stories/Layout.story"

const meta = {
  title: "Components/Tile",
  component: Tile,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: generateDescriptionString("nice-react-tile", {
          setup: [
            {
              value: 'import Tile from "nice-react-tile"',
              code: true,
              newLine: true,
            },
          ],
          usage: [
            {
              value: "<Tile>{children}</Tile>",
              code: true,
            },
          ],
        }),
      },
      source: { code: null },
      canvas: { sourceState: "none" },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      name: "children *",
      description: "",
      control: "text",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    backgroundColor: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    backgroundImage: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    backgroundPosition: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"center"' },
      },
    },
    backgroundSize: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"cover"' },
      },
    },
    backgroundAttachment: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"fixed"' },
      },
    },
    breakpointMd: {
      description: "",
      control: "number",
      table: {
        type: { summary: "number" },
      },
    },
    breakpointLg: {
      description: "",
      control: "number",
      table: {
        type: { summary: "number" },
      },
    },
    fullWidth: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    title: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    titleAs: {
      description: "",
      control: "select",
      options: ["h1", "h2", "h3", "h4", "p", "span"],
      table: {
        type: { summary: "AsType" },
        defaultValue: { summary: '"h2"' },
      },
    },
    description: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    headerAlign: {
      description: "",
      control: "select",
      options: ["left", "center", "right"],
      table: {
        type: { summary: "TileHeaderAlignType" },
        defaultValue: { summary: '"center"' },
      },
    },
    headerColor: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    headerStyle: {
      description: "",
      table: {
        type: { summary: "React.CSSProperties" },
      },
    },
    spacing: {
      description: "[`Tokens.gap`](/?path=/story/styles-tokens--gap)",
      control: "select",
      options: ["smaller", "small", "base", "large", "larger"],
      table: {
        type: { summary: null },
      },
    },
    contentLeft: {
      description: "",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    contentRight: {
      description: "",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    className: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    style: {
      description: "",
      table: {
        type: { summary: "React.CSSProperties" },
      },
    },
  },
} satisfies Meta<typeof Tile>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: "basic",
  render: BasicStory,
}

export const Title: Story = {
  name: "title",
  render: TitleStory,
}

export const Description: Story = {
  name: "description",
  render: DescriptionStory,
}

export const BackgroundColor: Story = {
  name: "backgroundColor",
  render: BackgroundColorStory,
}

export const Spacing: Story = {
  name: "spacing",
  render: SpacingStory,
}

export const BreakpointLg: Story = {
  name: "breakpointLg",
  render: BreakpointLgStory,
}

export const FullWidth: Story = {
  name: "fullWidth",
  render: FullWidthStory,
}

export const ContentLeft: Story = {
  name: "contentLeft",
  render: ContentLeftStory,
}

export const ContentRight: Story = {
  name: "contentRight",
  render: ContentRightStory,
}

export const Layout: Story = {
  name: "layout",
  render: LayoutStory,
}
