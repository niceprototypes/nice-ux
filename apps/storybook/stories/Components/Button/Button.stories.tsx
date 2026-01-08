import type { Meta, StoryObj } from "@storybook/react"
import Button from "nice-react-button"
import { generateDescriptionString } from "../../../src/services"
import BasicStory from "./stories/Basic.story"
import StatusStory from "./stories/Status.story"
import StateStory from "./stories/State.story"
import SizeStory from "./stories/Size.story"
import BorderRadiusStory from "./stories/BorderRadius.story"
import IconStory from "./stories/Icon.story"

const meta = {
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

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: "basic",
  render: BasicStory,
}

export const Status: Story = {
  name: "status",
  render: StatusStory,
}

export const State: Story = {
  name: "state",
  render: StateStory,
}

export const Size: Story = {
  name: "size",
  render: SizeStory,
}

export const BorderRadius: Story = {
  name: "borderRadius",
  render: BorderRadiusStory,
}

export const Icon: Story = {
  name: "icon",
  render: IconStory,
}
