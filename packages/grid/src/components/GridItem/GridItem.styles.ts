import styled from "styled-components"
import type { GridItemColSpanType, GridItemRowSpanType } from "./GridItem.types"

/** One grid cell, spanning `colSpan` columns ("full": every column) and `rowSpan` rows. */
export const StyledGridItem = styled.div<{ $colSpan: GridItemColSpanType; $rowSpan: GridItemRowSpanType }>`
  grid-column: ${({ $colSpan }) => ($colSpan === "full" ? "1 / -1" : `span ${$colSpan}`)};
  grid-row: span ${({ $rowSpan }) => $rowSpan};
`
