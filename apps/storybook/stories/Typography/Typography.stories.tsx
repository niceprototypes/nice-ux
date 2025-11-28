import type { Meta, StoryObj } from "@storybook/react"
import { getToken } from "nice-styles"
import Typography from "nice-react-typography"
import VariableList from "../../src/components/VariableList"
import Flex from "../../../nice-react-flex"

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
    align: {
      description: "Text alignment",
      control: "select",
      options: ["left", "center", "right", "justify"],
      table: {
        type: { summary: '"left" | "center" | "right" | "justify"' },
        defaultValue: { summary: "left" },
      },
    },
    antialiased: {
      description: "Font smoothing",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    as: {
      description: "HTML element to render",
      control: "select",
      options: ["h1", "h2", "h3", "h4", "p", "span"],
      table: {
        type: { summary: '"h1" | "h2" | "h3" | "h4" | "p" | "span"' },
        defaultValue: { summary: "p" },
      },
    },
    className: {
      description: "CSS classname",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    code: {
      description: "Enable code font",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    color: {
      description: "Text color",
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
        type: {
          summary:
            '"lighter" | "light" | "medium" | "heavy" | "base" | "disabled" | "link" | "success" | "warning" | "error"',
        },
      },
    },
    legibilityOptimized: {
      description: "Legibility optimizations",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    lineHeight: {
      description: "Line spacing",
      control: "select",
      options: ["condensed", "base", "expanded"],
      table: {
        type: { summary: '"condensed" | "base" | "expanded"' },
        defaultValue: { summary: "conditional" },
      },
    },
    size: {
      description: "Text size",
      control: "text",
      table: {
        type: {
          summary: '"smaller" | "small" | "base" | "large" | "larger" | string',
        },
        defaultValue: { summary: "conditional" },
      },
    },
    weight: {
      description: "Text thickness",
      control: "text",
      table: {
        type: {
          summary:
            '"light" | "base" | "medium" | "semibold" | "bold" | "extrabold" | "black" | string',
        },
        defaultValue: { summary: "conditional" },
      },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Align: Story = {
  name: "align",
  render: () => {
    const loremIpsum = "Lorem ipsum dolor sit amet"

    return (
      <VariableList
        label="align"
        isString
        variables={[
          {
            name: "left",
            demo: (
              <Flex direction="column" grow={1}>
                <Typography align="left">{loremIpsum}</Typography>
              </Flex>
            ),
          },
          {
            name: "center",
            demo: (
              <Flex direction="column" grow={1}>
                <Typography align="center">{loremIpsum}</Typography>
              </Flex>
            ),
          },
          {
            name: "right",
            demo: (
              <Flex direction="column" grow={1}>
                <Typography align="right">{loremIpsum}</Typography>
              </Flex>
            ),
          },
          {
            name: "justify",
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
    )
  },
}

export const Antialiased: Story = {
  name: "antialiased",
  render: () => {
    return (
      <VariableList
        label="antialiased"
        variables={[
          {
            name: "false",
            demo: (
              <Typography antialiased={false} size="large">
                Normal rendering
              </Typography>
            ),
          },
          {
            name: "true",
            demo: (
              <Typography antialiased={true} size="large">
                Antialiased rendering
              </Typography>
            ),
          },
        ]}
      />
    )
  },
}

export const As: Story = {
  name: "as",
  render: () => {
    return (
      <VariableList
        label="as"
        isString
        variables={[
          { name: "h1", demo: <Typography as="h1">Heading 1</Typography> },
          { name: "h2", demo: <Typography as="h2">Heading 2</Typography> },
          { name: "h3", demo: <Typography as="h3">Heading 3</Typography> },
          { name: "h4", demo: <Typography as="h4">Heading 4</Typography> },
          { name: "p", demo: <Typography as="p">Paragraph text</Typography> },
          { name: "span", demo: <Typography as="span">Span text</Typography> },
        ]}
      />
    )
  },
}

export const Code: Story = {
  name: "code",
  render: () => {
    return (
      <VariableList
        label="code"
        variables={[
          {
            name: "false",
            demo: <Typography>Hello world</Typography>,
          },
          {
            name: "true",
            demo: <Typography code>hello_world</Typography>,
          },
        ]}
      />
    )
  },
}

export const Color: Story = {
  name: "color",
  render: () => {
    return (
      <VariableList
        label="color"
        isString
        variables={[
          {
            name: "lighter",
            value: getToken("foregroundColor", "lighter").value,
            demo: (
              <Typography color="lighter">Lighter foreground color</Typography>
            ),
          },
          {
            name: "light",
            value: getToken("foregroundColor", "light").value,
            demo: <Typography color="light">Light foreground color</Typography>,
          },
          {
            name: "medium",
            value: getToken("foregroundColor", "medium").value,
            demo: (
              <Typography color="medium">Medium foreground color</Typography>
            ),
          },
          {
            name: "heavy",
            value: getToken("foregroundColor", "heavy").value,
            demo: <Typography color="heavy">Heavy foreground color</Typography>,
          },
          {
            name: "base",
            value: getToken("foregroundColor", "base").value,
            demo: <Typography color="base">Base foreground color</Typography>,
          },
          {
            name: "disabled",
            value: getToken("foregroundColor", "disabled").value,
            demo: (
              <Typography color="disabled">Disabled state color</Typography>
            ),
          },
          {
            name: "link",
            value: getToken("foregroundColor", "link").value,
            demo: <Typography color="link">Link color</Typography>,
          },
          {
            name: "success",
            value: getToken("foregroundColor", "success").value,
            demo: <Typography color="success">Success message</Typography>,
          },
          {
            name: "warning",
            value: getToken("foregroundColor", "warning").value,
            demo: <Typography color="warning">Warning message</Typography>,
          },
          {
            name: "error",
            value: getToken("foregroundColor", "error").value,
            demo: <Typography color="error">Error message</Typography>,
          },
        ]}
      />
    )
  },
}

export const LegibilityOptimized: Story = {
  name: "legibilityOptimized",
  render: () => {
    return (
      <VariableList
        label="legibilityOptimized"
        variables={[
          {
            name: "false",
            demo: (
              <Typography legibilityOptimized={false} size="large">
                Standard text rendering
              </Typography>
            ),
          },
          {
            name: "true",
            demo: (
              <Typography legibilityOptimized={true} size="large">
                Optimized text rendering
              </Typography>
            ),
          },
        ]}
      />
    )
  },
}

export const LineHeight: Story = {
  name: "lineHeight",
  render: () => {
    const loremIpsum =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

    return (
      <VariableList
        label="lineHeight"
        isString
        variables={[
          {
            name: "condensed",
            demo: <Typography lineHeight="condensed">{loremIpsum}</Typography>,
          },
          {
            name: "base",
            demo: <Typography lineHeight="base">{loremIpsum}</Typography>,
          },
          {
            name: "expanded",
            demo: <Typography lineHeight="expanded">{loremIpsum}</Typography>,
          },
        ]}
      />
    )
  },
}

export const Size: Story = {
  name: "size",
  render: () => {
    return (
      <VariableList
        label="size"
        isString
        variables={[
          {
            name: "smaller",
            value: getToken("fontSize", "smaller").value,
            demo: <Typography size="smaller">Smaller</Typography>,
          },
          {
            name: "small",
            value: getToken("fontSize", "small").value,
            demo: <Typography size="small">Small</Typography>,
          },
          {
            name: "base",
            value: getToken("fontSize", "base").value,
            demo: <Typography size="base">Base</Typography>,
          },
          {
            name: "large",
            value: getToken("fontSize", "large").value,
            demo: <Typography size="large">Large</Typography>,
          },
          {
            name: "larger",
            value: getToken("fontSize", "larger").value,
            demo: <Typography size="larger">Larger</Typography>,
          },
        ]}
      />
    )
  },
}

export const Weight: Story = {
  name: "weight",
  render: () => {
    return (
      <VariableList
        label="weight"
        isString
        variables={[
          {
            name: "light",
            value: getToken("fontWeight", "light").value,
            demo: <Typography weight="light">Light</Typography>,
          },
          {
            name: "base",
            value: getToken("fontWeight", "base").value,
            demo: <Typography weight="base">Base</Typography>,
          },
          {
            name: "medium",
            value: getToken("fontWeight", "medium").value,
            demo: <Typography weight="medium">Medium</Typography>,
          },
          {
            name: "semibold",
            value: getToken("fontWeight", "semibold").value,
            demo: <Typography weight="semibold">Semibold</Typography>,
          },
          {
            name: "bold",
            value: getToken("fontWeight", "bold").value,
            demo: <Typography weight="bold">Bold</Typography>,
          },
          {
            name: "extrabold",
            value: getToken("fontWeight", "extrabold").value,
            demo: <Typography weight="extrabold">Extrabold</Typography>,
          },
          {
            name: "black",
            value: getToken("fontWeight", "black").value,
            demo: <Typography weight="black">Black</Typography>,
          },
        ]}
      />
    )
  },
}
