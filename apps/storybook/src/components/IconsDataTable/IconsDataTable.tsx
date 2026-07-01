import Icon, { iconNames } from "nice-react-icon"
import Flex from "nice-react-flex"
import { CodeBlock } from "../CodeBlock"
import { DataSection, withCopyAffordance } from "../DataSection"
import type { DataColumn } from "../DataSection"
import type { IconsDataTableProps } from "./IconsDataTable.types"

/**
 * The icon reference table, data-first. One row per name in `iconNames`: a first
 * cell pairing the rendered Icon with its name (a flush, click-to-copy code
 * chip), then one Shiki column per entry in `codeColumns`. The table owns
 * structure (columns, headers, layout); the caller supplies each code column's
 * header and snippet builder.
 */
export const IconsDataTable = ({ codeColumns }: IconsDataTableProps) => {
  const columns: DataColumn[] = [
    { key: "name", header: "Name", width: "16em", render: "node" },
    ...codeColumns.map(
      (column, index): DataColumn => ({
        key: `code-${index}`,
        header: column.header,
        width: column.width ?? "20em",
        render: "shiki",
        language: "tsx",
      })
    ),
  ]

  const rows = iconNames.map(name => ({
    id: name,
    values: [
      <Flex direction="row" alignItems="center" gap="base">
        <Icon strokeScaling name={name} size="large" />
        {/* Clickable code chip — copies the icon name, matching the code columns.
            Wrapped in the same copy affordance the shiki cells get, so the name
            cell shows the hover copy icon too (node cells skip the cell-level
            wrapper DataSectionCell applies to shiki/text columns). */}
        {withCopyAffordance(<CodeBlock code={name} language="tsx" inline />)}
      </Flex>,
      ...codeColumns.map(column => column.code(name)),
    ],
  }))

  return <DataSection columns={columns} tables={[{ rows }]} inline />
}
