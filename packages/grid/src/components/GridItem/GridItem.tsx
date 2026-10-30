import * as React from "react"
import { StyledGridItem } from "./GridItem.styles"
import type { GridItemProps } from "./GridItem.types"

/**
 * GridItem
 *
 * One Grid cell. `colSpan` spans column tracks ("full" spans the whole row); `rowSpan` spans
 * row tracks.
 *
 * @example
 * ```tsx
 * <Grid as="ul" columns={3}>
 *   <GridItem as="li" colSpan={2}>Wide</GridItem>
 *   <GridItem as="li">Narrow</GridItem>
 * </Grid>
 * ```
 */
const GridItem: React.FC<GridItemProps> = ({ colSpan = 1, rowSpan = 1, as = "div", children }) => (
  <StyledGridItem as={as} $colSpan={colSpan} $rowSpan={rowSpan}>
    {children}
  </StyledGridItem>
)

export default GridItem
