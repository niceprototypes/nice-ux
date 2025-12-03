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
      description: "Button text content",
      control: "text",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    antialiased: {
      description: "Whether to apply antialiased font rendering to the button text",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    "aria-label": {
      description: "ARIA label for accessibility",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    backgroundColor: {
      description: "Custom background color that overrides theme styles. Works alongside backgroundImage if both are provided",
      control: "color",
      table: {
        type: { summary: "string" },
      },
    },
    backgroundImage: {
      description: "Custom background image that overrides theme styles. Works alongside backgroundColor if both are provided",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    borderColor: {
      description: "Custom border color that overrides theme styles",
      control: "color",
      table: {
        type: { summary: "string" },
      },
    },
    borderRadius: {
      description: "Custom border radius for all corners (e.g., '8px', '0.5rem', '50%'). If not provided, defaults to pill shape (50% of button height)",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    borderWidth: {
      description: "Border width of the button (1-4)",
      control: "select",
      options: [1, 2, 3, 4],
      table: {
        type: { summary: "1 | 2 | 3 | 4" },
        defaultValue: { summary: "1" },
      },
    },
    bordered: {
      description: "Whether the button should have a border",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    className: {
      description: "Additional CSS class for custom styling",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    condensed: {
      description: "Whether to remove icon slots when no icons are present",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    config: {
      description: "Theme configuration overrides. Allows partial overrides of the default theme values",
      table: {
        type: { summary: "ThemeConfig" },
      },
    },
    "data-testid": {
      description: "Test ID for testing",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      description: "Whether the button is disabled",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    fontWeight: {
      description: "Font weight of the button text (1-4)",
      control: "select",
      options: [1, 2, 3, 4],
      table: {
        type: { summary: "1 | 2 | 3 | 4" },
        defaultValue: { summary: "3" },
      },
    },
    fullWidth: {
      description: "Whether the button should take full width of container",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    icon: {
      description: "Icon name from nice-react-icon to display",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    iconPosition: {
      description: "Position of the icon relative to text",
      control: "select",
      options: ["left", "right"],
      table: {
        type: { summary: '"left" | "right"' },
        defaultValue: { summary: '"right"' },
      },
    },
    iconRotation: {
      description: "Rotation of the icon in degrees",
      control: "number",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    mode: {
      description: "Theme mode for light/dark appearance",
      control: "select",
      options: ["light", "dark"],
      table: {
        type: { summary: '"light" | "dark"' },
        defaultValue: { summary: '"light"' },
      },
    },
    onClick: {
      description: "Click handler",
      table: {
        type: { summary: "() => void" },
      },
    },
    size: {
      description: "Size of the button (1-4, smallest to largest)",
      control: "select",
      options: [1, 2, 3, 4],
      table: {
        type: { summary: "1 | 2 | 3 | 4" },
        defaultValue: { summary: "3" },
      },
    },
    state: {
      description: "Interactive state of the button. Affects styling and behavior",
      control: "select",
      options: ["default", "disabled", "attention", "success", "warning"],
      table: {
        type: { summary: '"default" | "disabled" | "attention" | "success" | "warning"' },
        defaultValue: { summary: '"default"' },
      },
    },
    status: {
      description: "Visual status/styling variant of the button",
      control: "select",
      options: ["primary", "secondary", "default", "muted", "highlighted"],
      table: {
        type: { summary: '"primary" | "secondary" | "default" | "muted" | "highlighted"' },
        defaultValue: { summary: '"primary"' },
      },
    },
    type: {
      description: "HTML button type",
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