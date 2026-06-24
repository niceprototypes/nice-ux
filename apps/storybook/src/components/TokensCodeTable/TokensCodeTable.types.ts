import * as React from "react"
import type { CodeColumn } from "../CodeRow/CodeRow.types"
import { CodeTable } from "../CodeTable"

/**
 * A row's variant: a bare variant name, or an object carrying the `variant`
 * plus any extra data the `preview` render needs (e.g. an SVG path or label).
 */
export type TokenVariant = string | { variant: string; [key: string]: unknown }

export type TokensCodeTableProps = {
  /** camelCase token group; also the table's leading name-column label. */
  name?: string
  /** Rows to render — variant names, or objects with a `variant` key. */
  variants?: ReadonlyArray<TokenVariant>
  /** Returns the bespoke preview cell for a row, given its variant item. */
  preview?: (item: TokenVariant) => React.ReactNode
  /**
   * Show the leading name column. When false the `name` group still drives the
   * CSS/JS/Value cells — only the redundant label column is dropped, and the
   * column widths/headers shift left one slot to stay aligned. @default true
   */
  showName?: boolean
  /**
   * Per-cell options for each row's [preview, CSS, JS, Value] cells. Defaults to
   * marking the two middle (CSS / JS) cells as code. Pass an all-`null` array to
   * render every cell as-is — e.g. a Components instance that wants no
   * syntax-highlighted code cells.
   */
  columns?: (CodeColumn | null)[]
} & Omit<React.ComponentProps<typeof CodeTable>, "name" | "children">
