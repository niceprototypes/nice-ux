import type { Meta, StoryObj } from "@storybook/react"
import Button from "nice-react-button"
import VariableList from "../../../src/components/VariableList"
import { prepareOnClick } from "./stories/onClick"

/**
 * A flexible and customizable React button component with built-in theming support.
 *
 * Features:
 * - Multiple sizes (1-4)
 * - Light/dark mode support
 * - Various statuses (primary, secondary, default, muted, highlighted)
 * - States (default, disabled, attention, success, warning)
 * - Icon support with nice-react-icon
 * - Full theming capabilities
 * - Accessibility support
 */
const meta = {
  title: "Components/Button",
  component: Button,
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
    antialiased: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    "aria-label": {
      description: "",
      control: "text",
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
    backgroundImage: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    borderColor: {
      description: "",
      control: "color",
      table: {
        type: { summary: "string" },
      },
    },
    borderRadius: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    borderWidth: {
      description: "[`Tokens.borderWidth`](/?path=/story/styles-tokens--border-width)",
      control: "select",
      options: ["base", "large"],
      table: {
        type: { summary: null },
        defaultValue: { summary: '"base"' },
      },
    },
    bordered: {
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
    condensed: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    "data-testid": {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    fontWeight: {
      description: "[`Tokens.fontWeight`](/?path=/story/styles-tokens--font-weight)",
      control: "select",
      options: ["light", "base", "medium", "semibold", "bold", "extrabold", "black"],
      table: {
        type: { summary: null },
        defaultValue: { summary: '"medium"' },
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
    icon: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    iconPosition: {
      description: "",
      control: "select",
      options: ["left", "right"],
      table: {
        type: { summary: '"left" | "right"' },
        defaultValue: { summary: '"right"' },
      },
    },
    iconRotation: {
      description: "",
      control: "number",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    mode: {
      description: "",
      control: "select",
      options: ["light", "dark"],
      table: {
        type: { summary: '"light" | "dark"' },
        defaultValue: { summary: '"light"' },
      },
    },
    onClick: {
      description: "",
      table: {
        type: { summary: "() => void" },
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
    state: {
      description: "",
      control: "select",
      options: ["default", "disabled", "attention", "success", "warning"],
      table: {
        type: { summary: '"default" | "disabled" | "attention" | "success" | "warning"' },
        defaultValue: { summary: '"default"' },
      },
    },
    status: {
      description: "",
      control: "select",
      options: ["primary", "secondary", "default", "muted", "highlighted"],
      table: {
        type: { summary: '"primary" | "secondary" | "default" | "muted" | "highlighted"' },
        defaultValue: { summary: '"primary"' },
      },
    },
    type: {
      description: "",
      control: "select",
      options: ["button", "submit", "reset"],
      table: {
        type: { summary: '"button" | "submit" | "reset"' },
        defaultValue: { summary: '"button"' },
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const OnClick: Story = {
  name: "onClick",
  render: () => <VariableList variables={prepareOnClick()} />,
}