import * as React from "react"
import type { GapType } from "nice-react-styles"
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
  /** Remove the top padding when false (keeping the bottom padding). @default true */
  showLines?: boolean
  /** Vertical padding on the row's outermost Flex, applied as the `${rowSpacing} none` gap shorthand. */
  rowSpacing?: GapType
}