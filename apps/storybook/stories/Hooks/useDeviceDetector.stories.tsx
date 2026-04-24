import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  useDeviceDetector,
  DeviceProvider,
  useDevice,
} from "nice-react-device-detector"
import React, { useEffect, useState } from "react"
import Typography from "../../src/nice/Typography"
import Flex from "nice-react-flex"
import { CodeRow } from "../../src/components/CodeRow"

const Row = CodeRow

const HookWrapper = () => null

const meta = {
  title: "React/Bindings/useDeviceDetector",
  component: HookWrapper,
  parameters: {
    layout: "padded",
  },

} satisfies Meta<typeof HookWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const BasicUsage: Story = {
  render: () => <Row isMobile={useDeviceDetector()} />,
}

export const ConditionalRendering: Story = {
  render: () => {
    const isMobile = useDeviceDetector()
    return (
      <Row
        showIcon
        isMobile={isMobile}
        label="device"
        description={isMobile ? "mobile" : "desktop"}
      />
    )
  },
}

export const ContextProvider: Story = {
  render: () => {
    const ProviderConsumer = () => {
      const { isMobile } = useDevice()
      return (
        <Row
          showIcon
          isMobile={isMobile}
          label="device"
          description={isMobile ? "mobile" : "desktop"}
        />
      )
    }

    return (
      <DeviceProvider>
        <ProviderConsumer />
      </DeviceProvider>
    )
  },
}

export const Debugging: Story = {
  render: () => {
    const isMobile = useDeviceDetector()
    const isDebugging = !!localStorage.getItem("debug-mobile")

    const enableMobile = () => {
      localStorage.setItem("debug-mobile", "true")
      window.location.reload()
    }

    const disableMobile = () => {
      localStorage.removeItem("debug-mobile")
      window.location.reload()
    }

    return (
      <Flex direction="column" gap="large">
        <Row
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
  },
}

export const Responsive: Story = {
  render: () => {
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
      <Flex direction="column" gap="base">
        <Row
          showIcon
          isMobile={isMobile}
          label="device"
          description={isMobile ? "mobile" : "desktop"}
        />
        <Row label="window width" description={`${windowWidth}px`} />
        <Row label="resize events" description={String(resizeCount)} />
      </Flex>
    )
  },
}
