import * as React from "react"
import { withBreakpoints } from "nice-react-styles"
import Flex from "nice-react-flex"
import Typography from "../../nice/Typography"
import { DataRow } from "../DataRow"
import { DataTableHeader } from "./DataTableHeader"
import type { DataColumn, DataTableProps } from "./DataTable.types"

const DEFAULT_NAME_WIDTH = "12em"

/**
 * The leading name column prepended to a named table. It is a structural column
 * (no header); only the first row carries the section name, so the rest of the
 * rows keep their data columns aligned beneath it.
 */
const nameColumn = (width: string): DataColumn => ({ key: "__name__", header: null, width, render: "node" })

/** The first-row name cell — a pre-styled element passed through as a `node`. */
const nameCell = (name: string): React.ReactNode => (
  <Typography code size="small" weight="semibold">
    {name}
  </Typography>
)

/**
 * Renders a table from data: an optional header row built from `columns[].header`,
 * then one `DataRow` per `rows` entry. When `name` is set, a leading name column
 * is prepended and the section name shows on the first row only (the rest get an
 * empty leading cell so columns stay aligned). This is the data-first
 * replacement for the old `CodeTable`, which cloned JSX `CodeRow` children.
 */
const BaseDataTable = ({
  name,
  rows,
  columns,
  inline = false,
  showHeader = true,
  nameWidth = DEFAULT_NAME_WIDTH,
}: DataTableProps) => {
  // Prepend a structural name column when the table is named.
  const cols = name !== undefined ? [nameColumn(nameWidth), ...columns] : columns

  return (
    <Flex direction="column">
      {showHeader ? <DataTableHeader columns={cols} /> : null}
      {rows.map((row, index) => (
        <DataRow
          key={row.id}
          columns={cols}
          // Named table → prepend the name cell on the first row, an empty cell on the rest.
          values={name !== undefined ? [index === 0 ? nameCell(name) : null, ...row.values] : row.values}
          inline={inline}
          highlighted={row.highlighted}
          fullWidth={row.fullWidth}
        />
      ))}
    </Flex>
  )
}

export const DataTable = withBreakpoints<DataTableProps>(BaseDataTable)
