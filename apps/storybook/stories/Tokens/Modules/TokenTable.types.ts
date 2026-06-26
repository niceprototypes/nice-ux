import * as React from "react"
import type { TokenVariant } from "../../../src/components/TokenTables"

export interface TokenTable {
  /** camelCase token group — the table's name column and the story title. */
  name: string
  /** Prose shown above the table on the standalone story page. */
  description: React.ReactNode
  /** Variant names, or objects with a `variant` key plus preview data. */
  variants: ReadonlyArray<TokenVariant>
  /** Returns the bespoke preview cell for a row, given its variant item. */
  preview: (item: any) => React.ReactNode
}