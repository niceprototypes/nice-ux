import type { Meta, StoryObj } from "@storybook/react"
import Typography from "nice-react-typography"
import VariableList from "../../src/components/VariableList"

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
    controls: { disable: true },
  },
  tags: ["autodocs"],
  argTypes: {
    // Required props first
    children: {
      name: "children *",
      description: "Text content or child elements (required)",
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
        type: { summary: "AlignType" },
        defaultValue: { summary: "left" },
      },
    },
    antialiased: {
      description: "Enable font antialiasing for smoother text rendering",
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
        type: { summary: "TypographyAsType" },
        defaultValue: { summary: "p" },
      },
    },
    className: {
      description: "CSS class name for styling",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    code: {
      description: "Apply monospace font for code snippets",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    color: {
      description: "Text color from nice-styles tokens",
      control: "select",
      options: ["lighter", "light", "medium", "heavy", "base", "disabled", "link", "success", "warning", "error"],
      table: {
        type: { summary: "ForegroundColorType" },
      },
    },
    legibilityOptimized: {
      description: "Apply legibility optimizations (hardware acceleration, 3D transforms)",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    lineHeight: {
      description: "Line height setting (defaults based on element type)",
      control: "select",
      options: ["condensed", "base", "expanded"],
      table: {
        type: { summary: "LineHeightType" },
        defaultValue: { summary: "depends on element type" },
      },
    },
    size: {
      description: "Font size (any valid CSS size value or CSS variable)",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "depends on element type" },
      },
    },
    weight: {
      description: "Font weight (any valid CSS weight value or CSS variable)",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "depends on element type" },
      },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Typography with text alignment using the `align` prop.
 */
export const Align: Story = {
  name: "align",
  render: () => {
    const loremIpsum = "Lorem ipsum dolor sit amet"

    return (
      <VariableList
        label="align"
        isString
        variables={[
          { name: "left", demo: <Typography align="left">{loremIpsum}</Typography> },
          { name: "center", demo: <Typography align="center">{loremIpsum}</Typography> },
          { name: "right", demo: <Typography align="right">{loremIpsum}</Typography> },
          {
            name: "justify",
            demo: <Typography align="justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.</Typography>,
          },
        ]}
      />
    )
  },
}

/**
 * Typography with antialiasing enabled.
 */
export const Antialiased: Story = {
  name: "antialiased",
  render: () => {
    return (
      <VariableList
        label="antialiased"
        variables={[
          { name: "false", demo: <Typography antialiased={false} size="large">Normal rendering</Typography> },
          { name: "true", demo: <Typography antialiased={true} size="large">Antialiased rendering</Typography> },
        ]}
      />
    )
  },
}

/**
 * Typography rendered as different HTML elements using the `as` prop.
 */
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

/**
 * Typography with code styling.
 */
export const Code: Story = {
  name: "code",
  render: () => {
    return (
      <VariableList
        label="code"
        variables={[
          {
            name: "false",
            demo: (
              <Typography>
                Use the <Typography code as="span">Typography</Typography> component
              </Typography>
            ),
          },
          {
            name: "true",
            demo: (
              <Typography code>
                const greeting = "Hello World"
              </Typography>
            ),
          },
        ]}
      />
    )
  },
}

/**
 * Typography with colors from nice-styles using the `color` prop.
 * All available ForegroundColorType values from nice-styles tokens.
 */
export const Color: Story = {
  name: "color",
  render: () => {
    return (
      <VariableList
        label="color"
        isString
        variables={[
          { name: "lighter", demo: <Typography color="lighter">Lighter foreground color</Typography> },
          { name: "light", demo: <Typography color="light">Light foreground color</Typography> },
          { name: "medium", demo: <Typography color="medium">Medium foreground color</Typography> },
          { name: "heavy", demo: <Typography color="heavy">Heavy foreground color</Typography> },
          { name: "base", demo: <Typography color="base">Base foreground color</Typography> },
          { name: "disabled", demo: <Typography color="disabled">Disabled state color</Typography> },
          { name: "link", demo: <Typography color="link">Link color</Typography> },
          { name: "success", demo: <Typography color="success">Success message</Typography> },
          { name: "warning", demo: <Typography color="warning">Warning message</Typography> },
          { name: "error", demo: <Typography color="error">Error message</Typography> },
        ]}
      />
    )
  },
}

/**
 * Typography with legibility optimizations.
 */
export const LegibilityOptimized: Story = {
  name: "legibilityOptimized",
  render: () => {
    return (
      <VariableList
        label="legibilityOptimized"
        variables={[
          {
            name: "false",
            demo: <Typography legibilityOptimized={false} size="large">Standard text rendering</Typography>,
          },
          {
            name: "true",
            demo: <Typography legibilityOptimized={true} size="large">Optimized text rendering</Typography>,
          },
        ]}
      />
    )
  },
}

/**
 * Typography with different line heights using the `lineHeight` prop.
 */
export const LineHeight: Story = {
  name: "lineHeight",
  render: () => {
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

    return (
      <VariableList
        label="lineHeight"
        isString
        variables={[
          { name: "condensed", demo: <Typography lineHeight="condensed">{loremIpsum}</Typography> },
          { name: "base", demo: <Typography lineHeight="base">{loremIpsum}</Typography> },
          { name: "expanded", demo: <Typography lineHeight="expanded">{loremIpsum}</Typography> },
        ]}
      />
    )
  },
}

/**
 * Typography with different font sizes using the `size` prop.
 */
export const Size: Story = {
  name: "size",
  render: () => {
    return (
      <VariableList
        label="size"
        isString
        variables={[
          { name: "smaller", demo: <Typography size="smaller">Sample</Typography> },
          { name: "small", demo: <Typography size="small">Sample</Typography> },
          { name: "base", demo: <Typography size="base">Sample</Typography> },
          { name: "large", demo: <Typography size="large">Sample</Typography> },
          { name: "larger", demo: <Typography size="larger">Sample</Typography> },
        ]}
      />
    )
  },
}

/**
 * Typography with different font weights using the `weight` prop.
 */
export const Weight: Story = {
  name: "weight",
  render: () => {
    return (
      <VariableList
        label="weight"
        isString
        variables={[
          { name: "300", demo: <Typography weight="300">Light weight text</Typography> },
          { name: "400", demo: <Typography weight="400">Regular weight text</Typography> },
          { name: "500", demo: <Typography weight="500">Medium weight text</Typography> },
          { name: "600", demo: <Typography weight="600">Semibold weight text</Typography> },
          { name: "700", demo: <Typography weight="700">Bold weight text</Typography> },
          { name: "800", demo: <Typography weight="800">Extra Bold weight text</Typography> },
          { name: "900", demo: <Typography weight="900">Black weight text</Typography> },
        ]}
      />
    )
  },
}