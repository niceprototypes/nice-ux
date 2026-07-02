import * as React from "react"
import Flex from "nice-react-flex"
import { DataTableRows } from "../DataTableRows/DataTableRows"
import { tableKey } from "../DataTableRows/DataTableRows.helpers"
import type { DataTableProps } from "./DataTable.types"

/**
 * The one table component. `tables` is a recursive array — each entry has an
 * optional `name` heading and then `rows` (a leaf table) and/or `tables` (nested
 * sub-tables one heading level deeper). The same shape serves every instance: a
 * single demo table is `[{ rows }]`, a token group is `[{ name, rows }]`, and a
 * cluster is `[{ name, tables: [...] }]`. Each entry is rendered by
 * `DataTableRows`; a rule separates the top-level entries.
 */
export const DataTable = ({ columns, tables, inline = false, showHeader = true }: DataTableProps) => (
  <Flex direction="column" spacing="larger none">
    {tables.map((table, index) => (
      <React.Fragment key={tableKey(table, index)}>
        <DataTableRows table={table} columns={columns} inline={inline} showHeader={showHeader} />
      </React.Fragment>
    ))}
  </Flex>
)