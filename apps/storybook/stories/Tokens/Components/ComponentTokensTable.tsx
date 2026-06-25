import * as React from "react"
import { DataTableSet } from "../../../src/components/DataTableSet"
import type { DataColumn } from "../../../src/components/DataTable"
import { tokenNameCell } from "../../../src/components/TokensDataTable"
import Typography from "../../../src/nice/Typography"
import { parseTokenVarLink, HIGHLIGHT_KEY } from "../../../src/services"
import { TokenVarLink } from "./ComponentTokensTable.styles"
import { getComponentTokenGroups, type ComponentPrefixWithTokens } from "./componentTokens"

interface ComponentTokensTableProps {
  prefix: ComponentPrefixWithTokens
}

// Matches one `var(--np--…)` reference anywhere in a value — including those
// nested inside a `calc(…)` — so each embedded var gets linked individually.
const VAR_REFERENCE = /var\(--np--[^)]+\)/g

/**
 * The inner `--np--…` name of a single `var(--np--…)` reference, linked to its
 * Modules story and styled with the link color and nothing else. The `var(` and
 * `)` around it render as plain text.
 */
const VarNameLink = ({ reference }: { reference: string }) => {
  const link = parseTokenVarLink(reference)
  if (!link) return <>{reference}</>
  return (
    <>
      var(
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
    </>
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
  { key: "tokenName", header: "Token name", width: "14em", render: "node" },
  { key: "variable", header: "Variable", width: "36em", render: "node" },
  { key: "value", header: "Value", render: "node" },
]

/**
 * Renders one component's token tree as an aligned table-of-tables — one named
 * sub-table per top-level token group, under a single shared header. Each row
 * documents a component CSS variable in the Variable column and the value it is
 * initialized to in the Value column — a core `var(--np--…)` reference (whose
 * inner name deep-links to its Modules story) or a literal string.
 */
export const ComponentTokensTable = ({ prefix }: ComponentTokensTableProps) => {
  const tables = getComponentTokenGroups(prefix).map((group) => ({
    name: group.name,
    rows: group.rows.map((row) => ({
      id: row.cssVar,
      values: [
        tokenNameCell(row.variant, row.path[row.path.length - 1] === "base"),
        <Typography code size="small">{row.cssVar}</Typography>,
        <Typography code size="small">{renderValue(row.value)}</Typography>,
      ],
    })),
  }))

  return <DataTableSet columns={COLUMNS} tables={tables} nameWidth="10em" inline />
}
