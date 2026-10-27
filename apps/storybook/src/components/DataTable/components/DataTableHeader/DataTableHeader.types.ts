import type * as React from "react"
import type { GapType } from "@niceprototypes/styles"
import type { DataColumn } from "../DataTable/DataTable.types"

export interface DataTableHeaderProps {
  /** Column definitions — each `header` labels its column. */
  columns: DataColumn[]
  /** Fixed widths, index-aligned to `columns` (at tablet+). */
  columnWidths?: (string | null)[]
  /** Vertical padding on the header row's outermost Flex, as the `${rowSpacing} none` gap shorthand. */
  rowSpacing?: GapType
  /**
   * The leaf table's title, rendered in the first cell (small/semibold/base) in
   * place of that column's (empty) header. Set/cluster tables keep a heading
   * instead and don't pass this.
   */
  title?: React.ReactNode
}