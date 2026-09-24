import * as React from "react"
import type { TokenGroup, TokenVariants } from "nice-styles"

/**
 * A row's variant: a bare variant name, or an object carrying the `variant`
 * plus any extra data the `preview` render needs (e.g. an SVG path or label).
 */
export type TokenVariant = TokenVariants[TokenGroup] | { variant: TokenVariants[TokenGroup]; [key: string]: unknown }

/** One token group's reference data — the config each `tables/{group}.tsx` exports. */
export interface TokenGroupConfig {
  /** camelCase token group — the table's name column and the story title. */
  name: TokenGroup
  /** Variant names, or objects with a `variant` key plus preview data. */
  variants: ReadonlyArray<TokenVariant>
  /** Returns the bespoke preview cell for a row, given its variant item. */
  preview: (item: TokenVariant) => React.ReactNode
}

/**
 * One section of a `ModuleTokenTable` set:
 * - a **leaf** — a single token group as its own table, or
 * - a **cluster** — several token groups under one `name` heading, each a
 *   sub-table one heading level below.
 */
export type ModuleTokenTableSectionConfig =
  | { group: TokenGroupConfig }
  | { name: React.ReactNode; groups: TokenGroupConfig[] }

export interface ModuleTokenTableProps {
  /** The sections, in render order. */
  sections: ModuleTokenTableSectionConfig[]
}
