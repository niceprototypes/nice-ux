import * as React from "react"
import type { DataColumn } from "../DataTable/DataTable.types"

export interface DataTableRowProps {
  /** Column definitions — render policy. */
  columns: DataColumn[]
  /** Fixed widths, index-aligned to `columns` (at tablet+). */
  columnWidths?: (string | null)[]
  /** Cell values, index-aligned to `columns`. */
  values: React.ReactNode[]
  /** Paint the row highlighted (deep-link arrival). @default false */
  highlighted?: boolean
  /** Draw a `border-top` (1px solid `borderColor` base) dividing this row from the one above. @default true */
  rowLines?: boolean
  /** Remove the top border and top padding when false (keeping the bottom padding). @default true */
  showLines?: boolean
}