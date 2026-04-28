import { withBreakpoints } from "nice-react-styles"
import BaseTile from "./Tile"
import type { TileProps } from "./types"

const Tile = withBreakpoints<TileProps>(BaseTile)

export default Tile
export * from "./types"
export { default as TileTypes } from "./types"
