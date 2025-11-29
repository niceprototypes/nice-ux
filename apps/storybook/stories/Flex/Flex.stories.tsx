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

// Prepare functions for each story
const prepareBasic = () => [
  {
    name: "",
    demo: <DemoDots dots={[{ color: "error" }, { color: "link" }]} />,
    code: `<Flex>\n+1{children}\n</Flex>`,
  },
]

const prepareDirection = () =>
  (["row", "column"] as const).map(direction => ({
    name: direction,
    description: `direction="${direction}"`,
    demo: (
      <DemoDots
        direction={direction}
        dots={[{ color: "error" }, { color: "link" }]}
      />
    ),
    code: `<Flex direction="${direction}">\n+1{children}\n</Flex>`,
  }))

const prepareGap = () =>
  (["smaller", "small", "base", "large", "larger"] as const).map(size => ({
    name: size,
    description: `gap="${size}"`,
    value: getToken("gap", size).value,
    demo: (
      <DemoDots gap={size} dots={[{ color: "error" }, { color: "link" }]} />
    ),
    code: `<Flex gap="${size}">\n+1{children}\n</Flex>`,
  }))

const prepareSpacing = () =>
  (["smaller", "small", "base", "large", "larger"] as const).map(size => ({
    name: size,
    description: `spacing="${size}"`,
    value: getToken("gap", size).value,
    demo: (
      <DemoDots
        spacing={size}
        dots={[{ color: "error" }, { color: "link" }]}
        bordered
      />
    ),
    code: `<Flex spacing="${size}">\n+1{children}\n</Flex>`,
  }))

const prepareType = () =>
  (["padding", "margin"] as const).map(type => ({
    name: type,
    description: `type="${type}"`,
    default: type === "padding",
    demo: (
      <Flex style={{
        borderRadius: getToken("borderRadius", "smaller").var,
        border: `${getToken("borderWidth").var} solid ${type === "margin" ? getToken("borderColor").var : getToken("borderColor", "heavy").var}`,
      }}>
        <Flex
          type={type}
          spacing={{ sm: { all: "base" as GapSize } }}
          style={{
            border: `${getToken("borderWidth").var} solid ${type === "margin" ? getToken("borderColor", "heavy").var : "transparent"}`,
            borderRadius: getToken("borderRadius", "smaller").var,
          }}
        >
          <DemoDots dots={[{ color: "error" }, { color: "link" }]} />
        </Flex>
      </Flex>
    ),
    code: `<Flex type="${type}">\n+1{children}\n</Flex>`,
  }))

const prepareGrow = () =>
  ([0, 1, 2] as const).map(grow => ({
    name: String(grow),
    description: `grow={${grow}}`,
    demo: (
      <Flex style={{ width: "12rem" }}>
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
  (
    [
      "flex-start",
      "flex-end",
      "center",
      "space-between",
      "space-around",
      "space-evenly",
    ] as const
  ).map(justifyContent => ({
    name: justifyContent,
    description: `justifyContent="${justifyContent}"`,
    demo: (
      <DemoDots
        justifyContent={justifyContent}
        dots={[{ color: "error" }, { color: "link" }, { color: "warning" }]}
        width="12rem"
        bordered
      />
    ),
    code: `<Flex justifyContent="${justifyContent}">\n+1{children}\n</Flex>`,
  }))

const prepareAlignItems = () =>
  (["flex-start", "flex-end", "center", "baseline", "stretch"] as const).map(
    alignItems => ({
      name: alignItems,
      description: `alignItems="${alignItems}"`,
      demo: (
        <DemoDots
          alignItems={alignItems}
          dots={[
            { color: "error" },
            { color: "link" },
            { color: "warning" },
          ]}
          width="12rem"
          height="3rem"
          bordered
        />
      ),
      code: `<Flex alignItems="${alignItems}">\n+1{children}\n</Flex>`,
    })
  )

// Map of prepare functions
const prepareFunctions = {
  AlignItems: prepareAlignItems,
  Basic: prepareBasic,
  Direction: prepareDirection,
  Gap: prepareGap,
  Grow: prepareGrow,
  JustifyContent: prepareJustifyContent,
  Spacing: prepareSpacing,
  Type: prepareType,
}

export const Basic: Story = {
  name: "basic",
  render: () => <VariableList variables={prepareFunctions.Basic()} />,
}

export const Direction: Story = {
  name: "direction",
  render: () => <VariableList variables={prepareFunctions.Direction()} />,
}

export const Gap: Story = {
  name: "gap",
  render: () => <VariableList variables={prepareFunctions.Gap()} />,
}

export const Spacing: Story = {
  name: "spacing",
  render: () => <VariableList variables={prepareFunctions.Spacing()} />,
}

export const Type: Story = {
  name: "type",
  render: () => <VariableList variables={prepareFunctions.Type()} />,
}

export const Grow: Story = {
  name: "grow",
  render: () => <VariableList variables={prepareFunctions.Grow()} />,
}

export const JustifyContent: Story = {
  name: "justifyContent",
  render: () => <VariableList variables={prepareFunctions.JustifyContent()} />,
}

export const AlignItems: Story = {
  name: "alignItems",
  render: () => <VariableList variables={prepareFunctions.AlignItems()} />,
}