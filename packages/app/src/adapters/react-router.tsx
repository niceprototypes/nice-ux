import * as React from "react"
import { BrowserRouter, Link as RouterLink, useLocation, useNavigate } from "react-router"
import type { AppNavigateType, AppRouterType } from "../components/App/App.types"

/**
 * The React Router 7 adapter, in library (declarative) mode: the shell runs under a
 * `BrowserRouter` and reads and moves the location through React Router's hooks.
 * Needs the optional peer dependency `react-router`.
 */
export const reactRouter: AppRouterType = {
  Provider: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
  useLocation: () => {
    const { pathname, search } = useLocation()
    return React.useMemo(() => ({ pathname, search }), [pathname, search])
  },
  useNavigate: () => {
    const navigate = useNavigate()
    return React.useCallback<AppNavigateType>((to, options) => void navigate(to, options), [navigate])
  },
  Link: ({ to, children }) => <RouterLink to={to}>{children}</RouterLink>,
}
