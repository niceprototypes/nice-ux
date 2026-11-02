# @niceprototypes/app

`App`: the app shell. A Tree nav of the project's scenes and docs pages beside the scene region,
where the current one renders. One page, no iframe.

- **The disk is the nav.** Scenes are `stories/<N Story>/<N Chapter>/<N.M Scene>/index.tsx`, or
  `stories/<N Story>/<N Chapter>/index.tsx` for a one-scene chapter (one nav row). The default export
  is the scene component. Folder names are the only metadata: numbers order them by value and are
  left out of names and URLs. Markdown pages in a story are `.md` files, `stories/<Story>/<Chapter>/<Page>.md`.
  Docs section pages are `docs/<N Page>/index.tsx` (default export), named and ordered by the same rules.
- **Nav groups.** The Tree has two top-level groups: Stories, and Docs when there are docs section pages.
- **URLs.** `/stories/accessibility/context/stock-ticker?device=desktop` is the shell on a scene;
  `/frame/stories/accessibility/context/stock-ticker` is the scene alone, full screen, focused.
  `/docs/<page>` is a docs section page: a plain scrollable page in the region, without `wrapper`, the
  scene sidebar or its footer. Navigation keeps the query string. Back and forward work.
- **The scene region** is focusable. `useSceneRegion()` returns it, so a scene's keys and clicks act
  only inside it. `useSceneSidebar()` returns the scene sidebar, the column right of the nav that
  stays fixed with it while the region scrolls, for a scene's own navigation (`createPortal(steps,
  sidebar)`); empty, it takes no space; `null` in the bare view. `useSceneSidebarFooter()` returns the
  footer under the nav and the scene sidebar, the width of both, for a scene's settings: a drag handle at
  its top (a separator, arrow keys too) resizes it between the handle alone and its content's height; it
  opens fully; shorter than its content, the body under the handle scrolls; empty, it takes no space; `null` in the bare view. `useScenes()` returns the index, the current page, `bare` (the bare view
  is on), `open(entry)` and `preload(entry)`, for scenes that move between pages or drop their chrome.
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

`header` is a row at the top of the sidebar, above the nav and the scene sidebar, with the nav's
padding (a logo); the bare view leaves it out.

The sidebar is at least `app.sidebar.minWidth` wide (a component token, `auto` by default: as wide as
its content). Set it per breakpoint in the app's token map, e.g.
`setTokens({ app: { sidebar: { minWidth: { base: { "desktop+": "32em" } } } } })`.

`wrapper` wraps every scene (not markdown or docs section pages) inside the region, with the URL's query parameters: the
place for scene-only providers and styles.

## Props

Prop types are `AppProps`, `AppRouterType`, `AppScenesType`, `AppDocsType`, `AppPagesType`, `AppEntryType` (`App.types.ts`).

Peer dependencies: `@niceprototypes/ink`, `@niceprototypes/styles`, `@niceprototypes/tree`, `react`,
`react-dom`, `styled-components`; optionally `react-router` or `@tanstack/react-router`.
