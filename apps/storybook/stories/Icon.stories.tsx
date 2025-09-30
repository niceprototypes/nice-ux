import type { Meta, StoryObj } from "@storybook/react"
import Icon from "nice-react-icon"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"

/**
 * # Icon Component
 *
 * A flexible and customizable React icon component with 30+ built-in icons.
 *
 * ## Features
 *
 * - **30+ Built-in Icons**: Fill and stroke variants for common UI needs
 * - **Custom SVG Support**: Load custom icons via URL
 * - **Multiple Sizes**: 4 size variants (1-4)
 * - **Status Theming**: Automatic coloring based on status
 * - **Animations**: Built-in spinning animation
 * - **Rotation**: Rotate icons to any angle
 * - **Variants**: Fill or stroke styles
 * - **TypeScript**: Full type safety
 *
 * ## Available Icons
 *
 * arrow, attention, box, brush, calendar, cancel, carat, check, cloud, code,
 * cog, contact, content, edit, link, lock, menu, message, pause, placeholder,
 * plus, profile, puzzle, search, shuffle, skip, spinner, trash, upload, x
 *
 * ## Size Scale
 *
 * - **1**: 24px (extra small)
 * - **2**: 40px (small)
 * - **3**: 56px (medium, default)
 * - **4**: 64px (large)
 *
 * ## Status Colors
 *
 * - **active**: Blue
 * - **success**: Green
 * - **error**: Red
 * - **warning**: Orange
 * - **default**: Gray
 * - **muted**: Light gray
 * - **highlighted**: Emphasized
 * - **primary**: Primary brand color
 * - **secondary**: Secondary brand color
 */
const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A comprehensive icon component with built-in icon set, custom SVG support, and theming.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      description: "Icon name from built-in set",
      control: "select",
      options: [
        "arrow", "attention", "box", "brush", "calendar", "cancel", "carat", "check",
        "cloud", "code", "cog", "contact", "content", "edit", "link", "lock",
        "menu", "message", "pause", "placeholder", "plus", "profile", "puzzle",
        "search", "shuffle", "skip", "spinner", "trash", "upload", "x"
      ],
    },
    variant: {
      description: "Icon style variant",
      control: "select",
      options: ["fill", "stroke"],
    },
    size: {
      description: "Icon size (1-4)",
      control: { type: "number", min: 1, max: 4, step: 1 },
    },
    color: {
      description: "Custom icon color (CSS value)",
      control: "color",
    },
    backgroundColor: {
      description: "Background color for icon container",
      control: "color",
    },
    status: {
      description: "Status-based color theming",
      control: "select",
      options: ["active", "success", "error", "warning", "default", "muted", "highlighted", "primary", "secondary"],
    },
    rotation: {
      description: "Rotation angle in degrees",
      control: { type: "number", min: 0, max: 360, step: 45 },
    },
    spinning: {
      description: "Enable spinning animation",
      control: "boolean",
    },
    strokeWidth: {
      description: "Stroke width for stroke variant (1-2)",
      control: { type: "number", min: 1, max: 2, step: 1 },
    },
    borderRadius: {
      description: "Border radius for icon container (1-3)",
      control: { type: "number", min: 1, max: 3, step: 1 },
    },
    isActive: {
      description: "Whether icon is in active state",
      control: "boolean",
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default icon with medium size
 */
export const Default: Story = {
  args: {
    name: "check",
    size: 3,
  },
}

/**
 * All available icon sizes
 */
export const Sizes: Story = {
  render: () => (
    <Flex direction="row" gap={3} alignItems="center">
      <div style={{ textAlign: "center" }}>
        <Icon name="check" size={1} />
        <Typography as="p" size={1}>Size 1</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="check" size={2} />
        <Typography as="p" size={1}>Size 2</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="check" size={3} />
        <Typography as="p" size={1}>Size 3</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="check" size={4} />
        <Typography as="p" size={1}>Size 4</Typography>
      </div>
    </Flex>
  ),
}

/**
 * All built-in icons in the library
 */
export const AllIcons: Story = {
  render: () => {
    const icons = [
      "arrow", "attention", "box", "brush", "calendar", "cancel", "carat", "check",
      "cloud", "code", "cog", "contact", "content", "edit", "link", "lock",
      "menu", "message", "pause", "placeholder", "plus", "profile", "puzzle",
      "search", "shuffle", "skip", "spinner", "trash", "upload", "x"
    ]

    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "16px" }}>
        {icons.map(icon => (
          <div key={icon} style={{ textAlign: "center", padding: "8px" }}>
            <Icon name={icon as any} size={2} />
            <Typography as="p" size={1} style={{ marginTop: "8px" }}>
              {icon}
            </Typography>
          </div>
        ))}
      </div>
    )
  },
}

/**
 * Fill vs Stroke variants
 */
export const FillVsStroke: Story = {
  render: () => (
    <Flex direction="column" gap={3}>
      <div>
        <Typography as="h4" size={3} weight={600} style={{ marginBottom: "12px" }}>
          Fill Variant
        </Typography>
        <Flex direction="row" gap={2}>
          <Icon name="check" variant="fill" size={2} />
          <Icon name="heart" variant="fill" size={2} />
          <Icon name="star" variant="fill" size={2} />
          <Icon name="profile" variant="fill" size={2} />
        </Flex>
      </div>
      <div>
        <Typography as="h4" size={3} weight={600} style={{ marginBottom: "12px" }}>
          Stroke Variant
        </Typography>
        <Flex direction="row" gap={2}>
          <Icon name="check" variant="stroke" size={2} />
          <Icon name="heart" variant="stroke" size={2} />
          <Icon name="star" variant="stroke" size={2} />
          <Icon name="profile" variant="stroke" size={2} />
        </Flex>
      </div>
    </Flex>
  ),
}

/**
 * Status-based colors
 */
export const StatusColors: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Flex direction="row" gap={2} alignItems="center">
        <Icon name="check" status="success" size={2} />
        <Typography as="p">Success Status (Green)</Typography>
      </Flex>
      <Flex direction="row" gap={2} alignItems="center">
        <Icon name="cancel" status="error" size={2} />
        <Typography as="p">Error Status (Red)</Typography>
      </Flex>
      <Flex direction="row" gap={2} alignItems="center">
        <Icon name="attention" status="warning" size={2} />
        <Typography as="p">Warning Status (Orange)</Typography>
      </Flex>
      <Flex direction="row" gap={2} alignItems="center">
        <Icon name="spinner" status="active" size={2} />
        <Typography as="p">Active Status (Blue, Auto-spins)</Typography>
      </Flex>
      <Flex direction="row" gap={2} alignItems="center">
        <Icon name="check" status="default" size={2} />
        <Typography as="p">Default Status (Gray)</Typography>
      </Flex>
      <Flex direction="row" gap={2} alignItems="center">
        <Icon name="check" status="muted" size={2} />
        <Typography as="p">Muted Status (Light Gray)</Typography>
      </Flex>
      <Flex direction="row" gap={2} alignItems="center">
        <Icon name="check" status="highlighted" size={2} />
        <Typography as="p">Highlighted Status</Typography>
      </Flex>
      <Flex direction="row" gap={2} alignItems="center">
        <Icon name="check" status="primary" size={2} />
        <Typography as="p">Primary Status</Typography>
      </Flex>
      <Flex direction="row" gap={2} alignItems="center">
        <Icon name="check" status="secondary" size={2} />
        <Typography as="p">Secondary Status</Typography>
      </Flex>
    </Flex>
  ),
}

/**
 * Custom colors
 */
export const CustomColors: Story = {
  render: () => (
    <Flex direction="row" gap={2}>
      <Icon name="heart" color="#ff6b6b" size={2} />
      <Icon name="heart" color="#51cf66" size={2} />
      <Icon name="heart" color="#339af0" size={2} />
      <Icon name="heart" color="#9775fa" size={2} />
      <Icon name="heart" color="#ffd43b" size={2} />
    </Flex>
  ),
}

/**
 * Icon rotation examples
 */
export const Rotation: Story = {
  render: () => (
    <Flex direction="row" gap={3} alignItems="center">
      <div style={{ textAlign: "center" }}>
        <Icon name="arrow" rotation={0} size={2} />
        <Typography as="p" size={1}>0°</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="arrow" rotation={45} size={2} />
        <Typography as="p" size={1}>45°</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="arrow" rotation={90} size={2} />
        <Typography as="p" size={1}>90°</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="arrow" rotation={135} size={2} />
        <Typography as="p" size={1}>135°</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="arrow" rotation={180} size={2} />
        <Typography as="p" size={1}>180°</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="arrow" rotation={225} size={2} />
        <Typography as="p" size={1}>225°</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="arrow" rotation={270} size={2} />
        <Typography as="p" size={1}>270°</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="arrow" rotation={315} size={2} />
        <Typography as="p" size={1}>315°</Typography>
      </div>
    </Flex>
  ),
}

/**
 * Spinning animation
 */
export const Spinning: Story = {
  render: () => (
    <Flex direction="row" gap={3} alignItems="center">
      <div style={{ textAlign: "center" }}>
        <Icon name="spinner" spinning size={2} />
        <Typography as="p" size={1}>Spinner</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="cog" spinning size={2} />
        <Typography as="p" size={1}>Loading</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="spinner" status="active" size={2} />
        <Typography as="p" size={1}>Auto-spin (active)</Typography>
      </div>
    </Flex>
  ),
}

/**
 * With background colors
 */
export const WithBackground: Story = {
  render: () => (
    <Flex direction="row" gap={2}>
      <Icon name="check" backgroundColor="#e3f2fd" color="#1976d2" size={2} borderRadius={1} />
      <Icon name="heart" backgroundColor="#fce4ec" color="#c2185b" size={2} borderRadius={2} />
      <Icon name="star" backgroundColor="#f3e5f5" color="#7b1fa2" size={2} borderRadius={3} />
      <Icon name="profile" backgroundColor="#e0f2f1" color="#00796b" size={2} borderRadius={1} />
    </Flex>
  ),
}

/**
 * Border radius options
 */
export const BorderRadius: Story = {
  render: () => (
    <Flex direction="row" gap={3} alignItems="center">
      <div style={{ textAlign: "center" }}>
        <Icon name="check" backgroundColor="#e3f2fd" color="#1976d2" size={2} borderRadius={1} />
        <Typography as="p" size={1}>Radius 1</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="check" backgroundColor="#e3f2fd" color="#1976d2" size={2} borderRadius={2} />
        <Typography as="p" size={1}>Radius 2</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="check" backgroundColor="#e3f2fd" color="#1976d2" size={2} borderRadius={3} />
        <Typography as="p" size={1}>Radius 3</Typography>
      </div>
    </Flex>
  ),
}

/**
 * Stroke width options (stroke variant only)
 */
export const StrokeWidth: Story = {
  render: () => (
    <Flex direction="row" gap={3} alignItems="center">
      <div style={{ textAlign: "center" }}>
        <Icon name="check" variant="stroke" strokeWidth={1} size={2} />
        <Typography as="p" size={1}>Width 1</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="check" variant="stroke" strokeWidth={2} size={2} />
        <Typography as="p" size={1}>Width 2</Typography>
      </div>
    </Flex>
  ),
}

/**
 * Active vs Inactive state
 */
export const ActiveState: Story = {
  render: () => (
    <Flex direction="row" gap={4} alignItems="center">
      <div style={{ textAlign: "center" }}>
        <Icon name="heart" isActive={false} size={2} />
        <Typography as="p" size={1}>Inactive (default color)</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="heart" isActive={true} size={2} />
        <Typography as="p" size={1}>Active (primary color)</Typography>
      </div>
    </Flex>
  ),
}

/**
 * Custom SVG via URL
 */
export const CustomSVG: Story = {
  args: {
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='12' y1='8' x2='12' y2='12'/%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'/%3E%3C/svg%3E",
    size: 3,
    color: "#339af0",
  },
}

/**
 * Icon use cases
 */
export const UseCases: Story = {
  render: () => (
    <Flex direction="column" gap={4}>
      {/* Navigation */}
      <div>
        <Typography as="h4" size={3} weight={600} style={{ marginBottom: "12px" }}>
          Navigation Icons
        </Typography>
        <Flex direction="row" gap={2}>
          <Icon name="menu" size={2} />
          <Icon name="arrow" rotation={180} size={2} />
          <Icon name="arrow" size={2} />
          <Icon name="x" size={2} />
        </Flex>
      </div>

      {/* Actions */}
      <div>
        <Typography as="h4" size={3} weight={600} style={{ marginBottom: "12px" }}>
          Action Icons
        </Typography>
        <Flex direction="row" gap={2}>
          <Icon name="plus" size={2} />
          <Icon name="edit" size={2} />
          <Icon name="trash" size={2} />
          <Icon name="upload" size={2} />
          <Icon name="search" size={2} />
        </Flex>
      </div>

      {/* Status */}
      <div>
        <Typography as="h4" size={3} weight={600} style={{ marginBottom: "12px" }}>
          Status Icons
        </Typography>
        <Flex direction="row" gap={2}>
          <Icon name="check" status="success" size={2} />
          <Icon name="cancel" status="error" size={2} />
          <Icon name="attention" status="warning" size={2} />
          <Icon name="spinner" status="active" size={2} />
        </Flex>
      </div>

      {/* Social/Content */}
      <div>
        <Typography as="h4" size={3} weight={600} style={{ marginBottom: "12px" }}>
          Content Icons
        </Typography>
        <Flex direction="row" gap={2}>
          <Icon name="profile" size={2} />
          <Icon name="message" size={2} />
          <Icon name="calendar" size={2} />
          <Icon name="link" size={2} />
          <Icon name="code" size={2} />
        </Flex>
      </div>
    </Flex>
  ),
}

/**
 * Interactive playground
 */
export const Playground: Story = {
  args: {
    name: "check",
    variant: "stroke",
    size: 3,
    rotation: 0,
    spinning: false,
    strokeWidth: 1,
    isActive: true,
  },
}