import type { Meta, StoryObj } from "@storybook/react"
import Flex, { GapSize } from "nice-react-flex"
import { getToken } from "nice-styles"
import VariableList from "../../src/components/VariableList"
import DemoDots from "../../src/components/DemoDots"

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

// Data objects for each story
const basicDots = [
  {
    value: "",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
]

const directionDots = [
  {
    value: "row",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "column",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
]

const gapDots = [
  {
    value: "smaller",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "small",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "base",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "large",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "larger",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
]

const spacingDots = [
  {
    value: "smaller",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "small",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "base",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "large",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "larger",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
]

const typeDots = [
  {
    value: "padding",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "margin",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
]

const justifyContentDots = [
  {
    value: "flex-start",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "flex-end",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "center",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "space-between",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "space-around",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "space-evenly",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
]

const alignItemsDots = [
  {
    value: "flex-start",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "flex-end",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "center",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "baseline",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "stretch",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
]

const wrapDots = [
  {
    value: "nowrap",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "small").var,
        grow: 1,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "small").var,
        grow: 1,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "small").var,
        grow: 1,
      },
      {
        color: getToken("foregroundColor", "success").var,
        height: getToken("cellHeight", "small").var,
        grow: 1,
      },
      {
        color: getToken("foregroundColor", "disabled").var,
        height: getToken("cellHeight", "small").var,
        grow: 1,
      },
    ],
  },
  {
    value: "wrap",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "success").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "disabled").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
    ],
  },
  {
    value: "wrap-reverse",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "success").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "disabled").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
    ],
  },
]

const growDots = [
  {
    value: 0,
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
        grow: 0,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        grow: 1,
      },
    ],
  },
  {
    value: 1,
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        grow: 1,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        grow: 1,
      },
    ],
  },
  {
    value: 2,
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        grow: 2,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        grow: 1,
      },
    ],
  },
]

// Prepare functions for each story
const prepareBasic = () =>
  basicDots.map(({ value, dots }) => ({
    name: value,
    demo: <DemoDots dots={dots} />,
    code: `<Flex>\n+1{children}\n</Flex>`,
  }))

const prepareDirection = () =>
  directionDots.map(({ value, dots }) => ({
    name: value,
    description: `direction="${value}"`,
    demo: <DemoDots direction={value} dots={dots} />,
    code: `<Flex direction="${value}">\n+1{children}\n</Flex>`,
  }))

const prepareGap = () =>
  gapDots.map(({ value, dots }) => ({
    name: value,
    description: `gap="${value}"`,
    value: getToken("gap", value).value,
    demo: <DemoDots gap={value} dots={dots} />,
    code: `<Flex gap="${value}">\n+1{children}\n</Flex>`,
  }))

const prepareSpacing = () =>
  spacingDots.map(({ value, dots }) => ({
    name: value,
    description: `spacing="${value}"`,
    value: getToken("gap", value).value,
    demo: <DemoDots spacing={value} dots={dots} bordered />,
    code: `<Flex spacing="${value}">\n+1{children}\n</Flex>`,
  }))

  const prepareType = () =>
  typeDots.map(({ value, dots }) => ({
    name: value,
    description: `type="${value}"`,
    default: value === "padding",
    demo: (
      <Flex direction="column">
        <Flex
          style={{
            border: `${getToken("borderWidth").var} solid ${value === "margin" ? getToken("borderColor").var : getToken("borderColor", "heavy").var}`,
            borderRadius: `calc(${getToken("cellHeight", "smaller").var} / 2 + 2px)`,
          }}
        >
          <Flex
            type={value}
            spacing={{ sm: { all: "base" as GapSize } }}
            style={{
              border: `${getToken("borderWidth").var} solid ${value === "margin" ? getToken("borderColor", "heavy").var : "transparent"}`,
              borderRadius: `calc(${getToken("cellHeight", "smaller").var} / 2 + 2px)`,
            }}
          >
            <DemoDots dots={dots} />
          </Flex>
        </Flex>
      </Flex>
    ),
    code: `<Flex type="${value}">\n+1{children}\n</Flex>`,
  }))

const prepareGrow = () =>
  growDots.map(({ value, dots }) => ({
    name: String(value),
    description: `grow={${value}}`,
    demo: <DemoDots bordered width="12rem" dots={dots} />,
    code: `<Flex>\n+1<Flex grow={${value}}>\n+2{children}\n+1</Flex>\n+2<Flex grow={1}>\n+1{children}\n+1</Flex>\n</Flex>`,
  }))

const prepareJustifyContent = () =>
  justifyContentDots.map(({ value, dots }) => ({
    name: value,
    description: `justifyContent="${value}"`,
    demo: (
      <DemoDots justifyContent={value} dots={dots} width="12rem" bordered />
    ),
    code: `<Flex justifyContent="${value}">\n+1{children}\n</Flex>`,
  }))

const prepareAlignItems = () =>
  alignItemsDots.map(({ value, dots }) => ({
    name: value,
    description: `alignItems="${value}"`,
    demo: (
      <DemoDots
        alignItems={value}
        dots={dots}
        height="6rem"
        bordered
      />
    ),
    code: `<Flex alignItems="${value}">\n+1{children}\n</Flex>`,
  }))

const prepareWrap = () =>
  wrapDots.map(({ value, dots }) => ({
    name: value,
    description: `wrap="${value}"`,
    demo: (
      <DemoDots
        wrap={value}
        dots={dots}
        width={`calc(${getToken("cellHeight", "small").var} * 3 + 2px)`}
        bordered
      />
    ),
    code: `<Flex wrap="${value}">\n+1{children}\n</Flex>`,
  }))

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
