import type { Meta } from "@storybook/react"
import Typography from "nice-react-typography"

export const meta = {
  title: "Components/Typography",
  component: Typography,
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
        "lighter",
        "light",
        "medium",
        "heavy",
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
