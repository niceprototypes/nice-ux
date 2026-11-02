import catalog from "../../../manifest/agents/catalog.json"

/** One prop of a component, as the catalog generator reads it from the component's types file. */
export type CatalogPropType = { name: string; type: string; description?: string; default?: string }

/** One documented component: its catalog entry, its package, and its docs folder (Forms, Scroll) if any. */
export type CatalogComponentType = {
  name: string
  package: string
  /** Its folder under Components, from its Storybook docs id (`components-forms-button--docs` → Forms) */
  folder?: string
  /** Its Storybook docs page id (`components-forms-button--docs`) */
  docsId: string
  /** Whether the package exports it by name; otherwise it is the default export */
  named: boolean
  props: CatalogPropType[]
}

/** A folder segment of a docs id as a name: `forms` → Forms. */
const folderName = (segment: string) => segment.charAt(0).toUpperCase() + segment.slice(1)

/**
 * Every component with a Storybook docs page in `manifest/agents/catalog.json`, in catalog order.
 * The docs id's segments between `components` and the page are its folders; the first is kept, so
 * a page nested under another page's folder (Forms/Field/Fieldset) sits beside it.
 */
export const catalogComponents: CatalogComponentType[] = catalog.packages.flatMap(pkg =>
  pkg.components.flatMap(component => {
    if (!component.docs) return []
    const segments = component.docs.replace(/--docs$/, "").split("-").slice(1, -1)
    return [
      {
        name: component.name,
        package: pkg.package,
        folder: segments.length ? folderName(segments[0]) : undefined,
        docsId: component.docs,
        named: (pkg.exports as string[]).includes(component.name),
        props: component.props as CatalogPropType[],
      },
    ]
  }),
)
