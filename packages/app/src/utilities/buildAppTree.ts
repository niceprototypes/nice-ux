import type { TreeItemsType, TreeNodeType } from "@niceprototypes/tree"
import type { AppEntryType } from "../components/App/App.types"

type MutableNode = Omit<TreeNodeType, "items"> & { items?: MutableNode[] }

/** The nav's top-level groups, by the first segment of an entry's id. */
const GROUPS: Record<string, string> = { stories: "Stories", docs: "Docs" }

/** Whether the nav groups its rows by section: always, except in a docs-only app (docs section pages alone). */
const isGrouped = (entries: AppEntryType[]) => entries.some(entry => entry.kind !== "page")

/**
 * The nav's rows from the index: a top-level group per section ("Stories", and "Docs" when there are
 * docs section pages; none in a docs-only app), a folder per story, chapter of several
 * pages or docs folder, and a link per page (a one-scene chapter is one link). Links keep the URL's
 * query string (`search`), so a setting such as `?device=` survives the switch; the current page is active.
 */
export const buildAppTree = (entries: AppEntryType[], current: AppEntryType | undefined, search: string): TreeItemsType => {
  const root: MutableNode[] = []
  const grouped = isGrouped(entries)
  for (const entry of entries) {
    let level = root
    const slugs = entry.id.split("/")
    // Without groups, a row's depth starts under the section: its id still carries the section slug.
    const skip = grouped ? 0 : 1
    const names = grouped ? [GROUPS[slugs[0]], ...entry.names] : entry.names
    names.forEach((name, depth) => {
      const id = slugs.slice(0, depth + 1 + skip).join("/")
      if (depth === names.length - 1) {
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

/**
 * The ids of the folders above an entry: its group's, its story's, and its chapter's for a scene of
 * several (a docs page's folders likewise). Ids with no row (the group, in an ungrouped nav) expand nothing.
 */
export const getAppAncestorIds = (entry: AppEntryType) =>
  entry.id
    .split("/")
    .slice(0, -1)
    .map((_, depth, slugs) => slugs.slice(0, depth + 1).join("/"))
