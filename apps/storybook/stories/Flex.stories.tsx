import type { Meta, StoryObj } from "@storybook/react"
import Flex from "nice-react-flex"

/**
 * # Flex Component
 *
 * A highly flexible and responsive flexbox container component that provides
 * comprehensive layout control with breakpoint-based responsive design.
 *
 * ## Features
 *
 * - **Responsive Design**: All layout props support both static values and responsive breakpoint objects (sm/md/lg)
 * - **Automatic Prop Normalization**: Simple values are automatically converted to breakpoint objects
 * - **Spacing Management**: Supports both padding and margin with granular control over all sides
 * - **Gap Support**: Uses CSS gap property for consistent spacing between flex items
 * - **Growth Control**: Allows flex items to grow with configurable flex-grow values
 *
 * ## Breakpoint System
 *
 * - **sm**: Small screens (mobile) - always applied as base
 * - **md**: Medium screens (tablet) - min-width: 980px
 * - **lg**: Large screens (desktop) - min-width: 1280px
 *
 * ## Gap Sizes
 *
 * Gap sizes (0-6) map to CSS custom properties:
 * - 0: No gap
 * - 1: 4px
 * - 2: 8px
 * - 3: 16px
 * - 4: 32px
 * - 5: 48px
 * - 6: Custom larger value
 */
const meta = {
  title: "Components/Flex",
  component: Flex,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A versatile flexbox container with responsive design capabilities and comprehensive spacing controls.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      description: "Flex direction - can be static or responsive object with sm/md/lg breakpoints",
      control: "select",
      options: ["row", "column"],
    },
    gap: {
      description: "Space between flex items (0-6) - can be static or responsive",
      control: { type: "number", min: 0, max: 6, step: 1 },
    },
    alignItems: {
      description: "Align items on cross axis",
      control: "select",
      options: ["flex-start", "flex-end", "center", "baseline", "stretch"],
    },
    justifyContent: {
      description: "Align items on main axis",
      control: "select",
      options: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
    },
    wrap: {
      description: "Controls flex wrapping behavior",
      control: "select",
      options: ["nowrap", "wrap", "wrap-reverse"],
    },
    type: {
      description: "Whether spacing applies as padding or margin",
      control: "select",
      options: ["padding", "margin"],
    },
    grow: {
      description: "Flex grow value - can be static or responsive",
      control: { type: "number", min: 0, max: 2, step: 0.5 },
    },
  },
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

// Helper component for demo items
const DemoItem = ({ children, color = "#e0e0e0" }: { children: React.ReactNode; color?: string }) => (
  <div style={{
    padding: "16px",
    backgroundColor: color,
    borderRadius: "4px",
    minWidth: "80px",
    textAlign: "center"
  }}>
    {children}
  </div>
)

/**
 * Basic horizontal flex layout with gap between items
 */
export const BasicRow: Story = {
  args: {
    direction: "row",
    gap: 2,
    children: (
      <>
        <DemoItem>Item 1</DemoItem>
        <DemoItem>Item 2</DemoItem>
        <DemoItem>Item 3</DemoItem>
      </>
    ),
  },
}

/**
 * Basic vertical flex layout with gap between items
 */
export const BasicColumn: Story = {
  args: {
    direction: "column",
    gap: 2,
    children: (
      <>
        <DemoItem>Item 1</DemoItem>
        <DemoItem>Item 2</DemoItem>
        <DemoItem>Item 3</DemoItem>
      </>
    ),
  },
}

/**
 * Responsive layout that changes direction based on screen size.
 * - Small screens: column layout
 * - Medium screens: row layout
 * - Large screens: row layout
 */
export const ResponsiveDirection: Story = {
  args: {
    direction: { sm: "column", md: "row" },
    gap: { sm: 1, md: 2, lg: 3 },
    children: (
      <>
        <DemoItem color="#ffcdd2">Column on mobile</DemoItem>
        <DemoItem color="#f8bbd0">Row on tablet+</DemoItem>
        <DemoItem color="#e1bee7">Responsive gap</DemoItem>
      </>
    ),
  },
}

/**
 * Center aligned items both horizontally and vertically
 */
export const CenteredItems: Story = {
  args: {
    direction: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    style: { minHeight: "200px", border: "2px dashed #ccc" },
    children: (
      <>
        <DemoItem color="#c5e1a5">Centered</DemoItem>
        <DemoItem color="#a5d6a7">Items</DemoItem>
      </>
    ),
  },
}

/**
 * Space between items with flex-start alignment
 */
export const SpaceBetween: Story = {
  args: {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 0,
    style: { border: "2px dashed #ccc", padding: "16px" },
    children: (
      <>
        <DemoItem color="#ffcc80">Left</DemoItem>
        <DemoItem color="#ffab91">Right</DemoItem>
      </>
    ),
  },
}

/**
 * Padding spacing on all sides using the spacing prop
 */
export const WithPadding: Story = {
  args: {
    type: "padding",
    spacing: { all: 3 },
    direction: "row",
    gap: 2,
    style: { backgroundColor: "#e3f2fd" },
    children: (
      <>
        <DemoItem color="#90caf9">Padded</DemoItem>
        <DemoItem color="#64b5f6">Container</DemoItem>
      </>
    ),
  },
}

/**
 * Responsive padding that increases with screen size
 */
export const ResponsivePadding: Story = {
  args: {
    type: "padding",
    spacing: {
      sm: { all: 1 },
      md: { all: 2 },
      lg: { all: 3 },
    },
    direction: "row",
    gap: 2,
    style: { backgroundColor: "#f3e5f5" },
    children: (
      <>
        <DemoItem color="#ce93d8">Small padding on mobile</DemoItem>
        <DemoItem color="#ba68c8">Larger on desktop</DemoItem>
      </>
    ),
  },
}

/**
 * Custom spacing on different sides
 */
export const CustomSpacing: Story = {
  args: {
    type: "padding",
    spacing: {
      top: 4,
      horizontal: 2,
      bottom: 1,
    },
    direction: "column",
    gap: 2,
    style: { backgroundColor: "#fff9c4" },
    children: (
      <>
        <DemoItem color="#fff59d">Custom top padding (4)</DemoItem>
        <DemoItem color="#fff176">Horizontal padding (2)</DemoItem>
        <DemoItem color="#ffee58">Bottom padding (1)</DemoItem>
      </>
    ),
  },
}

/**
 * Flex items that grow to fill available space
 */
export const FlexGrow: Story = {
  args: {
    direction: "row",
    gap: 2,
    grow: 1,
    style: { border: "2px dashed #ccc", minHeight: "100px" },
    children: (
      <>
        <DemoItem color="#80cbc4">Growing</DemoItem>
        <DemoItem color="#4db6ac">Flex</DemoItem>
        <DemoItem color="#26a69a">Container</DemoItem>
      </>
    ),
  },
}

/**
 * Wrapping flex items when they overflow
 */
export const FlexWrap: Story = {
  args: {
    direction: "row",
    wrap: "wrap",
    gap: 2,
    style: { maxWidth: "300px", border: "2px dashed #ccc", padding: "8px" },
    children: (
      <>
        <DemoItem color="#ffab91">Item 1</DemoItem>
        <DemoItem color="#ff8a65">Item 2</DemoItem>
        <DemoItem color="#ff7043">Item 3</DemoItem>
        <DemoItem color="#ff5722">Item 4</DemoItem>
        <DemoItem color="#f4511e">Item 5</DemoItem>
      </>
    ),
  },
}

/**
 * Complex responsive layout demonstrating multiple responsive properties
 */
export const ComplexResponsive: Story = {
  args: {
    direction: { sm: "column", md: "row" },
    gap: { sm: 1, md: 2, lg: 3 },
    alignItems: { sm: "stretch", md: "center" },
    justifyContent: { sm: "flex-start", md: "space-between" },
    spacing: {
      sm: { all: 1 },
      md: { horizontal: 2, vertical: 1 },
      lg: { all: 3 },
    },
    type: "padding",
    style: { backgroundColor: "#fce4ec", minHeight: "200px" },
    children: (
      <>
        <DemoItem color="#f48fb1">Complex</DemoItem>
        <DemoItem color="#f06292">Responsive</DemoItem>
        <DemoItem color="#ec407a">Layout</DemoItem>
      </>
    ),
  },
}

/**
 * Nested flex containers for complex layouts
 */
export const NestedFlex: Story = {
  render: () => (
    <Flex direction="column" gap={2} type="padding" spacing={{ all: 2 }} style={{ backgroundColor: "#e8eaf6" }}>
      <Flex direction="row" gap={2} style={{ padding: "16px", backgroundColor: "#c5cae9" }}>
        <DemoItem color="#9fa8da">Nested</DemoItem>
        <DemoItem color="#7986cb">Row</DemoItem>
      </Flex>
      <Flex direction="row" gap={2} justifyContent="space-between" style={{ padding: "16px", backgroundColor: "#c5cae9" }}>
        <DemoItem color="#5c6bc0">Another</DemoItem>
        <DemoItem color="#3f51b5">Nested Row</DemoItem>
      </Flex>
    </Flex>
  ),
}