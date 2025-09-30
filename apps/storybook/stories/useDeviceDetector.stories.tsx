import type { Meta, StoryObj } from "@storybook/react"
import { useDeviceDetector } from "nice-react-hook-device-detector"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import { useEffect, useState } from "react"

/**
 * # useDeviceDetector Hook
 *
 * A React hook for detecting mobile devices with enhanced debugging capabilities.
 *
 * ## Features
 *
 * - **User Agent Detection**: Identifies mobile devices from user agent strings
 * - **Touch Capability**: Detects touch-enabled devices
 * - **Viewport Width**: Considers screen size (≤480px as mobile)
 * - **Chrome DevTools Support**: Works with mobile emulation
 * - **Debug Mode**: Force mobile view via localStorage or URL parameter
 * - **Responsive**: Automatically updates on window resize
 *
 * ## Usage
 *
 * ```tsx
 * import { useDeviceDetector } from 'nice-react-hook-device-detector'
 *
 * function MyComponent() {
 *   const isMobile = useDeviceDetector()
 *
 *   return (
 *     <div>
 *       {isMobile ? (
 *         <MobileView />
 *       ) : (
 *         <DesktopView />
 *       )}
 *     </div>
 *   )
 * }
 * ```
 *
 * ## Debug Mode
 *
 * Enable mobile view for testing:
 * - URL parameter: `?mobile=true`
 * - localStorage: `localStorage.setItem('debug-mobile', 'true')`
 *
 * ## Detection Criteria
 *
 * Device is considered mobile if:
 * 1. User agent matches mobile patterns (Android, iPhone, iPad, etc.), OR
 * 2. Has touch capability AND viewport width ≤ 480px
 */

// Demo component that uses the hook
function DeviceDetectorDemo() {
  const isMobile = useDeviceDetector()
  const [windowWidth, setWindowWidth] = useState<number>(0)

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth)
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  return (
    <Flex direction="column" gap={3} type="padding" spacing={{ all: 3 }}>
      <Flex
        direction="column"
        gap={2}
        type="padding"
        spacing={{ all: 3 }}
        style={{
          backgroundColor: isMobile ? "#e3f2fd" : "#f3e5f5",
          borderRadius: "8px",
          border: `2px solid ${isMobile ? "#1976d2" : "#7b1fa2"}`,
        }}
      >
        <Typography as="h3" size={4} weight={700}>
          Device Detection Result
        </Typography>

        <Flex direction="row" gap={2} alignItems="center">
          <Typography as="p" size={3} weight={600}>
            Device Type:
          </Typography>
          <Typography
            as="p"
            size={3}
            status={isMobile ? "active" : "success"}
            weight={700}
          >
            {isMobile ? "📱 Mobile" : "🖥️ Desktop"}
          </Typography>
        </Flex>

        <Flex direction="row" gap={2} alignItems="center">
          <Typography as="p" size={3} weight={600}>
            Window Width:
          </Typography>
          <Typography as="p" size={3} code>
            {windowWidth}px
          </Typography>
        </Flex>

        <Flex direction="row" gap={2} alignItems="center">
          <Typography as="p" size={3} weight={600}>
            Mobile Breakpoint:
          </Typography>
          <Typography as="p" size={3} code>
            ≤ 480px
          </Typography>
        </Flex>
      </Flex>

      <Flex direction="column" gap={2}>
        <Typography as="h4" size={3} weight={600}>
          Detection Details
        </Typography>

        <Flex direction="column" gap={1}>
          <Typography as="p" size={2}>
            <strong>User Agent:</strong>
          </Typography>
          <Typography as="p" size={1} code style={{ backgroundColor: "#f5f5f5", padding: "8px", borderRadius: "4px", wordBreak: "break-all" }}>
            {navigator.userAgent}
          </Typography>
        </Flex>

        <Flex direction="column" gap={1}>
          <Typography as="p" size={2}>
            <strong>Touch Capability:</strong> {('ontouchstart' in window || navigator.maxTouchPoints > 0) ? "Yes ✓" : "No ✗"}
          </Typography>
          <Typography as="p" size={2}>
            <strong>Max Touch Points:</strong> {navigator.maxTouchPoints}
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  )
}

// Debug mode demo
function DebugModeDemo() {
  const isMobile = useDeviceDetector()
  const [debugEnabled, setDebugEnabled] = useState(false)

  useEffect(() => {
    const isDebugMode = localStorage.getItem("debug-mobile") === "true" ||
                        new URLSearchParams(window.location.search).get("mobile") === "true"
    setDebugEnabled(isDebugMode)
  }, [])

  const enableDebugMode = () => {
    localStorage.setItem("debug-mobile", "true")
    window.location.reload()
  }

  const disableDebugMode = () => {
    localStorage.removeItem("debug-mobile")
    window.location.reload()
  }

  return (
    <Flex direction="column" gap={3} type="padding" spacing={{ all: 3 }}>
      <Flex
        direction="column"
        gap={2}
        type="padding"
        spacing={{ all: 2 }}
        style={{ backgroundColor: "#fff3e0", borderRadius: "8px" }}
      >
        <Typography as="h4" size={3} weight={600}>
          Debug Mode
        </Typography>

        <Typography as="p" size={2}>
          Debug mode allows you to force mobile view for testing purposes without using browser dev tools.
        </Typography>

        <Flex direction="column" gap={1}>
          <Typography as="p" size={2} weight={600}>
            Status: {debugEnabled ? "🟢 Enabled" : "🔴 Disabled"}
          </Typography>
          <Typography as="p" size={2}>
            Currently detected as: <strong>{isMobile ? "Mobile" : "Desktop"}</strong>
          </Typography>
        </Flex>

        <Flex direction="row" gap={2}>
          <button
            onClick={enableDebugMode}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Enable Debug Mode
          </button>
          <button
            onClick={disableDebugMode}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Disable Debug Mode
          </button>
        </Flex>
      </Flex>

      <Flex direction="column" gap={1}>
        <Typography as="p" size={2}>
          <strong>Method 1: localStorage</strong>
        </Typography>
        <Typography as="p" size={1} code style={{ backgroundColor: "#f5f5f5", padding: "8px", borderRadius: "4px" }}>
          localStorage.setItem('debug-mobile', 'true')
        </Typography>

        <Typography as="p" size={2} style={{ marginTop: "12px" }}>
          <strong>Method 2: URL Parameter</strong>
        </Typography>
        <Typography as="p" size={1} code style={{ backgroundColor: "#f5f5f5", padding: "8px", borderRadius: "4px" }}>
          ?mobile=true
        </Typography>
      </Flex>
    </Flex>
  )
}

// Responsive layout example
function ResponsiveLayoutExample() {
  const isMobile = useDeviceDetector()

  return (
    <Flex
      direction={isMobile ? "column" : "row"}
      gap={isMobile ? 2 : 3}
      type="padding"
      spacing={{ all: 3 }}
    >
      <Flex
        direction="column"
        gap={2}
        type="padding"
        spacing={{ all: 2 }}
        style={{
          flex: 1,
          backgroundColor: "#e8f5e9",
          borderRadius: "8px",
        }}
      >
        <Typography as="h4" size={3} weight={600}>
          Sidebar
        </Typography>
        <Typography as="p" size={2}>
          {isMobile ? "Stacked on mobile" : "Side-by-side on desktop"}
        </Typography>
      </Flex>

      <Flex
        direction="column"
        gap={2}
        type="padding"
        spacing={{ all: 2 }}
        style={{
          flex: 2,
          backgroundColor: "#e3f2fd",
          borderRadius: "8px",
        }}
      >
        <Typography as="h4" size={3} weight={600}>
          Main Content
        </Typography>
        <Typography as="p" size={2}>
          Layout automatically adjusts based on device type.
        </Typography>
        <Typography as="p" size={2}>
          Current layout: <strong>{isMobile ? "Mobile (Column)" : "Desktop (Row)"}</strong>
        </Typography>
      </Flex>
    </Flex>
  )
}

const meta = {
  title: "Hooks/useDeviceDetector",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A React hook for detecting mobile devices with enhanced debugging capabilities.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic device detection display
 */
export const BasicDetection: Story = {
  render: () => <DeviceDetectorDemo />,
}

/**
 * Debug mode for testing mobile views
 */
export const DebugMode: Story = {
  render: () => <DebugModeDemo />,
}

/**
 * Responsive layout example using the hook
 */
export const ResponsiveLayout: Story = {
  render: () => <ResponsiveLayoutExample />,
}

/**
 * Code example
 */
export const CodeExample: Story = {
  render: () => (
    <Flex direction="column" gap={3} type="padding" spacing={{ all: 3 }}>
      <Typography as="h3" size={4} weight={700}>
        Usage Example
      </Typography>

      <Flex direction="column" gap={1}>
        <Typography as="p" size={2} weight={600}>
          1. Import the hook
        </Typography>
        <Typography as="p" size={2} code style={{ backgroundColor: "#f5f5f5", padding: "8px", borderRadius: "4px" }}>
          {`import { useDeviceDetector } from 'nice-react-hook-device-detector'`}
        </Typography>
      </Flex>

      <Flex direction="column" gap={1}>
        <Typography as="p" size={2} weight={600}>
          2. Use in your component
        </Typography>
        <pre style={{ backgroundColor: "#f5f5f5", padding: "16px", borderRadius: "4px", overflow: "auto" }}>
          <code>{`function MyComponent() {
  const isMobile = useDeviceDetector()

  return (
    <div>
      {isMobile ? (
        <MobileNavigation />
      ) : (
        <DesktopNavigation />
      )}
    </div>
  )
}`}</code>
        </pre>
      </Flex>

      <Flex direction="column" gap={1}>
        <Typography as="p" size={2} weight={600}>
          3. Conditional rendering based on device
        </Typography>
        <pre style={{ backgroundColor: "#f5f5f5", padding: "16px", borderRadius: "4px", overflow: "auto" }}>
          <code>{`function App() {
  const isMobile = useDeviceDetector()

  return (
    <Flex direction={isMobile ? "column" : "row"}>
      <Sidebar />
      <MainContent />
    </Flex>
  )
}`}</code>
        </pre>
      </Flex>
    </Flex>
  ),
}

/**
 * Detection criteria explanation
 */
export const DetectionCriteria: Story = {
  render: () => (
    <Flex direction="column" gap={3} type="padding" spacing={{ all: 3 }}>
      <Typography as="h3" size={4} weight={700}>
        Detection Criteria
      </Typography>

      <Flex direction="column" gap={2}>
        <div style={{ backgroundColor: "#e3f2fd", padding: "16px", borderRadius: "8px" }}>
          <Typography as="h4" size={3} weight={600} style={{ marginBottom: "8px" }}>
            Method 1: User Agent Detection
          </Typography>
          <Typography as="p" size={2}>
            Checks if the user agent string contains mobile device identifiers:
          </Typography>
          <Typography as="p" size={2} code style={{ marginTop: "8px", display: "block" }}>
            Android | BlackBerry | iPhone | iPad | iPod | Opera Mini | IEMobile | WPDesktop | Mobile
          </Typography>
        </div>

        <div style={{ backgroundColor: "#f3e5f5", padding: "16px", borderRadius: "8px" }}>
          <Typography as="h4" size={3} weight={600} style={{ marginBottom: "8px" }}>
            Method 2: Touch + Viewport Detection
          </Typography>
          <Typography as="p" size={2}>
            Considers a device mobile if it has:
          </Typography>
          <ul style={{ marginTop: "8px", marginLeft: "20px" }}>
            <li>
              <Typography as="span" size={2}>
                Touch capability (ontouchstart or maxTouchPoints {'>'} 0)
              </Typography>
            </li>
            <li>
              <Typography as="span" size={2}>
                AND viewport width ≤ 480px
              </Typography>
            </li>
          </ul>
        </div>

        <div style={{ backgroundColor: "#fff3e0", padding: "16px", borderRadius: "8px" }}>
          <Typography as="h4" size={3} weight={600} style={{ marginBottom: "8px" }}>
            Method 3: Debug Mode
          </Typography>
          <Typography as="p" size={2}>
            Override detection for testing:
          </Typography>
          <ul style={{ marginTop: "8px", marginLeft: "20px" }}>
            <li>
              <Typography as="span" size={2} code>
                localStorage.getItem('debug-mobile') === 'true'
              </Typography>
            </li>
            <li>
              <Typography as="span" size={2} code>
                URL parameter: ?mobile=true
              </Typography>
            </li>
          </ul>
        </div>
      </Flex>
    </Flex>
  ),
}