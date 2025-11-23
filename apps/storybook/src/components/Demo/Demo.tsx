import React from "react"
import Flex from "nice-react-flex"
import { DemoProps } from "./types"

const Demo: React.FC<DemoProps> = ({
  backgroundColor,
  borderRadius,
  spacing,
  style,
  children,
}) => {
  return (
    <Flex>
      <Flex
        spacing={spacing}
        style={{
          backgroundColor,
          borderRadius,
        }}
      >
        <Flex style={style}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Demo