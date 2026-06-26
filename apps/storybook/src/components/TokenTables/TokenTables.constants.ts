import type { DataColumn } from "../DataSection"

/**
 * The data columns of a module-token table, in order: the token (variant) name,
 * the preview node, the CSS variable (Shiki), the getToken() call (Shiki), and
 * the resolved value (monospace, click-to-copy).
 */
export const TOKEN_COLUMNS: DataColumn[] = [
  { key: "tokenName", header: "Token name", width: "8em", render: "node" },
  { key: "preview", header: null, width: "16em", render: "node" },
  { key: "css", header: "CSS", width: "20em", render: "shiki", language: "tsx" },
  { key: "js", header: "JS", render: "shiki", language: "tsx" },
  { key: "value", header: "Value", render: "text", code: true, size: "small", color: "lighter", clickToCopy: true },
]
