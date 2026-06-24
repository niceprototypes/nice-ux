import * as React from "react"

/**
 * A row's variant: a bare variant name, or an object carrying the `variant`
 * plus any extra data the `preview` render needs (e.g. an SVG path or label).
 */
export type TokenVariant = string | { variant: string; [key: string]: unknown }

/** One token group's reference data — the config each `tables/{group}.tsx` exports. */
export interface TokenGroupConfig {
  /** camelCase token group — the table's name column and the story title. */
  name: string
  /** Variant names, or objects with a `variant` key plus preview data. */
  variants: ReadonlyArray<TokenVariant>
  /** Returns the bespoke preview cell for a row, given its variant item. */
  preview: (item: TokenVariant) => React.ReactNode
}

export interface TokensDataTableProps {
  /** camelCase token group; drives the CSS/JS/Value cells and the name column. */
  name: string
  /** Variant names, or objects with a `variant` key. */
  variants: ReadonlyArray<TokenVariant>
  /** Returns the bespoke preview cell for a row, given its variant item. */
  preview?: (item: TokenVariant) => React.ReactNode
  /**
   * Show the leading name column (the group label). When false the table renders
   * with column headers and no name column — the standalone per-group story form.
   * @default true
   */
  showName?: boolean
}
