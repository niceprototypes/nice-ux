import type { Meta, StoryObj } from "@storybook/react"
import Button from "nice-react-button"
import Story from "../../../src/components/Story"

/**
 * A flexible and customizable React button component with built-in theming support.
 *
 * Features:
 * - Multiple sizes (smaller, small, base, large, larger)
 * - States (default, disabled, attention, success, warning)
 * - Icon support with nice-react-icon
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
      },
    },
    "aria-label": {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    borderWidth: {
      description: "[`Tokens.borderWidth`](/?path=/story/styles-tokens--border-width)",
      control: "select",
      options: ["small", "base", "large"],
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
    icon: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
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
        type: { summary: "ButtonStateType" },
        defaultValue: { summary: '"default"' },
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
  render: () => (
    <Story
      variables={[
        {
          name: "onClick",
          description: "Click handler function",
          demo: (
            <Button onClick={() => alert("Button clicked!")}>
              Click Me
            </Button>
          ),
          code: `<Button onClick={() => console.log("clicked")}>\n  Click Me\n</Button>`,
        },
      ]}
    />
  ),
}