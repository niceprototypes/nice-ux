import type { AppDocsType, AppEntryType, AppPagesType, AppScenesType } from "../components/App/App.types"

/** A folder's leading number ("2.1 " in "2.1 Stock ticker"), which orders it and is left out of its name. */
const NUMBER = /^\d+(\.\d+)*\s+/

/** A folder's name as the nav shows it: without its number. */
const nameOf = (folder: string) => folder.replace(NUMBER, "")

/** A name as a URL segment: lower case, `&` as "and", every other run of non-alphanumerics a hyphen. */
const slugOf = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

/** The URL sections and the folder each is globbed from; the nav lists them in this order. */
const SECTIONS = ["stories", "docs"] as const

type Section = (typeof SECTIONS)[number]

/** The folders under a section's folder in a glob key (`./stories/3 Accessibility/4 Labels/index.tsx`), its file left out. */
const foldersOf = (key: string, section: Section) => {
  const parts = key.split("/")
  return parts.slice(parts.indexOf(section) + 1, -1)
}

/** A kind's section: docs section pages under `/docs`, scenes and markdown pages under `/stories`. */
const sectionOf = (kind: AppEntryType["kind"]): Section => (kind === "page" ? "docs" : "stories")

/** Folder lists compared level by level, as names with numbers by value ("10 X" after "9 X"). */
const compareFolders = (a: string[], b: string[]) => {
  for (let index = 0; index < Math.min(a.length, b.length); index++) {
    const order = a[index].localeCompare(b[index], undefined, { numeric: true })
    if (order !== 0) return order
  }
  return a.length - b.length
}

/** One entry and the loader of its module (a scene or docs section page) or text (a markdown page). */
export type AppIndexEntry = AppEntryType & { load: () => Promise<unknown> }

const entryOf = (folders: string[], kind: AppEntryType["kind"], load: () => Promise<unknown>): AppIndexEntry => {
  const names = folders.map(nameOf)
  const id = [sectionOf(kind), ...names.map(slugOf)].join("/")
  return { id, url: `/${id}`, folders, names, kind, load }
}

/**
 * The index, in nav order: under `/stories`, every scene (an `index.tsx` two or three folders under
 * `stories/`) and markdown page (an `.md` file, named by its file, two folders under `stories/`);
 * under `/docs`, every docs section page (an `index.tsx` one or more folders under `docs/`).
 * Other depths are left out with a warning.
 */
export const buildAppIndex = (scenes: AppScenesType = {}, docs: AppDocsType = {}, pages: AppPagesType = {}): AppIndexEntry[] => {
  const entries: AppIndexEntry[] = []
  for (const [key, load] of Object.entries(scenes)) {
    const folders = foldersOf(key, "stories")
    if (folders.length === 2 || folders.length === 3) entries.push(entryOf(folders, "scene", load))
    else console.warn(`@niceprototypes/app: ${key} is not stories/<Story>/<Chapter>[/<Scene>]/index.tsx; left out`)
  }
  for (const [key, load] of Object.entries(docs)) {
    const folders = [...foldersOf(key, "stories"), (key.split("/").pop() ?? "").replace(/\.md$/, "")]
    if (folders.length === 3) entries.push(entryOf(folders, "doc", load))
    else console.warn(`@niceprototypes/app: ${key} is not stories/<Story>/<Chapter>/<Page>.md; left out`)
  }
  for (const [key, load] of Object.entries(pages)) {
    const folders = foldersOf(key, "docs")
    if (folders.length >= 1) entries.push(entryOf(folders, "page", load))
    else console.warn(`@niceprototypes/app: ${key} is not docs/[<Folder>/]<Page>/index.tsx; left out`)
  }
  return entries.sort(
    (a, b) => SECTIONS.indexOf(sectionOf(a.kind)) - SECTIONS.indexOf(sectionOf(b.kind)) || compareFolders(a.folders, b.folders),
  )
}
