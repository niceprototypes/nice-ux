import { getConstant } from "nice-react-styles"
import type { CodeColumn } from "../CodeRow/CodeRow.types"
import type { TokenVariant } from "./TokensCodeTable.types"

// Default column widths for [name, preview, CSS]; JS/Value size to content.
export const COLUMN_WIDTHS = ["12em", "16em", "20em"]

// Default per-cell options for [preview, CSS, JS, Value]: only the JS cell is a
// syntax-highlighted code block. The CSS var renders as plain monospace (its
// cell is a `<Typography code>`) — no Shiki and no deep-link, since on the
// Modules page that link would point back to the same row. The trailing Value
// renders in the lighter text color; the preview renders as-is. Extracted so a
// caller can drop every flag (pass all-null) for a fully non-code rendering.
export const DEFAULT_COLUMNS: (CodeColumn | null)[] = [null, null, { shiki: true }, { color: "lighter" }]

// The variant string of an item — the item itself, or its `variant` field.
export const variantKey = (item: TokenVariant): string => (typeof item === "string" ? item : item.variant)
