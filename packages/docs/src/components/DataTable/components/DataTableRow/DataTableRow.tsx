import { withBreakpoints } from "@niceprototypes/styles"
import { RowClip, RowFlex, ColumnFlex } from "./DataTableRow.styles"
import { ROW_BREAKPOINTS } from "./DataTableRow.helpers"
import { DataTableCell } from "../DataTableCell/DataTableCell"
import type { DataTableRowProps } from "./DataTableRow.types"

/**
 * One row — a responsive `RowFlex` (clipped by `RowClip`) with a `Column` per value, each a `DataTableCell`.
 * `sb-unstyled`: in Storybook docs, Storybook's typography stays out of the row's Nice components.
 */
const BaseDataTableRow = ({ columns, columnWidths, values, highlighted = false, condensed = false, rowSpacing, rowFrom = "tablet" }: DataTableRowProps) => (
  <RowClip className="sb-unstyled" padding={rowSpacing ? `${rowSpacing} none` : undefined}>
    <RowFlex $highlighted={highlighted} $condensed={condensed} $from={rowFrom} direction="column" gap="large" breakpoints={ROW_BREAKPOINTS[rowFrom]}>
      {columns.map((column, index) => (
        <ColumnFlex key={column.key ?? index} $width={columnWidths?.[index] ?? undefined} $from={rowFrom}>
          <DataTableCell column={column} value={values[index]} />
        </ColumnFlex>
      ))}
    </RowFlex>
  </RowClip>
)

export const DataTableRow = withBreakpoints<DataTableRowProps>(BaseDataTableRow)