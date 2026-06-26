import * as React from "react"
import { getTokenValue } from "nice-react-styles"
import Tooltip from "nice-react-tooltip"
import { DataTables } from "../../../src/components/DataTables"
import type { DataTable } from "../../../src/components/DataTables"
import type { DataColumn } from "../../../src/components/DataTables"
import { TokenName } from "../../../src/components/TokenTables"
import Typography from "../../../src/nice/Typography"
import { parseTokenVarLink, HIGHLIGHT_KEY } from "../../../src/services"
import { TokenVarLink } from "./ComponentTokensTable.styles"
import { getComponentTokenGroups, componentLabel, type ComponentPrefixWithTokens, type ComponentTokenRow } from "./componentTokens"

interface ComponentTokensTableProps {
  prefix: ComponentPrefixWithTokens
  /**
   * Docs page: wrap the groups under the component name (`h2`) so they nest as
   * `h3`, mirroring the Modules "Colors" cluster. Substory pages leave it off —
   * the groups render flat as `h2` under the page's own `StoryHeader`.
   */
  nested?: boolean
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

// The data columns of each component-group table. The group name is the section
// heading (not a column). Token name and Variable are pinned; Value is equal-flex.
const COLUMNS: DataColumn[] = [
  { key: "tokenName", header: "Token name", width: "20em", render: "node" },
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
 * Renders one component's token tree using the same nesting pattern as
 * Tokens/Modules: the component is an `h2` cluster (e.g. "Button") whose token
 * groups (size, spacing, borderColor, …) are `h3` sub-tables under it. The
 * `status` group nests one level deeper —
 * `status / variant / property / state` (e.g. `status.primary.backgroundColor.base`) —
 * so it is itself an `h3` cluster of one `h4` sub-table per property type
 * (backgroundColor, borderColor, color), each scannable on its own. Every row
 * documents a component CSS variable and the value it is initialized to (a core
 * `var(--np--…)` reference that deep-links to its Modules story, or a literal).
 */
export const ComponentTokensTable = ({ prefix, nested = false }: ComponentTokensTableProps) => {
  const groups: DataTable[] = getComponentTokenGroups(prefix).map((group) => {
    if (group.name !== "status") {
      return { name: group.name, rows: group.rows.map((row) => rowCells(row.variant, row)) }
    }
    // status splits into one sub-table per property type (path[2]); its token
    // name drops to `variant.state` (e.g. primary.base) since the type heads it.
    return {
      name: "status",
      tables: Array.from(
        group.rows.reduce((byType, row) => {
          const type = row.path[2] ?? "—"
          return byType.set(type, [...(byType.get(type) ?? []), row])
        }, new Map<string, ComponentTokenRow[]>())
      ).map(([type, rows]) => ({
        name: type,
        rows: rows.map((row) => rowCells(`${row.path[1]}.${row.path[row.path.length - 1]}`, row)),
      })),
    }
  })

  // Docs: one cluster (component name h2 → groups h3). Substory: groups flat (h2).
  const tables = nested ? [{ name: componentLabel(prefix), tables: groups }] : groups
  return <DataTables columns={COLUMNS} tables={tables} inline />
}
