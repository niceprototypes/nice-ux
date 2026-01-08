import type { Meta } from "@storybook/react"
import Button from "nice-react-button"
import { generateDescriptionString } from "../../../src/services"

export const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: generateDescriptionString("nice-react-button", {
          setup: [
            {
              value: 'import Button from "nice-react-button"',
              code: true,
              newLine: true,
            },
          ],
          usage: [
            {
              value: "<Button onClick={handler}>{children}</Button>",
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
      name: "children",
      description: "",
      control: "text",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    onClick: {
      description: "",
      table: {
        type: { summary: "() => void" },
      },
    },
    status: {
      description: "",
      control: "select",
      options: ["primary", "secondary"],
      table: {
        type: { summary: "ButtonStatusType" },
        defaultValue: { summary: '"primary"' },
      },
    },
    state: {
      description: "",
      control: "select",
      options: ["base", "disabled", "error", "success", "warning"],
      table: {
        type: { summary: "ButtonStateType" },
        defaultValue: { summary: '"base"' },
      },
    },
  },
} satisfies Meta<typeof Button>
