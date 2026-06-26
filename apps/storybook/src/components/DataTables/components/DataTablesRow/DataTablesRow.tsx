import { withBreakpoints } from "nice-react-styles"
import { RowFlex, Column } from "./DataTablesRow.styles"
import { ROW_BREAKPOINTS } from "./DataTablesRow.helpers"
import { DataTablesCell } from "../DataTablesCell/DataTablesCell"
import type { DataTablesRowProps } from "./DataTablesRow.types"

/** One row — a responsive `RowFlex` with a `Column` per value, each a `DataTablesCell`. */
const BaseDataTablesRow = ({ columns, values, inline = false, highlighted = false }: DataTablesRowProps) => (
  <RowFlex $highlighted={highlighted} direction="column" gap="large" breakpoints={ROW_BREAKPOINTS}>
    {columns.map((column, index) => (
      <Column key={column.key ?? index} $width={column.width ?? undefined}>
        <DataTablesCell column={column} value={values[index]} inline={inline} />
      </Column>
    ))}
  </RowFlex>
)

export const DataTablesRow = withBreakpoints<DataTablesRowProps>(BaseDataTablesRow)