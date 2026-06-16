import * as React from "react"
import { withBreakpoints } from "nice-react-styles"
import Typography from "../../nice/Typography"
import { CodeRowProps } from "../CodeRow/CodeRow.types"
import { Column, RowFlex } from "../CodeRow/CodeRow.styles"
import { TableFlex } from "./CodeTable.styles"
import { CodeTableProps } from "./CodeTable.types"

/**
 * A vertical set of CodeRow instances. When `name` is set, the table renders
 * a leading name column: every row reserves the index-0 cell (so columns line
 * up), but only the first row shows the name text.
 *
 * `columnWidths` is forwarded to every row so columns stay aligned across the
 * table. The export is wrapped with `withBreakpoints`, so `columnWidths`
 * (already resolved for the current viewport here) can be varied per
 * breakpoint via the `breakpoints` prop.
 *
 * `columnHeaders` renders a label row as the table's first row, built from the
 * same `RowFlex`/`Column` layout and `columnWidths` as the data rows so the
 * header lines up with the columns beneath it.
 */
const BaseCodeTable = ({ name, columnWidths, columnHeaders, fontSize, fontWeight, children }: CodeTableProps) => {
  // Filter to real elements so stray MDX whitespace between rows is ignored.
  const rows = React.Children.toArray(children).filter(React.isValidElement)

  // Header row — same column layout/widths as a CodeRow, so labels sit above
  // their columns. Each non-null entry becomes a Typography; null cells stay
  // empty (e.g. the name/preview columns).
  const header = columnHeaders ? (
    <RowFlex
      direction="column"
      gap="large"
      breakpoints={{
        "tablet+": {
          direction: "row",
          alignItems: "center",
        },
      }}
    >
      {columnHeaders.map((label, index) => (
        <Column
          key={index}
          $width={columnWidths?.[index] ?? undefined}
        >
          {label ? <Typography code>{label}</Typography> : null}
        </Column>
      ))}
    </RowFlex>
  ) : null

  return (
    <TableFlex direction="column" spacing="small none">
      {header}
      {rows.map((row, index) =>
        React.cloneElement(row as React.ReactElement<CodeRowProps>, {
          // Named table → every row reserves the leading name cell…
          nameColumn: Boolean(name),
          // …but only the first row carries the section name.
          name: index === 0 ? name : undefined,
          // Same widths on every row keep the table's columns aligned.
          columnWidths,
          // Value-cell Typography styling, applied uniformly across rows.
          fontSize,
          fontWeight,
        })
      )}
    </TableFlex>
  )
}

export const CodeTable = withBreakpoints<CodeTableProps>(BaseCodeTable)
