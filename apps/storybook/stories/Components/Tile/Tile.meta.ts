import type { Meta } from "@storybook/react"
import Tile from "nice-react-tile"
import { generateDescriptionString } from "../../../src/services"

export const meta = {
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
      control: "color",
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
