import { withBreakpoints } from "nice-react-styles"
import { RowFlex, Column } from "./DataSectionRow.styles"
import { ROW_BREAKPOINTS } from "./DataSectionRow.helpers"
import { DataSectionCell } from "../DataSectionCell/DataSectionCell"
import type { DataSectionRowProps } from "./DataSectionRow.types"

/** One row — a responsive `RowFlex` with a `Column` per value, each a `DataSectionCell`. */
const BaseDataSectionRow = ({ columns, values, inline = false, highlighted = false }: DataSectionRowProps) => (
  <RowFlex $highlighted={highlighted} direction="column" gap="large" breakpoints={ROW_BREAKPOINTS}>
    {columns.map((column, index) => (
      <Column key={column.key ?? index} $width={column.width ?? undefined}>
        <DataSectionCell column={column} value={values[index]} inline={inline} />
      </Column>
    ))}
  </RowFlex>
)

export const DataSectionRow = withBreakpoints<DataSectionRowProps>(BaseDataSectionRow)