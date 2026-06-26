import * as React from "react"
import type { DataColumn } from "../DataTables/DataTables.types"

export interface DataTablesCellProps {
  /** The column defining how this value renders. */
  column: DataColumn
  /** The cell value (index-aligned to its column by the row). */
  value: React.ReactNode
  /** Strip CodeBlock card chrome for `shiki` cells. @default false */
  inline?: boolean
}
