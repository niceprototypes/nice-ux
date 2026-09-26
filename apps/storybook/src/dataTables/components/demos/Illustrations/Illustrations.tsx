import { Illustration } from "nice-react-icon"
// Illustrations are nice-icons' fixed-color surface (distinct from the monochrome
// icon set). Read the names from the data-only illustration catalog (no SVG
// imports). Unlike icons, illustrations are never recolored — the preview renders
// them at their authored colors.
import { illustrationNames } from "nice-icons/illustration-catalog"
import Code from "../../../../nice/Code"
import { DataTable, withCopyAffordance } from "../../../../components/DataTable"
import type { DataColumn, DataTableConfig } from "../../../../components/DataTable"
import { ClickHint } from "../../../../components/ClickHint"
import type { IllustrationTableColumn, IllustrationTableProps } from "./Illustrations.types"

/**
 * Remote URL of an illustration's generated base SVG on GitHub — the encoded/
 * colored source. The preview cell wraps its Illustration in a link here so the
 * docs table matches the icon table's behavior.
 */
const remoteIllustrationUrl = (name: string) =>
  `https://raw.githubusercontent.com/niceprototypes/nice-icons/main/src/illustrations/generated/${name}/base.svg`

/**
 * One row per illustration name, index-aligned to the columns: the rendered
 * Illustration (unlabeled example cell, authored colors intact) linking to its
 * remote SVG on GitHub, the name as a flush click-to-copy code chip, then one
 * Shiki cell per `codeColumns` entry.
 */
const buildRows = (names: readonly string[], codeColumns: IllustrationTableColumn[]) =>
  names.map(name => ({
    id: name,
    values: [
      <a
        href={remoteIllustrationUrl(name)}
        target="_blank"
        rel="noreferrer"
        style={{ display: "inline-flex", color: "inherit" }}
      >
        <ClickHint icon="github">
          <Illustration name={name} size="large" />
        </ClickHint>
      </a>,
      // Clickable code chip — copies the illustration name, matching the code columns.
      withCopyAffordance(<Code code={name} language="tsx" inlined />),
      ...codeColumns.map(column => column.code(name)),
    ],
  }))

/**
 * The illustration reference table — the fixed-color counterpart to
 * `IconDemoTable`. Same structure (preview, name, then caller-supplied code
 * columns); one row per `illustrationNames` entry. New illustrations flow in with
 * no change here.
 */
export default function IllustrationDemoTable({ codeColumns }: IllustrationTableProps) {
  const columns: DataColumn[] = [
    { key: "preview", header: null },
    { key: "name", header: "Name" },
    ...codeColumns.map(
      (column, index): DataColumn => ({
        key: `code-${index}`,
        header: column.header,
        render: "nice-react-code",
        language: "tsx",
      })
    ),
  ]

  // Widths index-aligned to `columns`: preview, name, then each code column.
  const columnWidths: (string | null)[] = ["6em", "12em", ...codeColumns.map(column => column.width ?? "20em")]

  const tables: DataTableConfig[] = [
    {
      // No `name` — a single flat set, so the header row's first cell stays empty.
      rows: buildRows(illustrationNames, codeColumns),
    },
  ]

  return <DataTable columns={columns} columnWidths={columnWidths} tables={tables} />
}
