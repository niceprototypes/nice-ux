import * as React from "react"
import { withBreakpoints } from "nice-react-styles"
import Flex from "nice-react-flex"
import Typography from "../../nice/Typography"
import { DataRow } from "../DataRow"
import { DataTableHeader } from "./DataTableHeader"
import type { DataTableProps } from "./DataTable.types"

/** The section name, rendered above the rows (not as a leading column). */
const nameCell = (name: React.ReactNode): React.ReactNode => (
  <Typography code size="small" weight="semibold">
    {name}
  </Typography>
)

/**
 * Renders a table from data: an optional header row built from `columns[].header`,
 * then one `DataRow` per `rows` entry. When `name` is set, it is rendered in its
 * own row *above* the table (the whole thing wrapped in a column) rather than as
 * a leading name column — so the name doesn't reserve a full column of width and
 * leave whitespace down every row. This is the data-first replacement for the
 * old `CodeTable`, which cloned JSX `CodeRow` children.
 */
const BaseDataTable = ({
  name,
  rows,
  columns,
  inline = false,
  showHeader = true,
}: DataTableProps) => {
  const table = (
    <Flex direction="column" spacing="large none">
      {showHeader ? <DataTableHeader columns={columns} /> : null}
      {rows.map(row => (
        <DataRow
          key={row.id}
          columns={columns}
          values={row.values}
          inline={inline}
          highlighted={row.highlighted}
          fullWidth={row.fullWidth}
        />
      ))}
    </Flex>
  )

  // Unnamed → just the table. Named → the name in its own Flex above the table,
  // both wrapped in a column so the name sits over the rows at full width.
  if (name == null) return table
  return (
    <Flex direction="column">
      <Flex>{nameCell(name)}</Flex>
      {table}
    </Flex>
  )
}

export const DataTable = withBreakpoints<DataTableProps>(BaseDataTable)
