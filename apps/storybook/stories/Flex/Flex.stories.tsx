import type { Meta, StoryObj } from "@storybook/react"
import Flex from "nice-react-flex"
import { getToken } from "nice-styles"
import VariableList from "../../src/components/VariableList"
import DemoDots from "../../src/components/DemoDots"

// Flex import needed for meta component reference

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
      name: "children *",
      description: "Child elements (required)",
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
  render: () => (
    <VariableList
      variables={[
        {
          demo: <DemoDots dots={[{ color: "error" }, { color: "link" }]} />,
          code: `<Flex>{children}</Flex>`,
        },
      ]}
    />
  ),
}

/**
 * Flex with different direction values.
 */
export const Direction: Story = {
  name: "direction",
  render: () => (
    <VariableList
      label="direction"
      isString
      variables={[
        {
          name: "row",
          demo: (
            <DemoDots
              direction="row"
              dots={[{ color: "error" }, { color: "link" }]}
            />
          ),
          code: `<Flex direction="row">{children}</Flex>`,
        },
        {
          name: "column",
          demo: (
            <DemoDots
              direction="column"
              dots={[{ color: "error" }, { color: "link" }]}
            />
          ),
          code: `<Flex direction="column">{children}</Flex>`,
        },
      ]}
    />
  ),
}

/**
 * Flex with different gap sizes.
 */
export const Gap: Story = {
  name: "gap",
  render: () => (
    <VariableList
      label="gap"
      isString
      variables={[
        {
          name: "smaller",
          value: getToken("gap", "smaller").value,
          demo: (
            <DemoDots
              gap="smaller"
              dots={[{ color: "error" }, { color: "link" }]}
            />
          ),
          code: `<Flex gap="smaller">{children}</Flex>`,
        },
        {
          name: "small",
          value: getToken("gap", "small").value,
          demo: (
            <DemoDots
              gap="small"
              dots={[{ color: "error" }, { color: "link" }]}
            />
          ),
          code: `<Flex gap="small">{children}</Flex>`,
        },
        {
          name: "base",
          value: getToken("gap", "base").value,
          demo: (
            <DemoDots
              gap="base"
              dots={[{ color: "error" }, { color: "link" }]}
            />
          ),
          code: `<Flex gap="base">{children}</Flex>`,
        },
        {
          name: "large",
          value: getToken("gap", "large").value,
          demo: (
            <DemoDots
              gap="large"
              dots={[{ color: "error" }, { color: "link" }]}
            />
          ),
          code: `<Flex gap="large">{children}</Flex>`,
        },
        {
          name: "larger",
          value: getToken("gap", "larger").value,
          demo: (
            <DemoDots
              gap="larger"
              dots={[{ color: "error" }, { color: "link" }]}
            />
          ),
          code: `<Flex gap="larger">{children}</Flex>`,
        },
      ]}
    />
  ),
}
