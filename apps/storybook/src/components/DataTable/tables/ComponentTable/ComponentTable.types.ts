import * as React from "react"

/**
 * One example row's variant: a bare variant name (the common case — `size`,
 * `borderRadius`, `status`, `state`), or an object carrying `variant` plus any
 * extra data the preview/code render needs (e.g. an `icon` facet's ad-hoc rows).
 *
 * Mirrors the token-table `TokenVariant` so component examples and token tables
 * share the same row-config shape.
 */
export type ExampleVariant = string | { variant: string; [key: string]: unknown }

/**
 * One facet of a React component's examples — e.g. Button's `borderRadius`,
 * `size`, `icon`. The component-example analog of a token group's `TokenTable`:
 * a `name` (table heading + standalone story title), a `description`, the
 * `variants` to demo, and a `preview` renderer.
 *
 * The one difference from a token config: tokens auto-derive their code column,
 * but a component example carries a bespoke `code` snippet per row, so the
 * JS/React column shows real JSX. `preview` / `code` take `any` for the row item
 * (matching the token configs) so a config can pass a variant straight into a
 * union-typed prop without per-facet casting.
 */
export interface ComponentExample {
  /** Facet name — the table heading and the standalone story title (e.g. "borderRadius"). */
  name: string
  /** Prose shown above the table on the standalone story page. */
  description: React.ReactNode
  /** Variant names, or objects with a `variant` key plus preview/code data. */
  variants: ReadonlyArray<ExampleVariant>
  /** The rendered example node (the "example" column) for a row. */
  preview: (item: any) => React.ReactNode
  /** The JS/React source snippet (the "code" column) for a row. */
  code: (item: any) => string
  /**
   * The variant flagged as the default — rendered with a check + "Default"
   * tooltip in the name cell, matching the token tables. @default "base"
   */
  default?: string
}
