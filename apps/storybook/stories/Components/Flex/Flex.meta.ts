import type { Meta } from "@storybook/react"
import Flex from "nice-react-flex"

export const meta = {
  title: "Components/Flex",
  component: Flex,
  parameters: {
    layout: "padded",
    docs: {
      source: { code: null },
      canvas: { sourceState: "none" },
    },
  },
  tags: ["autodocs"],
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
