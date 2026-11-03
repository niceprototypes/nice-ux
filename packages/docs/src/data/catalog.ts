import catalog from "../../../../manifest/agents/catalog.json"

/** One prop of a component, as the catalog generator reads it from the component's types file. */
export type CatalogPropType = { name: string; type: string; description?: string; default?: string; required?: boolean }

/** One component in the catalog (manifest/agents/catalog.json), with its package. */
export type CatalogEntryType = {
  name: string
  package: string
  /** Its package's folder in the monorepo (`packages/button`) */
  directory: string
  /** Whether the package exports it by name; otherwise it is the default export */
  named: boolean
  props: CatalogPropType[]
  /** Its Storybook docs page id; null for a subcomponent or a component without a page */
  docs: string | null
  /** The component it is a part of (CardHeader → Card); a subcomponent has no page of its own */
  parent?: string
}

/** Every component in the catalog, in catalog order. */
export const catalogEntries: CatalogEntryType[] = catalog.packages.flatMap(pkg =>
  pkg.components.map(component => ({
    name: component.name,
    package: pkg.package,
    directory: pkg.directory,
    named: (pkg.exports as string[]).includes(component.name),
    props: component.props as CatalogPropType[],
    docs: component.docs,
    ...("parent" in component && component.parent ? { parent: component.parent as string } : {}),
  })),
)

/** A component's subcomponents, in catalog order. */
export const subcomponentsOf = (name: string): CatalogEntryType[] => catalogEntries.filter(entry => entry.parent === name)

/** Each token union type by name, as its literal values (`SizeType` → `"smaller" | … | "larger"`). */
export const tokenUnions: Record<string, string> = catalog.tokenUnions
