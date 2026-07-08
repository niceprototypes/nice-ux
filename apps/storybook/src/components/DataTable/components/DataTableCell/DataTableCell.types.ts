import * as React from "react"
import type { DataColumn } from "../DataTable/DataTable.types"

export interface DataTableCellProps {
  /** The column defining how this value renders. */
  column: DataColumn
  /** The cell value (index-aligned to its column by the row). */
  value: React.ReactNode
}
