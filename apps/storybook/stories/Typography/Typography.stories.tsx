import type { Meta, StoryObj } from "@storybook/react"
import Typography from "nice-react-typography"
import CodePreview from "../../src/components/CodePreview"
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
    children: {
      description: "Text content or child elements (required)",
      control: "text",
      table: {
        type: { summary: "React.ReactNode" },
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
    align: {
      description: "Text alignment",
      control: "select",
      options: ["left", "center", "right", "justify"],
      table: {
        type: { summary: "AlignType" },
        defaultValue: { summary: "left" },
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
    color: {
      description: "Custom text color (any valid CSS color value or CSS variable)",
      control: "color",
      table: {
        type: { summary: "string" },
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
    legibilityOptimized: {
      description: "Apply legibility optimizations (hardware acceleration, 3D transforms)",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
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
    className: {
      description: "CSS class name for styling",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    children: "Typography component for web standards and CSS custom properties.",
    as: "p",
    size: "1rem",
    weight: "400",
    align: "left",
    code: false,
  },
  render: () => {
    return (
      <div>
        <Typography>Typography</Typography>
        <br />
        <CodePreview inline code="<Typography>Typography</Typography>" />
      </div>
    )
  },
}

/**
 * Typography rendered as different HTML elements using the `as` prop.
 */
export const As: Story = {
  render: () => {
    return (
      <VariableList
        variables={[
          { name: "h1", value: "", demo: <Typography as="h1">Heading 1</Typography> },
          { name: "h2", value: "", demo: <Typography as="h2">Heading 2</Typography> },
          { name: "h3", value: "", demo: <Typography as="h3">Heading 3</Typography> },
          { name: "h4", value: "", demo: <Typography as="h4">Heading 4</Typography> },
          { name: "p", value: "", demo: <Typography as="p">Paragraph text</Typography> },
          { name: "span", value: "", demo: <Typography as="span">Span text</Typography> },
        ]}
      />
    )
  },
}

/**
 * Typography with different font sizes using the `size` prop.
 */
export const Size: Story = {
  render: () => {
    return (
      <VariableList
        variables={[
          { name: "Fixed", value: "", demo: <Typography size="0.75rem">0.75rem</Typography> },
          { name: "Percent", value: "", demo: <Typography size="150%">150%</Typography> },
        ]}
      />
    )
  },
}

/**
 * Typography with different font weights using the `weight` prop.
 */
export const Weight: Story = {
  render: () => {
    return (
      <VariableList
        variables={[
          { name: "300 (Light)", value: "", demo: <Typography weight="300">Light weight text</Typography> },
          { name: "400 (Regular)", value: "", demo: <Typography weight="400">Regular weight text</Typography> },
          { name: "500 (Medium)", value: "", demo: <Typography weight="500">Medium weight text</Typography> },
          { name: "600 (Semibold)", value: "", demo: <Typography weight="600">Semibold weight text</Typography> },
          { name: "700 (Bold)", value: "", demo: <Typography weight="700">Bold weight text</Typography> },
          { name: "800 (Extra Bold)", value: "", demo: <Typography weight="800">Extra Bold weight text</Typography> },
          { name: "900 (Black)", value: "", demo: <Typography weight="900">Black weight text</Typography> },
        ]}
      />
    )
  },
}

/**
 * Typography with text alignment using the `align` prop.
 */
export const Align: Story = {
  render: () => {
    return (
      <VariableList
        variables={[
          {
            name: "left",
            value: "",
            demo: (
              <div style={{ border: "1px solid #e5e7eb", padding: "1em", width: "100%", boxSizing: "border-box" }}>
                <Typography align="left">Left aligned text</Typography>
              </div>
            ),
          },
          {
            name: "center",
            value: "",
            demo: (
              <div style={{ border: "1px solid #e5e7eb", padding: "1em", width: "100%", boxSizing: "border-box" }}>
                <Typography align="center">Center aligned text</Typography>
              </div>
            ),
          },
          {
            name: "right",
            value: "",
            demo: (
              <div style={{ border: "1px solid #e5e7eb", padding: "1em", width: "100%", boxSizing: "border-box" }}>
                <Typography align="right">Right aligned text</Typography>
              </div>
            ),
          },
          {
            name: "justify",
            value: "",
            demo: (
              <div style={{ border: "1px solid #e5e7eb", padding: "1em", width: "100%", boxSizing: "border-box" }}>
                <Typography align="justify">
                  Justified text stretches to fill the full width of the container.
                </Typography>
              </div>
            ),
          },
        ]}
      />
    )
  },
}

/**
 * Typography with code styling.
 */
export const Code: Story = {
  render: () => {
    return (
      <VariableList
        variables={[
          {
            name: "false (default)",
            value: "",
            demo: (
              <Typography>
                Use the <Typography code as="span">Typography</Typography> component
              </Typography>
            ),
          },
          {
            name: "true",
            value: "",
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
 * Typography with custom colors using the `color` prop.
 */
export const Color: Story = {
  render: () => {
    return (
      <VariableList
        variables={[
          { name: "CSS Color", value: "", demo: <Typography color="#3b82f6">Blue text</Typography> },
          {
            name: "CSS Variable",
            value: "",
            demo: <Typography color="var(--content-color-link)">Link color</Typography>,
          },
          { name: "RGB", value: "", demo: <Typography color="rgb(139, 92, 246)">Purple text</Typography> },
        ]}
      />
    )
  },
}

/**
 * Typography with different line heights using the `lineHeight` prop.
 */
export const LineHeight: Story = {
  render: () => {
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

    return (
      <VariableList
        variables={[
          {
            name: "condensed",
            value: "",
            demo: (
              <Typography lineHeight="condensed">
                {loremIpsum}
              </Typography>
            ),
          },
          {
            name: "base",
            value: "",
            demo: (
              <Typography lineHeight="base">
                {loremIpsum}
              </Typography>
            ),
          },
          {
            name: "expanded",
            value: "",
            demo: (
              <Typography lineHeight="expanded">
                {loremIpsum}
              </Typography>
            ),
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
  render: () => {
    return (
      <VariableList
        variables={[
          {
            name: "false (default)",
            value: "",
            demo: <Typography antialiased={false} size="large">Normal rendering</Typography>,
          },
          {
            name: "true",
            value: "",
            demo: <Typography antialiased={true} size="large">Antialiased rendering</Typography>,
          },
        ]}
      />
    )
  },
}

/**
 * Typography with legibility optimizations.
 */
export const LegibilityOptimized: Story = {
  render: () => {
    return (
      <VariableList
        variables={[
          {
            name: "false (default)",
            value: "",
            demo: <Typography legibilityOptimized={false} size="large">Standard text rendering</Typography>,
          },
          {
            name: "true",
            value: "",
            demo: <Typography legibilityOptimized={true} size="large">Optimized text rendering</Typography>,
          },
        ]}
      />
    )
  },
}