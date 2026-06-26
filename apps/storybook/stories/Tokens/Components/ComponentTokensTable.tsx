import * as React from "react"
import { getTokenValue } from "nice-react-styles"
import Tooltip from "nice-react-tooltip"
import { DataTables } from "../../../src/components/DataTables"
import type { DataClusterSection } from "../../../src/components/DataTables"
import type { DataColumn } from "../../../src/components/DataTable"
import { TokenName } from "../../../src/components/TokenTables"
import Typography from "../../../src/nice/Typography"
import { parseTokenVarLink, HIGHLIGHT_KEY } from "../../../src/services"
import { TokenVarLink } from "./ComponentTokensTable.styles"
import { getComponentTokenGroups, type ComponentPrefixWithTokens, type ComponentTokenRow } from "./componentTokens"

interface ComponentTokensTableProps {
  prefix: ComponentPrefixWithTokens
}

// Matches one `var(--np--…)` reference anywhere in a value — including those
// nested inside a `calc(…)` — so each embedded var gets linked individually.
const VAR_REFERENCE = /var\(--np--[^)]+\)/g

/**
 * A single `var(--np--…)` module-root reference, rendered as just its inner
 * `--np--…` name linked to its Modules story (link color, nothing else) — the
 * decorative `var(` / `)` wrapper is dropped. A reference that isn't a module
 * root returns verbatim, so any `var(…)` left behind stays as-is.
 */
const VarNameLink = ({ reference }: { reference: string }) => {
  const link = parseTokenVarLink(reference)
  if (!link) return <>{reference}</>

  const anchor = (
    <TokenVarLink
      href={link.href}
      target="_top"
      onClick={() => {
        try {
          sessionStorage.setItem(HIGHLIGHT_KEY, link.token)
        } catch {
          /* sessionStorage unavailable */
        }
      }}
    >
      {reference.slice("var(".length, -1)}
    </TokenVarLink>
  )

  // Hovering previews the token's resolved static value — the canonical default
  // (pristine), matching its Modules table. `parseTokenVarLink` reports the
  // trailing segment as the variant even when it is a theme primitive
  // (`…--night`) or a variant the module doesn't define (`…--alternate`);
  // getTokenValue rejects those, so guard it and just drop the preview rather
  // than crash the table. The link itself still points at the group's story.
  let value: string | null = null
  try {
    value = String(getTokenValue(link.group, { variant: link.variant, pristine: true }))
  } catch {
    value = null
  }

  return value !== null ? (
    <Tooltip content={value} trigger="hover" delayShow={500}>
      {anchor}
    </Tooltip>
  ) : (
    anchor
  )
}

/**
 * Render a token's value, linking the inner name of every `var(--np--…)`
 * reference it contains — whether the value is a bare reference or one nested in
 * a `calc(…)` expression. Surrounding text (`calc(`, ` / 2`, literals like
 * `#ddd`) renders verbatim; component-to-component refs that don't map to a
 * Modules story stay plain too.
 */
const renderValue = (value: string) => {
  const nodes: React.ReactNode[] = []
  let cursor = 0
  let key = 0
  for (const match of value.matchAll(VAR_REFERENCE)) {
    const start = match.index ?? 0
    if (start > cursor) nodes.push(value.slice(cursor, start)) // plain text before the var
    nodes.push(<VarNameLink key={key++} reference={match[0]} />)
    cursor = start + match[0].length
  }
  if (cursor < value.length) nodes.push(value.slice(cursor)) // trailing plain text
  return nodes.length ? <>{nodes}</> : value
}

// The data columns (the leading group-name column, width 10em, is prepended by
// DataTableSet). Token name and Variable are pinned; Value is equal-flex.
const COLUMNS: DataColumn[] = [
  { key: "tokenName", header: "Token name", width: "20cem", render: "node" },
  { key: "variable", header: "Variable", width: "36em", render: "node" },
  { key: "value", header: "Value", render: "node" },
]

// Build the [tokenName, variable, value] cells for one component-token row.
// `label` is the displayed token name — a split table passes a shortened label
// (the redundant property segment dropped, since it becomes the table title).
const rowCells = (label: string, row: ComponentTokenRow) => ({
  id: row.cssVar,
  values: [
    <TokenName variant={label} isDefault={row.path[row.path.length - 1] === "base"} />,
    <Typography code size="small">{row.cssVar}</Typography>,
    <Typography code size="small">{renderValue(row.value)}</Typography>,
  ],
})

/**
 * Renders one component's token tree. Most groups render as an aligned
 * table-of-tables (one named sub-table per top-level group, shared header). The
 * `status` group nests one level deeper —
 * `status / variant / property / state` (e.g. `status.primary.backgroundColor.base`) —
 * so it is split into one table per property type (backgroundColor, borderColor,
 * color) under a `status` heading, each scannable on its own. Every row documents
 * a component CSS variable and the value it is initialized to (a core
 * `var(--np--…)` reference that deep-links to its Modules story, or a literal).
 */
export const ComponentTokensTable = ({ prefix }: ComponentTokensTableProps) => {
  const groups = getComponentTokenGroups(prefix)
  const statusGroup = groups.find((group) => group.name === "status")
  const setGroups = groups.filter((group) => group.name !== "status")

  // Non-status groups → the aligned set (group name in the leading column).
  const setTables = setGroups.map((group) => ({
    name: group.name,
    rows: group.rows.map((row) => rowCells(row.variant, row)),
  }))

  // status → an h3 "status" cluster of one h4 sub-table per property type
  // (path[2]); within each, the token name drops to `variant.state` (e.g.
  // primary.base) since the type is the heading. The h4 level derives from the
  // cluster (one below h3); children carry no explicit titleAs.
  const statusCluster: DataClusterSection | null = statusGroup
    ? {
        name: "status",
        titleAs: "h3",
        sections: Array.from(
          statusGroup.rows.reduce((byType, row) => {
            const type = row.path[2] ?? "—"
            return byType.set(type, [...(byType.get(type) ?? []), row])
          }, new Map<string, ComponentTokenRow[]>())
        ).map(([type, rows]) => ({
          name: type,
          rows: rows.map((row) => rowCells(`${row.path[1]}.${row.path[row.path.length - 1]}`, row)),
        })),
      }
    : null

  return (
    <>
      <DataTables columns={COLUMNS} tables={setTables} inline />
      {statusCluster ? <DataTables layout="sectioned" columns={COLUMNS} tables={[statusCluster]} inline /> : null}
    </>
  )
}
