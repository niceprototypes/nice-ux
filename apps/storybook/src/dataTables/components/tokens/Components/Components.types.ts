import * as React from "react"
import type { ComponentPrefix } from "@niceprototypes/styles"

/**
 * A node in a component's generated token tree — a resolved string leaf, or a
 * nested map of child nodes.
 */
export type ComponentTokenNode = string | { [key: string]: ComponentTokenNode }

/** A component prefix that ships component tokens (re-export of `ComponentPrefix`). */
export type ComponentPrefixWithTokens = ComponentPrefix

/** A single resolved leaf token within a component's token tree. */
export interface ComponentTokenRow {
  /** Full path from the top-level group to the leaf (e.g. `["status","primary","backgroundColor","base"]`). */
  path: string[]
  /** Human label for the row beneath its group (e.g. `dark`, or `borderColor: primary.base` for status tokens). */
  variant: string
  /** The component CSS variable this leaf defines (e.g. `--np--button--size`). */
  cssVar: string
  /** The raw value the variable is initialized to (a core `var(--np--…)` reference or a literal string). */
  value: string
  /** True when `value` wires to a core token (contains a `var(--np--…)` reference, including via `calc(...)`). */
  isCoreToken: boolean
}

/** One top-level token group within a component (e.g. `size`, `status`) and its leaf rows. */
export interface ComponentTokenGroup {
  /** Top-level group name — the leading path segment. */
  name: string
  rows: ComponentTokenRow[]
}

/** Props for the `ComponentTokenTable` renderer. */
export interface ComponentTokenTableProps {
  /** The component prefix whose token tree is rendered. */
  prefix: ComponentPrefixWithTokens
  /** Docs page: nest groups under the component name (h2 → h3). Substory pages omit it and render groups flat. */
  nested?: boolean
}

/** The prop overrides for one example; values come from token data, so typing is loose. */
export type Overrides = Record<string, string>

/** How a component's example cell renders when the token maps to a dedicated prop. */
export interface ExampleConfig {
  /** token group name → the component prop that varies it */
  props: Record<string, string>
  /** render the component with the given prop override (empty object = base) */
  render: (override: Overrides) => React.ReactNode
}

/**
 * How a component's example cell renders when the token has no dedicated prop —
 * its resolved value is forced onto the CSS property it drives.
 */
export interface OverrideConfig {
  /** Render the target component with the demo style override applied. */
  render: (styles: React.CSSProperties) => React.ReactNode
  /** token group name → demo style built from that variant's resolved token value */
  css: Record<string, (tokenValue: string) => React.CSSProperties>
}