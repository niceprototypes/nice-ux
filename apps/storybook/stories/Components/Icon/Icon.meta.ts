import type { Meta } from "@storybook/react"
import Icon from "nice-react-icon"

export const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "padded",
    docs: {
      source: { code: null },
      canvas: { sourceState: "none" },
    },
  },
  tags: ["autodocs"],
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
      options: ["base", "large"],
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
