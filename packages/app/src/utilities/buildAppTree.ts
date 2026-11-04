import type { TreeItemsType, TreeNodeType } from "@niceprototypes/tree"
import type { AppEntryType } from "../components/App/App.types"

type MutableNode = Omit<TreeNodeType, "items"> & { items?: MutableNode[] }

/** Whether an entry is in the docs section (`/docs`) rather than the stories (`/stories`). */
const isDocs = (entry: AppEntryType | undefined) => entry?.kind === "page"

/**
 * The nav's rows from the index, for the current page's section only: on a story page the stories,
 * on a docs section page the docs pages, at the top level; a folder per story, chapter of several
 * pages or docs folder, and a link per page (a one-scene chapter is one link). Links keep the URL's
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
  // Before a page is current (the root, on its way to the first page), the first page's section.
  const docs = isDocs(current ?? entries[0])
  for (const entry of entries.filter(entry => isDocs(entry) === docs)) {
    let level = root
    const slugs = entry.id.split("/")
    // A row's depth starts under the section: its id still carries the section slug.
    entry.names.forEach((name, depth) => {
      const id = slugs.slice(0, depth + 2).join("/")
      if (depth === entry.names.length - 1) {
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
 * several (a docs page's folders likewise). The section's id has no row and expands nothing.
 */
export const getAppAncestorIds = (entry: AppEntryType) =>
  entry.id
    .split("/")
    .slice(0, -1)
    .map((_, depth, slugs) => slugs.slice(0, depth + 1).join("/"))
