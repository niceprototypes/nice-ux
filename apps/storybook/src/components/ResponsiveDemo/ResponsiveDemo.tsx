import * as React from "react"
import Flex from "nice-react-flex"
import type { ResponsiveDemoProps } from "./ResponsiveDemo.types"

const ResponsiveDemo: React.FC<ResponsiveDemoProps> = ({ children }) => (
  <Flex
    direction="column"
    gap="small"
    breakpoints={{ "tablet+": { direction: "row" } }}
  >
    {children}
  </Flex>
)

export default ResponsiveDemo
