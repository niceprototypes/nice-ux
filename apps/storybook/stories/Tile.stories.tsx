import type { Meta, StoryObj } from "@storybook/react"
import Tile from "nice-react-tile"
import Typography from "nice-react-typography"

/**
 * # Tile Component
 *
 * A responsive Tile component for React with styled-components that provides
 * a full-width container with background support and responsive breakpoints.
 *
 * ## Features
 *
 * - **Full-width Layout**: Automatically expands to full viewport width
 * - **Background Support**: Images, colors, gradients with customizable properties
 * - **Responsive Breakpoints**: Customizable breakpoints for different screen sizes
 * - **Flex-based**: Built on top of nice-react-flex for layout control
 * - **Background Properties**: Control position, size, and attachment
 *
 * ## Background Properties
 *
 * - **backgroundImage**: URL to background image
 * - **backgroundColor**: Solid color or gradient
 * - **backgroundPosition**: Position of background (default: center)
 * - **backgroundSize**: Size behavior (default: cover)
 * - **backgroundAttachment**: Scroll behavior (default: fixed)
 */
const meta = {
  title: "Components/Tile",
  component: Tile,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "A full-width container component with background support and responsive capabilities.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: {
      description: "Background color (CSS value)",
      control: "color",
    },
    backgroundImage: {
      description: "Background image URL",
      control: "text",
    },
    backgroundPosition: {
      description: "Background position",
      control: "select",
      options: ["center", "top", "bottom", "left", "right", "top left", "top right", "bottom left", "bottom right"],
    },
    backgroundSize: {
      description: "Background size",
      control: "select",
      options: ["cover", "contain", "auto", "100%"],
    },
    backgroundAttachment: {
      description: "Background attachment",
      control: "select",
      options: ["fixed", "scroll", "local"],
    },
    breakpointMd: {
      description: "Medium breakpoint width in pixels",
      control: { type: "number", min: 600, max: 1200, step: 10 },
    },
    breakpointLg: {
      description: "Large breakpoint width in pixels",
      control: { type: "number", min: 1000, max: 1920, step: 10 },
    },
  },
} satisfies Meta<typeof Tile>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic tile with background color
 */
export const WithBackgroundColor: Story = {
  args: {
    backgroundColor: "#e3f2fd",
    style: { minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" },
    children: (
      <div style={{ maxWidth: "800px", padding: "40px", textAlign: "center" }}>
        <Typography as="h2" size={5} weight={700}>
          Tile with Background Color
        </Typography>
        <Typography as="p" size={3}>
          This tile has a solid background color (#e3f2fd) and centers its content.
        </Typography>
      </div>
    ),
  },
}

/**
 * Tile with gradient background
 */
export const WithGradient: Story = {
  args: {
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    style: { minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" },
    children: (
      <div style={{ maxWidth: "600px", padding: "40px", textAlign: "center" }}>
        <Typography as="h2" size={5} weight={700} color="white">
          Beautiful Gradient Background
        </Typography>
        <Typography as="p" size={3} color="white">
          Tiles support CSS gradients for modern, eye-catching designs.
        </Typography>
      </div>
    ),
  },
}

/**
 * Tile with background image
 */
export const WithBackgroundImage: Story = {
  args: {
    backgroundImage: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    style: { minHeight: "500px", display: "flex", alignItems: "center", justifyContent: "center" },
    children: (
      <div style={{
        maxWidth: "700px",
        padding: "40px",
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderRadius: "8px"
      }}>
        <Typography as="h2" size={5} weight={700} color="white">
          Background Image Tile
        </Typography>
        <Typography as="p" size={3} color="white">
          Perfect for hero sections with parallax effects (backgroundAttachment: fixed).
        </Typography>
      </div>
    ),
  },
}

/**
 * Tile with image and color overlay
 */
export const WithImageAndColorOverlay: Story = {
  args: {
    backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    style: { minHeight: "450px", display: "flex", alignItems: "center", justifyContent: "center" },
    children: (
      <div style={{ maxWidth: "800px", padding: "40px", textAlign: "center" }}>
        <Typography as="h2" size={5} weight={700} color="white">
          Image with Color Overlay
        </Typography>
        <Typography as="p" size={3} color="white">
          Combining backgroundImage and backgroundColor creates an overlay effect for better text readability.
        </Typography>
      </div>
    ),
  },
}

/**
 * Multiple tiles stacked vertically
 */
export const MultipleTiles: Story = {
  render: () => (
    <>
      <Tile
        backgroundColor="#f44336"
        style={{ minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ padding: "40px", textAlign: "center" }}>
          <Typography as="h3" size={4} weight={700} color="white">
            First Tile
          </Typography>
          <Typography as="p" size={2} color="white">
            Red background
          </Typography>
        </div>
      </Tile>

      <Tile
        backgroundColor="#4caf50"
        style={{ minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ padding: "40px", textAlign: "center" }}>
          <Typography as="h3" size={4} weight={700} color="white">
            Second Tile
          </Typography>
          <Typography as="p" size={2} color="white">
            Green background
          </Typography>
        </div>
      </Tile>

      <Tile
        backgroundColor="#2196f3"
        style={{ minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ padding: "40px", textAlign: "center" }}>
          <Typography as="h3" size={4} weight={700} color="white">
            Third Tile
          </Typography>
          <Typography as="p" size={2} color="white">
            Blue background
          </Typography>
        </div>
      </Tile>
    </>
  ),
}

/**
 * Tile with custom breakpoints
 */
export const CustomBreakpoints: Story = {
  args: {
    breakpointMd: 768,
    breakpointLg: 1440,
    backgroundColor: "#9c27b0",
    style: { minHeight: "350px", display: "flex", alignItems: "center", justifyContent: "center" },
    children: (
      <div style={{ maxWidth: "700px", padding: "40px", textAlign: "center" }}>
        <Typography as="h2" size={5} weight={700} color="white">
          Custom Breakpoints
        </Typography>
        <Typography as="p" size={3} color="white">
          This tile uses custom breakpoints: md at 768px and lg at 1440px.
        </Typography>
        <Typography as="p" size={2} color="rgba(255, 255, 255, 0.8)">
          Resize your browser to see responsive behavior.
        </Typography>
      </div>
    ),
  },
}

/**
 * Hero section example
 */
export const HeroSection: Story = {
  render: () => (
    <Tile
      backgroundImage="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundAttachment="fixed"
      style={{ minHeight: "600px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div style={{
        maxWidth: "900px",
        padding: "60px 40px",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: "12px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
      }}>
        <Typography as="h1" size={6} weight={900} style={{ marginBottom: "16px" }}>
          Welcome to Your Application
        </Typography>
        <Typography as="p" size={4} weight={400} color="#666" style={{ marginBottom: "24px" }}>
          Build amazing experiences with beautiful, responsive tiles
        </Typography>
        <Typography as="p" size={2} status="disabled">
          Scroll down to explore more features
        </Typography>
      </div>
    </Tile>
  ),
}

/**
 * Content section with pattern background
 */
export const PatternBackground: Story = {
  args: {
    backgroundColor: "#f5f5f5",
    style: {
      minHeight: "400px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.03) 10px, rgba(0,0,0,.03) 20px)",
    },
    children: (
      <div style={{
        maxWidth: "800px",
        padding: "40px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
      }}>
        <Typography as="h2" size={5} weight={700} style={{ marginBottom: "16px" }}>
          Pattern Background Tile
        </Typography>
        <Typography as="p" size={3}>
          This tile uses CSS patterns for a subtle, textured background effect.
          Perfect for content sections that need visual interest without overwhelming the content.
        </Typography>
      </div>
    ),
  },
}

/**
 * Full-page layout example
 */
export const FullPageLayout: Story = {
  render: () => (
    <>
      {/* Hero */}
      <Tile
        backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ textAlign: "center", padding: "40px" }}>
          <Typography as="h1" size={6} weight={900} color="white" style={{ marginBottom: "16px" }}>
            Full Page Layout
          </Typography>
          <Typography as="p" size={4} color="white">
            Multiple tiles creating a complete page
          </Typography>
        </div>
      </Tile>

      {/* Features */}
      <Tile
        backgroundColor="#ffffff"
        style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ maxWidth: "900px", padding: "60px 40px", textAlign: "center" }}>
          <Typography as="h2" size={5} weight={700} style={{ marginBottom: "24px" }}>
            Features Section
          </Typography>
          <Typography as="p" size={3} color="#666">
            Build beautiful landing pages by stacking multiple Tile components vertically.
            Each section can have its own background, spacing, and content.
          </Typography>
        </div>
      </Tile>

      {/* CTA */}
      <Tile
        backgroundColor="#1a237e"
        style={{ minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ textAlign: "center", padding: "40px" }}>
          <Typography as="h3" size={4} weight={700} color="white" style={{ marginBottom: "12px" }}>
            Ready to get started?
          </Typography>
          <Typography as="p" size={3} color="rgba(255,255,255,0.9)">
            Start building with Tile today
          </Typography>
        </div>
      </Tile>
    </>
  ),
}