import Flex from "nice-react-flex"
import Typography from "../../../../nice/Typography"
import { DataSectionHeader } from "../DataSectionHeader/DataSectionHeader"
import { DataSectionRow } from "../DataSectionRow/DataSectionRow"
import { LEVELS, tableKey, tableHeadingProps } from "./DataSectionTable.helpers"
import type { DataSectionTableProps } from "./DataSectionTable.types"

/**
 * One table: an optional heading (level from `depth`), then its `rows` (with a
 * column header) and/or its nested `tables` rendered one level deeper. The
 * recursion lives here, so `DataSection` just maps the top-level array.
 */
export const DataSectionTable = ({
  table,
  columns,
  depth = 0,
  inline = false,
  showHeader = true,
}: DataSectionTableProps) => {
  const level = LEVELS[Math.min(depth, 2)]
  return (
    <Flex direction="column">
      {table.name != null ? (
        <Flex spacing={level === "h2" ? "base none larger" : "small none"}>
          <Typography
            as={level}
            {...tableHeadingProps(level)}
          >
            {table.name}
          </Typography>
        </Flex>
      ) : null}
      {table.rows ? (
        <Flex
          direction="column"
          spacing="base none"
        >
          {showHeader ? <DataSectionHeader columns={columns} /> : null}
          {table.rows.map(item => (
            <DataSectionRow
              key={item.id}
              columns={columns}
              values={item.values}
              inline={inline}
              highlighted={item.highlighted}
            />
          ))}
        </Flex>
      ) : null}
      {table.tables?.map((child, index) => (
        <DataSectionTable
          key={tableKey(child, index)}
          table={child}
          columns={columns}
          depth={depth + 1}
          inline={inline}
          showHeader={showHeader}
        />
      ))}
    </Flex>
  )
}
