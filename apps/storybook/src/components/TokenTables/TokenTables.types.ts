import * as React from "react"
import type { DataTablesTitleAs } from "../DataTables"

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

/**
 * One section of a `TokenTables` set:
 * - a **leaf** — a single token group under its own heading, or
 * - a **cluster** — several token groups grouped under one `name` heading, each
 *   rendered as a sub-table one heading level below.
 */
export type TokenTablesSectionConfig =
  | { group: TokenGroupConfig; titleAs?: DataTablesTitleAs }
  | { name: React.ReactNode; titleAs?: DataTablesTitleAs; groups: TokenGroupConfig[] }

export interface TokenTablesProps {
  /** The sections, in render order. */
  sections: TokenTablesSectionConfig[]
}
