import Typography from "../../../nice/Typography"
import { Column, RowFlex } from "../../DataGrid"
import type { DataColumn } from "../DataTable.types"

interface DataTableHeaderProps {
  /**
   * Columns to label, in order. A column's `header` renders in its cell — a
   * string as a muted monospace `<Typography>`, a node as-is, `null`/omitted as
   * an empty cell (e.g. the preview or leading name-column slot). Widths align
   * with the data rows since both use the same `columns`.
   */
  columns: DataColumn[]
}

/**
 * The header row for a `DataTable` / `DataTableSet` — one labelled `Column` per
 * column, in the same `RowFlex` layout and widths as the data rows so labels sit
 * above their columns. A subcomponent of `DataTable`: it is only used by
 * `DataTable` and `DataTableSet`, never by a story directly.
 */
export const DataTableHeader = ({ columns }: DataTableHeaderProps) => (
  <RowFlex
    direction="column"
    gap="large"
    breakpoints={{ "tablet+": { direction: "row", alignItems: "center" } }}
  >
    {columns.map((column, index) => (
      <Column key={column.key ?? index} $width={column.width ?? undefined}>
        {column.header != null ? (
          typeof column.header === "string" ? (
            <Typography code size="small" color="lighter">
              {column.header}
            </Typography>
          ) : (
            column.header
          )
        ) : null}
      </Column>
    ))}
  </RowFlex>
)
