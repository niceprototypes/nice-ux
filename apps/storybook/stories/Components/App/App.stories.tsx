import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, waitFor, within } from "storybook/test"
import App from "@niceprototypes/app"
import type { AppLocationType, AppProps, AppRouterType, AppWrapperType, AppNavigateType } from "@niceprototypes/app"
import Flex from "@niceprototypes/flex"
import type { TreeSizeType } from "@niceprototypes/tree"
import Ink from "@niceprototypes/ink"
import LifecycleStory from "@niceprototypes/docs/components/LifecycleStory"

/** The story's router: the location in React state, so the shell navigates without leaving the story's URL. */
const MemoryContext = React.createContext<{ location: AppLocationType; navigate: AppNavigateType } | null>(null)
const useMemory = () => React.useContext(MemoryContext)!

const memoryRouter: AppRouterType = {
  Provider: ({ children }) => {
    const [location, setLocation] = React.useState<AppLocationType>({ pathname: "/docs/welcome", search: "" })
    const navigate = React.useCallback<AppNavigateType>(to => {
      const [pathname, search = ""] = to.split("?")
      setLocation({ pathname, search: search && `?${search}` })
    }, [])
    return <MemoryContext.Provider value={{ location, navigate }}>{children}</MemoryContext.Provider>
  },
  useLocation: () => useMemory().location,
  useNavigate: () => useMemory().navigate,
  Link: ({ to, children }) => {
    const { navigate } = useMemory()
    return (
      <a
        href={to}
        onClick={event => {
          event.preventDefault()
          navigate(to)
        }}
      >
        {children}
      </a>
    )
  },
}

/** A page that shows its name. */
const page = (name: string) => () => Promise.resolve({ default: () => <Ink as="h1">{name}</Ink> })

const PAGES = {
  "./docs/1 Welcome/index.tsx": page("Welcome"),
  "./docs/2 Install/index.tsx": page("Install"),
  "./docs/3 Tokens/index.tsx": page("Tokens"),
}
const SCENES = {
  "./stories/1 Motion/1 Easing/index.tsx": page("Easing"),
  "./stories/1 Motion/2 Duration/index.tsx": page("Duration"),
}
const DOCS = {
  "./stories/1 Motion/Overview/Guide.md": () => Promise.resolve("# Guide\n\nMotion, in two scenes."),
}

/** A scene wrapper with the large gap around each scene. */
const Padded: AppWrapperType = ({ children }) => <Flex padding="large">{children}</Flex>

/** The end column's stand-in content. */
const END = (
  <Flex padding="large">
    <Ink color="lighter">End column</Ink>
  </Flex>
)

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

const NAV_SIZE_OPTIONS = ["small", "base"] as const satisfies readonly TreeSizeType[]

/** `sidebarOpen` unset leaves the drawer to the shell. */
const SIDEBAR_OPEN_OPTIONS = { unset: undefined, open: true, closed: false } as const

/**
 * PlaygroundArgs
 *
 * AppProps with data controls in place of the globs: `withScenes`, `withDocs` and `withPages` add the
 * story's scenes, markdown pages and docs pages; `withWrapper` wraps each scene; `withEnd` fills the end column. The router is the story's own, kept in memory.
 */
type PlaygroundArgs = Omit<AppProps, "scenes" | "docs" | "pages" | "router" | "wrapper" | "end"> & {
  withScenes: boolean
  withDocs: boolean
  withPages: boolean
  withWrapper: boolean
  withEnd: boolean
}

const renderApp = ({ withScenes, withDocs, withPages, withWrapper, withEnd, ...rest }: PlaygroundArgs) => (
  <App
    {...rest}
    scenes={withScenes ? SCENES : undefined}
    docs={withDocs ? DOCS : undefined}
    pages={withPages ? PAGES : undefined}
    router={memoryRouter}
    wrapper={withWrapper ? Padded : undefined}
    end={withEnd ? END : undefined}
  />
)

const meta = {
  title: "Components/App",
  component: App,
  parameters: {
    layout: "fullscreen",
  },
  // Below laptop the sidebar is a drawer behind the header row's menu button.
  globals: { viewport: { value: "mobile2", isRotated: false } },
} satisfies Meta<typeof App>

export default meta

type Story = StoryObj<PlaygroundArgs>

export const Playground: Story = {
  args: {
    withScenes: true,
    withDocs: true,
    withPages: true,
    withWrapper: true,
    withEnd: true,
    "aria-label": "Docs",
    onSidebarOpenChange: fn(),
  },
  argTypes: {
    withScenes: { control: "boolean", table: { category: "Content" } },
    withDocs: { control: "boolean", table: { category: "Content" } },
    withPages: { control: "boolean", table: { category: "Content" } },
    withWrapper: { control: "boolean", table: { category: "Content" } },
    withEnd: { control: "boolean", table: { category: "Content" } },
    search: { control: "boolean", table: { category: "Content" } },
    docsLink: { control: "boolean", table: { category: "Content" } },
    panelLabels: { control: "object", table: { category: "Content" } },

    navSize: {
      control: "select",
      options: [NONE, ...NAV_SIZE_OPTIONS],
      mapping: { [NONE]: undefined },
      table: { category: "Appearance" },
    },

    sidebarOpen: {
      control: "select",
      options: Object.keys(SIDEBAR_OPEN_OPTIONS),
      mapping: SIDEBAR_OPEN_OPTIONS,
      table: { category: "State" },
    },

    "aria-label": { control: "text", table: { category: "Accessibility" } },

    onSidebarOpenChange: { table: { category: "Events" } },
  },
  render: renderApp,
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    await canvas.findByRole("heading", { name: "Welcome" })

    // Closed at first: the nav is hidden behind the menu button.
    const menu = canvas.getByRole("button", { name: "Menu" })
    await expect(menu).toHaveAttribute("aria-expanded", "false")
    await expect(canvas.queryByRole("navigation")).not.toBeInTheDocument()

    // The button opens the drawer, focus on the current page's link; Escape closes it, focus back on the button.
    await userEvent.click(menu)
    await expect(menu).toHaveAttribute("aria-expanded", "true")
    await expect(args.onSidebarOpenChange).toHaveBeenLastCalledWith(true)
    await expect(canvas.getByRole("navigation", { name: "Docs" })).toBeVisible()
    await expect(canvas.getByRole("link", { name: "Welcome" })).toHaveFocus()
    await userEvent.keyboard("{Escape}")
    await expect(menu).toHaveAttribute("aria-expanded", "false")
    await expect(menu).toHaveFocus()

    // Picking a page closes the drawer on that page.
    await userEvent.click(menu)
    await userEvent.click(canvas.getByRole("link", { name: "Install" }))
    await canvas.findByRole("heading", { name: "Install" })
    await expect(menu).toHaveAttribute("aria-expanded", "false")
    await expect(canvas.queryByRole("navigation")).not.toBeInTheDocument()
  },
}

/** `sidebarOpen` controls the drawer: the menu button only reports. */
export const SidebarOpen: Story = {
  ...Playground,
  args: { ...Playground.args, sidebarOpen: true },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    const menu = await canvas.findByRole("button", { name: "Menu" })
    await expect(menu).toHaveAttribute("aria-expanded", "true")
    await userEvent.click(menu)
    await expect(args.onSidebarOpenChange).toHaveBeenLastCalledWith(false)
    await expect(menu).toHaveAttribute("aria-expanded", "true")
  },
}

/** `search` adds a search button at the header row's end that expands into a field opening a matching page. */
export const Search: Story = {
  ...Playground,
  args: { ...Playground.args, search: true },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement)
    await canvas.findByRole("heading", { name: "Welcome" })
    await userEvent.click(canvas.getByRole("button", { name: "Search Docs" }))
    await userEvent.type(canvas.getByRole("combobox", { name: "Search Docs" }), "dur")
    await userEvent.keyboard("{Enter}")
    await canvas.findByRole("heading", { name: "Duration" })
  },
}

/** At tablet width the sidebar is still the drawer behind the menu button; from laptop up it shows beside the pages. */
export const Tablet: Story = {
  ...Playground,
  globals: { viewport: { value: "tablet", isRotated: false } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const menu = await canvas.findByRole("button", { name: "Menu" })
    await expect(menu).toHaveAttribute("aria-expanded", "false")
    await waitFor(() => expect(canvas.queryByRole("navigation", { name: "Docs" })).not.toBeInTheDocument())
  },
}

/** From laptop up the end column shows right of the pages and stays across page changes; below laptop it is not rendered. */
export const End: Story = {
  ...Playground,
  globals: { viewport: { value: "desktop", isRotated: false } },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement)
    await canvas.findByRole("heading", { name: "Welcome" })
    const end = canvas.getByText("End column")
    await userEvent.click(canvas.getByRole("link", { name: "Install" }))
    await canvas.findByRole("heading", { name: "Install" })
    await expect(canvas.getByText("End column")).toBe(end)
  },
}

/** The drawer looping: closed, then open over the page. */
export const Lifecycle: Story = {
  args: Playground.args,
  render: args => (
    <LifecycleStory
      steps={[
        { label: "drawer closed", props: { sidebarOpen: false } },
        { label: "drawer open", props: { sidebarOpen: true } },
      ]}
      render={({ sidebarOpen }: Pick<AppProps, "sidebarOpen">) => renderApp({ ...args, sidebarOpen })}
    />
  ),
}
