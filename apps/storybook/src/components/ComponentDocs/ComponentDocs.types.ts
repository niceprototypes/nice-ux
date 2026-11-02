import type * as React from "react"
import type { ComponentExample } from "../../dataTables/components/demos/Components"

/** A `{Name}.section.mdx` module: its content and its `label` export (the section heading in Contents). */
export interface ComponentDocsSectionModule {
  default: React.ComponentType
  label: string
}

export interface ComponentDocsProps {
  /** Component name; `lowerFirst(component)` is its token prefix, and a Tokens section shows when it has tokens */
  component: string
  /** The component's example facets; each becomes a section labelled by its `name` */
  examples?: Record<string, ComponentExample>
  /** The folder's `*.section.mdx` modules (`import.meta.glob(..., { eager: true })`), keyed by path */
  sections?: Record<string, ComponentDocsSectionModule>
  /** The Docs section: the page intro */
  children: React.ReactNode
}
