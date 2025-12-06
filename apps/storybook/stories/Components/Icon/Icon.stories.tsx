import type { Meta, StoryObj } from "@storybook/react"
import Icon from "nice-react-icon"
import VariableList from "../../../src/components/VariableList"
import { prepareName } from "./stories/name"
import { prepareColor } from "./stories/color"
import { prepareStatus } from "./stories/status"
import { prepareSpinning } from "./stories/spinning"
import { prepareRotation } from "./stories/rotation"

/**
 * A flexible and customizable React icon component with built-in icon set.
 *
 * Features:
 * - 30+ built-in icons with fill and stroke variants
 * - Custom React component support via renderImage
 * - Custom SVG URL support
 * - Flexible sizing (numbers map to CSS variables, strings accepted as-is)
 * - Status-based theming
 * - Spinning animation
 * - Rotation support
 * - TypeScript support
 */
const meta = {
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
        "arrow", "attention", "box", "brush", "calendar", "cancel", "carat",
        "check", "cloud", "code", "cog", "contact", "content", "edit", "link",
        "lock", "menu", "message", "pause", "placeholder", "plus", "profile",
        "puzzle", "search", "shuffle", "skip", "spinner", "trash", "upload", "x"
      ],
      table: {
        type: { summary: "IconNameType" },
      },
    },
    variant: {
      description: "",
      control: "select",
      options: ["fill", "stroke"],
      table: {
        type: { summary: '"fill" | "stroke"' },
        defaultValue: { summary: '"stroke"' },
      },
    },
    url: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    renderImage: {
      description: "",
      table: {
        type: { summary: "(imageSize: string) => React.ReactElement" },
      },
    },
    color: {
      description: "",
      control: "color",
      table: {
        type: { summary: "string" },
      },
    },
    backgroundColor: {
      description: "",
      control: "color",
      table: {
        type: { summary: "string" },
      },
    },
    size: {
      description: "[`Tokens.cellHeight`](/?path=/story/styles-tokens--cell-height)",
      control: "select",
      options: ["smaller", "small", "base", "large", "larger"],
      table: {
        type: { summary: null },
        defaultValue: { summary: '"base"' },
      },
    },
    borderRadius: {
      description: "",
      control: "select",
      options: [1, 2, 3],
      table: {
        type: { summary: "1 | 2 | 3" },
      },
    },
    imageSize: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"30%"' },
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
    status: {
      description: "",
      control: "select",
      options: ["active", "success", "error", "warning", "default", "muted", "highlighted", "primary", "secondary"],
      table: {
        type: { summary: '"active" | "success" | "error" | "warning" | "default" | "muted" | "highlighted" | "primary" | "secondary"' },
      },
    },
    spinning: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    rotation: {
      description: "",
      control: "number",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    strokeWidth: {
      description: "",
      control: "number",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
      },
    },
    isActive: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    className: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Name: Story = {
  name: "name",
  render: () => <VariableList variables={prepareName()} />,
}

export const Color: Story = {
  name: "color",
  render: () => <VariableList variables={prepareColor()} />,
}

/*
export const Status: Story = {
  name: "status",
  render: () => <VariableList variables={prepareStatus()} />,
}

export const Spinning: Story = {
  name: "spinning",
  render: () => <VariableList variables={prepareSpinning()} />,
}

export const Rotation: Story = {
  name: "rotation",
  render: () => <VariableList variables={prepareRotation()} />,
}*/
