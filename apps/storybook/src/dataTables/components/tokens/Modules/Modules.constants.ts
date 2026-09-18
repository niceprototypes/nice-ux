import type { DataColumn } from "../../../../components/DataTable"

/**
 * The data columns of a module-token table, in order: the preview node, the
 * token (variant) name, the CSS variable (Shiki), the getToken() call (Shiki),
 * and the resolved value (monospace, click-to-copy).
 */
export const TOKEN_COLUMNS: DataColumn[] = [
  { key: "preview", header: null, render: "node" },
  { key: "tokenName", header: "Token name", render: "node", clickToCopy: true },
  { key: "css", header: "CSS", render: "shiki", language: "tsx" },
  { key: "js", header: "JS", render: "shiki", language: "tsx" },
  { key: "value", header: "Default", render: "text", code: true, size: "small", color: "lighter", clickToCopy: true },
]

/** Fixed widths, index-aligned to {@link TOKEN_COLUMNS}; `null` leaves a column equal-flex. */
export const TOKEN_COLUMN_WIDTHS: (string | null)[] = ["24em", "8em", "20em", null, null]
