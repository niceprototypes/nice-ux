import * as React from "react"
import Button from "@niceprototypes/button"
import { breakpointKeyMatches, parseBreakpointKey, useBreakpoint } from "@niceprototypes/styles"
import Logo from "@niceprototypes/logo"
import Tree, { useTreeSize } from "@niceprototypes/tree"
import type { AppEntryType, AppProps } from "./App.types"
import AppDocs from "./AppDocs"
import AppPanel from "./AppPanel"
import AppSearch from "./AppSearch"
import {
  AppGlobalStyle,
  StyledApp,
  StyledAppActions,
  StyledAppAside,
  StyledAppDocs,
  StyledAppDocsLink,
  StyledAppDrawer,
  StyledAppHeader,
  StyledAppNav,
  StyledAppNavLabel,
  StyledAppPanelLabel,
  StyledAppRegion,
} from "./App.styles"
import { AppContext, type AppContextValue } from "../../utilities/AppContext"
import { buildAppIndex, type AppIndexEntry } from "../../utilities/buildAppIndex"
import { buildAppTree, getAppAncestorIds } from "../../utilities/buildAppTree"

/** The bare view's path prefix: `/frame/stories/<page>` shows the page alone, full screen (for recording). */
const FRAME = "/frame"

/** Below laptop the sidebar is a drawer, opened from the header row's menu button. */
const DRAWER = parseBreakpointKey("tablet-")

/** What can take focus when the drawer opens, after the current page's link. */
const FOCUSABLE = 'a[href], button:not(:disabled), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/** The shell inside the router's Provider, where the router's hooks work. */
const AppShell: React.FC<AppProps> = ({
  scenes,
  docs,
  pages,
  router,
  wrapper: Wrapper,
  search: searchable,
  docsLink,
  panelLabels,
  "aria-label": ariaLabel = "Scenes",
  navSize,
  sidebarOpen,
  onSidebarOpenChange,
}) => {
  const location = router.useLocation()
  const navigate = router.useNavigate()
  const index = React.useMemo(() => buildAppIndex(scenes, docs, pages), [scenes, docs, pages])
  const bare = location.pathname === FRAME || location.pathname.startsWith(`${FRAME}/`)
  const path = (bare ? location.pathname.slice(FRAME.length) : location.pathname).replace(/\/+$/, "")
  const current = index.find(entry => entry.url === path)
  const region = React.useRef<HTMLDivElement>(null)
  // States, not refs: the scene renders its portals into the sidebar and its footer once they are mounted.
  const [sidebar, setSidebar] = React.useState<HTMLElement | null>(null)
  const [sidebarFooter, setSidebarFooter] = React.useState<HTMLDivElement | null>(null)
  const search = React.useMemo(() => new URLSearchParams(location.search), [location.search])
  const navLabelSize = useTreeSize(navSize)
  // The docs link opens the docs section's first page.
  const docsPage = docsLink ? index.find(entry => entry.kind === "page") : undefined

  // Below laptop, the drawer: closed at first, unless `sidebarOpen` controls it.
  const drawer = !bare && breakpointKeyMatches(DRAWER, useBreakpoint())
  const [ownOpen, setOwnOpen] = React.useState(false)
  const open = drawer && (sidebarOpen ?? ownOpen)
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (sidebarOpen === undefined) setOwnOpen(next)
      onSidebarOpenChange?.(next)
    },
    [onSidebarOpenChange, sidebarOpen],
  )
  const drawerId = React.useId()
  const drawerElement = React.useRef<HTMLDivElement>(null)
  const menu = React.useRef<HTMLButtonElement>(null)

  // Opening moves focus into the drawer, to the current page's link; closing returns it to the menu button.
  const wasOpen = React.useRef(open)
  React.useEffect(() => {
    if (open) {
      const element = drawerElement.current
      ;(element?.querySelector<HTMLElement>('[aria-current="page"]') ?? element?.querySelector<HTMLElement>(FOCUSABLE))?.focus()
    } else if (wasOpen.current) menu.current?.focus()
    wasOpen.current = open
  }, [open])

  // Escape closes the open drawer.
  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, setOpen])

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
      sidebarFooter: bare ? null : sidebarFooter,
    }
  }, [bare, current, index, load, location.search, navigate, sidebar, sidebarFooter])

  const page = (() => {
    const entry = shown.current
    if (!entry) return null
    const value = loaded.current.get(entry.id)
    if (entry.kind === "doc") return <AppDocs text={value as string} Link={router.Link} />
    const Scene = (value as { default: React.ComponentType }).default
    // A docs section page is a plain page: the region's padding, no wrapper (no device frame).
    if (entry.kind === "page") return <StyledAppDocs><Scene key={entry.id} /></StyledAppDocs>
    const scene = <Scene key={entry.id} />
    return Wrapper ? <Wrapper search={search}>{scene}</Wrapper> : scene
  })()

  const regionElement = (
    <StyledAppRegion ref={region} tabIndex={-1} $drawer={drawer}>
      {page}
    </StyledAppRegion>
  )

  return (
    <AppContext.Provider value={context}>
      <AppGlobalStyle />
      {bare ? (
        regionElement
      ) : (
        <StyledApp $drawer={drawer}>
          <StyledAppAside $drawer={drawer}>
            <StyledAppHeader>
              <Logo />
              {(searchable || docsPage) && (
                <StyledAppActions>
                  {searchable && (
                    <AppSearch
                      entries={index}
                      aria-label={`Search ${ariaLabel}`}
                      size={navLabelSize}
                      onGo={entry => {
                        context.open(entry)
                        if (open) setOpen(false)
                      }}
                    />
                  )}
                  {docsPage && (
                    <StyledAppDocsLink>
                      <Button
                        as="a"
                        href={router.href?.(docsPage.url) ?? docsPage.url}
                        target="_blank"
                        // An anchor Button is an inline link unless told otherwise; this one is a square like the search's.
                        inlined={false}
                        size="small"
                        iconLeft="book-open"
                        // Only the icon shows, as on the search square; keyboard focus keeps the border and ring.
                        ghost={{ rest: true, hover: true, active: true }}
                        aria-label="Docs (opens in a new tab)"
                      />
                    </StyledAppDocsLink>
                  )}
                </StyledAppActions>
              )}
              {drawer && (
                <Button
                  ref={menu}
                  iconLeft="menu"
                  aria-label="Menu"
                  aria-expanded={open}
                  aria-controls={drawerId}
                  onClick={() => setOpen(!open)}
                />
              )}
            </StyledAppHeader>
            <StyledAppDrawer ref={drawerElement} id={drawerId} $drawer={drawer} $open={open}>
              {panelLabels?.nav && (
                <StyledAppNavLabel>
                  <StyledAppPanelLabel>{panelLabels.nav}</StyledAppPanelLabel>
                </StyledAppNavLabel>
              )}
              <StyledAppNav>
                <Tree
                  aria-label={ariaLabel}
                  size={navSize}
                  items={buildAppTree(index, current, location.search, router.href)}
                  expandedIds={expandedIds}
                  onExpandedChange={setExpandedIds}
                  onSelect={(node, event) => {
                    if (node.url === undefined || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                    event.preventDefault()
                    // The row's URL is the router's href; navigate takes the entry's own path.
                    const entry = index.find(({ url }) => (router.href?.(`${url}${location.search}`) ?? `${url}${location.search}`) === node.url)
                    if (!entry) return
                    navigate(`${entry.url}${location.search}`)
                    if (open) setOpen(false)
                  }}
                />
              </StyledAppNav>
              <AppPanel aria-label="Resize scene sidebar" label={panelLabels?.sidebar} onContent={setSidebar} />
              <AppPanel aria-label="Resize settings" label={panelLabels?.footer} onContent={setSidebarFooter} />
            </StyledAppDrawer>
          </StyledAppAside>
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
 * scene region where the current one renders, under a header row: the Nice logo and, with `search`, a search field. The nav lists
 * the current page's section at the top level: the stories (`stories/`, at `/stories/...`) as folders on a
 * story page, the docs section pages (`docs/<N Page>/index.tsx`, at `/docs/<page>`, or nested in folders) on a docs page. Folder names are the only metadata: depth is the
 * level (story, chapter, scene), numbers order them by value and are left out of names and URLs.
 * One page, no iframe: `/stories/accessibility/context/stock-ticker?device=desktop` is the shell on a scene,
 * `/frame/stories/accessibility/context/stock-ticker` the scene alone, full screen. Back and forward work.
 * The router comes in as an adapter (`@niceprototypes/app/adapters/*`).
 *
 * @example
 * ```tsx
 * import App from "@niceprototypes/app"
 * import { plainRouter } from "@niceprototypes/app/adapters/plain"
 *
 * // scenes: import.meta.glob over every index.tsx under ./stories (a literal pattern)
 * // pages: import.meta.glob over every index.tsx under ./docs
 * <App scenes={scenes} pages={pages} router={plainRouter} />
 * ```
 */
const App: React.FC<AppProps> = props => (
  <props.router.Provider>
    <AppShell {...props} />
  </props.router.Provider>
)

export default App
