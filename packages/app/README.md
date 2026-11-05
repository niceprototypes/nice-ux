# @niceprototypes/app

`App`: the app shell. A Tree nav of the project's scenes and docs pages beside the scene region,
where the current one renders. One page, no iframe.

- **The disk is the nav.** Scenes are `stories/<N Story>/<N Chapter>/<N.M Scene>/index.tsx`, or
  `stories/<N Story>/<N Chapter>/index.tsx` for a one-scene chapter (one nav row). The default export
  is the scene component. Folder names are the only metadata: numbers order them by value and are
  left out of names and URLs. Markdown pages in a story are `.md` files, `stories/<Story>/<Chapter>/<Page>.md`.
  Docs section pages are `docs/<N Page>/index.tsx` (default export), or nested in folders
  (`docs/<N Folder>/<N Page>/index.tsx`), named and ordered by the same rules. The `pages` keys need not
  be files: a data-driven docs site builds the record itself. `scenes` is optional (a docs-only app).
- **Nav sections.** The Tree lists the current page's section only, at the top level: on a story page
  the stories (`stories/`) as folders, on a docs section page the docs pages. Search covers both.
- **URLs.** `/stories/accessibility/context/stock-ticker?device=desktop` is the shell on a scene;
  `/frame/stories/accessibility/context/stock-ticker` is the scene alone, full screen, focused.
  `/docs/<page>` (or `/docs/<folder>/<page>`) is a docs section page: a plain scrollable page in the region, without `wrapper`, the
  scene sidebar or its footer. Navigation keeps the query string. Back and forward work.
- **The scene region** is focusable. `useSceneRegion()` returns it, so a scene's keys and clicks act
  only inside it. `useSceneSidebar()` and `useSceneSidebarFooter()` return two
  panels stacked under the nav, the sidebar's width, fixed with it while the region scrolls: the scene
  sidebar, for a scene's own navigation (`createPortal(steps, sidebar)`), and under it the footer, for
  its settings. Each has a drag handle at its top (a separator, arrow keys too) that resizes it between
  the handle alone and its content's height; it opens fully; shorter than its content, the body under
  the handle scrolls without a scrollbar; empty, it takes no space; `null` in the bare view. `panelLabels`
  (`{ sidebar, footer }`) labels the two panels at their top left, on the handle's line
  (`app.panel.label.*`: small, lighter, uppercase, letter-spaced). `useScenes()` returns the index, the current page, `bare` (the bare view
  is on), `open(entry)` and `preload(entry)`, for scenes that move between pages or drop their chrome.
- **`end`** is a column right of the scene region, outside it (the region's clicks, keys and `wrapper`
  never reach it), `app.end.width` wide, with the panels' rule on its start edge. Laptop and up only;
  not rendered below laptop or in the bare view. It stays mounted across page changes.
- **`getAppPageUrl(key)`** gives a docs section page's URL from its `pages` key, for links from outside the router.
- **Router adapters**, subpath exports with optional peer dependencies:
  `@niceprototypes/app/adapters/plain` (`plainRouter`, history API, no dependency),
  `/react-router` (`reactRouter`, React Router 7 library mode), `/tanstack-router` (`tanstackRouter`).

## Usage

```tsx
import App from "@niceprototypes/app"
import { plainRouter } from "@niceprototypes/app/adapters/plain"

const scenes = import.meta.glob("./stories/**/index.tsx")
const docs = import.meta.glob("./stories/*/Overview/*.md", { query: "?raw", import: "default" })
const pages = import.meta.glob("./docs/*/index.tsx")

createRoot(root).render(<App scenes={scenes} docs={docs} pages={pages} router={plainRouter} />)
```

The sidebar's header row, above the nav and the scene sidebar, with the nav's padding, holds the
Nice logo at `app.logo.height` (40); the bare view leaves it out. `search` adds a search button at
the row's end, the large gap from the logo: clicked (or Enter, Space) it expands into a field filling
the row, focused, and collapses back on Escape or when left empty. The field is a combobox over every
page's name and the story, chapter or folder names above it. Names that start with the query come
first, then names that hold it, then pages under a matching story or chapter (ten at most); the arrow
keys and Enter or a click open one, and a pick closes the drawer. Its text is the nav labels' size
from tablet up (`app.search.fontSize`), at least 16px below. The button shows only its icon, no border:
the nav's gray (`app.header.icon.color`), white on hover and focus (`app.header.icon.color:hover`); the field's border stays gray when focused (`app.search.focusColor`) on a pure black fill
at night, pure white by day (`app.search.backgroundColor`).

`docsLink` adds a book icon link after the search, in the same icon-only treatment, that opens the
first docs section page in a new tab (`rel="noopener noreferrer"`).

Below laptop the sidebar is a drawer: the header row gets a menu button
(`aria-expanded`, `aria-controls`) that opens it over the scene region and closes it again. Escape
and picking a page close it; focus moves to the current page's link on opening and back to the button
on closing. `sidebarOpen` controls it, `onSidebarOpenChange` reports each change. Laptop and up the
sidebar always shows beside the region.

The sidebar is at least `app.sidebar.minWidth` wide (a component token, `24em` by default; wider
content widens it). Set it per breakpoint in the app's token map, e.g.
`setTokens({ app: { sidebar: { minWidth: { base: { "desktop+": "32em" } } } } })`.

`wrapper` wraps every scene (not markdown or docs section pages) inside the region, with the URL's query parameters: the
place for scene-only providers and styles.

## Props

Prop types are `AppProps`, `AppRouterType`, `AppScenesType`, `AppDocsType`, `AppPagesType`, `AppEntryType` (`App.types.ts`).

Peer dependencies: `@niceprototypes/button`, `@niceprototypes/ink`, `@niceprototypes/scroll`, `@niceprototypes/styles`, `@niceprototypes/tree`, `react`,
`react-dom`, `styled-components`; optionally `react-router` or `@tanstack/react-router`.
