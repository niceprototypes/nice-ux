import { withBreakpoints } from "nice-react-styles"
import Ink from "../../../../nice/Ink"
import { RowClip, RowFlex, ColumnFlex } from "../DataTableRow/DataTableRow.styles"
import { ROW_BREAKPOINTS } from "../DataTableRow/DataTableRow.helpers"
import type { DataTableHeaderProps } from "./DataTableHeader.types"

/** The column-header row — one labelled `Column` per column, in the same widths as the data rows. */
const BaseDataTableHeader = ({ columns, columnWidths, title, rowSpacing }: DataTableHeaderProps) => (
  <RowClip padding={rowSpacing ? `${rowSpacing} none` : undefined}>
    <RowFlex direction="column" gap="large" breakpoints={ROW_BREAKPOINTS}>
      {columns.map((column, index) => (
        <ColumnFlex key={column.key ?? index} $width={columnWidths?.[index] ?? undefined}>
          {index === 0 && title != null ? (
            <Ink code size="small" weight="semibold" color="base">{title}</Ink>
          ) : column.header == null ? null : typeof column.header === "string" ? (
            <Ink code size="small" color="lightest">{column.header}</Ink>
          ) : (
            column.header
          )}
        </ColumnFlex>
      ))}
    </RowFlex>
  </RowClip>
)

export const DataTableHeader = withBreakpoints<DataTableHeaderProps>(BaseDataTableHeader)