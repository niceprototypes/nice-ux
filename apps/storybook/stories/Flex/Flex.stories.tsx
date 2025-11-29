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
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight").var,
        width: getToken("cellHeight").var,
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
            borderRadius: getToken("borderRadius", "smaller").var,
            border: `${getToken("borderWidth").var} solid ${value === "margin" ? getToken("borderColor").var : getToken("borderColor", "heavy").var}`,
          }}
        >
          <Flex
            type={value}
            spacing={{ sm: { all: "base" as GapSize } }}
            style={{
              border: `${getToken("borderWidth").var} solid ${value === "margin" ? getToken("borderColor", "heavy").var : "transparent"}`,
              borderRadius: getToken("borderRadius", "smaller").var,
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
  ([0, 1, 2] as const).map(grow => ({
    name: String(grow),
    description: `grow={${grow}}`,
    demo: (
      <Flex grow={1}>
        <Flex
          grow={grow}
          style={{
            minWidth: 2,
            backgroundColor: getToken("foregroundColor", "error").var,
            height: getToken("cellHeight", "smaller").var,
            borderRadius: `calc(${getToken("cellHeight", "smaller").var} / 2)`,
          }}
        />
        <Flex
          grow={1}
          style={{
            backgroundColor: getToken("foregroundColor", "link").var,
            height: getToken("cellHeight", "smaller").var,
            borderRadius: `calc(${getToken("cellHeight", "smaller").var} / 2)`,
          }}
        />
      </Flex>
    ),
    code: `<Flex>\n+1<Flex grow={${grow}}>\n+2{children}\n+1</Flex>\n+2<Flex grow={1}>\n+1{children}\n+1</Flex>\n</Flex>`,
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
        width="12rem"
        height="3rem"
        bordered
      />
    ),
    code: `<Flex alignItems="${value}">\n+1{children}\n</Flex>`,
  }))

const prepareWrap = () =>
  (["nowrap", "wrap", "wrap-reverse"] as const).map(wrap => ({
    name: wrap,
    description: `wrap="${wrap}"`,
    default: wrap === "nowrap",
    demo: (
      <Flex direction="column">
        <Flex
          wrap={wrap}
          gap="small"
          style={{
            width: "8rem",
            borderRadius: getToken("borderRadius", "smaller").var,
            border: `${getToken("borderWidth").var} solid ${getToken("borderColor").var}`,
            padding: getToken("gap", "small").var,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <Flex
              key={i}
              style={{
                width: getToken("cellHeight", "smaller").var,
                height: getToken("cellHeight", "smaller").var,
                backgroundColor: getToken(
                  "foregroundColor",
                  i % 2 === 0 ? "error" : "link"
                ).var,
                borderRadius: "50%",
              }}
            />
          ))}
        </Flex>
      </Flex>
    ),
    code: `<Flex wrap="${wrap}">\n+1{children}\n</Flex>`,
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
