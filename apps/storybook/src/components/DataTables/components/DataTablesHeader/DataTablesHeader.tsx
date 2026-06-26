import { withBreakpoints } from "nice-react-styles"
import Typography from "../../../../nice/Typography"
import { RowFlex, Column } from "../DataTablesRow/DataTablesRow.styles"
import { ROW_BREAKPOINTS } from "../DataTablesRow/DataTablesRow.helpers"
import type { DataTablesHeaderProps } from "./DataTablesHeader.types"

/** The column-header row — one labelled `Column` per column, in the same widths as the data rows. */
const BaseDataTablesHeader = ({ columns }: DataTablesHeaderProps) => (
  <RowFlex direction="column" gap="large" breakpoints={ROW_BREAKPOINTS}>
    {columns.map((column, index) => (
      <Column key={column.key ?? index} $width={column.width ?? undefined}>
        {column.header == null ? null : typeof column.header === "string" ? (
          <Typography code size="small" color="lighter">{column.header}</Typography>
        ) : (
          column.header
        )}
      </Column>
    ))}
  </RowFlex>
)

export const DataTablesHeader = withBreakpoints<DataTablesHeaderProps>(BaseDataTablesHeader)