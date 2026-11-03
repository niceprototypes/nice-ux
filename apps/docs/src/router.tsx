import * as React from "react"
import type { AppNavigateType, AppRouterType } from "@niceprototypes/app"
import { plainRouter } from "@niceprototypes/app/adapters/plain"

/** The site's base path without its trailing slash: "" at the root, "/ui" under niceprototypes.com/ui. */
const base = import.meta.env.BASE_URL.replace(/\/$/, "")

/** A root-relative path (`/docs/…`, `/?path=…`) under the base; any other address as it is. */
export const withBase = (path: string): string => (path.startsWith("/") && !path.startsWith("//") ? `${base}${path}` : path)

/** A pathname with the base taken off, as the App's page URLs are written. */
export const withoutBase = (pathname: string): string =>
  pathname === base ? "/" : pathname.startsWith(`${base}/`) ? pathname.slice(base.length) : pathname

/** The plain router's navigate (a constant, not a hook), given base-less paths. */
const plainNavigate = plainRouter.useNavigate()
const navigate: AppNavigateType = (to, options) => plainNavigate(withBase(to), options)

/** The plain router, served under the Vite base: the App reads and writes base-less paths. */
export const docsRouter: AppRouterType = {
  Provider: plainRouter.Provider,
  useLocation: () => {
    const location = plainRouter.useLocation()
    return React.useMemo(() => ({ ...location, pathname: withoutBase(location.pathname) }), [location])
  },
  useNavigate: () => navigate,
  Link: ({ to, children }) => <plainRouter.Link to={withBase(to)}>{children}</plainRouter.Link>,
  href: withBase,
}
