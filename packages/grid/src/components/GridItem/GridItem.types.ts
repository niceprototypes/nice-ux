import type * as React from "react"
import type { FlexAsType } from "@niceprototypes/flex"

/**
 * GridItemColSpanType
 *
 * Number of column tracks the item spans, or "full" for the whole row (`grid-column: 1 / -1`).
 *
 * Values:
 * - number: `span n` (default 1)
 * - "full": every column
 */
export type GridItemColSpanType = number | "full"

/**
 * GridItemRowSpanType
 *
 * Number of row tracks the item spans (`span n`).
 */
export type GridItemRowSpanType = number

/**
 * GridItemAsType
 *
 * Re-export of FlexAsType from @niceprototypes/flex.
 * HTML element to render; "li" inside a Grid `as="ul"`.
 */
export type GridItemAsType = FlexAsType

/**
 * GridItemChildrenType
 *
 * The item's content.
 */
export type GridItemChildrenType = React.ReactNode

/**
 * GridItemProps
 *
 * Complete prop definition for the GridItem component: one Grid cell that can span columns and
 * rows. Every prop takes per-viewport overrides through `breakpoints`.
 */
export interface GridItemProps {
  /**
   * Column tracks spanned, or "full"
   * @default 1
   */
  colSpan?: GridItemColSpanType
  /**
   * Row tracks spanned
   * @default 1
   */
  rowSpan?: GridItemRowSpanType
  /**
   * HTML element to render
   * @default "div"
   */
  as?: GridItemAsType
  /** The item's content */
  children?: GridItemChildrenType
}

// Declaration merging: const + namespace creates exportable type namespace
const GridItemTypes = {} as const

namespace GridItemTypes {
  export type ColSpan = GridItemColSpanType
  export type RowSpan = GridItemRowSpanType
  export type As = GridItemAsType
  export type Children = GridItemChildrenType
  export type Props = GridItemProps
}

export default GridItemTypes
