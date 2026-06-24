import * as React from "react"
import Flex from "nice-react-flex"
import { withBreakpoints } from "nice-react-styles"
import { Column, RowFlex } from "../DataGrid"
import { DataCell } from "./DataCell"
import { PreviewWrapper } from "./DataRow.styles"
import type { DataColumn } from "../DataTable/DataTable.types"

export interface DataRowProps {
  /** Column definitions, index-aligned to `values`. */
  columns: DataColumn[]
  /** Cell values, index-aligned to `columns`. */
  values: React.ReactNode[]
  /** Strip CodeBlock card chrome on `shiki` cells. @default false */
  inline?: boolean
  /** Paint the row highlighted (deep-link arrival). @default false */
  highlighted?: boolean
  /**
   * Hoist the first value above the row at full width; the row lays out the rest
   * below. For previews that need the full container (e.g. Tile demos).
   * @default false
   */
  fullWidth?: boolean
}

/**
 * Renders one data row: a flat `RowFlex` with a `Column` per value, each value
 * rendered by `DataCell` per its column's policy. Pure data in — no
 * React.Children, no per-cell flags. `fullWidth` hoists the first value out
 * above the row (the remaining values lay out below).
 */
const BaseDataRow = ({ columns, values, inline = false, highlighted = false, fullWidth = false }: DataRowProps) => {
  // In fullWidth mode the first value is hoisted out (below) and is not a row column.
  const rowCells = values.map((value, index) => ({ value, index })).filter(({ index }) => !(fullWidth && index === 0))

  const row = (
    <RowFlex
      $highlighted={highlighted}
      direction="column"
      gap="large"
      breakpoints={{
        "tablet+": {
          direction: "row",
          alignItems: "center",
        },
      }}
    >
      {rowCells.map(({ value, index }) => {
        const column = columns[index]
        return (
          <Column key={column?.key ?? index} $width={column?.width ?? undefined}>
            {column ? <DataCell column={column} value={value} inline={inline} /> : value}
          </Column>
        )
      })}
    </RowFlex>
  )

  if (fullWidth) {
    return (
      <>
        <PreviewWrapper $fullWidth>
          <Flex>{values[0]}</Flex>
        </PreviewWrapper>
        {row}
      </>
    )
  }

  return row
}

export const DataRow = withBreakpoints<DataRowProps>(BaseDataRow)
