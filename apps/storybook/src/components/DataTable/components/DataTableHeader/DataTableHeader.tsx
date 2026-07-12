import { withBreakpoints } from "nice-react-styles"
import Typography from "../../../../nice/Typography"
import { RowClip, RowFlex, ColumnFlex } from "../DataTableRow/DataTableRow.styles"
import { ROW_BREAKPOINTS } from "../DataTableRow/DataTableRow.helpers"
import type { DataTableHeaderProps } from "./DataTableHeader.types"

/** The column-header row — one labelled `Column` per column, in the same widths as the data rows. */
const BaseDataTableHeader = ({ columns, columnWidths, title }: DataTableHeaderProps) => (
  <RowClip>
    <RowFlex direction="column" gap="large" breakpoints={ROW_BREAKPOINTS}>
      {columns.map((column, index) => (
        <ColumnFlex key={column.key ?? index} $width={columnWidths?.[index] ?? undefined}>
          {index === 0 && title != null ? (
            <Typography code size="small" weight="semibold" color="base">{title}</Typography>
          ) : column.header == null ? null : typeof column.header === "string" ? (
            <Typography code size="small" color="lightest">{column.header}</Typography>
          ) : (
            column.header
          )}
        </ColumnFlex>
      ))}
    </RowFlex>
  </RowClip>
)

export const DataTableHeader = withBreakpoints<DataTableHeaderProps>(BaseDataTableHeader)