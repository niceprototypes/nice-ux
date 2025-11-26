import type { Meta, StoryObj } from "@storybook/react"
import Flex from "nice-react-flex"
import { getToken } from "nice-styles"
import DemoList from "../../src/components/DemoList"
import CodePreview from "../../src/components/CodePreview"

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
  },
  tags: ["autodocs"],
  argTypes: {
    // Required props first
    children: {
      name: "children *",
      description:
        "Child elements to render inside the flex container (required)",
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
    <DemoList
      demos={[
        {
          backgroundColor: getToken("foregroundColor", "error").var,
          borderRadius: "50%",
          style: {
            width: getToken("cellHeight", "smaller").var,
            height: getToken("cellHeight", "smaller").var,
          },
        },
        {
          backgroundColor: getToken("foregroundColor", "warning").var,
          borderRadius: "50%",
          style: {
            width: getToken("cellHeight", "smaller").var,
            height: getToken("cellHeight", "smaller").var,
          },
        },
        {
          backgroundColor: getToken("foregroundColor", "link").var,
          borderRadius: "50%",
          style: {
            width: getToken("cellHeight", "smaller").var,
            height: getToken("cellHeight", "smaller").var,
          },
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
      <DemoList
        direction="column"
        demos={[
          {
            backgroundColor: getToken("foregroundColor", "error").var,
            borderRadius: "50%",
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
            },
          },
          {
            backgroundColor: getToken("foregroundColor", "warning").var,
            borderRadius: "50%",
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
            },
          },
          {
            backgroundColor: getToken("foregroundColor", "link").var,
            borderRadius: "50%",
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
            },
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
    <Flex direction="column" gap="large">
      <DemoList
        gap="smaller"
        demos={[
          {
            backgroundColor: getToken("foregroundColor", "error").var,
            borderRadius: "50%",
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
            },
          },
          {
            backgroundColor: getToken("foregroundColor", "link").var,
            borderRadius: "50%",
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
            },
          },
        ]}
      />
      <DemoList
        gap="small"
        demos={[
          {
            backgroundColor: getToken("foregroundColor", "error").var,
            borderRadius: "50%",
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
            },
          },
          {
            backgroundColor: getToken("foregroundColor", "link").var,
            borderRadius: "50%",
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
            },
          },
        ]}
      />
      <DemoList
        gap="base"
        demos={[
          {
            backgroundColor: getToken("foregroundColor", "error").var,
            borderRadius: "50%",
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
            },
          },
          {
            backgroundColor: getToken("foregroundColor", "link").var,
            borderRadius: "50%",
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
            },
          },
        ]}
      />
      <DemoList
        gap="large"
        demos={[
          {
            backgroundColor: getToken("foregroundColor", "error").var,
            borderRadius: "50%",
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
            },
          },
          {
            backgroundColor: getToken("foregroundColor", "link").var,
            borderRadius: "50%",
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
            },
          },
        ]}
      />
      <DemoList
        gap="larger"
        demos={[
          {
            backgroundColor: getToken("foregroundColor", "error").var,
            borderRadius: "50%",
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
            },
          },
          {
            backgroundColor: getToken("foregroundColor", "link").var,
            borderRadius: "50%",
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
            },
          },
        ]}
      />
    </Flex>
  ),
}
