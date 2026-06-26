import * as React from "react"
import Flex from "nice-react-flex"
import { DataSectionTable } from "../DataSectionTable/DataSectionTable"
import { tableKey } from "../DataSectionTable/DataSectionTable.helpers"
import type { DataSectionProps } from "./DataSection.types"

/**
 * The one table component. `tables` is a recursive array — each entry has an
 * optional `name` heading and then `rows` (a leaf table) and/or `tables` (nested
 * sub-tables one heading level deeper). The same shape serves every instance: a
 * single demo table is `[{ rows }]`, a token group is `[{ name, rows }]`, and a
 * cluster is `[{ name, tables: [...] }]`. Each entry is rendered by
 * `DataSectionTable`; a rule separates the top-level entries.
 */
export const DataSection = ({ columns, tables, inline = false, showHeader = true }: DataSectionProps) => (
  <Flex direction="column">
    {tables.map((table, index) => (
      <React.Fragment key={tableKey(table, index)}>
        <DataSectionTable table={table} columns={columns} inline={inline} showHeader={showHeader} />
      </React.Fragment>
    ))}
  </Flex>
)