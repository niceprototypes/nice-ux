import type { DataColumn, DataTableSpec } from "../DataTable/DataTable.types"

export interface DataTableSetProps {
  /** Column definitions shared by every sub-table — render policy, headers, widths. */
  columns: DataColumn[]
  /**
   * The sub-tables, in render order. Each should carry a `name` — the set renders
   * a single shared header with a leading name-column slot, then one headerless
   * named table per entry, so the array reads as one aligned table-of-tables.
   */
  tables: DataTableSpec[]
  /** Render the shared header row from `columns[].header`. @default true */
  header?: boolean
  /** Strip CodeBlock card chrome on `shiki` cells across all sub-tables. @default false */
  inline?: boolean
  /** Width of the leading name column. @default "12em" */
  nameWidth?: string
}
