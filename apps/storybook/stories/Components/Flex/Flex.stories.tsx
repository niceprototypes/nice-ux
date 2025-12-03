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
    // Required props first
    children: {
      name: "children",
      description: "Child elements",
      control: "text",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    // Optional props alphabetically
    alignItems: {
      description: "Align items on cross axis",
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
      description: "CSS classname",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    direction: {
      description: "Flex direction",
      control: "select",
      options: ["row", "column"],
      table: {
        type: { summary: '"row" | "column"' },
      },
    },
    gap: {
      description: "Space between flex items using CSS gap",
      control: "select",
      options: ["smaller", "small", "base", "large", "larger"],
      table: {
        type: { summary: '"smaller" | "small" | "base" | "large" | "larger"' },
      },
    },
    grow: {
      description: "Flex grow",
      control: "number",
      table: {
        type: { summary: "number" },
      },
    },
    justifyContent: {
      description: "Align items on main axis",
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
      description: "Padding or margin around children",
      table: {
        type: { summary: '"smaller" | "small" | "base" | "large" | "larger"' },
      },
    },
    style: {
      description: "Inline styles",
      table: {
        type: { summary: "object" },
      },
    },
    type: {
      description: "Whether spacing applies as padding or margin",
      control: "select",
      options: ["padding", "margin"],
      table: {
        type: { summary: '"padding" | "margin"' },
        defaultValue: { summary: "padding" },
      },
    },
    wrap: {
      description: "Flex wrapping",
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
