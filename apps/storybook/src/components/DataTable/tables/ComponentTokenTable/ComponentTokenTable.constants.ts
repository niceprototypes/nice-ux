import type { DataColumn } from "../../../DataTable"

/**
 * The data columns of a component-token table: example · token name · CSS
 * variable · default value. The group name is the section heading, not a column.
 */
export const COMPONENT_TOKEN_COLUMNS: DataColumn[] = [
  { key: "example", header: null, render: "node" },
  { key: "tokenName", header: "Token name", render: "node" },
  { key: "variable", header: "Variable", render: "node" },
  { key: "value", header: "Default", render: "node" },
]

/** Fixed widths, index-aligned to {@link COMPONENT_TOKEN_COLUMNS}; `null` leaves a column equal-flex. */
export const COMPONENT_TOKEN_COLUMN_WIDTHS: (string | null)[] = ["16em", "20em", "36em", null]

/** Every `var(--np--…)` reference in a value, including those inside a `calc(…)` — global, for `matchAll`. */
export const VAR_REFERENCE = /var\(--np--[^)]+\)/g

/** A core-token reference anywhere in a value — a bare `var(--np--…)` or one nested in `calc(...)`. */
export const CORE_TOKEN_REFERENCE = /var\(\s*--np--/