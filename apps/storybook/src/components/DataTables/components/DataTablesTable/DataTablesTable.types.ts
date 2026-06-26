  import type { DataColumn, DataTable } from "../DataTables/DataTables.types"

export interface DataTablesTableProps {
  /** The table node — an optional `name`, and `rows` and/or nested `tables`. */
  table: DataTable
  /** Columns shared by this table and its nested tables. */
  columns: DataColumn[]
  /** Nesting depth (0 at top) — drives the heading level. @default 0 */
  depth?: number
  /** Strip CodeBlock card chrome on `shiki` cells. @default false */
  inline?: boolean
  /** Render the column-header row above the rows. @default true */
  showHeader?: boolean
}