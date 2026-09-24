import type { ReactNode } from "react"
import type { TokenGroup } from "nice-styles"
import type { TokenVariant } from "../../../components/tokens/Modules"

/** A token table: its name/description/variants plus a per-row preview cell. */
export interface TokenTable {
  /** camelCase token group — the table's name column and the story title. */
  name: TokenGroup
  /** Prose shown above the table on the standalone story page. */
  description: ReactNode
  /** Variant names, or objects with a `variant` key plus preview data. */
  variants: ReadonlyArray<TokenVariant>
  /** Returns the bespoke preview cell for a row, given its variant item. */
  preview: (item: any) => ReactNode
}
