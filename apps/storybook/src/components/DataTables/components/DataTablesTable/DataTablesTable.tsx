import Flex from "nice-react-flex"
import Typography from "../../../../nice/Typography"
import { DataTablesHeader } from "../DataTablesHeader/DataTablesHeader"
import { DataTablesRow } from "../DataTablesRow/DataTablesRow"
import { LEVELS, tableKey, tableHeadingProps } from "./DataTablesTable.helpers"
import type { DataTablesTableProps } from "./DataTablesTable.types"

/**
 * One table: an optional heading (level from `depth`), then its `rows` (with a
 * column header) and/or its nested `tables` rendered one level deeper. The
 * recursion lives here, so `DataTables` just maps the top-level array.
 */
export const DataTablesTable = ({ table, columns, depth = 0, inline = false, showHeader = true }: DataTablesTableProps) => {
  const level = LEVELS[Math.min(depth, 2)]
  return (
    <Flex direction="column" gap="base">
      {table.name != null ? (
        <Typography as={level} {...tableHeadingProps(level)}>{table.name}</Typography>
      ) : null}
      {table.rows ? (
        <Flex direction="column" spacing="large none">
          {showHeader ? <DataTablesHeader columns={columns} /> : null}
          {table.rows.map(item => (
            <DataTablesRow key={item.id} columns={columns} values={item.values} inline={inline} highlighted={item.highlighted} />
          ))}
        </Flex>
      ) : null}
      {table.tables?.map((child, index) => (
        <DataTablesTable key={tableKey(child, index)} table={child} columns={columns} depth={depth + 1} inline={inline} showHeader={showHeader} />
      ))}
    </Flex>
  )
}