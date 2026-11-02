import type * as React from "react"
import type { AppPagesType } from "@niceprototypes/app"
import ComponentPage from "./components/ComponentPage"
import TokensPage from "./components/TokensPage"
import { catalogComponents, type CatalogComponentType } from "./catalog"

/** A loaded page module for the App's `pages`. */
const pageOf = (Page: React.ComponentType) => () => Promise.resolve({ default: Page })

/** Names in alphabetical order. */
const byName = (a: string, b: string) => a.localeCompare(b, "en", { sensitivity: "base" })

/** A component's page, bound to its catalog entry. */
const componentPage = (component: CatalogComponentType) => pageOf(() => <ComponentPage component={component} />)

/**
 * The Components section, as the Storybook sidebar orders it: the folders (Forms, Scroll)
 * alphabetically, then the pages outside a folder alphabetically, each folder's pages alphabetically.
 * The numbers order them and are left out of names and URLs (@niceprototypes/app).
 */
const componentPages = (): AppPagesType => {
  const folders = [...new Set(catalogComponents.flatMap(component => (component.folder ? [component.folder] : [])))].sort(byName)
  const sorted = [...catalogComponents].sort((a, b) => byName(a.name, b.name))
  const entries = [
    ...folders.flatMap((folder, folderIndex) =>
      sorted
        .filter(component => component.folder === folder)
        .map((component, index) => [`./docs/2 Components/${folderIndex + 1} ${folder}/${index + 1} ${component.name}/index.tsx`, componentPage(component)] as const),
    ),
    ...sorted
      .filter(component => !component.folder)
      .map((component, index) => [`./docs/2 Components/${folders.length + index + 1} ${component.name}/index.tsx`, componentPage(component)] as const),
  ]
  return Object.fromEntries(entries)
}

/** Every page of the site, keyed as `@niceprototypes/app` reads docs section pages: Tokens, then Components. */
export const pages: AppPagesType = {
  "./docs/1 Tokens/index.tsx": pageOf(TokensPage),
  ...componentPages(),
}
