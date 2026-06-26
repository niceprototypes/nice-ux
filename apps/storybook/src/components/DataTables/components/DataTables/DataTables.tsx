import * as React from "react"
import Flex from "nice-react-flex"
import { DataTablesTable } from "../DataTablesTable/DataTablesTable"
import { tableKey } from "../DataTablesTable/DataTablesTable.helpers"
import type { DataTablesProps } from "./DataTables.types"

/**
 * The one table component. `tables` is a recursive array — each entry has an
 * optional `name` heading and then `rows` (a leaf table) and/or `tables` (nested
 * sub-tables one heading level deeper). The same shape serves every instance: a
 * single demo table is `[{ rows }]`, a token group is `[{ name, rows }]`, and a
 * cluster is `[{ name, tables: [...] }]`. Each entry is rendered by
 * `DataTablesTable`; a rule separates the top-level entries.
 */
export const DataTables = ({ columns, tables, inline = false, showHeader = true }: DataTablesProps) => (
  <Flex direction="column" gap="large">
    {tables.map((table, index) => (
      <React.Fragment key={tableKey(table, index)}>
        {index > 0 ? <hr /> : null}
        <DataTablesTable table={table} columns={columns} inline={inline} showHeader={showHeader} />
      </React.Fragment>
    ))}
  </Flex>
)