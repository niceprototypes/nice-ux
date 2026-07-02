  import type { DataColumn, DataTableConfig } from "../DataTable/DataTable.types"

export interface DataTableRowsProps {
  /** The table node — an optional `name`, and `rows` and/or nested `tables`. */
  table: DataTableConfig
  /** Columns shared by this table and its nested tables. */
  columns: DataColumn[]
  /** Nesting depth (0 at top) — drives the heading level. @default 0 */
  depth?: number
  /** Strip CodeBlock card chrome on `shiki` cells. @default false */
  inline?: boolean
  /** Render the column-header row above the rows. @default true */
  showHeader?: boolean
}