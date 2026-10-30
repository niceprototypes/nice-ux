import * as React from "react"
import { StyledGrid } from "./Grid.styles"
import type { GridProps } from "./Grid.types"

/**
 * Grid
 *
 * A CSS grid container for two-dimensional and column layouts; Flex stays the default for
 * one-dimensional ones. `columns` makes equal tracks, `minChildWidth` auto-fills as many tracks
 * as fit, `gap`/`padding`/`margin` take the same gap tokens as Flex. Items flow in DOM order
 * (no `order` or dense packing), so reading order matches visual order.
 *
 * @example
 * ```tsx
 * <Grid columns={1} gap="large" breakpoints={{ "tablet+": { columns: 2 }, "laptop+": { columns: 3 } }}>
 *   <GridItem colSpan="full">Header</GridItem>
 *   <GridItem>One</GridItem>
 *   <GridItem>Two</GridItem>
 * </Grid>
 * ```
 */
const Grid: React.FC<GridProps> = ({
  children,
  columns = 1,
  minChildWidth,
  rows,
  gap = "base",
  alignItems = "stretch",
  as = "div",
  padding,
  margin,
  fit = false,
}) => (
  <StyledGrid
    as={as}
    $columns={columns}
    $minChildWidth={minChildWidth}
    $rows={rows}
    $gap={gap}
    $alignItems={alignItems}
    $padding={padding}
    $margin={margin}
    $fit={fit}
  >
    {children}
  </StyledGrid>
)

export default Grid
