import type * as React from "react"

/**
 * AppLocationType
 *
 * The URL the router is on: its path (`/stories/accessibility/context/stock-ticker`) and its query
 * string, with the leading `?` (`?device=desktop`), or `""`.
 */
export type AppLocationType = { pathname: string; search: string }

/**
 * AppNavigateType
 *
 * Goes to a path with its query string; `replace` swaps the current history entry instead of
 * adding one.
 */
export type AppNavigateType = (to: string, options?: { replace?: boolean }) => void

/**
 * AppRouterType
 *
 * The router adapter the shell runs on: the only routing surface it uses. Adapters ship as
 * subpath exports (`@niceprototypes/app/adapters/plain`, `/react-router`, `/tanstack-router`).
 * - Provider: wraps the shell (a router's context), or passes its children through
 * - useLocation: the current location; re-renders on every change, back and forward included
 * - useNavigate: a function that goes to a path
 * - Link: an anchor that navigates on the router instead of loading the page
 */
export type AppRouterType = {
  Provider: React.ComponentType<{ children?: React.ReactNode }>
  useLocation: () => AppLocationType
  useNavigate: () => AppNavigateType
  Link: React.ComponentType<{ to: string; children?: React.ReactNode }>
}

/**
 * AppScenesType
 *
 * A lazy `import.meta.glob` of every `index.tsx` under `stories/`, keyed by path. Folder depth is the level:
 * `stories/<N Story>/<N Chapter>/<N.M Scene>/index.tsx`, or `stories/<N Story>/<N Chapter>/index.tsx`
 * for a one-scene chapter. The module's default export is the scene.
 */
export type AppScenesType = Record<string, () => Promise<{ default: React.ComponentType }>>

/**
 * AppDocsType
 *
 * A lazy `import.meta.glob` of markdown docs pages as text (`{ query: "?raw", import: "default" }`),
 * keyed by path: `stories/<Story>/<Chapter>/<Page>.md`. Each file is one page of its chapter, named
 * by the file.
 */
export type AppDocsType = Record<string, () => Promise<string>>

/**
 * AppPagesType
 *
 * A lazy `import.meta.glob` of every `index.tsx` under `docs/`, keyed by path: the docs section's
 * pages, `docs/<N Page>/index.tsx`, one folder each, or nested in folders (`docs/<N Folder>/<N Page>/index.tsx`),
 * which the nav shows as folders. Keys need not be files: a data-driven site builds the record itself.
 * The module's default export is the page.
 */
export type AppPagesType = Record<string, () => Promise<{ default: React.ComponentType }>>

/**
 * AppWrapperType
 *
 * Wraps every scene (not markdown or docs section pages) inside the scene region, with the URL's query parameters:
 * where a project puts its scene-only providers, styles and URL settings (`?device=`).
 */
export type AppWrapperType = React.ComponentType<{ children: React.ReactNode; search: URLSearchParams }>

/**
 * AppEntryType
 *
 * One page of the index, in nav order: a scene or markdown page under `/stories`, or a docs section page under `/docs`.
 * - id: its path without the leading slash, unique (`stories/accessibility/context/stock-ticker`, `docs/getting-started`)
 * - url: its path (`/stories/accessibility/context/stock-ticker`)
 * - folders: its folder names under `stories/` or `docs/`, as on disk (`["3 Accessibility", "2 Context", "2.1 Stock ticker"]`)
 * - names: the same without their numbers, as the nav shows them (`["Accessibility", "Context", "Stock ticker"]`)
 * - kind: "scene", "doc" for a markdown page in a story, or "page" for a docs section page
 */
export type AppEntryType = {
  id: string
  url: string
  folders: string[]
  names: string[]
  kind: "scene" | "doc" | "page"
}

/**
 * AppProps
 *
 * Complete prop definition for the App component.
 */
export interface AppProps {
  /** The scenes: a lazy `import.meta.glob` over `stories/`; absent in a docs-only app */
  scenes?: AppScenesType

  /** The markdown pages in stories: a lazy `import.meta.glob` of `.md` files as text */
  docs?: AppDocsType

  /** The docs section's pages: a lazy `import.meta.glob` over `docs/` */
  pages?: AppPagesType

  /** The router adapter */
  router: AppRouterType

  /** Wraps every scene inside the scene region */
  wrapper?: AppWrapperType

  /** A row at the top of the sidebar, above the nav and the scene sidebar (a logo); absent in the bare view */
  header?: React.ReactNode

  /** Accessible name of the nav landmark */
  "aria-label"?: string
}

const AppTypes = {} as const

namespace AppTypes {
  export type Location = AppLocationType
  export type Navigate = AppNavigateType
  export type Router = AppRouterType
  export type Scenes = AppScenesType
  export type Docs = AppDocsType
  export type Pages = AppPagesType
  export type Wrapper = AppWrapperType
  export type Entry = AppEntryType
  export type Props = AppProps
}

export default AppTypes
