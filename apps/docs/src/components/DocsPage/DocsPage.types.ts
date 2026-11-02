import type * as React from "react"
import type { ContentsItemsType } from "@niceprototypes/contents"

/**
 * DocsPageSectionType
 *
 * One section of a docs page: an anchor `id` (unique on the page), the `label` Contents lists it
 * by, its `content`, and optional nested `sections`, rendered after the content and listed one
 * level deeper in Contents.
 */
export type DocsPageSectionType = {
  id: string
  label: string
  content?: React.ReactNode
  sections?: ReadonlyArray<DocsPageSectionType>
}

/**
 * DocsPageProps
 *
 * Complete prop definition for the DocsPage component.
 */
export interface DocsPageProps {
  /** The page's sections, in page order */
  sections: ReadonlyArray<DocsPageSectionType>

  /** Cap the sections column at `docs.columnWidth`; off, it takes the width Contents leaves. @default true */
  wrapped?: boolean

  /** Contents rows in place of the sections' (an MDX page lists its headings) */
  contents?: ContentsItemsType
}
