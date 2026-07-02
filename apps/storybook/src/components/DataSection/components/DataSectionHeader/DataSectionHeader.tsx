import { withBreakpoints } from "nice-react-styles"
import Typography from "../../../../nice/Typography"
import { RowFlex, ColumnFlex } from "../DataSectionRow/DataSectionRow.styles"
import { ROW_BREAKPOINTS } from "../DataSectionRow/DataSectionRow.helpers"
import type { DataSectionHeaderProps } from "./DataSectionHeader.types"

/** The column-header row — one labelled `Column` per column, in the same widths as the data rows. */
const BaseDataSectionHeader = ({ columns, title }: DataSectionHeaderProps) => (
  <RowFlex direction="column" gap="large" breakpoints={ROW_BREAKPOINTS}>
    {columns.map((column, index) => (
      <ColumnFlex key={column.key ?? index} $width={column.width ?? undefined}>
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
)

export const DataSectionHeader = withBreakpoints<DataSectionHeaderProps>(BaseDataSectionHeader)