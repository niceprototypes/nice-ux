import * as React from "react"
import type { DataColumn, DataRowItem } from "../DataTable/DataTable.types"

/** Heading elements a title can be rendered as. */
export type DataTablesTitleAs = "h1" | "h2" | "h3" | "h4" | "p" | "span"

/** How the sections are laid out relative to one another. */
export type DataTablesLayout = "aligned" | "sectioned"

/** Fields common to every section, whether leaf or cluster. */
interface DataSectionBase {
  /** Stable React key (falls back to a string `name`, then index). */
  id?: string
  /**
   * The section's label. In `aligned` layout it is the name rendered above the
   * section's rows; in `sectioned` layout it is the section heading. When
   * omitted in `sectioned`, the heading level derives from the nesting depth
   * (one below the parent); set `titleAs` to pin it.
   */
  name?: React.ReactNode
  /**
   * Heading element for this section's `name` (`sectioned` only). When omitted,
   * the level is one below the parent's (`h2`-seeded → top sections default `h3`).
   */
  titleAs?: DataTablesTitleAs
}

/** A leaf section: renders its own rows. The only form `aligned` layout supports. */
export interface DataLeafSection extends DataSectionBase {
  /** The section's rows. */
  rows: DataRowItem[]
  /** (`sectioned`) per-section column override; defaults to the shared `columns`. */
  columns?: DataColumn[]
  sections?: never
}

/**
 * A cluster section: child sections under this section's heading instead of
 * rows. `sectioned` layout only — lets an `h2` group hold several `h3` sub-tables
 * as data, rather than a caller hand-rolling the nesting.
 */
export interface DataClusterSection extends DataSectionBase {
  /** The child sections, rendered one heading level below this one. */
  sections: DataSection[]
  rows?: never
  columns?: never
}

/** One section within the set — a leaf (its own rows) or a cluster (sub-sections). */
export type DataSection = DataLeafSection | DataClusterSection

export interface DataTablesProps {
  /** Column definitions shared by every section — render policy, headers, widths. */
  columns: DataColumn[]
  /** The sections, in render order. Pass one for a single standalone table. */
  tables: DataSection[]
  /**
   * - `"aligned"` (default): one shared header + a leading name column; sections
   *   read as a single continuous table split into named row-groups (the form
   *   the old `DataTableSet` provided).
   * - `"sectioned"`: each section is independent — its own column header and its
   *   own `name` heading.
   * @default "aligned"
   */
  layout?: DataTablesLayout
  /** Heading rendered once above the whole set — the "all tables" h2. */
  title?: React.ReactNode
  /** Element for the overall `title`. @default "h2" */
  titleAs?: DataTablesTitleAs
  /** Strip CodeBlock card chrome on `shiki` cells. @default false */
  inline?: boolean
  /** Render the column header row. @default true */
  showHeader?: boolean
}
