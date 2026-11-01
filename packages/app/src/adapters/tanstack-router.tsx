import * as React from "react"
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  useRouter,
  useRouterState,
} from "@tanstack/react-router"
import type { AppNavigateType, AppRouterType } from "../components/App/App.types"

/** The shell, handed through the router to its root route, which renders it on every path. */
const ShellContext = React.createContext<React.ReactNode>(null)

const Shell = () => <>{React.useContext(ShellContext)}</>

/** A router whose root route renders the shell, with one catch-all child so every path matches. */
const createShellRouter = () => {
  const rootRoute = createRootRoute({ component: Shell })
  const anyRoute = createRoute({ getParentRoute: () => rootRoute, path: "$", component: () => null })
  return createRouter({ routeTree: rootRoute.addChildren([anyRoute]) })
}

/** An anchor that pushes its path on the router's history; a modified click stays the browser's. */
const Link: AppRouterType["Link"] = ({ to, children }) => {
  const router = useRouter()
  return (
    <a
      href={to}
      onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        event.preventDefault()
        router.history.push(to)
      }}
    >
      {children}
    </a>
  )
}

/**
 * The TanStack Router adapter: the shell runs as the root route of a router with one catch-all
 * route, and reads and moves the location through the router's state and history. Paths keep
 * their query strings as written (`searchStr`). Needs the optional peer dependency
 * `@tanstack/react-router`.
 */
export const tanstackRouter: AppRouterType = {
  Provider: ({ children }) => {
    const [router] = React.useState(createShellRouter)
    return (
      <ShellContext.Provider value={children}>
        <RouterProvider router={router} />
      </ShellContext.Provider>
    )
  },
  useLocation: () => {
    const pathname = useRouterState({ select: state => state.location.pathname })
    const search = useRouterState({ select: state => state.location.searchStr })
    return React.useMemo(() => ({ pathname, search }), [pathname, search])
  },
  useNavigate: () => {
    const router = useRouter()
    return React.useCallback<AppNavigateType>(
      (to, { replace = false } = {}) => (replace ? router.history.replace(to) : router.history.push(to)),
      [router],
    )
  },
  Link,
}
