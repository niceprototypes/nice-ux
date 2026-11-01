# @niceprototypes/app

`App`: the app shell. A Tree nav of the project's scenes and docs pages beside the scene region,
where the current one renders. One page, no iframe.

- **The disk is the nav.** Scenes are `stories/<N Story>/<N Chapter>/<N.M Scene>/index.tsx`, or
  `stories/<N Story>/<N Chapter>/index.tsx` for a one-scene chapter (one nav row). The default export
  is the scene component. Folder names are the only metadata: numbers order them by value and are
  left out of names and URLs. Docs pages are `.md` files, `stories/<Story>/<Chapter>/<Page>.md`.
- **URLs.** `/accessibility/context/stock-ticker?device=desktop` is the shell on a scene;
  `/frame/accessibility/context/stock-ticker` is the scene alone, full screen, focused. Navigation keeps
  the query string. Back and forward work.
- **The scene region** is focusable. `useSceneRegion()` returns it, so a scene's keys and clicks act
  only inside it. `useScenes()` returns the index, the current page, `open(entry)` and
  `preload(entry)`, for scenes that move between pages.
- **Router adapters**, subpath exports with optional peer dependencies:
  `@niceprototypes/app/adapters/plain` (`plainRouter`, history API, no dependency),
  `/react-router` (`reactRouter`, React Router 7 library mode), `/tanstack-router` (`tanstackRouter`).

## Usage

```tsx
import App from "@niceprototypes/app"
import { plainRouter } from "@niceprototypes/app/adapters/plain"

const scenes = import.meta.glob("./stories/**/index.tsx")
const docs = import.meta.glob("./stories/*/Overview/*.md", { query: "?raw", import: "default" })

createRoot(root).render(<App scenes={scenes} docs={docs} router={plainRouter} />)
```

`wrapper` wraps every scene (not docs pages) inside the region, with the URL's query parameters: the
place for scene-only providers and styles.

## Props

Prop types are `AppProps`, `AppRouterType`, `AppEntryType` (`App.types.ts`).

Peer dependencies: `@niceprototypes/ink`, `@niceprototypes/styles`, `@niceprototypes/tree`, `react`,
`react-dom`, `styled-components`; optionally `react-router` or `@tanstack/react-router`.
