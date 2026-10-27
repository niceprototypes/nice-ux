import * as React from "react"
import Flex from "nice-react-flex"
import { DataTableRows } from "../DataTableRows/DataTableRows"
import { tableKey } from "../DataTableRows/DataTableRows.helpers"
import Line from "../../../Line"
import type { DataTableProps } from "./DataTable.types"

/**
 * The one table component. `tables` is a recursive array — each entry has an
 * optional `name` heading and then `rows` (a leaf table) and/or `tables` (nested
 * sub-tables one heading level deeper). The same shape serves every instance: a
 * single demo table is `[{ rows }]`, a token group is `[{ name, rows }]`, and a
 * cluster is `[{ name, tables: [...] }]`. Each entry is rendered by
 * `DataTableRows`, with a rule above each top-level entry.
 */
export const DataTable = ({ columns, tables, columnWidths, showHeader = true, showLines = false, condensed = false, rowSpacing = "base", sectionWrapped = false }: DataTableProps) => (
  <Flex direction="column" gap="larger">
    {tables.map((table, index) => (
      <React.Fragment key={tableKey(table, index)}>
        <Line />
        <DataTableRows table={table} columns={columns} columnWidths={columnWidths} showHeader={showHeader} showLines={showLines} condensed={condensed} rowSpacing={rowSpacing} sectionWrapped={sectionWrapped} />
      </React.Fragment>
    ))}
  </Flex>
)