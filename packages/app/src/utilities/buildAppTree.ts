import type { TreeItemsType, TreeNodeType } from "@niceprototypes/tree"
import type { AppEntryType } from "../components/App/App.types"

type MutableNode = Omit<TreeNodeType, "items"> & { items?: MutableNode[] }

/** The docs section's group row, above its pages when the app also has stories. */
const DOCS_GROUP = "Docs"

/** Whether the docs section's pages sit under a Docs group row: only beside stories, not in a docs-only app. */
const isGrouped = (entries: AppEntryType[]) => entries.some(entry => entry.kind !== "page")

/**
 * The nav's rows from the index: the stories at the top level, then a "Docs" group of the docs
 * section's pages (at the top level themselves in a docs-only app), a folder per story, chapter of
 * several pages or docs folder, and a link per page (a one-scene chapter is one link). Links keep the URL's
 * query string (`search`), so a setting such as `?device=` survives the switch; the current page is active.
 * Each link's URL goes through `href` (the router's, which adds a base path) when given.
 */
export const buildAppTree = (
  entries: AppEntryType[],
  current: AppEntryType | undefined,
  search: string,
  href: (to: string) => string = to => to,
): TreeItemsType => {
  const root: MutableNode[] = []
  const grouped = isGrouped(entries)
  for (const entry of entries) {
    let level = root
    const slugs = entry.id.split("/")
    // Outside the Docs group a row's depth starts under the section: its id still carries the section slug.
    const docsGroup = grouped && entry.kind === "page"
    const skip = docsGroup ? 0 : 1
    const names = docsGroup ? [DOCS_GROUP, ...entry.names] : entry.names
    names.forEach((name, depth) => {
      const id = slugs.slice(0, depth + 1 + skip).join("/")
      if (depth === names.length - 1) {
        level.push({ id, name, icon: null, url: href(`${entry.url}${search}`), status: entry === current ? "active" : undefined })
        return
      }
      let folder = level.find(node => node.id === id)
      if (!folder) {
        folder = { id, name, icon: null, items: [] }
        level.push(folder)
      }
      level = folder.items ?? []
    })
  }
  return root
}

/**
 * The ids of the folders above an entry: its section's, its story's, and its chapter's for a scene of
 * several (a docs page's folders likewise). Ids with no row (the stories section, the docs section in a
 * docs-only app) expand nothing.
 */
export const getAppAncestorIds = (entry: AppEntryType) =>
  entry.id
    .split("/")
    .slice(0, -1)
    .map((_, depth, slugs) => slugs.slice(0, depth + 1).join("/"))
