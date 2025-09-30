import type { Meta, StoryObj } from "@storybook/react"
import Button from "nice-react-button"
import Flex from "nice-react-flex"

/**
 * # Button Component
 *
 * A flexible and customizable React button component with built-in theming support.
 *
 * ## Features
 *
 * - **Multiple Sizes**: 4 size variants (1-4) from compact to large
 * - **Light/Dark Mode**: Full support for light and dark themes
 * - **Status Variants**: Primary, secondary, default, muted, highlighted
 * - **State Management**: Default, disabled, attention, success, warning
 * - **Icon Support**: Integrated with nice-react-icon (left or right positioned)
 * - **Full Theming**: Customizable theme configuration
 * - **Accessibility**: Built-in ARIA support and keyboard navigation
 * - **TypeScript**: Full type safety
 *
 * ## Size Scale
 *
 * - **1**: Extra small (compact buttons)
 * - **2**: Small
 * - **3**: Medium (default)
 * - **4**: Large
 *
 * ## Status Types
 *
 * - **primary**: Main action button (prominent styling)
 * - **secondary**: Secondary actions (outlined/subtle)
 * - **default**: Standard button
 * - **muted**: Subdued appearance
 * - **highlighted**: Emphasized styling
 *
 * ## State Types
 *
 * - **default**: Normal interactive state
 * - **disabled**: Non-interactive, grayed out
 * - **attention**: Requires user attention
 * - **success**: Successful action indicator
 * - **warning**: Warning/caution indicator
 */
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A comprehensive button component with theming, icons, and multiple variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      description: "Button size (1-4, smallest to largest)",
      control: { type: "number", min: 1, max: 4, step: 1 },
    },
    status: {
      description: "Visual status/variant",
      control: "select",
      options: ["primary", "secondary", "default", "muted", "highlighted"],
    },
    state: {
      description: "Interactive state",
      control: "select",
      options: ["default", "disabled", "attention", "success", "warning"],
    },
    mode: {
      description: "Theme mode",
      control: "select",
      options: ["light", "dark"],
    },
    icon: {
      description: "Icon name from nice-react-icon",
      control: "text",
    },
    iconPosition: {
      description: "Position of icon relative to text",
      control: "select",
      options: ["left", "right"],
    },
    iconRotation: {
      description: "Icon rotation in degrees",
      control: { type: "number", min: 0, max: 360, step: 45 },
    },
    disabled: {
      description: "Whether button is disabled",
      control: "boolean",
    },
    fullWidth: {
      description: "Whether button takes full container width",
      control: "boolean",
    },
    condensed: {
      description: "Remove icon slots when no icons present",
      control: "boolean",
    },
    bordered: {
      description: "Whether button has a border",
      control: "boolean",
    },
    borderRadius: {
      description: "Custom border radius",
      control: "text",
    },
    fontWeight: {
      description: "Font weight (1-4)",
      control: { type: "number", min: 1, max: 4, step: 1 },
    },
    antialiased: {
      description: "Enable font antialiasing",
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default button with primary status
 */
export const Default: Story = {
  args: {
    children: "Click Me",
    onClick: () => alert("Button clicked!"),
  },
}

/**
 * All button sizes displayed together
 */
export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Button size={1}>Size 1 - Extra Small</Button>
      <Button size={2}>Size 2 - Small</Button>
      <Button size={3}>Size 3 - Medium (Default)</Button>
      <Button size={4}>Size 4 - Large</Button>
    </Flex>
  ),
}

/**
 * All status variants in light mode
 */
export const StatusVariants: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Button status="primary">Primary Status</Button>
      <Button status="secondary">Secondary Status</Button>
      <Button status="default">Default Status</Button>
      <Button status="muted">Muted Status</Button>
      <Button status="highlighted">Highlighted Status</Button>
    </Flex>
  ),
}

/**
 * All state variants
 */
export const States: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Button state="default">Default State</Button>
      <Button state="disabled">Disabled State</Button>
      <Button state="attention">Attention State</Button>
      <Button state="success">Success State</Button>
      <Button state="warning">Warning State</Button>
    </Flex>
  ),
}

/**
 * Light vs Dark mode comparison
 */
export const LightVsDark: Story = {
  render: () => (
    <Flex direction="column" gap={3}>
      <div>
        <h3 style={{ marginBottom: "12px" }}>Light Mode</h3>
        <Flex direction="row" gap={2} wrap="wrap">
          <Button mode="light" status="primary">Primary</Button>
          <Button mode="light" status="secondary">Secondary</Button>
          <Button mode="light" status="default">Default</Button>
        </Flex>
      </div>
      <div style={{ padding: "20px", backgroundColor: "#1a1a1a", borderRadius: "8px" }}>
        <h3 style={{ marginBottom: "12px", color: "white" }}>Dark Mode</h3>
        <Flex direction="row" gap={2} wrap="wrap">
          <Button mode="dark" status="primary">Primary</Button>
          <Button mode="dark" status="secondary">Secondary</Button>
          <Button mode="dark" status="default">Default</Button>
        </Flex>
      </div>
    </Flex>
  ),
}

/**
 * Buttons with icons on the right (default)
 */
export const WithIconsRight: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Button icon="arrow">Next Page</Button>
      <Button icon="check">Confirm</Button>
      <Button icon="upload">Upload File</Button>
      <Button icon="search">Search</Button>
    </Flex>
  ),
}

/**
 * Buttons with icons on the left
 */
export const WithIconsLeft: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Button icon="arrow" iconPosition="left" iconRotation={180}>Previous Page</Button>
      <Button icon="plus" iconPosition="left">Add Item</Button>
      <Button icon="trash" iconPosition="left" status="secondary">Delete</Button>
      <Button icon="edit" iconPosition="left">Edit</Button>
    </Flex>
  ),
}

/**
 * Icon-only buttons (no text)
 */
export const IconOnly: Story = {
  render: () => (
    <Flex direction="row" gap={2}>
      <Button icon="menu" aria-label="Menu" />
      <Button icon="search" aria-label="Search" />
      <Button icon="cog" aria-label="Settings" />
      <Button icon="profile" aria-label="Profile" />
      <Button icon="x" aria-label="Close" status="secondary" />
    </Flex>
  ),
}

/**
 * Icon rotation examples
 */
export const IconRotation: Story = {
  render: () => (
    <Flex direction="row" gap={2} wrap="wrap">
      <Button icon="arrow" iconRotation={0}>0°</Button>
      <Button icon="arrow" iconRotation={90}>90°</Button>
      <Button icon="arrow" iconRotation={180}>180°</Button>
      <Button icon="arrow" iconRotation={270}>270°</Button>
    </Flex>
  ),
}

/**
 * Disabled state examples
 */
export const Disabled: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Button disabled>Disabled Button</Button>
      <Button disabled icon="upload">Disabled with Icon</Button>
      <Button state="disabled">Using State Prop</Button>
      <Button disabled status="primary">Disabled Primary</Button>
    </Flex>
  ),
}

/**
 * Full-width buttons
 */
export const FullWidth: Story = {
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <Flex direction="column" gap={2}>
        <Button fullWidth>Full Width Button</Button>
        <Button fullWidth icon="check">Full Width with Icon</Button>
        <Button fullWidth status="secondary">Secondary Full Width</Button>
      </Flex>
    </div>
  ),
}

/**
 * Custom border radius
 */
export const CustomBorderRadius: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Button borderRadius="0px">Square Corners (0px)</Button>
      <Button borderRadius="4px">Slightly Rounded (4px)</Button>
      <Button borderRadius="8px">Rounded (8px)</Button>
      <Button borderRadius="16px">Very Rounded (16px)</Button>
      <Button borderRadius="50%">Pill Shape (50%)</Button>
    </Flex>
  ),
}

/**
 * Custom colors
 */
export const CustomColors: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Button backgroundColor="#ff6b6b" borderColor="#c92a2a">Custom Red</Button>
      <Button backgroundColor="#51cf66" borderColor="#2f9e44">Custom Green</Button>
      <Button backgroundColor="#339af0" borderColor="#1864ab">Custom Blue</Button>
      <Button backgroundImage="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
        Gradient Background
      </Button>
    </Flex>
  ),
}

/**
 * Without borders
 */
export const WithoutBorders: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Button bordered={false}>No Border</Button>
      <Button bordered={false} icon="check">No Border with Icon</Button>
      <Button bordered={false} status="secondary">Secondary No Border</Button>
    </Flex>
  ),
}

/**
 * Condensed vs Normal (icon slot behavior)
 */
export const CondensedVsNormal: Story = {
  render: () => (
    <Flex direction="column" gap={3}>
      <div>
        <h4 style={{ marginBottom: "8px" }}>Normal (has icon slots even without icon)</h4>
        <Button condensed={false}>Normal Button</Button>
      </div>
      <div>
        <h4 style={{ marginBottom: "8px" }}>Condensed (removes empty icon slots)</h4>
        <Button condensed={true}>Condensed Button</Button>
      </div>
    </Flex>
  ),
}

/**
 * Different font weights
 */
export const FontWeights: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Button fontWeight={1}>Font Weight 1 (Light)</Button>
      <Button fontWeight={2}>Font Weight 2 (Normal)</Button>
      <Button fontWeight={3}>Font Weight 3 (Medium - Default)</Button>
      <Button fontWeight={4}>Font Weight 4 (Bold)</Button>
    </Flex>
  ),
}

/**
 * Real-world button group examples
 */
export const ButtonGroups: Story = {
  render: () => (
    <Flex direction="column" gap={4}>
      {/* Primary actions */}
      <div>
        <h4 style={{ marginBottom: "12px" }}>Primary Actions</h4>
        <Flex direction="row" gap={2}>
          <Button status="primary" icon="check">Save Changes</Button>
          <Button status="secondary">Cancel</Button>
        </Flex>
      </div>

      {/* Form actions */}
      <div>
        <h4 style={{ marginBottom: "12px" }}>Form Actions</h4>
        <Flex direction="row" gap={2}>
          <Button status="primary" icon="upload">Submit Form</Button>
          <Button status="secondary" icon="x">Reset</Button>
          <Button status="muted">Preview</Button>
        </Flex>
      </div>

      {/* Navigation */}
      <div>
        <h4 style={{ marginBottom: "12px" }}>Navigation</h4>
        <Flex direction="row" gap={2}>
          <Button icon="arrow" iconPosition="left" iconRotation={180}>Back</Button>
          <Button icon="arrow">Next</Button>
        </Flex>
      </div>

      {/* Toolbar */}
      <div>
        <h4 style={{ marginBottom: "12px" }}>Toolbar</h4>
        <Flex direction="row" gap={1}>
          <Button size={2} icon="plus" aria-label="Add" />
          <Button size={2} icon="edit" aria-label="Edit" />
          <Button size={2} icon="trash" aria-label="Delete" status="secondary" />
          <Button size={2} icon="cog" aria-label="Settings" />
        </Flex>
      </div>
    </Flex>
  ),
}

/**
 * Loading/Processing states
 */
export const LoadingStates: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Button icon="spinner" disabled>Processing...</Button>
      <Button icon="spinner" iconPosition="left" disabled>Loading Data...</Button>
      <Button icon="check" state="success">Completed!</Button>
      <Button icon="attention" state="warning">Warning State</Button>
    </Flex>
  ),
}

/**
 * Interactive playground with all common props
 */
export const Playground: Story = {
  args: {
    children: "Interactive Button",
    size: 3,
    status: "primary",
    state: "default",
    mode: "light",
    icon: "arrow",
    iconPosition: "right",
    iconRotation: 0,
    disabled: false,
    fullWidth: false,
    condensed: false,
    bordered: true,
    fontWeight: 3,
    antialiased: false,
    onClick: () => console.log("Button clicked!"),
  },
}