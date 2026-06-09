import * as React from "react"
import { ItemDiv } from "./ResponsiveDemo.styles"
import type { ResponsiveDemoItemProps } from "./ResponsiveDemo.types"

const ResponsiveDemoItem: React.FC<ResponsiveDemoItemProps> = ({ breakpoint, emoji, text }) => (
  <ItemDiv $breakpoint={breakpoint}>
    {emoji} {text}
  </ItemDiv>
)

export default ResponsiveDemoItem
