import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "nice-react-styles"
import BaseTabs from "./Tabs"
import type { TabsProps } from "./Tabs.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const Tabs: React.FC<WithBreakpointsProps<TabsProps>> = withBreakpoints<TabsProps>(BaseTabs)

export default Tabs
export * from "./Tabs.types"
export { default as TabsTypes } from "./Tabs.types"
