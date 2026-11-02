import * as React from "react"
import type { TokenGroup, TokenVariants } from "@niceprototypes/styles"

/**
 * A row's variant: a bare variant name, or an object carrying the `variant`
 * plus any extra data the `preview` render needs (e.g. an SVG path or label).
 */
export type TokenVariant = TokenVariants[TokenGroup] | { variant: TokenVariants[TokenGroup]; [key: string]: unknown }

/**
 * The column set a token table renders with (a `columns` key in storybook.json):
 * `tokenModule` leads with a bespoke preview and ends with the current theme's
 * value; `tokenColor` ends with the light and dark values side by side.
 */
export type TokenColumnSetType = "tokenModule" | "tokenColor"

/** One token group's reference data — the config each `tables/{group}.tsx` exports. */
export interface TokenGroupConfig {
  /** camelCase token group — the table's name column and the story title. */
  name: TokenGroup
  /** Variant names, or objects with a `variant` key plus preview data. */
  variants: ReadonlyArray<TokenVariant>
  /** The column set the rows are built for. */
  columnSet: TokenColumnSetType
  /** Returns the bespoke preview cell for a row, given its variant item (`tokenModule` only). */
  preview?: (item: TokenVariant) => React.ReactNode
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
  /** Cap section headings at the content width. @default false */
  sectionWrapped?: boolean
}
