import type { DataColumn } from "../../../DataTable"

/**
 * The data columns of a component-token table: example · token name · CSS
 * variable · default value. The group name is the section heading, not a column.
 */
export const COMPONENT_TOKEN_COLUMNS: DataColumn[] = [
  { key: "example", header: null, width: "16em", render: "node" },
  { key: "tokenName", header: "Token name", width: "20em", render: "node" },
  { key: "variable", header: "Variable", width: "36em", render: "node" },
  { key: "value", header: "Default", render: "node" },
]

/** Every `var(--np--…)` reference in a value, including those inside a `calc(…)` — global, for `matchAll`. */
export const VAR_REFERENCE = /var\(--np--[^)]+\)/g

/** A core-token reference anywhere in a value — a bare `var(--np--…)` or one nested in `calc(...)`. */
export const CORE_TOKEN_REFERENCE = /var\(\s*--np--/