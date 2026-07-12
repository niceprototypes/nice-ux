import Icon from "nice-react-icon"
// Icons are a single flat, uniquely-named set — read the names from nice-icons'
// data-only catalog (no SVG imports). To present grouped subtables, define a
// manual `{ groupName: names[] }` map here and iterate it instead; nice-icons no
// longer ships categories (grouping is intentionally maintained by hand).
import { iconNames } from "nice-icons/catalog"
import { CodeBlock } from "../../../CodeBlock"
import { DataTable, withCopyAffordance } from "../../../DataTable"
import type { DataColumn, DataTableConfig } from "../../../DataTable"
import type { IconTableColumn, IconTableProps } from "./IconTable.types"

/**
 * One row per icon name, index-aligned to the columns: the rendered Icon
 * (unlabeled example cell), the name as a flush click-to-copy code chip, then
 * one Shiki cell per `codeColumns` entry.
 */
const buildRows = (names: readonly string[], codeColumns: IconTableColumn[]) =>
  names.map(name => ({
    id: name,
    values: [
      <Icon strokeScaling name={name} size="large" />,
      // Clickable code chip — copies the icon name, matching the code columns.
      // Wrapped in the same copy affordance the shiki cells get, so the name
      // cell shows the hover copy icon too (node cells skip the cell-level
      // wrapper DataTableCell applies to shiki/text columns).
      withCopyAffordance(<CodeBlock code={name} language="tsx" inlined />),
      ...codeColumns.map(column => column.code(name)),
    ],
  }))

/**
 * The icon reference table, data-first. The table owns structure (columns,
 * headers, layout); the caller supplies each code column's header and snippet
 * builder. Icons are a single flat set — one row per `iconNames` entry, rendered
 * as one table. `iconNames` comes from nice-icons, so new icons flow in with no
 * change here. To present grouped subtables, iterate a manual `{ group: names[] }`
 * map (defined here) into `tables` instead.
 */
export const IconTable = ({ codeColumns }: IconTableProps) => {
  const columns: DataColumn[] = [
    { key: "preview", header: null, render: "node" },
    { key: "name", header: "Name", render: "node" },
    ...codeColumns.map(
      (column, index): DataColumn => ({
        key: `code-${index}`,
        header: column.header,
        render: "shiki",
        language: "tsx",
      })
    ),
  ]

  // Widths index-aligned to `columns`: preview, name, then each code column.
  const columnWidths: (string | null)[] = ["6em", "12em", ...codeColumns.map(column => column.width ?? "20em")]

  const tables: DataTableConfig[] = [
    {
      name: "icons",
      rows: buildRows(iconNames, codeColumns),
    },
  ]

  return <DataTable columns={columns} columnWidths={columnWidths} tables={tables} />
}
