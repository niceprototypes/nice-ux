import Icon from "nice-react-icon"
// Categories are internal organization only (never needed to call an icon) —
// read from nice-icons' data-only catalog, not the consumer-facing icon API.
import { iconCategories } from "nice-icons/catalog"
import { CodeBlock } from "../../../CodeBlock"
import { DataTable, withCopyAffordance } from "../../../DataTable"
import type { DataColumn, DataTableConfig } from "../../../DataTable"
import type { IconTableColumn, IconTableProps } from "./IconTable.types"

/** Title-case a category key for its subtable heading ("brands" → "Brands"). */
const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

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
      withCopyAffordance(<CodeBlock code={name} language="tsx" inline />),
      ...codeColumns.map(column => column.code(name)),
    ],
  }))

/**
 * The icon reference table, data-first. The table owns structure (columns,
 * headers, layout); the caller supplies each code column's header and snippet
 * builder. Icons are grouped into one subtable per `iconCategories` entry
 * (base, brands) via DataTable's nested-tables feature — each renders its own
 * heading and header row. `iconNames`/`iconCategories` come from nice-icons, so
 * new icons and categories flow in with no change here.
 */
export const IconTable = ({ codeColumns }: IconTableProps) => {
  const columns: DataColumn[] = [
    { key: "preview", header: null, width: "6em", render: "node" },
    { key: "name", header: "Name", width: "12em", render: "node" },
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

  const tables: DataTableConfig[] = Object.entries(iconCategories).map(([category, names]) => ({
    name: titleCase(category),
    rows: buildRows(names, codeColumns),
  }))

  return <DataTable columns={columns} tables={tables} inline />
}
