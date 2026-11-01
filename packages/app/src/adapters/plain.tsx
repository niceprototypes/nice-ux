import * as React from "react"
import type { AppLocationType, AppNavigateType, AppRouterType } from "../components/App/App.types"

/** Listeners of pushState / replaceState calls made here; the browser's own moves fire popstate. */
const listeners = new Set<() => void>()

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  window.addEventListener("popstate", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("popstate", listener)
  }
}

const getHref = () => `${window.location.pathname}${window.location.search}`

const navigate: AppNavigateType = (to, { replace = false } = {}) => {
  if (replace) window.history.replaceState(null, "", to)
  else window.history.pushState(null, "", to)
  listeners.forEach(listener => listener())
}

const useLocation = (): AppLocationType => {
  const href = React.useSyncExternalStore(subscribe, getHref)
  return React.useMemo(() => {
    const url = new URL(href, window.location.origin)
    return { pathname: url.pathname, search: url.search }
  }, [href])
}

/** An anchor that pushes its path; a modified click (new tab, new window) stays the browser's. */
const Link: AppRouterType["Link"] = ({ to, children }) => (
  <a
    href={to}
    onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      navigate(to)
    }}
  >
    {children}
  </a>
)

/**
 * The plain-URL router: the browser's history API, no dependency. The default adapter.
 */
export const plainRouter: AppRouterType = {
  Provider: ({ children }) => <>{children}</>,
  useLocation,
  useNavigate: () => navigate,
  Link,
}
