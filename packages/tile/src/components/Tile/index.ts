import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "nice-react-styles"
import BaseTile from "./Tile"
import type { TileProps } from "./types"

// Explicit return-type annotation — without it, TS declaration emit can leave
// an unbound generic `<P>` in dist or collapse to `any`, erasing the
// `breakpoints` prop on consumers.
const Tile: React.FC<WithBreakpointsProps<TileProps>> = withBreakpoints<TileProps>(BaseTile)

export default Tile
export * from "./types"
export { default as TileTypes } from "./types"
