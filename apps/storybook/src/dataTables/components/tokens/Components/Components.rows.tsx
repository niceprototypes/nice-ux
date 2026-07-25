import * as React from "react"
import Ink from "../../../../nice/Ink"
import { TokenName } from "../../../utilities"
import type { DataTableConfig } from "../../../../components/DataTable"
import { VAR_REFERENCE } from "./Components.constants"
import { VarNameLink } from "./VarNameLink"
import { componentExample } from "./Components.examples"
import type { ComponentPrefixWithTokens, ComponentTokenGroup, ComponentTokenRow } from "./Components.types"

/** Render a value, linking the inner name of each `var(--np--…)` it contains; surrounding text renders verbatim. */
const renderValue = (value: string): React.ReactNode => {
  const nodes: React.ReactNode[] = []
  let cursor = 0
  let key = 0
  for (const match of value.matchAll(VAR_REFERENCE)) {
    const start = match.index ?? 0
    if (start > cursor) nodes.push(value.slice(cursor, start)) // literal text before this reference
    nodes.push(<VarNameLink key={key++} reference={match[0]} />)
    cursor = start + match[0].length
  }
  if (cursor < value.length) nodes.push(value.slice(cursor)) // trailing literal text
  return nodes.length ? <>{nodes}</> : value
}

/**
 * The [example, tokenName, variable, value] cells for one token row. `label` is
 * the displayed token name — a split status table passes a shortened one.
 */
const rowCells = (prefix: ComponentPrefixWithTokens, label: string, row: ComponentTokenRow) => ({
  id: row.cssVar,
  values: [
    componentExample(prefix, row.path),
    <TokenName variant={label} isDefault={row.path[row.path.length - 1] === "base"} />,
    <Ink code size="small">{row.cssVar}</Ink>,
    <Ink code size="small">{renderValue(row.value)}</Ink>,
  ],
})

/** Bucket status rows by property type (`path[2]`), preserving encounter order. */
const groupStatusByType = (rows: ComponentTokenRow[]): Map<string, ComponentTokenRow[]> => {
  const byType = new Map<string, ComponentTokenRow[]>()
  for (const row of rows) {
    const type = row.path[2] ?? "—"
    const bucket = byType.get(type) ?? []
    bucket.push(row)
    byType.set(type, bucket)
  }
  return byType
}

/**
 * One token group as a `DataTable`. Non-status groups are a flat sub-table of
 * rows; `status` splits one level deeper into a sub-table per property type
 * (backgroundColor, borderColor, color), its token name dropped to `variant.state`
 * (e.g. `primary.base`) since the property type heads the sub-table.
 */
export const buildGroupTable = (prefix: ComponentPrefixWithTokens, group: ComponentTokenGroup): DataTableConfig => {
  if (group.name !== "status") {
    return { name: group.name, rows: group.rows.map((row) => rowCells(prefix, row.variant, row)) }
  }
  return {
    name: "status",
    tables: Array.from(groupStatusByType(group.rows), ([type, rows]) => ({
      name: type,
      rows: rows.map((row) => rowCells(prefix, `${row.path[1]}.${row.path[row.path.length - 1]}`, row)),
    })),
  }
}