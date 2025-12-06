import type { Meta, StoryObj } from "@storybook/react"
import { getToken } from "nice-styles"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import Story from "../../../src/components/Story"

/**
 * A flexible typography component built on web standards and CSS custom properties.
 *
 * Typography provides a consistent way to render text with semantic meaning, flexible styling,
 * and built-in support for CSS custom properties from nice-styles.
 */
const meta = {
  title: "Components/Typography",
  component: Typography,
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
      name: "children *",
      description: "",
      control: "text",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    align: {
      description: "",
      control: "select",
      options: ["left", "center", "right", "justify"],
      table: {
        type: { summary: '"left" | "center" | "right" | "justify"' },
        defaultValue: { summary: "left" },
      },
    },
    antialiased: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    as: {
      description: "",
      control: "select",
      options: ["h1", "h2", "h3", "h4", "p", "span"],
      table: {
        type: { summary: '"h1" | "h2" | "h3" | "h4" | "p" | "span"' },
        defaultValue: { summary: "p" },
      },
    },
    className: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    code: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    color: {
      description: "[`Tokens.foregroundColor`](/?path=/story/styles-tokens--foreground-color)",
      control: "select",
      options: [
        "lighter",
        "light",
        "medium",
        "heavy",
        "base",
        "disabled",
        "link",
        "success",
        "warning",
        "error",
      ],
      table: {
        type: { summary: null },
      },
    },
    legibilityOptimized: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    lineHeight: {
      description: "[`Tokens.lineHeight`](/?path=/story/styles-tokens--line-height)",
      control: "select",
      options: ["condensed", "base", "expanded"],
      table: {
        type: { summary: null },
        defaultValue: { summary: "conditional" },
      },
    },
    size: {
      description: "[`Tokens.fontSize`](/?path=/story/styles-tokens--font-size)",
      control: "text",
      table: {
        type: { summary: null },
        defaultValue: { summary: "conditional" },
      },
    },
    weight: {
      description: "[`Tokens.fontWeight`](/?path=/story/styles-tokens--font-weight)",
      control: "text",
      table: {
        type: { summary: null },
        defaultValue: { summary: "conditional" },
      },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

const loremIpsum = "Lorem ipsum dolor sit amet"
const loremIpsumLong =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

export const Align: Story = {
  name: "align",
  render: () => (
    <Story
      variables={[
        {
          name: "left",
          description: 'align="left"',
          demo: (
            <Flex direction="column" grow={1}>
              <Typography align="left">{loremIpsum}</Typography>
            </Flex>
          ),
        },
        {
          name: "center",
          description: 'align="center"',
          demo: (
            <Flex direction="column" grow={1}>
              <Typography align="center">{loremIpsum}</Typography>
            </Flex>
          ),
        },
        {
          name: "right",
          description: 'align="right"',
          demo: (
            <Flex direction="column" grow={1}>
              <Typography align="right">{loremIpsum}</Typography>
            </Flex>
          ),
        },
        {
          name: "justify",
          description: 'align="justify"',
          demo: (
            <Flex grow={1}>
              <Typography align="justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua ut
                enim ad minim veniam.
              </Typography>
            </Flex>
          ),
        },
      ]}
    />
  ),
}

export const Antialiased: Story = {
  name: "antialiased",
  render: () => (
    <Story
      variables={[
        {
          name: "false",
          description: "antialiased={false}",
          demo: (
            <Typography antialiased={false} size="large">
              Normal rendering
            </Typography>
          ),
        },
        {
          name: "true",
          description: "antialiased={true}",
          demo: (
            <Typography antialiased={true} size="large">
              Antialiased rendering
            </Typography>
          ),
        },
      ]}
    />
  ),
}

export const As: Story = {
  name: "as",
  render: () => (
    <Story
      variables={[
        { name: "h1", description: 'as="h1"', demo: <Typography as="h1">Heading 1</Typography> },
        { name: "h2", description: 'as="h2"', demo: <Typography as="h2">Heading 2</Typography> },
        { name: "h3", description: 'as="h3"', demo: <Typography as="h3">Heading 3</Typography> },
        { name: "h4", description: 'as="h4"', demo: <Typography as="h4">Heading 4</Typography> },
        { name: "p", description: 'as="p"', demo: <Typography as="p">Paragraph text</Typography> },
        { name: "span", description: 'as="span"', demo: <Typography as="span">Span text</Typography> },
      ]}
    />
  ),
}

export const Code: Story = {
  name: "code",
  render: () => (
    <Story
      variables={[
        {
          name: "false",
          description: "code={false}",
          demo: <Typography>Hello world</Typography>,
        },
        {
          name: "true",
          description: "code={true}",
          demo: <Typography code>hello_world</Typography>,
        },
      ]}
    />
  ),
}

export const Color: Story = {
  name: "color",
  render: () => (
    <Story
      variables={[
        {
          name: "lighter",
          description: 'color="lighter"',
          value: getToken("foregroundColor", "lighter").value,
          demo: <Typography color="lighter">Lighter</Typography>,
        },
        {
          name: "light",
          description: 'color="light"',
          value: getToken("foregroundColor", "light").value,
          demo: <Typography color="light">Light</Typography>,
        },
        {
          name: "medium",
          description: 'color="medium"',
          value: getToken("foregroundColor", "medium").value,
          demo: <Typography color="medium">Medium</Typography>,
        },
        {
          name: "heavy",
          description: 'color="heavy"',
          value: getToken("foregroundColor", "heavy").value,
          demo: <Typography color="heavy">Heavy</Typography>,
        },
        {
          name: "base",
          description: 'color="base"',
          value: getToken("foregroundColor", "base").value,
          demo: <Typography color="base">Base</Typography>,
        },
        {
          name: "disabled",
          description: 'color="disabled"',
          value: getToken("foregroundColor", "disabled").value,
          demo: <Typography color="disabled">Disabled</Typography>,
        },
        {
          name: "link",
          description: 'color="link"',
          value: getToken("foregroundColor", "link").value,
          demo: <Typography color="link">Link</Typography>,
        },
        {
          name: "success",
          description: 'color="success"',
          value: getToken("foregroundColor", "success").value,
          demo: <Typography color="success">Success</Typography>,
        },
        {
          name: "warning",
          description: 'color="warning"',
          value: getToken("foregroundColor", "warning").value,
          demo: <Typography color="warning">Warning</Typography>,
        },
        {
          name: "error",
          description: 'color="error"',
          value: getToken("foregroundColor", "error").value,
          demo: <Typography color="error">Error</Typography>,
        },
      ]}
    />
  ),
}

export const LegibilityOptimized: Story = {
  name: "legibilityOptimized",
  render: () => (
    <Story
      variables={[
        {
          name: "false",
          description: "legibilityOptimized={false}",
          demo: (
            <Typography legibilityOptimized={false} size="large">
              Standard
            </Typography>
          ),
        },
        {
          name: "true",
          description: "legibilityOptimized={true}",
          demo: (
            <Typography legibilityOptimized={true} size="large">
              Optimized
            </Typography>
          ),
        },
      ]}
    />
  ),
}

export const LineHeight: Story = {
  name: "lineHeight",
  render: () => (
    <Story
      variables={[
        {
          name: "condensed",
          description: "",
          value: getToken("lineHeight", "condensed").value,
          demo: <Typography lineHeight="condensed">{loremIpsumLong}</Typography>,
        },
        {
          name: "base",
          description: "",
          value: getToken("lineHeight", "base").value,
          demo: <Typography lineHeight="base">{loremIpsumLong}</Typography>,
        },
        {
          name: "expanded",
          description: "",
          value: getToken("lineHeight", "expanded").value,
          demo: <Typography lineHeight="expanded">{loremIpsumLong}</Typography>,
        },
      ]}
    />
  ),
}

export const Size: Story = {
  name: "size",
  render: () => (
    <Story
      variables={[
        {
          name: "smaller",
          description: 'size="smaller"',
          value: getToken("fontSize", "smaller").value,
          demo: <Typography size="smaller">Smaller</Typography>,
        },
        {
          name: "small",
          description: 'size="small"',
          value: getToken("fontSize", "small").value,
          demo: <Typography size="small">Small</Typography>,
        },
        {
          name: "base",
          description: 'size="base"',
          value: getToken("fontSize", "base").value,
          demo: <Typography size="base">Base</Typography>,
        },
        {
          name: "large",
          description: 'size="large"',
          value: getToken("fontSize", "large").value,
          demo: <Typography size="large">Large</Typography>,
        },
        {
          name: "larger",
          description: 'size="larger"',
          value: getToken("fontSize", "larger").value,
          demo: <Typography size="larger">Larger</Typography>,
        },
      ]}
    />
  ),
}

export const Weight: Story = {
  name: "weight",
  render: () => (
    <Story
      variables={[
        {
          name: "light",
          description: 'weight="light"',
          value: getToken("fontWeight", "light").value,
          demo: <Typography weight="light">Light</Typography>,
        },
        {
          name: "base",
          description: 'weight="base"',
          value: getToken("fontWeight", "base").value,
          demo: <Typography weight="base">Base</Typography>,
        },
        {
          name: "medium",
          description: 'weight="medium"',
          value: getToken("fontWeight", "medium").value,
          demo: <Typography weight="medium">Medium</Typography>,
        },
        {
          name: "semibold",
          description: 'weight="semibold"',
          value: getToken("fontWeight", "semibold").value,
          demo: <Typography weight="semibold">Semibold</Typography>,
        },
        {
          name: "bold",
          description: 'weight="bold"',
          value: getToken("fontWeight", "bold").value,
          demo: <Typography weight="bold">Bold</Typography>,
        },
        {
          name: "extrabold",
          description: 'weight="extrabold"',
          value: getToken("fontWeight", "extrabold").value,
          demo: <Typography weight="extrabold">Extrabold</Typography>,
        },
        {
          name: "black",
          description: 'weight="black"',
          value: getToken("fontWeight", "black").value,
          demo: <Typography weight="black">Black</Typography>,
        },
      ]}
    />
  ),
}