import { withBreakpoints } from "nice-react-styles"
import Flex from "nice-react-flex"
import { DataTable } from "../DataTable"
import { DataTableHeader } from "../DataTable/DataTableHeader"
import type { DataTableSetProps } from "./DataTableSet.types"

const DEFAULT_NAME_WIDTH = "12em"

/**
 * A table-of-tables: one shared header above a sequence of headerless named
 * sub-tables, all sharing one column definition so they read as a single aligned
 * table split into named sections. This is the first-class form of the
 * aggregation the old system rebuilt ad-hoc in JSX (the Tokens/Modules Docs page
 * and `ComponentTokensTable`'s per-group tables under a hand-placed header).
 *
 * Each sub-table is expected to carry a `name`; the shared header reserves a
 * leading name-column slot so the section names below line up beneath it.
 */
const BaseDataTableSet = ({
  columns,
  tables,
  header = true,
  inline = false,
  nameWidth = DEFAULT_NAME_WIDTH,
}: DataTableSetProps) => (
  <Flex direction="column">
    {/* Shared header with a leading blank name-column slot, so the section names
        in the sub-tables below line up beneath it. */}
    {header ? <DataTableHeader columns={[{ key: "__name__", header: null, width: nameWidth }, ...columns]} /> : null}

    {tables.map((table, index) => (
      <DataTable
        key={table.name ?? index}
        name={table.name}
        rows={table.rows}
        columns={columns}
        inline={inline}
        nameWidth={nameWidth}
        showHeader={false}
      />
    ))}
  </Flex>
)

export const DataTableSet = withBreakpoints<DataTableSetProps>(BaseDataTableSet)
