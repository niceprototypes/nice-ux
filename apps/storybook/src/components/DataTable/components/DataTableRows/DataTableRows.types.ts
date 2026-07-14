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
  /** Divide non-heading rows with a `border-top` (1px solid `borderColor` base). @default true */
  rowLines?: boolean
  /** Remove each row's top border and top padding when false. @default true */
  showLines?: boolean
  /** Vertical padding on each row's outermost Flex, as the `${rowSpacing} none` gap shorthand. */
  rowSpacing?: GapType
}