import type { Meta, StoryObj } from "@storybook/react"
import Typography from "nice-react-typography"

/**
 * # Typography Component
 *
 * A flexible and customizable Typography component for React with styled-components.
 *
 * ## Features
 *
 * - **Semantic HTML**: Renders as h1, h2, h3, h4, p, or span
 * - **Size Control**: 6 predefined sizes mapped to CSS variables
 * - **Font Weight**: Customizable font weights (1-4 scale or custom values)
 * - **Status Colors**: Built-in status-based coloring (success, error, warning, etc.)
 * - **Text Alignment**: Left, center, right, justify
 * - **Line Height**: Default or condensed line heights
 * - **Code Style**: Monospace font option for code snippets
 * - **Antialiasing**: Optional font smoothing
 * - **Legibility**: Text optimization for readability
 *
 * ## Status Types
 *
 * - **success**: Green color for success messages
 * - **error**: Red color for error messages
 * - **warning**: Orange color for warnings
 * - **active**: Blue color for active states
 * - **default**: Default text color
 * - **disabled**: Muted color for disabled states
 * - **highlighted**: Emphasized text
 * - **primary**: Primary brand color
 * - **secondary**: Secondary color
 */
const meta = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A versatile typography component with semantic HTML rendering and comprehensive styling options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      description: "HTML element to render as",
      control: "select",
      options: ["h1", "h2", "h3", "h4", "p", "span"],
    },
    size: {
      description: "Font size (1-6, where 1 is smallest)",
      control: { type: "number", min: 1, max: 6, step: 1 },
    },
    weight: {
      description: "Font weight (custom number or 1-4 scale)",
      control: { type: "number", min: 100, max: 900, step: 100 },
    },
    color: {
      description: "Custom text color (CSS value)",
      control: "color",
    },
    status: {
      description: "Status-based color theming",
      control: "select",
      options: ["success", "error", "warning", "active", "default", "disabled", "highlighted", "primary", "secondary"],
    },
    align: {
      description: "Text alignment",
      control: "select",
      options: ["left", "center", "right", "justify"],
    },
    lineHeight: {
      description: "Line height preset",
      control: "select",
      options: ["default", "condensed"],
    },
    antialiased: {
      description: "Enable font antialiasing",
      control: "boolean",
    },
    legibilityOptimized: {
      description: "Optimize text for legibility",
      control: "boolean",
    },
    code: {
      description: "Use monospace font for code",
      control: "boolean",
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default paragraph text
 */
export const Default: Story = {
  args: {
    as: "p",
    children: "This is default paragraph text with the Typography component.",
  },
}

/**
 * Heading hierarchy showing all heading levels
 */
export const Headings: Story = {
  render: () => (
    <div>
      <Typography as="h1" size={6}>Heading 1 - Largest</Typography>
      <Typography as="h2" size={5}>Heading 2 - Very Large</Typography>
      <Typography as="h3" size={4}>Heading 3 - Large</Typography>
      <Typography as="h4" size={3}>Heading 4 - Medium</Typography>
    </div>
  ),
}

/**
 * All available font sizes (1-6)
 */
export const Sizes: Story = {
  render: () => (
    <div>
      <Typography as="p" size={1}>Size 1 - Smallest text (12px)</Typography>
      <Typography as="p" size={2}>Size 2 - Small text (14px)</Typography>
      <Typography as="p" size={3}>Size 3 - Regular text (16px)</Typography>
      <Typography as="p" size={4}>Size 4 - Large text (20px)</Typography>
      <Typography as="p" size={5}>Size 5 - Very large text (24px)</Typography>
      <Typography as="p" size={6}>Size 6 - Largest text (custom)</Typography>
    </div>
  ),
}

/**
 * Different font weights (100-900)
 */
export const Weights: Story = {
  render: () => (
    <div>
      <Typography as="p" weight={300}>Weight 300 - Light</Typography>
      <Typography as="p" weight={400}>Weight 400 - Regular</Typography>
      <Typography as="p" weight={500}>Weight 500 - Medium</Typography>
      <Typography as="p" weight={600}>Weight 600 - Semibold</Typography>
      <Typography as="p" weight={700}>Weight 700 - Bold</Typography>
      <Typography as="p" weight={900}>Weight 900 - Black</Typography>
    </div>
  ),
}

/**
 * Status-based color theming
 */
export const StatusColors: Story = {
  render: () => (
    <div>
      <Typography as="p" status="success">Success status - Green color</Typography>
      <Typography as="p" status="error">Error status - Red color</Typography>
      <Typography as="p" status="warning">Warning status - Orange color</Typography>
      <Typography as="p" status="active">Active status - Blue color</Typography>
      <Typography as="p" status="default">Default status - Standard text color</Typography>
      <Typography as="p" status="disabled">Disabled status - Muted color</Typography>
      <Typography as="p" status="highlighted">Highlighted status - Emphasized</Typography>
      <Typography as="p" status="primary">Primary status - Brand color</Typography>
      <Typography as="p" status="secondary">Secondary status - Secondary brand</Typography>
    </div>
  ),
}

/**
 * Custom color using CSS values
 */
export const CustomColors: Story = {
  render: () => (
    <div>
      <Typography as="p" color="#FF6B6B">Custom red color</Typography>
      <Typography as="p" color="#4ECDC4">Custom teal color</Typography>
      <Typography as="p" color="#95E1D3">Custom mint color</Typography>
      <Typography as="p" color="rgb(255, 107, 107)">RGB color value</Typography>
      <Typography as="p" color="var(--brand-color-1)">CSS variable color</Typography>
    </div>
  ),
}

/**
 * Text alignment options
 */
export const Alignment: Story = {
  render: () => (
    <div style={{ width: "100%", padding: "16px", backgroundColor: "#f5f5f5" }}>
      <Typography as="p" align="left" style={{ backgroundColor: "white", padding: "8px", marginBottom: "8px" }}>
        Left aligned text (default)
      </Typography>
      <Typography as="p" align="center" style={{ backgroundColor: "white", padding: "8px", marginBottom: "8px" }}>
        Center aligned text
      </Typography>
      <Typography as="p" align="right" style={{ backgroundColor: "white", padding: "8px", marginBottom: "8px" }}>
        Right aligned text
      </Typography>
      <Typography as="p" align="justify" style={{ backgroundColor: "white", padding: "8px" }}>
        Justified text will stretch to fill the full width of the container. This is useful for longer paragraphs where you want even margins on both sides.
      </Typography>
    </div>
  ),
}

/**
 * Line height comparison
 */
export const LineHeight: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <div style={{ backgroundColor: "#f5f5f5", padding: "16px" }}>
        <Typography as="p" lineHeight="default">
          Default line height (1.5) provides comfortable reading with good spacing between lines. This is ideal for body text and longer paragraphs.
        </Typography>
      </div>
      <div style={{ backgroundColor: "#f5f5f5", padding: "16px" }}>
        <Typography as="p" lineHeight="condensed">
          Condensed line height (1.25) brings lines closer together for a more compact appearance. Useful for headings or when space is limited.
        </Typography>
      </div>
    </div>
  ),
}

/**
 * Code style with monospace font
 */
export const CodeStyle: Story = {
  render: () => (
    <div>
      <Typography as="p">Regular text: const greeting = "Hello World"</Typography>
      <Typography as="p" code>Code text: const greeting = "Hello World"</Typography>
      <Typography as="p" code size={2} style={{ backgroundColor: "#f5f5f5", padding: "8px" }}>
        function example() {'{'}
        <br />
        &nbsp;&nbsp;return "Code block example";
        <br />
        {'}'}
      </Typography>
    </div>
  ),
}

/**
 * Antialiased text rendering
 */
export const Antialiased: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <div>
        <Typography as="h4" size={4}>Without Antialiasing</Typography>
        <Typography as="p" antialiased={false} size={3}>
          This text does not have antialiasing applied. The edges may appear slightly sharper but less smooth.
        </Typography>
      </div>
      <div>
        <Typography as="h4" size={4}>With Antialiasing</Typography>
        <Typography as="p" antialiased={true} size={3}>
          This text has antialiasing applied for smoother rendering. The edges appear softer and more polished.
        </Typography>
      </div>
    </div>
  ),
}

/**
 * Legibility optimized text
 */
export const LegibilityOptimized: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <div>
        <Typography as="h4" size={4}>Standard Rendering</Typography>
        <Typography as="p" legibilityOptimized={false} size={2}>
          This text uses standard rendering without legibility optimization. It may render faster but with less focus on readability.
        </Typography>
      </div>
      <div>
        <Typography as="h4" size={4}>Legibility Optimized</Typography>
        <Typography as="p" legibilityOptimized={true} size={2}>
          This text has legibility optimization enabled, which may improve readability especially for longer form content and smaller font sizes.
        </Typography>
      </div>
    </div>
  ),
}

/**
 * Complex example combining multiple props
 */
export const ComplexExample: Story = {
  render: () => (
    <div style={{ maxWidth: "600px", padding: "24px", backgroundColor: "#f9f9f9" }}>
      <Typography as="h1" size={5} weight={700} align="center" style={{ marginBottom: "16px" }}>
        Typography Component Demo
      </Typography>
      <Typography as="p" size={3} align="justify" style={{ marginBottom: "12px" }}>
        The Typography component provides a comprehensive solution for all your text styling needs.
        It supports semantic HTML elements, responsive sizing, and advanced styling options.
      </Typography>
      <Typography as="p" size={2} status="primary" weight={600} style={{ marginBottom: "8px" }}>
        Key Features:
      </Typography>
      <Typography as="p" size={2} code style={{ backgroundColor: "white", padding: "4px 8px", marginBottom: "8px" }}>
        • Semantic HTML rendering (h1-h4, p, span)
      </Typography>
      <Typography as="p" size={2} code style={{ backgroundColor: "white", padding: "4px 8px", marginBottom: "8px" }}>
        • Status-based color theming
      </Typography>
      <Typography as="p" size={2} code style={{ backgroundColor: "white", padding: "4px 8px", marginBottom: "16px" }}>
        • Advanced text rendering options
      </Typography>
      <Typography as="p" size={1} status="disabled" align="center">
        Built with React and styled-components
      </Typography>
    </div>
  ),
}