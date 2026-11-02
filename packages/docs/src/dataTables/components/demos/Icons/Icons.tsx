import Icon from "@niceprototypes/icon"
// Icons are a single flat, uniquely-named set — read the names from @niceprototypes/icon'
// data-only catalog (no SVG imports). To present grouped subtables, define a
// manual `{ groupName: names[] }` map here and iterate it instead; @niceprototypes/icon no
// longer ships categories (grouping is intentionally maintained by hand).
import { iconNames } from "@niceprototypes/icon/catalog"
import Code from "../../../../nice/Code"
import { DataTable, withCopyAffordance } from "../../../../components/DataTable"
import type { DataColumn, DataTableConfig } from "../../../../components/DataTable"
import { ClickHint } from "../../../../components/ClickHint"
import type { IconTableColumn, IconTableProps } from "./Icons.types"

/**
 * Remote URL of an icon's generated base SVG on GitHub — the same target the
 * @niceprototypes/icon README links each icon to. The preview cell wraps its Icon in a
 * link here so the docs table matches that behavior.
 */
const remoteIconUrl = (name: string) =>
  `https://raw.githubusercontent.com/niceprototypes/nice-ux/main/packages/icon/src/svg/icons/generated/${name}/base.svg`

/**
 * One row per icon name, index-aligned to the columns: the rendered Icon
 * (unlabeled example cell) linking to its remote SVG on GitHub, the name as a
 * flush click-to-copy code chip, then one Shiki cell per `codeColumns` entry.
 */
const buildRows = (names: readonly string[], codeColumns: IconTableColumn[]) =>
  names.map(name => ({
    id: name,
    values: [
      <a
        href={remoteIconUrl(name)}
        target="_blank"
        rel="noreferrer"
        style={{ display: "inline-flex", color: "inherit" }}
      >
        <ClickHint icon="github">
          <Icon strokeScaling name={name} size="large" />
        </ClickHint>
      </a>,
      // Clickable code chip — copies the icon name, matching the code columns.
      // Wrapped in the same copy affordance the shiki cells get, so the name
      // cell shows the hover copy icon too (node cells skip the cell-level
      // wrapper DataTableCell applies to shiki/text columns).
      withCopyAffordance(<Code code={name} language="tsx" inlined />),
      ...codeColumns.map(column => column.code(name)),
    ],
  }))

/**
 * The icon reference table, data-first. The table owns structure (columns,
 * headers, layout); the caller supplies each code column's header and snippet
 * builder. Icons are a single flat set — one row per `iconNames` entry, rendered
 * as one table. `iconNames` comes from @niceprototypes/icon, so new icons flow in with no
 * change here. To present grouped subtables, iterate a manual `{ group: names[] }`
 * map (defined here) into `tables` instead.
 */
export default function IconDemoTable({ codeColumns }: IconTableProps) {
  const columns: DataColumn[] = [
    { key: "preview", header: null },
    { key: "name", header: "Name" },
    ...codeColumns.map(
      (column, index): DataColumn => ({
        key: `code-${index}`,
        header: column.header,
        render: "@niceprototypes/code",
        language: "tsx",
      })
    ),
  ]

  // Widths index-aligned to `columns`: preview, name, then each code column.
  const columnWidths: (string | null)[] = ["6em", "12em", ...codeColumns.map(column => column.width ?? "20em")]

  const tables: DataTableConfig[] = [
    {
      // No `name` — the icons table is a single flat set, so the header row's
      // first cell stays empty (above the preview column) instead of showing a
      // group title.
      rows: buildRows(iconNames, codeColumns),
    },
  ]

  return <DataTable columns={columns} columnWidths={columnWidths} tables={tables} />
}
