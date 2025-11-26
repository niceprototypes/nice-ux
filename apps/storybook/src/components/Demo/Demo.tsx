import React from "react"
import Flex from "nice-react-flex"
import styled from "styled-components"
import { DemoProps } from "./types"

const DemoBoxDiv = styled.div``

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
        <DemoBoxDiv style={style}>
          {children}
        </DemoBoxDiv>
      </Flex>
    </Flex>
  )
}

export default Demo