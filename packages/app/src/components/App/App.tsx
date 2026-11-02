import * as React from "react"
import Tree from "@niceprototypes/tree"
import type { AppEntryType, AppProps } from "./App.types"
import AppDocs from "./AppDocs"
import { AppGlobalStyle, StyledApp, StyledAppNav, StyledAppRegion, StyledAppSidebar } from "./App.styles"
import { AppContext, type AppContextValue } from "../../utilities/AppContext"
import { buildAppIndex, type AppIndexEntry } from "../../utilities/buildAppIndex"
import { buildAppTree, getAppAncestorIds } from "../../utilities/buildAppTree"

/** The bare view's path prefix: `/frame/<page>` shows the page alone, full screen (for recording). */
const FRAME = "/frame"

/** The shell inside the router's Provider, where the router's hooks work. */
const AppShell: React.FC<AppProps> = ({ scenes, docs, router, wrapper: Wrapper, "aria-label": ariaLabel = "Scenes" }) => {
  const location = router.useLocation()
  const navigate = router.useNavigate()
  const index = React.useMemo(() => buildAppIndex(scenes, docs), [scenes, docs])
  const bare = location.pathname === FRAME || location.pathname.startsWith(`${FRAME}/`)
  const path = (bare ? location.pathname.slice(FRAME.length) : location.pathname).replace(/\/+$/, "")
  const current = index.find(entry => entry.url === path)
  const region = React.useRef<HTMLDivElement>(null)
  // A state, not a ref: the scene renders its portal into the sidebar once it is mounted.
  const [sidebar, setSidebar] = React.useState<HTMLDivElement | null>(null)
  const search = React.useMemo(() => new URLSearchParams(location.search), [location.search])

  // Each page's module (or text) loads once; a loaded one renders at once, without a blank frame.
  const loading = React.useRef(new Map<string, Promise<unknown>>())
  const loaded = React.useRef(new Map<string, unknown>())
  const [, setLoadCount] = React.useState(0)
  const load = React.useCallback((entry: AppIndexEntry) => {
    let promise = loading.current.get(entry.id)
    if (!promise) {
      promise = entry.load().then(value => {
        loaded.current.set(entry.id, value)
        return value
      })
      loading.current.set(entry.id, promise)
    }
    return promise
  }, [])
  React.useEffect(() => {
    if (current && !loaded.current.has(current.id)) void load(current).then(() => setLoadCount(count => count + 1))
  }, [current, load])

  // The page on screen: the current one once it has loaded; until then, the one before stays.
  const shown = React.useRef<AppIndexEntry | undefined>(undefined)
  if (current && loaded.current.has(current.id)) shown.current = current

  // The root opens the first page.
  React.useEffect(() => {
    if (!path && index[0]) navigate(`${bare ? FRAME : ""}${index[0].url}${location.search}`, { replace: true })
  }, [bare, index, location.search, navigate, path])

  // The bare view has no nav to start from: focus starts in the scene, so its keys act at once.
  React.useEffect(() => {
    if (bare) region.current?.focus()
  }, [bare])

  // The folders above the current page open whenever it changes, chained there or picked.
  const [expandedIds, setExpandedIds] = React.useState<string[]>(() => (current ? getAppAncestorIds(current) : []))
  React.useEffect(() => {
    if (current) setExpandedIds(ids => [...new Set([...ids, ...getAppAncestorIds(current)])])
  }, [current])

  const context = React.useMemo<AppContextValue>(() => {
    const byId = (entry: AppEntryType) => index.find(({ id }) => id === entry.id)
    return {
      entries: index,
      current,
      bare,
      open: entry => navigate(`${bare ? FRAME : ""}${entry.url}${location.search}`),
      preload: entry => {
        const found = byId(entry)
        if (found) void load(found)
      },
      region,
      sidebar: bare ? null : sidebar,
    }
  }, [bare, current, index, load, location.search, navigate, sidebar])

  const page = (() => {
    const entry = shown.current
    if (!entry) return null
    const value = loaded.current.get(entry.id)
    if (entry.kind === "doc") return <AppDocs text={value as string} Link={router.Link} />
    const Scene = (value as { default: React.ComponentType }).default
    const scene = <Scene key={entry.id} />
    return Wrapper ? <Wrapper search={search}>{scene}</Wrapper> : scene
  })()

  const regionElement = (
    <StyledAppRegion ref={region} tabIndex={-1}>
      {page}
    </StyledAppRegion>
  )

  return (
    <AppContext.Provider value={context}>
      <AppGlobalStyle />
      {bare ? (
        regionElement
      ) : (
        <StyledApp>
          <StyledAppNav>
            <Tree
              aria-label={ariaLabel}
              items={buildAppTree(index, current, location.search)}
              expandedIds={expandedIds}
              onExpandedChange={setExpandedIds}
              onSelect={(node, event) => {
                if (node.url === undefined || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                event.preventDefault()
                navigate(node.url)
              }}
            />
          </StyledAppNav>
          <StyledAppSidebar ref={setSidebar} />
          {regionElement}
        </StyledApp>
      )}
    </AppContext.Provider>
  )
}

/**
 * App
 *
 * The app shell: a Tree nav of the project's scenes and docs pages, found by folder, beside the
 * scene region where the current one renders. Folder names are the only metadata: depth is the
 * level (story, chapter, scene), numbers order them by value and are left out of names and URLs.
 * One page, no iframe: `/accessibility/context/stock-ticker?device=desktop` is the shell on a scene,
 * `/frame/accessibility/context/stock-ticker` the scene alone, full screen. Back and forward work.
 * The router comes in as an adapter (`@niceprototypes/app/adapters/*`).
 *
 * @example
 * ```tsx
 * import App from "@niceprototypes/app"
 * import { plainRouter } from "@niceprototypes/app/adapters/plain"
 *
 * // scenes: import.meta.glob over every index.tsx under ./stories (a literal pattern)
 * <App scenes={scenes} router={plainRouter} />
 * ```
 */
const App: React.FC<AppProps> = props => (
  <props.router.Provider>
    <AppShell {...props} />
  </props.router.Provider>
)

export default App
