import type { TreeItemsType, TreeNodeType } from "@niceprototypes/tree"
import type { AppEntryType } from "../components/App/App.types"

type MutableNode = Omit<TreeNodeType, "items"> & { items?: MutableNode[] }

/**
 * The nav's rows from the index: a folder per story and per chapter of several pages, and a link
 * per page (a one-scene chapter is one link). Links keep the URL's query string (`search`), so a
 * setting such as `?device=` survives the switch; the current page is active.
 */
export const buildAppTree = (entries: AppEntryType[], current: AppEntryType | undefined, search: string): TreeItemsType => {
  const root: MutableNode[] = []
  for (const entry of entries) {
    let level = root
    const slugs = entry.id.split("/")
    entry.names.forEach((name, depth) => {
      const id = slugs.slice(0, depth + 1).join("/")
      if (depth === entry.names.length - 1) {
        level.push({ id, name, icon: null, url: `${entry.url}${search}`, status: entry === current ? "active" : undefined })
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

/** The ids of the folders above an entry: its story's, and its chapter's for a scene of several. */
export const getAppAncestorIds = (entry: AppEntryType) =>
  entry.id
    .split("/")
    .slice(0, -1)
    .map((_, depth, slugs) => slugs.slice(0, depth + 1).join("/"))
