import type { Meta, StoryObj } from "@storybook/react"
import Flex from "nice-react-flex"
import { getToken } from "nice-styles"
import Story from "../../../src/components/Story"
import DemoDots from "../../../src/components/DemoDots"

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
    mode: {
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

const twoDots = [
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
]

const threeDots = [
  ...twoDots,
  {
    color: getToken("foregroundColor", "link").var,
    height: getToken("cellHeight", "smaller").var,
    width: getToken("cellHeight", "smaller").var,
  },
]

export const Basic: Story = {
  name: "basic",
  render: () => (
    <Story
      variables={[
        {
          name: "",
          demo: <DemoDots dots={twoDots} />,
          code: `<Flex>{children}</Flex>`,
        },
      ]}
    />
  ),
}

export const Direction: Story = {
  name: "direction",
  render: () => (
    <Story
      variables={["row", "column"].map(value => ({
        name: value,
        description: `direction="${value}"`,
        demo: <DemoDots direction={value} dots={twoDots} />,
        code: `<Flex direction="${value}">\n+1{children}\n</Flex>`,
      }))}
    />
  ),
}

export const Gap: Story = {
  name: "gap",
  render: () => (
    <Story
      variables={["smaller", "small", "base", "large", "larger"].map(value => ({
        name: value,
        description: `gap="${value}"`,
        value: getToken("gap", value).value,
        demo: <DemoDots gap={value} dots={threeDots} />,
        code: `<Flex gap="${value}">\n+1{children}\n</Flex>`,
      }))}
    />
  ),
}

export const Spacing: Story = {
  name: "spacing",
  render: () => (
    <Story
      variables={["smaller", "small", "base", "large", "larger"].map(value => ({
        name: value,
        description: `spacing="${value}"`,
        value: getToken("gap", value).value,
        demo: <DemoDots spacing={value} dots={twoDots} bordered />,
        code: `<Flex spacing="${value}">\n+1{children}\n</Flex>`,
      }))}
    />
  ),
}

export const Mode: Story = {
  name: "mode",
  render: () => (
    <Story
      variables={["padding", "margin"].map(value => ({
        name: value,
        description: `mode="${value}"`,
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
                mode={value as "padding" | "margin"}
                spacing="base"
                style={{
                  border: `${getToken("borderWidth").var} solid ${value === "margin" ? getToken("borderColor", "heavy").var : "transparent"}`,
                  borderRadius: `calc(${getToken("cellHeight", "smaller").var} / 2 + 2px)`,
                }}
              >
                <DemoDots dots={twoDots} />
              </Flex>
            </Flex>
          </Flex>
        ),
        code: `<Flex mode="${value}">\n+1{children}\n</Flex>`,
      }))}
    />
  ),
}

export const Grow: Story = {
  name: "grow",
  render: () => (
    <Story
      variables={[
        {
          name: "0",
          description: "grow={0}",
          demo: (
            <DemoDots
              bordered
              width="12rem"
              dots={[
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
              ]}
            />
          ),
          code: `<Flex>\n+1<Flex grow={0}>\n+1  {children}\n+1</Flex>\n+1<Flex grow={1}>\n+1  {children}\n+1</Flex>\n</Flex>`,
        },
        {
          name: "1",
          description: "grow={1}",
          demo: (
            <DemoDots
              bordered
              width="12rem"
              dots={[
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
              ]}
            />
          ),
          code: `<Flex>\n+1<Flex grow={1}>\n+1  {children}\n+1</Flex>\n+1<Flex grow={1}>\n+1  {children}\n+1</Flex>\n</Flex>`,
        },
        {
          name: "2",
          description: "grow={2}",
          demo: (
            <DemoDots
              bordered
              width="12rem"
              dots={[
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
              ]}
            />
          ),
          code: `<Flex>\n+1<Flex grow={2}>\n+1  {children}\n+1</Flex>\n+1<Flex grow={1}>\n+1  {children}\n+1</Flex>\n</Flex>`,
        },
      ]}
    />
  ),
}

export const JustifyContent: Story = {
  name: "justifyContent",
  render: () => (
    <Story
      variables={[
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
      ].map(value => ({
        name: value,
        description: `justifyContent="${value}"`,
        demo: (
          <DemoDots justifyContent={value} dots={threeDots} width="12rem" bordered />
        ),
        code: `<Flex justifyContent="${value}">\n+1{children}\n</Flex>`,
      }))}
    />
  ),
}

export const AlignItems: Story = {
  name: "alignItems",
  render: () => (
    <Story
      variables={[
        {
          name: "flex-start",
          description: 'alignItems="flex-start"',
          demo: <DemoDots alignItems="flex-start" dots={threeDots} height="6rem" bordered />,
          code: `<Flex alignItems="flex-start">\n+1{children}\n</Flex>`,
        },
        {
          name: "flex-end",
          description: 'alignItems="flex-end"',
          demo: <DemoDots alignItems="flex-end" dots={threeDots} height="6rem" bordered />,
          code: `<Flex alignItems="flex-end">\n+1{children}\n</Flex>`,
        },
        {
          name: "center",
          description: 'alignItems="center"',
          demo: <DemoDots alignItems="center" dots={threeDots} height="6rem" bordered />,
          code: `<Flex alignItems="center">\n+1{children}\n</Flex>`,
        },
        {
          name: "baseline",
          description: 'alignItems="baseline"',
          demo: (
            <DemoDots
              alignItems="baseline"
              dots={[
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
              ]}
              height="6rem"
              bordered
            />
          ),
          code: `<Flex alignItems="baseline">\n+1{children}\n</Flex>`,
        },
        {
          name: "stretch",
          description: 'alignItems="stretch"',
          demo: (
            <DemoDots
              alignItems="stretch"
              dots={[
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
              ]}
              height="6rem"
              bordered
            />
          ),
          code: `<Flex alignItems="stretch">\n+1{children}\n</Flex>`,
        },
      ]}
    />
  ),
}

export const Wrap: Story = {
  name: "wrap",
  render: () => {
    const wrapDots = [
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
    ]

    const nowrapDots = wrapDots.map(dot => ({ ...dot, grow: 1, width: undefined }))

    return (
      <Story
        variables={[
          {
            name: "nowrap",
            description: 'wrap="nowrap"',
            demo: (
              <DemoDots
                wrap="nowrap"
                dots={nowrapDots}
                width={`calc(${getToken("cellHeight", "small").var} * 3 + 2px)`}
                bordered
              />
            ),
            code: `<Flex wrap="nowrap">\n+1{children}\n</Flex>`,
          },
          {
            name: "wrap",
            description: 'wrap="wrap"',
            demo: (
              <DemoDots
                wrap="wrap"
                dots={wrapDots}
                width={`calc(${getToken("cellHeight", "small").var} * 3 + 2px)`}
                bordered
              />
            ),
            code: `<Flex wrap="wrap">\n+1{children}\n</Flex>`,
          },
          {
            name: "wrap-reverse",
            description: 'wrap="wrap-reverse"',
            demo: (
              <DemoDots
                wrap="wrap-reverse"
                dots={wrapDots}
                width={`calc(${getToken("cellHeight", "small").var} * 3 + 2px)`}
                bordered
              />
            ),
            code: `<Flex wrap="wrap-reverse">\n+1{children}\n</Flex>`,
          },
        ]}
      />
    )
  },
}