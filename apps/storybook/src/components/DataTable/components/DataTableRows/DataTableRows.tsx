import { Fragment } from "react"
import Flex from "nice-react-flex"
import Ink from "../../../../nice/Ink"
import { DataTableHeader } from "../DataTableHeader/DataTableHeader"
import { DataTableRow } from "../DataTableRow/DataTableRow"
import { RowDivider } from "../DataTableRow/DataTableRow.styles"
import { LEVELS, tableKey, tableHeadingProps } from "./DataTableRows.helpers"
import type { DataTableRowsProps } from "./DataTableRows.types"

/**
 * One table: an optional heading (level from `depth`), then its `rows` (with a
 * column header) and/or its nested `tables` rendered one level deeper. The
 * recursion lives here, so `DataTable` just maps the top-level array.
 */
export const DataTableRows = ({
  table,
  columns,
  columnWidths,
  depth = 0,
  showHeader = true,
  rowLines = true,
  showLines = true,
  rowSpacing,
}: DataTableRowsProps) => {
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
        <Flex direction="column" padding={isH2 ? "none none larger" : isH3 ? "large none" : undefined}>
          <Ink
            as={level}
            {...tableHeadingProps(level)}
          >
            {table.name}
          </Ink>
        </Flex>
      ) : null}
      <Flex direction="column">
        {table.rows ? (
          <Flex direction="column">
            {showHeader ? <DataTableHeader columns={columns} columnWidths={columnWidths} title={titleInHeader ? table.name : undefined} rowSpacing={rowSpacing} /> : null}
            {table.rows.map((item, index) => (
              <Fragment key={item.id}>
                {/* Divider between rows (and under the header); never after the last. */}
                {rowLines && showLines && (index > 0 || showHeader) ? <RowDivider /> : null}
                <DataTableRow
                  columns={columns}
                  columnWidths={columnWidths}
                  values={item.values}
                  highlighted={item.highlighted}
                  showLines={showLines}
                  rowSpacing={rowSpacing}
                />
              </Fragment>
            ))}
          </Flex>
        ) : null}
        {table.tables?.map((child, index) => (
          <DataTableRows
            key={tableKey(child, index)}
            table={child}
            columns={columns}
            columnWidths={columnWidths}
            depth={depth + 1}
            showHeader={showHeader}
            rowLines={rowLines}
            showLines={showLines}
            rowSpacing={rowSpacing}
          />
        ))}
      </Flex>
    </Flex>
  )
}
