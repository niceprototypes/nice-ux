import { useEffect, useState } from "react"
import {
  useDeviceDetector,
  DeviceProvider,
  useDevice,
} from "nice-react-device-detector"
import Flex from "nice-react-flex"
import { DeviceRow } from "./DeviceRow"

// Conditional — branch the rendered output on the detected device type
export const ConditionalRenderingDemo = () => {
  const isMobile = useDeviceDetector()
  return (
    <DeviceRow
      showIcon
      isMobile={isMobile}
      label="device"
      description={isMobile ? "mobile" : "desktop"}
    />
  )
}

// Context — DeviceProvider runs detection once; descendants read it via useDevice
export const ContextProviderDemo = () => {
  const Consumer = () => {
    const { isMobile } = useDevice()
    return (
      <DeviceRow
        showIcon
        isMobile={isMobile}
        label="device"
        description={isMobile ? "mobile" : "desktop"}
      />
    )
  }

  return (
    <DeviceProvider>
      <Consumer />
    </DeviceProvider>
  )
}

// Debugging — a "debug-mobile" localStorage entry forces mobile detection
export const DebuggingDemo = () => {
  const isMobile = useDeviceDetector()
  const isDebugging = !!localStorage.getItem("debug-mobile")

  // Reload after toggling — the hook re-reads the override on mount
  const enableMobile = () => {
    localStorage.setItem("debug-mobile", "true")
    window.location.reload()
  }
  const disableMobile = () => {
    localStorage.removeItem("debug-mobile")
    window.location.reload()
  }

  return (
    <Flex
      direction="column"
      gap="large"
    >
      <DeviceRow
        isMobile={isMobile}
        label="debugging"
        description={isDebugging ? "true" : "false"}
      />
      <Flex>
        <button onClick={isDebugging ? disableMobile : enableMobile}>
          {isDebugging ? "Disable debugging" : "Enable debugging"}
        </button>
      </Flex>
    </Flex>
  )
}

// Responsive — detection re-evaluates as the viewport crosses the breakpoint
export const ResponsiveDemo = () => {
  const isMobile = useDeviceDetector()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [resizeCount, setResizeCount] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setResizeCount(c => c + 1)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Flex
      direction="column"
      gap="base"
    >
      <DeviceRow
        showIcon
        isMobile={isMobile}
        label="device"
        description={isMobile ? "mobile" : "desktop"}
      />
      <DeviceRow
        label="window width"
        description={`${windowWidth}px`}
      />
      <DeviceRow
        label="resize events"
        description={String(resizeCount)}
      />
    </Flex>
  )
}
