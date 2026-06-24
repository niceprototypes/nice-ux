import * as React from "react"
import { CodeRow } from "../../../src/components/CodeRow"
import { CodeTable } from "../../../src/components/CodeTable"
import Typography from "../../../src/nice/Typography"
import { getToken } from "nice-react-styles"
import { parseTokenVarLink, HIGHLIGHT_KEY } from "../../../src/services"
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
      <a
        href={link.href}
        target="_top"
        onClick={() => {
          try {
            sessionStorage.setItem(HIGHLIGHT_KEY, link.token)
          } catch {
            /* sessionStorage unavailable */
          }
        }}
        style={{ color: getToken("color", "link"), textDecoration: "none" }}
      >
        {reference.slice("var(".length, -1)}
      </a>
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

// [group, Variable, Value]. Variable/Value are equal-flex (null) so they split
// the remaining width evenly and stay aligned across the header + group tables.
const COLUMN_WIDTHS = ["10em", "36em", null]

/**
 * Renders one component's token tree as grouped reference tables — one
 * `CodeTable` per top-level token group, under a single shared header. Each row
 * documents a component CSS variable in the Variable column and the value it is
 * initialized to in the Value column — a core `var(--np--…)` reference or a
 * literal string — grouped by its top-level token group.
 */
export const ComponentTokensTable = ({ prefix }: ComponentTokensTableProps) => {
  const groups = getComponentTokenGroups(prefix)

  return (
    <>
      {/* Header once at the top — the group tables below are headerless, so the
          column labels render a single time rather than per group. */}
      <CodeTable
        columnWidths={COLUMN_WIDTHS}
        columnHeaders={[null, "Variable", "Value"]}
      />
      {groups.map((group) => (
        <CodeTable
          key={group.name}
          name={group.name}
          columnWidths={COLUMN_WIDTHS}
        >
          {group.rows.map((row) => (
            <CodeRow
              key={row.cssVar}
              inline
              cells={[
                <Typography code size="small">{row.cssVar}</Typography>,
                <Typography code size="small">{renderValue(row.value)}</Typography>,
              ]}
            />
          ))}
        </CodeTable>
      ))}
    </>
  )
}
