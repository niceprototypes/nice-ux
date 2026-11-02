import * as React from "react"
import Flex from "@niceprototypes/flex"
import { ItemDiv } from "./ResponsiveDemo.styles"
import type { ResponsiveDemoProps } from "./ResponsiveDemo.types"

const ResponsiveDemo: React.FC<ResponsiveDemoProps> = ({ items }) => (
  <Flex
    direction="column"
    gap="small"
    breakpoints={{ "tablet+": { direction: "row" } }}
  >
    {items.map(({ breakpoint, emoji, text }) => (
      <ItemDiv key={breakpoint} $breakpoint={breakpoint}>
        {emoji} {text}
      </ItemDiv>
    ))}
  </Flex>
)

export default ResponsiveDemo