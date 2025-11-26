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
    controls: { disable: true },
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
    code: `<Flex>{children}</Flex>`,
  },
]

const prepareDirection = () =>
  (["row", "column"] as const).map(direction => ({
    name: direction,
    demo: (
      <DemoDots
        direction={direction}
        dots={[{ color: "error" }, { color: "link" }]}
      />
    ),
    code: `<Flex direction="${direction}">{children}</Flex>`,
  }))

const prepareGap = () =>
  (["smaller", "small", "base", "large", "larger"] as const).map(size => ({
    name: size,
    value: getToken("gap", size).value,
    demo: (
      <DemoDots gap={size} dots={[{ color: "error" }, { color: "link" }]} />
    ),
    code: `<Flex gap="${size}">{children}</Flex>`,
  }))

const prepareSpacing = () =>
  (["smaller", "small", "base", "large", "larger"] as const).map(size => ({
    name: size,
    value: getToken("gap", size).value,
    demo: (
      <Flex
        spacing={{ sm: { all: size as GapSize } }}
        style={{
          border: `${getToken("borderWidth").var} solid ${getToken("borderColor").var}`,
          borderRadius: getToken("borderRadius", "smaller").var,
        }}
      >
        <DemoDots gap="smaller" dots={[{ color: "error" }, { color: "link" }]} />
      </Flex>
    ),
    code: `<Flex spacing="${size}">{children}</Flex>`,
  }))

const prepareType = () =>
  (["padding", "margin"] as const).map(type => ({
    name: type,
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
          <DemoDots gap="smaller" dots={[{ color: "error" }, { color: "link" }]} />
        </Flex>
      </Flex>
    ),
    code: `<Flex type="${type}">{children}</Flex>`,
  }))

const prepareGrow = () =>
  ([0, 1, 2] as const).map(grow => ({
    name: String(grow),
    demo: (
      <Flex
        style={{
          gap: 2,
          width: "12rem",
        }}
      >
        <Flex
          grow={grow}
          style={{
            minWidth: 2,
            backgroundColor: getToken("foregroundColor", "error").var,
            height: getToken("cellHeight", "smaller").var,
            borderRadius: 1,
          }}
        />
        <Flex
          grow={1}
          style={{
            backgroundColor: getToken("foregroundColor", "link").var,
            height: getToken("cellHeight", "smaller").var,
            borderRadius: 1,
          }}
        />
      </Flex>
    ),
    code: `<Flex>\n+1<Flex grow={${grow}}>{children}</Flex>\n+1<Flex grow={1}>{children}</Flex>\n</Flex>`,
  }))

// Map of prepare functions
const prepareFunctions = {
  Basic: prepareBasic,
  Direction: prepareDirection,
  Gap: prepareGap,
  Grow: prepareGrow,
  Spacing: prepareSpacing,
  Type: prepareType,
}

// Helper to create story objects
const createStory = (
  camelName: string,
  pascalKey: keyof typeof prepareFunctions,
  options?: { label?: string; isString?: boolean }
): Story => ({
  name: camelName,
  render: () => (
    <VariableList
      label={options?.label}
      isString={options?.isString}
      variables={prepareFunctions[pascalKey]()}
    />
  ),
})

// Story exports
export const Basic: Story = createStory("Basic", "Basic")
export const Direction: Story = createStory("direction", "Direction", {
  label: "direction",
  isString: true,
})
export const Gap: Story = createStory("gap", "Gap", {
  label: "gap",
  isString: true,
})
export const Spacing: Story = createStory("spacing", "Spacing", {
  label: "spacing",
  isString: true,
})
export const Type: Story = createStory("type", "Type", {
  label: "type",
  isString: true,
})
export const Grow: Story = createStory("grow", "Grow", {
  label: "grow",
})