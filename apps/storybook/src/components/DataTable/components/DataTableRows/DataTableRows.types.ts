  import type { GapType } from "nice-react-styles"
import type { DataColumn, DataTableConfig } from "../DataTable/DataTable.types"

export interface DataTableRowsProps {
  /** The table node — an optional `name`, and `rows` and/or nested `tables`. */
  table: DataTableConfig
  /** Columns shared by this table and its nested tables. */
  columns: DataColumn[]
  /** Fixed widths index-aligned to `columns` (see `DataTableProps`). */
  columnWidths?: (string | null)[]
  /** Nesting depth (0 at top) — drives the heading level. @default 0 */
  depth?: number
  /** Render the column-header row above the rows. @default true */
  showHeader?: boolean
  /** Draw a divider between consecutive rows, and under the column header. @default false */
  showLines?: boolean
  /** Collapse rows flush by dropping each row's top padding. @default false */
  condensed?: boolean
  /** Vertical padding on each row's outermost Flex, as the `${rowSpacing} none` gap shorthand. */
  rowSpacing?: GapType
}