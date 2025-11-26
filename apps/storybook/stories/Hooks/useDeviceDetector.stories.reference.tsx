oimport type { Meta, StoryObj } from "@storybook/react"
import { useDeviceDetector, DeviceProvider, useDevice } from "nice-react-hook-device-detector"
import React, { useEffect, useState } from "react"
import Typography from "nice-react-typography"
import { generateDescriptionString } from "../../src/utilities"
import { getToken } from "nice-styles"

/**
 * # useDeviceDetector Hook (v1.1+)
 *
 * A React hook for detecting mobile devices with enhanced debugging capabilities and Chrome DevTools support.
 *
 * ## Why Choose This Hook?
 *
 * Unlike simple user agent checks, this hook:
 * - Uses multi-layered detection (user agent, touch, viewport, DevTools)
 * - Responds to window resize events in real-time
 * - Includes debug mode for easy testing
 * - Provides both hook and context-based APIs
 * - Zero dependencies except React
 *
 * ## Key Features
 *
 * - **Smart Detection**: Combines user agent, touch capability, and viewport width
 * - **DevTools Support**: Works with Chrome DevTools mobile emulation
 * - **Debug Mode**: Force mobile/desktop via localStorage or URL parameters
 * - **Responsive**: Auto-updates on window resize
 * - **Two APIs**: Direct hook or Context Provider pattern
 * - **TypeScript**: Full type definitions included
 *
 * ## Detection Methods
 *
 * The hook uses a comprehensive 5-layer approach:
 * 1. **Debug Mode**: Check localStorage (`debug-mobile`) or URL param (`?mobile=true`)
 * 2. **User Agent**: Parse browser UA string for mobile indicators
 * 3. **Touch Support**: Detect `ontouchstart` or `maxTouchPoints > 0`
 * 4. **Viewport Width**: Screens ≤ 480px considered mobile
 * 5. **DevTools**: Combine touch + small screen for emulation detection
 *
 * ## Debug Mode
 *
 * Enable mobile mode for testing:
 * ```javascript
 * // Method 1: localStorage
 * localStorage.setItem('debug-mobile', 'true')
 *
 * // Method 2: URL parameter
 * window.location.href = '?mobile=true'
 * ```
 */

// Helper component to display device info
const DeviceInfo = ({ isMobile }: { isMobile: boolean }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  )

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div>
      <div style={{ marginBottom: getToken("gap", "base") }}>
        <Typography weight="medium" as="span">Status: </Typography>
        <Typography as="span">{isMobile ? "Mobile" : "Desktop"}</Typography>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: getToken("gap", "small") }}>
        <Typography>Window Width: {windowWidth}px</Typography>
        <Typography>Threshold: ≤ 480px</Typography>
        <Typography>
          User Agent:{" "}
          {typeof navigator !== "undefined"
            ? navigator.userAgent.includes("Mobile")
              ? "Mobile"
              : "Desktop"
            : "N/A"}
        </Typography>
      </div>
    </div>
  )
}

// Wrapper component for the hook stories
const HookWrapper = () => null

const meta = {
  title: "Hooks/useDeviceDetector",
  component: HookWrapper,
  parameters: {
    layout: "padded",
    controls: { disable: true },
    docs: {
      description: {
        component: generateDescriptionString([
          "Install using",
          { value: "npm i nice-react-hook-device-detector", code: true },
          { value: "for mobile device detection with multi-layered strategy.", newLine: true },
          "Works with direct hook calls or Context API for optimal performance.",
        ]),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HookWrapper>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic usage of the hook directly in a component.
 * Returns a boolean indicating if a mobile device is detected.
 */
export const BasicUsage: Story = {
  render: () => {
    const isMobile = useDeviceDetector()
    return <DeviceInfo isMobile={isMobile} />
  },
}

/**
 * Demonstrates conditional rendering based on device type.
 * A common pattern for showing different UIs on mobile vs desktop.
 */
export const ConditionalRendering: Story = {
  render: () => {
    const isMobile = useDeviceDetector()

    return (
      <div style={{ fontFamily: "system-ui, sans-serif" }}>
        {isMobile ? (
          <div
            style={{
              padding: "16px",
              backgroundColor: "#fef3c7",
              borderRadius: "8px",
              border: "2px solid #f59e0b",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0", color: "#92400e" }}>
              📱 Mobile View
            </h3>
            <p style={{ margin: 0, fontSize: "14px", color: "#78350f" }}>
              This content is optimized for mobile devices with touch
              interactions and simplified navigation.
            </p>
          </div>
        ) : (
          <div
            style={{
              padding: "24px",
              backgroundColor: "#e0e7ff",
              borderRadius: "8px",
              border: "2px solid #6366f1",
            }}
          >
            <h3 style={{ margin: "0 0 12px 0", color: "#3730a3" }}>
              🖥️ Desktop View
            </h3>
            <p style={{ margin: 0, fontSize: "16px", color: "#4338ca" }}>
              This content is optimized for desktop with advanced features, rich
              interactions, and full navigation menus.
            </p>
          </div>
        )}
      </div>
    )
  },
}

/**
 * Shows how to use the hook for conditional styling.
 * Adjust padding, font sizes, or layouts based on device type.
 */
export const ConditionalStyling: Story = {
  render: () => {
    const isMobile = useDeviceDetector()

    return (
      <div
        style={{
          padding: isMobile ? "12px" : "32px",
          fontSize: isMobile ? "14px" : "16px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
          fontFamily: "system-ui, sans-serif",
          maxWidth: isMobile ? "100%" : "600px",
          margin: "0 auto",
        }}
      >
        <h3
          style={{
            fontSize: isMobile ? "18px" : "24px",
            marginTop: 0,
            color: "#1f2937",
          }}
        >
          Responsive Styling
        </h3>
        <p style={{ color: "#4b5563", lineHeight: "1.6" }}>
          This component adapts its padding ({isMobile ? "12px" : "32px"}),
          font size ({isMobile ? "14px" : "16px"}), and max width (
          {isMobile ? "100%" : "600px"}) based on the detected device type.
        </p>
        <div
          style={{
            marginTop: "16px",
            padding: "12px",
            backgroundColor: isMobile ? "#dcfce7" : "#dbeafe",
            borderRadius: "4px",
            fontSize: "13px",
          }}
        >
          <strong>Current Device:</strong> {isMobile ? "Mobile" : "Desktop"}
        </div>
      </div>
    )
  },
}

/**
 * Context Provider approach for sharing device state across multiple components.
 * More efficient than calling useDeviceDetector() in each component.
 */
export const UsingContextProvider: Story = {
  render: () => {
    const HeaderComponent = () => {
      const { isMobile } = useDevice()
      return (
        <div
          style={{
            padding: "16px",
            backgroundColor: "#1f2937",
            color: "white",
            borderRadius: "8px 8px 0 0",
          }}
        >
          <h4 style={{ margin: 0, fontSize: isMobile ? "16px" : "20px" }}>
            {isMobile ? "☰ Mobile Header" : "🏠 Desktop Header"}
          </h4>
        </div>
      )
    }

    const ContentComponent = () => {
      const { isMobile } = useDevice()
      return (
        <div
          style={{
            padding: isMobile ? "12px" : "24px",
            backgroundColor: "#f9fafb",
          }}
        >
          <p style={{ margin: 0, fontSize: "14px", color: "#4b5563" }}>
            Both components use useDevice() hook but detection happens only
            once at the Provider level.
          </p>
        </div>
      )
    }

    const FooterComponent = () => {
      const { isMobile } = useDevice()
      return (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#e5e7eb",
            borderRadius: "0 0 8px 8px",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {isMobile ? "Compact Footer" : "Full Featured Footer"}
        </div>
      )
    }

    return (
      <DeviceProvider>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <HeaderComponent />
          <ContentComponent />
          <FooterComponent />
        </div>
      </DeviceProvider>
    )
  },
}

/**
 * Debug mode demonstration.
 * Use localStorage or URL parameters to force mobile/desktop detection for testing.
 */
export const DebugMode: Story = {
  render: () => {
    const isMobile = useDeviceDetector()
    const [debugEnabled, setDebugEnabled] = useState(
      localStorage.getItem("debug-mobile") === "true"
    )

    const enableDebug = () => {
      localStorage.setItem("debug-mobile", "true")
      setDebugEnabled(true)
      window.location.reload()
    }

    const disableDebug = () => {
      localStorage.removeItem("debug-mobile")
      setDebugEnabled(false)
      window.location.reload()
    }

    return (
      <div style={{ fontFamily: "system-ui, sans-serif" }}>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fef9c3",
            borderRadius: "8px",
            border: "2px solid #eab308",
            marginBottom: "16px",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#713f12" }}>🐛 Debug Mode</h3>
          <p style={{ fontSize: "14px", color: "#854d0e", lineHeight: "1.6" }}>
            Debug mode allows you to test mobile-specific features without an
            actual mobile device. Enable it via localStorage or URL parameters.
          </p>

          <div style={{ marginTop: "16px" }}>
            <button
              onClick={enableDebug}
              style={{
                padding: "8px 16px",
                marginRight: "8px",
                backgroundColor: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Enable Debug Mode
            </button>
            <button
              onClick={disableDebug}
              style={{
                padding: "8px 16px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Disable Debug Mode
            </button>
          </div>

          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              backgroundColor: "white",
              borderRadius: "4px",
              fontSize: "13px",
            }}
          >
            <div>
              <strong>Debug Status:</strong>{" "}
              {debugEnabled ? "✅ Enabled" : "❌ Disabled"}
            </div>
            <div style={{ marginTop: "4px" }}>
              <strong>Current Detection:</strong>{" "}
              {isMobile ? "📱 Mobile" : "🖥️ Desktop"}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "16px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
            fontSize: "13px",
            color: "#374151",
          }}
        >
          <h4 style={{ marginTop: 0 }}>Debug Methods:</h4>
          <div style={{ lineHeight: "1.8" }}>
            <div>
              <strong>Method 1 (localStorage):</strong>
            </div>
            <code
              style={{
                display: "block",
                padding: "8px",
                backgroundColor: "#1f2937",
                color: "#10b981",
                borderRadius: "4px",
                marginTop: "4px",
                marginBottom: "12px",
              }}
            >
              localStorage.setItem('debug-mobile', 'true')
            </code>

            <div>
              <strong>Method 2 (URL parameter):</strong>
            </div>
            <code
              style={{
                display: "block",
                padding: "8px",
                backgroundColor: "#1f2937",
                color: "#10b981",
                borderRadius: "4px",
                marginTop: "4px",
              }}
            >
              ?mobile=true
            </code>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Real-time responsiveness demonstration.
 * The hook automatically updates when window is resized.
 * Try resizing your browser window or using DevTools responsive mode.
 */
export const ResponsiveDemo: Story = {
  render: () => {
    const isMobile = useDeviceDetector()
    const [resizeCount, setResizeCount] = useState(0)

    useEffect(() => {
      const handleResize = () => setResizeCount((c) => c + 1)
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
      <div style={{ fontFamily: "system-ui, sans-serif" }}>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f0fdf4",
            borderRadius: "8px",
            border: "2px solid #22c55e",
            marginBottom: "16px",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#15803d" }}>
            📐 Responsive Detection
          </h3>
          <p style={{ fontSize: "14px", color: "#166534", lineHeight: "1.6" }}>
            Try resizing your browser window or using Chrome DevTools responsive
            mode. The hook will automatically detect changes and update.
          </p>

          <div
            style={{
              marginTop: "16px",
              padding: "16px",
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          >
            <div style={{ fontSize: "14px", lineHeight: "1.8" }}>
              <div>
                <strong>Current Device:</strong>{" "}
                <span
                  style={{
                    color: isMobile ? "#15803d" : "#1e40af",
                    fontWeight: "bold",
                  }}
                >
                  {isMobile ? "📱 Mobile" : "🖥️ Desktop"}
                </span>
              </div>
              <div>
                <strong>Window Width:</strong>{" "}
                {typeof window !== "undefined" ? window.innerWidth : 0}px
              </div>
              <div>
                <strong>Resize Events:</strong> {resizeCount}
              </div>
              <div>
                <strong>Threshold:</strong> 480px
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "16px",
            backgroundColor: "#eff6ff",
            borderRadius: "8px",
            fontSize: "13px",
          }}
        >
          <h4 style={{ marginTop: 0, color: "#1e40af" }}>💡 Testing Tips:</h4>
          <ul style={{ marginBottom: 0, paddingLeft: "20px", color: "#1e3a8a" }}>
            <li>Open Chrome DevTools (F12)</li>
            <li>Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)</li>
            <li>Select a mobile device from the dropdown</li>
            <li>Watch the detection update in real-time</li>
          </ul>
        </div>
      </div>
    )
  },
}

/**
 * Feature toggling based on device type.
 * Show/hide features or interactions based on mobile vs desktop.
 */
export const FeatureToggling: Story = {
  render: () => {
    const isMobile = useDeviceDetector()

    const features = [
      {
        name: "Touch Gestures",
        mobile: true,
        desktop: false,
        icon: "👆",
      },
      {
        name: "Keyboard Shortcuts",
        mobile: false,
        desktop: true,
        icon: "⌨️",
      },
      {
        name: "Hover Effects",
        mobile: false,
        desktop: true,
        icon: "🖱️",
      },
      {
        name: "Swipe Navigation",
        mobile: true,
        desktop: false,
        icon: "👉",
      },
      {
        name: "Advanced Filters",
        mobile: false,
        desktop: true,
        icon: "🔍",
      },
      {
        name: "Bottom Sheet",
        mobile: true,
        desktop: false,
        icon: "📱",
      },
    ]

    const activeFeatures = features.filter((f) =>
      isMobile ? f.mobile : f.desktop
    )
    const inactiveFeatures = features.filter((f) =>
      isMobile ? !f.mobile : !f.desktop
    )

    return (
      <div style={{ fontFamily: "system-ui, sans-serif" }}>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f0fdf4",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#15803d" }}>
            ✨ Active Features ({isMobile ? "Mobile" : "Desktop"})
          </h3>
          <div style={{ display: "grid", gap: "8px" }}>
            {activeFeatures.map((feature) => (
              <div
                key={feature.name}
                style={{
                  padding: "12px",
                  backgroundColor: "white",
                  borderRadius: "6px",
                  border: "2px solid #22c55e",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "24px" }}>{feature.icon}</span>
                <span style={{ fontWeight: "500", color: "#15803d" }}>
                  {feature.name}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "12px",
                    padding: "4px 8px",
                    backgroundColor: "#dcfce7",
                    borderRadius: "4px",
                    color: "#15803d",
                  }}
                >
                  ✓ Enabled
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: "20px",
            backgroundColor: "#fef2f2",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#991b1b" }}>
            🚫 Disabled Features
          </h3>
          <div style={{ display: "grid", gap: "8px" }}>
            {inactiveFeatures.map((feature) => (
              <div
                key={feature.name}
                style={{
                  padding: "12px",
                  backgroundColor: "white",
                  borderRadius: "6px",
                  border: "2px solid #fecaca",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  opacity: 0.6,
                }}
              >
                <span style={{ fontSize: "24px", filter: "grayscale(100%)" }}>
                  {feature.icon}
                </span>
                <span style={{ fontWeight: "500", color: "#991b1b" }}>
                  {feature.name}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "12px",
                    padding: "4px 8px",
                    backgroundColor: "#fee2e2",
                    borderRadius: "4px",
                    color: "#991b1b",
                  }}
                >
                  ✗ Disabled
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Complete navigation example showing mobile vs desktop navigation patterns.
 * Demonstrates a common real-world use case.
 */
export const NavigationExample: Story = {
  render: () => {
    const isMobile = useDeviceDetector()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navItems = ["Home", "Products", "About", "Contact"]

    return (
      <div style={{ fontFamily: "system-ui, sans-serif" }}>
        {isMobile ? (
          // Mobile Navigation
          <div>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#1f2937",
                color: "white",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                📱 MyApp
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid white",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                {mobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>

            {mobileMenuOpen && (
              <div
                style={{
                  marginTop: "8px",
                  backgroundColor: "white",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {navItems.map((item, i) => (
                  <div
                    key={item}
                    style={{
                      padding: "16px",
                      borderBottom:
                        i < navItems.length - 1 ? "1px solid #e5e7eb" : "none",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    {item}
                  </div>
                ))}x
              </div>
            )}

            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                backgroundColor: "#fef3c7",
                borderRadius: "6px",
                fontSize: "13px",
                color: "#78350f",
              }}
            >
              <strong>Mobile Pattern:</strong> Hamburger menu with full-screen
              overlay
            </div>
          </div>
        ) : (
          // Desktop Navigation
          <div>
            <div
              style={{
                padding: "20px 32px",
                backgroundColor: "#1f2937",
                color: "white",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "24px" }}>
                🖥️ MyApp
              </div>
              <div style={{ display: "flex", gap: "32px" }}>
                {navItems.map((item) => (
                  <div
                    key={item}
                    style={{
                      cursor: "pointer",
                      fontSize: "16px",
                      transition: "color 0.2s",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                backgroundColor: "#dbeafe",
                borderRadius: "6px",
                fontSize: "13px",
                color: "#1e3a8a",
              }}
            >
              <strong>Desktop Pattern:</strong> Horizontal navigation bar with
              visible menu items
            </div>
          </div>
        )}
      </div>
    )
  },
}

/**
 * Performance comparison between direct hook usage and Context Provider.
 * Shows component re-render counts.
 */
export const PerformanceComparison: Story = {
  render: () => {
    const DirectHookComponent = ({ label }: { label: string }) => {
      const isMobile = useDeviceDetector()
      const renderCount = React.useRef(0)
      renderCount.current += 1

      return (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#fef2f2",
            borderRadius: "4px",
            marginBottom: "8px",
            fontSize: "13px",
          }}
        >
          <strong>{label}</strong>: {isMobile ? "Mobile" : "Desktop"} (Renders:{" "}
          {renderCount.current})
        </div>
      )
    }

    const ContextComponent = ({ label }: { label: string }) => {
      const { isMobile } = useDevice()
      const renderCount = React.useRef(0)
      renderCount.current += 1

      return (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#f0fdf4",
            borderRadius: "4px",
            marginBottom: "8px",
            fontSize: "13px",
          }}
        >
          <strong>{label}</strong>: {isMobile ? "Mobile" : "Desktop"} (Renders:{" "}
          {renderCount.current})
        </div>
      )
    }

    return (
      <div style={{ fontFamily: "system-ui, sans-serif" }}>
        <div
          style={{
            padding: "16px",
            backgroundColor: "#fffbeb",
            borderRadius: "8px",
            marginBottom: "16px",
            border: "2px solid #f59e0b",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#92400e" }}>
            ⚡ Performance Considerations
          </h3>
          <p style={{ fontSize: "14px", color: "#78350f", lineHeight: "1.6" }}>
            When multiple components need device detection, using Context
            Provider is more efficient as it creates only one detection instance
            and event listener.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <h4
              style={{
                margin: "0 0 12px 0",
                color: "#991b1b",
                fontSize: "16px",
              }}
            >
              ❌ Direct Hook (3 instances)
            </h4>
            <DirectHookComponent label="Component 1" />
            <DirectHookComponent label="Component 2" />
            <DirectHookComponent label="Component 3" />
            <div
              style={{
                marginTop: "12px",
                padding: "12px",
                backgroundColor: "#fee2e2",
                borderRadius: "4px",
                fontSize: "13px",
              }}
            >
              <strong>Event Listeners:</strong> 3
              <br />
              <strong>Note:</strong> Each component creates its own detection instance
            </div>
          </div>

          <div>
            <h4
              style={{
                margin: "0 0 12px 0",
                color: "#15803d",
                fontSize: "16px",
              }}
            >
              ✅ Context Provider (1 instance)
            </h4>
            <DeviceProvider>
              <ContextComponent label="Component 1" />
              <ContextComponent label="Component 2" />
              <ContextComponent label="Component 3" />
            </DeviceProvider>
            <div
              style={{
                marginTop: "12px",
                padding: "12px",
                backgroundColor: "#dcfce7",
                borderRadius: "4px",
                fontSize: "13px",
              }}
            >
              <strong>Event Listeners:</strong> 1
              <br />
              <strong>Note:</strong> All components share a single detection instance
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
            fontSize: "13px",
            color: "#374151",
          }}
        >
          <h4 style={{ marginTop: 0 }}>📊 Recommendation:</h4>
          <ul style={{ marginBottom: 0, paddingLeft: "20px" }}>
            <li>
              <strong>Use Direct Hook:</strong> Single component or 1-2 uses
            </li>
            <li>
              <strong>Use Context Provider:</strong> Multiple components or
              app-wide detection
            </li>
          </ul>
        </div>
      </div>
    )
  },
}