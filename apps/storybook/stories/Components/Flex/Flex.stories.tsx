import type { Meta, StoryObj } from "@storybook/react"
import Flex from "nice-react-flex"
import VariableList from "../../../src/components/VariableList"
import { prepareBasic } from "./stories/basic"
import { prepareDirection } from "./stories/direction"
import { prepareGap } from "./stories/gap"
import { prepareSpacing } from "./stories/spacing"
import { prepareType } from "./stories/type"
import { prepareGrow } from "./stories/grow"
import { prepareJustifyContent } from "./stories/justifyContent"
import { prepareAlignItems } from "./stories/alignItems"
import { prepareWrap } from "./stories/wrap"

/**
 * A highly flexible and responsive flexbox container component that provides
 * comprehensive layout control with breakpoint-based responsive design.
 *
 * All layout props support both static values and responsive objects with sm/md/lg breakpoints.
 */
const meta = {
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
    type: {
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

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: "basic",
  render: () => <VariableList variables={prepareBasic()} />,
}

export const Direction: Story = {
  name: "direction",
  render: () => <VariableList variables={prepareDirection()} />,
}

export const Gap: Story = {
  name: "gap",
  render: () => <VariableList variables={prepareGap()} />,
}

export const Spacing: Story = {
  name: "spacing",
  render: () => <VariableList variables={prepareSpacing()} />,
}

export const Type: Story = {
  name: "type",
  render: () => <VariableList variables={prepareType()} />,
}

export const Grow: Story = {
  name: "grow",
  render: () => <VariableList variables={prepareGrow()} />,
}

export const JustifyContent: Story = {
  name: "justifyContent",
  render: () => <VariableList variables={prepareJustifyContent()} />,
}

export const AlignItems: Story = {
  name: "alignItems",
  render: () => <VariableList variables={prepareAlignItems()} />,
}

export const Wrap: Story = {
  name: "wrap",
  render: () => <VariableList variables={prepareWrap()} />,
}
