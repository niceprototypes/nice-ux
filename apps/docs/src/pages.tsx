import type * as React from "react"
import { getAppPageUrl, type AppPagesType } from "@niceprototypes/app"
import { getItem, getTree, sanitize, type DataItem } from "@niceprototypes/docs/data"
import ComponentPage from "./components/ComponentPage"
import MdxPage, { type MdxModuleType } from "./components/MdxPage"
import TokensPage from "./components/TokensPage"
import { catalogComponents, subcomponentsOf, type CatalogComponentType } from "./catalog"

/** A loaded page module for the App's `pages`. */
const pageOf = (Page: React.ComponentType) => () => Promise.resolve({ default: Page })

/** Names in alphabetical order. */
const byName = (a: string, b: string) => a.localeCompare(b, "en", { sensitivity: "base" })

/** The docs pages (@niceprototypes/docs content), as text (to read each one's Meta title) and as lazy modules. */
const mdxText = import.meta.glob<string>("../../../packages/docs/src/content/*/*.mdx", { query: "?raw", import: "default", eager: true })
const mdxModules = import.meta.glob<MdxModuleType>("../../../packages/docs/src/content/*/*.mdx")

/** Each MDX page's file by its data item id: the sanitized Meta title (`CLI/Dev & Watch` → `cli-dev-watch`). */
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

/** The docs URL of a Storybook page id (`onboarding-tokens--docs`, `components-forms-button--docs`), for links written for Storybook. */
/**
 * Subcomponents' old pages (`/docs/components/cardheader`, `/docs/components/forms/radio`): the
 * parent's URL with its last segment the subcomponent's, now the parent page at its section.
 */
const subcomponentPages = catalogComponents.flatMap(component => {
  const key = entries.find(([, , itemId]) => itemId === component.docsId)?.[0]
  if (!key) return []
  const url = getAppPageUrl(key)
  return subcomponentsOf(component.name).map(sub => ({
    id: sub.name.toLowerCase(),
    from: url.replace(/[^/]+$/, sub.name.toLowerCase()),
    to: `${url}#${sub.name.toLowerCase()}`,
  }))
})

export const docsUrlOf = (storyId: string): string | undefined => {
  // A subcomponent's old Storybook id (`components-cardheader--docs`): its parent's section.
  const sub = storyId.startsWith("components-") ? subcomponentPages.find(page => storyId.replace(/--.*$/, "").endsWith(`-${page.id}`)) : undefined
  if (sub) return sub.to
  // A page of its own wins (Tokens is a folder with its own page); otherwise where it moved.
  const exact = entries.find(([, , itemId]) => itemId === storyId.replace(/--.*$/, ""))?.[0]
  if (exact) return getAppPageUrl(exact)
  const id = moved(storyId.replace(/--.*$/, ""))
  const key = entries.find(([, , itemId]) => itemId === id.page || itemId === storyId)?.[0]
  return key && getAppPageUrl(key) + id.hash
}

/** A folder's first page, depth first: where a group's own (now removed) Overview page went. */
const firstPageOf = (item: DataItem): DataItem => (item.isFolder && item.children.length ? firstPageOf(item.children[0]) : item)

/**
 * Pages that moved: Basics is Onboarding; the Manifest pages are the Welcome page's "For agents"
 * section; a group's Overview (`bindings--docs`) is its first page; CLI pages lost their numbers
 * (`cli-4-dev-watch` is `cli-dev-watch`).
 */
const moved = (id: string): { page: string; hash: string } => {
  if (id === "manifest" || id.startsWith("manifest-")) return { page: "onboarding-welcome", hash: "#for-agents" }
  const renamed = id.replace(/^basics-/, "onboarding-").replace(/^cli-\d+-/, "cli-")
  const item = getItem(renamed)
  return { page: item?.isFolder ? firstPageOf(item).id : renamed, hash: "" }
}

/**
 * The docs URL for an address that no longer exists, or undefined: the Basics and Manifest
 * pages before they moved, subcomponents' old pages, groups' removed Overview pages, numbered
 * CLI pages, and Storybook links
 * (`/?path=/docs/onboarding-themes--docs`).
 */
export const redirectOf = (pathname: string, search: string): string | undefined => {
  const story = new URLSearchParams(search).get("path")?.replace(/^\/docs\//, "")
  if (story) return docsUrlOf(story)
  if (pathname.startsWith("/docs/manifest")) return docsUrlOf("manifest")
  if (pathname.startsWith("/docs/basics")) return pathname.replace(/^\/docs\/basics/, "/docs/onboarding")
  // A group's removed Overview opens its first page; a numbered CLI page, its unnumbered one.
  const path = pathname.replace(/\/+$/, "")
  const urls = entries.map(([key]) => getAppPageUrl(key))
  if (path.endsWith("/overview") && !urls.includes(path)) return urls.find(url => url.startsWith(path.replace(/overview$/, "")))
  if (/^\/docs\/cli\/\d+-/.test(path)) return path.replace(/^\/docs\/cli\/\d+-/, "/docs/cli/")
  return subcomponentPages.find(page => page.from === path)?.to
}
