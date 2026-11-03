import { catalogEntries, type CatalogEntryType } from "@niceprototypes/docs/data/catalog"

export type { CatalogPropType } from "@niceprototypes/docs/data/catalog"
export { tokenUnions, subcomponentsOf } from "@niceprototypes/docs/data/catalog"

/** One component with its own page: its catalog entry and its docs folder (Forms, Scroll) if any. */
export type CatalogComponentType = CatalogEntryType & {
  /** Its folder under Components, from its Storybook docs id (`components-forms-button--docs` → Forms) */
  folder?: string
  /** Its Storybook docs page id (`components-forms-button--docs`) */
  docsId: string
}

/** A folder segment of a docs id as a name: `forms` → Forms. */
const folderName = (segment: string) => segment.charAt(0).toUpperCase() + segment.slice(1)

/**
 * Every component with its own page (a Storybook docs page in the catalog; subcomponents are
 * sections of their parent's page), in catalog order. The docs id's segments between
 * `components` and the page are its folders; the first is kept, so a page nested under another
 * page's folder (Forms/Field/Fieldset) sits beside it.
 */
export const catalogComponents: CatalogComponentType[] = catalogEntries.flatMap(entry => {
  if (!entry.docs || entry.parent) return []
  const segments = entry.docs.replace(/--docs$/, "").split("-").slice(1, -1)
  return [{ ...entry, folder: segments.length ? folderName(segments[0]) : undefined, docsId: entry.docs }]
})
