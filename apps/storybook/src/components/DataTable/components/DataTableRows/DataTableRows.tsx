import { Fragment } from "react"
import Flex from "nice-react-flex"
import Ink from "../../../../nice/Ink"
import ContentFlex from "../../../../nice/ContentFlex"
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
  showLines = false,
  condensed = false,
  rowSpacing,
  sectionWrapped = false,
}: DataTableRowsProps) => {
  const level = LEVELS[Math.min(depth, 2)]

  // A NESTED leaf table (one that renders a header row) folds its own title into
  // the header's first cell, so a cluster reads as one table of labelled parts. A
  // top-level table keeps its title as a standalone heading — cluster or not —
  // otherwise consecutive top-level tables render with no heading between them and
  // read as continuations of whichever one last had a real heading.
  const titleInHeader = depth > 0 && table.rows != null && showHeader && table.name != null
  const showHeading = table.name != null && !titleInHeader

  return (
    <Flex direction="column">
      {showHeading ? (
        <ContentFlex direction="column" wrapped={sectionWrapped}>
          <Ink
            as={level}
            {...tableHeadingProps(level)}
          >
            {table.name}
          </Ink>
        </ContentFlex>
      ) : null}
      <Flex direction="column" gap="larger">
        {table.rows ? (
          <Flex direction="column">
            {showHeader ? <DataTableHeader columns={columns} columnWidths={columnWidths} title={titleInHeader ? table.name : undefined} rowSpacing={rowSpacing} /> : null}
            {table.rows.map((item, index) => (
              <Fragment key={item.id}>
                {/* Divider between rows (and under the header); never after the last. */}
                {showLines && (index > 0 || showHeader) ? <RowDivider /> : null}
                <DataTableRow
                  columns={columns}
                  columnWidths={columnWidths}
                  values={item.values}
                  highlighted={item.highlighted}
                  condensed={condensed}
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
            showLines={showLines}
            condensed={condensed}
            rowSpacing={rowSpacing}
            sectionWrapped={sectionWrapped}
          />
        ))}
      </Flex>
    </Flex>
  )
}
