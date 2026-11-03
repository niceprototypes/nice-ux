import type * as React from "react"
import { getAppPageUrl, type AppPagesType } from "@niceprototypes/app"
import { getTree, sanitize, type DataItem } from "@niceprototypes/docs/data"
import ComponentPage from "./components/ComponentPage"
import MdxPage, { type MdxModuleType } from "./components/MdxPage"
import TokensPage from "./components/TokensPage"
import { catalogComponents, type CatalogComponentType } from "./catalog"

/** A loaded page module for the App's `pages`. */
const pageOf = (Page: React.ComponentType) => () => Promise.resolve({ default: Page })

/** Names in alphabetical order. */
const byName = (a: string, b: string) => a.localeCompare(b, "en", { sensitivity: "base" })

/** The docs pages (@niceprototypes/docs content), as text (to read each one's Meta title) and as lazy modules. */
const mdxText = import.meta.glob<string>("../../../packages/docs/src/content/*/*.mdx", { query: "?raw", import: "default", eager: true })
const mdxModules = import.meta.glob<MdxModuleType>("../../../packages/docs/src/content/*/*.mdx")

/** Each MDX page's file by its data item id: the sanitized Meta title (`CLI/4. Dev & Watch` → `cli-4-dev-watch`). */
const mdxByItemId = new Map(
  Object.entries(mdxText).flatMap(([path, text]) => {
    const title = /<Meta[\s\S]*?title="([^"]+)"/.exec(text)?.[1]
    return title ? [[sanitize(title), path] as const] : []
  }),
)

/** An item's MDX page, wrapped as storybook.json says; none when no file has its title. */
const mdxPage = (item: DataItem, label: string) => {
  const path = mdxByItemId.get(item.id)
  if (!path) return undefined
  return () =>
    mdxModules[path]().then(module => ({
      default: () => <MdxPage id={item.id} label={label} wrapped={item.settings.wrapped === true} Content={module.default} />,
    }))
}

/** A component's page, bound to its catalog entry. */
const componentPage = (component: CatalogComponentType) => pageOf(() => <ComponentPage component={component} />)

/**
 * The Components section, as the Storybook sidebar orders it: the folders (Forms, Scroll)
 * alphabetically, then the pages outside a folder alphabetically, each folder's pages alphabetically
 * after the component the folder is named for.
 */
const componentPages = (section: string): [string, AppPagesType[string], string?][] => {
  const folders = [...new Set(catalogComponents.flatMap(component => (component.folder ? [component.folder] : [])))].sort(byName)
  const sorted = [...catalogComponents].sort((a, b) => byName(a.name, b.name))
  // A component named like a folder (Scroll beside FadeOnScroll and the others in Scroll) is that
  // folder's first page: a page and a folder cannot share a URL.
  const folderOf = (component: CatalogComponentType) => component.folder ?? (folders.includes(component.name) ? component.name : undefined)
  const inFolder = (component: CatalogComponentType, folder: string) =>
    folderOf(component) === folder ? (component.name === folder ? 0 : 1) : -1
  return [
    ...folders.flatMap((folder, folderIndex) =>
      sorted
        .filter(component => inFolder(component, folder) >= 0)
        .sort((a, b) => inFolder(a, folder) - inFolder(b, folder))
        .map((component, index): [string, AppPagesType[string], string] => [
          `./docs/${section}/${folderIndex + 1} ${folder}/${index + 1} ${component.name}/index.tsx`,
          componentPage(component),
          component.docsId,
        ]),
    ),
    ...sorted
      .filter(component => !folderOf(component))
      .map((component, index): [string, AppPagesType[string], string] => [
        `./docs/${section}/${folders.length + index + 1} ${component.name}/index.tsx`,
        componentPage(component),
        component.docsId,
      ]),
  ]
}

/**
 * One section of storybook.json: its overview page (an MDX titled as the section) first, then
 * each page in data order, each a folder's pages in turn.
 */
const sectionPages = (item: DataItem, section: string): [string, AppPagesType[string], string?][] => {
  const overview = mdxPage(item, "Overview")
  const own: [string, AppPagesType[string], string?][] = overview ? [[`./docs/${section}/0 Overview/index.tsx`, overview, item.id]] : []
  return [
    ...own,
    ...item.children.flatMap((child, index) => {
      const folder = `${section}/${index + 1} ${child.name}`
      if (child.isFolder) return sectionPages(child, folder)
      const page = mdxPage(child, child.name)
      return page ? [[`./docs/${folder}/index.tsx`, page, child.id] as [string, AppPagesType[string], string]] : []
    }),
  ]
}

/**
 * Every page in nav order, with the Storybook id each one replaces: the storybook.json sections
 * (Basics, Manifest, Bindings, Configuration, CLI), where Tokens is the all-tokens page and the
 * catalog's Components follow it.
 */
const entries: [string, AppPagesType[string], string?][] = getTree().flatMap((item, index) => {
  const section = `${index + 1} ${item.name}`
  if (item.id === "tokens")
    return [
      [`./docs/${section}/index.tsx`, pageOf(TokensPage), item.id],
      ...componentPages(`${index + 1}.5 Components`),
    ] as [string, AppPagesType[string], string?][]
  return sectionPages(item, section)
})

/** Every page of the site, keyed as `@niceprototypes/app` reads docs section pages. */
export const pages: AppPagesType = Object.fromEntries(entries.map(([key, load]) => [key, load]))

/** The docs URL of a Storybook page id (`basics-tokens--docs`, `components-forms-button--docs`), for links written for Storybook. */
export const docsUrlOf = (storyId: string): string | undefined => {
  const id = storyId.replace(/--.*$/, "")
  const key = entries.find(([, , itemId]) => itemId === id || itemId === storyId)?.[0]
  return key && getAppPageUrl(key)
}
