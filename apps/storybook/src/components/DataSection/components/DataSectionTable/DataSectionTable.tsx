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
  const isH2 = level === "h2"
  const isH3 = level === "h3"

  // A leaf table (renders a header row) shows its own title inside the header's
  // first cell; a set/cluster table keeps its title as a standalone heading.
  const titleInHeader = table.rows != null && showHeader && table.name != null
  const showHeading = table.name != null && !titleInHeader

  return (
    <Flex direction="column">
      {showHeading ? (
        <Flex direction="column" spacing={isH2 ? "none none larger" : isH3 ? "large none" : undefined}>
          <Typography
            as={level}
            {...tableHeadingProps(level)}
          >
            {table.name}
          </Typography>
        </Flex>
      ) : null}
      <Flex direction="column" spacing="none none larger">
        {table.rows ? (
          <Flex direction="column">
            {showHeader ? <DataSectionHeader columns={columns} title={titleInHeader ? table.name : undefined} /> : null}
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
      {isH2 && <hr />}
    </Flex>
  )
}
