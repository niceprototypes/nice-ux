import React from "react"
import Flex from "../../../../nice-react-flex"

interface DemoBackgroundProps {
  backgroundColor?: string
  padding?: string
  borderRadius?: string
  children: React.ReactNode
}

const DemoBackground: React.FC<DemoBackgroundProps> = ({
  backgroundColor = "transparent",
  padding = "var(--gap-base)",
  borderRadius = "8px",
  children,
}) => {
  return (
    <Flex>
      <Flex
        style={{
          backgroundColor,
          padding,
          borderRadius,
        }}
      >
        {children}
      </Flex>
    </Flex>
  )
}

export default DemoBackground