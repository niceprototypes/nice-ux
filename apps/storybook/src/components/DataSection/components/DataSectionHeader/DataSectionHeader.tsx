import { withBreakpoints } from "nice-react-styles"
import Typography from "../../../../nice/Typography"
import { RowFlex, Column } from "../DataSectionRow/DataSectionRow.styles"
import { ROW_BREAKPOINTS } from "../DataSectionRow/DataSectionRow.helpers"
import type { DataSectionHeaderProps } from "./DataSectionHeader.types"

/** The column-header row — one labelled `Column` per column, in the same widths as the data rows. */
const BaseDataSectionHeader = ({ columns }: DataSectionHeaderProps) => (
  <RowFlex direction="column" gap="large" breakpoints={ROW_BREAKPOINTS}>
    {columns.map((column, index) => (
      <Column key={column.key ?? index} $width={column.width ?? undefined}>
        {column.header == null ? null : typeof column.header === "string" ? (
          <Typography code size="small" color="lightest">{column.header}</Typography>
        ) : (
          column.header
        )}
      </Column>
    ))}
  </RowFlex>
)

export const DataSectionHeader = withBreakpoints<DataSectionHeaderProps>(BaseDataSectionHeader)