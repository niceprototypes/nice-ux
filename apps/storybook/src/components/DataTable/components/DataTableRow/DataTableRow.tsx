import { withBreakpoints } from "nice-react-styles"
import { RowFlex, ColumnFlex } from "./DataTableRow.styles"
import { ROW_BREAKPOINTS } from "./DataTableRow.helpers"
import { DataTableCell } from "../DataTableCell/DataTableCell"
import type { DataTableRowProps } from "./DataTableRow.types"

/** One row — a responsive `RowFlex` with a `Column` per value, each a `DataTableCell`. */
const BaseDataTableRow = ({ columns, values, inline = false, highlighted = false }: DataTableRowProps) => (
  <RowFlex $highlighted={highlighted} direction="column" gap="large" breakpoints={ROW_BREAKPOINTS}>
    {columns.map((column, index) => (
      <ColumnFlex key={column.key ?? index} $width={column.width ?? undefined}>
        <DataTableCell column={column} value={values[index]} inline={inline} />
      </ColumnFlex>
    ))}
  </RowFlex>
)

export const DataTableRow = withBreakpoints<DataTableRowProps>(BaseDataTableRow)