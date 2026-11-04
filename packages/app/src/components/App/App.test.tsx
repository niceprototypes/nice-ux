import * as React from "react"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import App from "."
import type { AppRouterType } from "./App.types"
import { createPortal } from "react-dom"
import { getAppPageUrl, useSceneRegion, useScenes, useSceneSidebar, useSceneSidebarFooter } from "../../services"
import { plainRouter } from "../../adapters/plain"
import { reactRouter } from "../../adapters/react-router"
import { tanstackRouter } from "../../adapters/tanstack-router"

const scene = (text: string) => () => Promise.resolve({ default: () => <p>{text}</p> })

/** A scene that opens the next page through useScenes, as a stepper's chain does, and shows whether the bare view is on. */
const Chaining = () => {
  const { entries, current, bare, open } = useScenes()
  const next = entries[entries.findIndex(entry => entry === current) + 1]
  return <button data-bare={bare} onClick={() => next && open(next)}>next</button>
}

/** A scene that portals its steps into the scene sidebar, as the studio's step list does. */
const WithSteps = () => {
  const sidebar = useSceneSidebar()
  return (
    <>
      <p>with steps</p>
      {sidebar && createPortal(<p>steps</p>, sidebar)}
    </>
  )
}

/** A scene that portals its settings into the sidebar's footer, as the studio's controls do. */
const WithSettings = () => {
  const footer = useSceneSidebarFooter()
  return (
    <>
      <p>with settings</p>
      {footer && createPortal(<p>settings</p>, footer)}
    </>
  )
}

const scenes = {
  "./stories/3 Gamma/2 Settings/index.tsx": () => Promise.resolve({ default: WithSettings }),
  "./stories/3 Gamma/1 Steps/index.tsx": () => Promise.resolve({ default: WithSteps }),
  "./stories/2 Beta/10 Ten/index.tsx": scene("ten"),
  "./stories/2 Beta/9 Nine/index.tsx": scene("nine"),
  "./stories/1 Alpha/2 Pair/2.2 Second/index.tsx": scene("second"),
  "./stories/1 Alpha/2 Pair/2.1 First & last/index.tsx": () => Promise.resolve({ default: Chaining }),
  "./stories/1 Alpha/1 Solo/index.tsx": scene("solo"),
}
const docs = { "./stories/1 Alpha/Overview/Guide.md": () => Promise.resolve("# Guide\n\nRead [solo](/stories/alpha/solo).") }
const pages = {
  "./docs/10 Ten pages/index.tsx": scene("ten pages"),
  "./docs/2 Getting started/index.tsx": scene("getting started"),
}

const adapters: [string, AppRouterType][] = [
  ["plain", plainRouter],
  ["react-router", reactRouter],
  ["tanstack-router", tanstackRouter],
]

describe.each(adapters)("App on the %s adapter", (_, router) => {
  beforeEach(() => window.history.replaceState(null, "", "/"))

  it("opens the first scene from the root, keeping the query string", async () => {
    window.history.replaceState(null, "", "/?device=desktop")
    render(<App scenes={scenes} docs={docs} router={router} />)
    expect(await screen.findByText("solo")).toBeInTheDocument()
    expect(window.location.pathname + window.location.search).toBe("/stories/alpha/solo?device=desktop")
  })

  it("lists stories at the top level, then chapters and scenes, in folder order, numbers by value and left out of names", async () => {
    window.history.replaceState(null, "", "/stories/beta/nine")
    render(<App scenes={scenes} docs={docs} router={router} />)
    await screen.findByText("nine")
    const rows = screen.getAllByRole("link", { hidden: true }).map(link => link.textContent)
    expect(rows).toEqual(["Solo", "First & last", "Second", "Guide", "Nine", "Ten", "Steps", "Settings"])
    expect(screen.queryByRole("button", { name: "Docs" })).not.toBeInTheDocument()
    expect(screen.queryByRole("button", { name: "Stories" })).not.toBeInTheDocument()
    expect(screen.getAllByRole("button").map(button => button.textContent)).toEqual(["Alpha", "Beta", "Gamma"])
    expect(screen.getByRole("link", { name: "Nine" })).toHaveAttribute("aria-current", "page")
    expect(screen.getByRole("button", { name: "Beta" })).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByRole("button", { name: "Alpha" })).toHaveAttribute("aria-expanded", "false")
  })

  it("lists the docs section's pages under a Docs group after the stories, in folder order", async () => {
    window.history.replaceState(null, "", "/docs/getting-started")
    render(<App scenes={scenes} docs={docs} pages={pages} router={router} />)
    await screen.findByText("getting started")
    const groups = screen.getAllByRole("button", { hidden: true }).map(button => button.textContent)
    expect(groups.slice(0, 1)).toEqual(["Alpha"])
    expect(groups.at(-1)).toBe("Docs")
    expect(screen.getByRole("button", { name: "Docs" })).toHaveAttribute("aria-expanded", "true")
    const rows = screen.getAllByRole("link", { hidden: true }).map(link => link.textContent)
    expect(rows.slice(-2)).toEqual(["Getting started", "Ten pages"])
    expect(screen.getByRole("link", { name: "Getting started" })).toHaveAttribute("aria-current", "page")
  })

  it("lists a docs-only app's nested pages at the top level, as folders, without a group row", async () => {
    const nested = {
      "./docs/2 Components/2 Forms/1 Button/index.tsx": scene("button page"),
      "./docs/2 Components/1 Card/index.tsx": scene("card page"),
      "./docs/1 Tokens/index.tsx": scene("tokens page"),
    }
    window.history.replaceState(null, "", "/docs/components/forms/button")
    render(<App pages={nested} router={router} />)
    expect(await screen.findByText("button page")).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: "Docs" })).not.toBeInTheDocument()
    const rows = screen.getAllByRole("link", { hidden: true }).map(link => link.textContent)
    expect(rows).toEqual(["Tokens", "Card", "Button"])
    expect(screen.getByRole("button", { name: "Components" })).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByRole("button", { name: "Forms" })).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByRole("link", { name: "Button" })).toHaveAttribute("aria-current", "page")
  })

  it("renders a docs section page without the wrapper or a scene's sidebar", async () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => <div data-testid="wrapper">{children}</div>
    window.history.replaceState(null, "", "/docs/ten-pages")
    render(<App scenes={scenes} pages={pages} router={router} wrapper={Wrapper} />)
    expect(await screen.findByText("ten pages")).toBeInTheDocument()
    expect(screen.queryByTestId("wrapper")).not.toBeInTheDocument()
    expect(screen.queryByRole("separator")).not.toBeInTheDocument()
  })

  it("navigates from the nav and back and forward", async () => {
    window.history.replaceState(null, "", "/stories/alpha/solo")
    render(<App scenes={scenes} docs={docs} router={router} />)
    await screen.findByText("solo")
    fireEvent.click(screen.getByRole("button", { name: "Pair" }))
    fireEvent.click(screen.getByRole("link", { name: "Second", hidden: true }))
    expect(await screen.findByText("second")).toBeInTheDocument()
    expect(window.location.pathname).toBe("/stories/alpha/pair/second")
    await act(async () => window.history.back())
    expect(await screen.findByText("solo")).toBeInTheDocument()
    await act(async () => window.history.forward())
    expect(await screen.findByText("second")).toBeInTheDocument()
  })

  it("lets a scene open the next page, and renders a docs page", async () => {
    window.history.replaceState(null, "", "/stories/alpha/pair/first-and-last")
    render(<App scenes={scenes} docs={docs} router={router} />)
    expect(await screen.findByText("next")).toHaveAttribute("data-bare", "false")
    fireEvent.click(screen.getByText("next"))
    expect(await screen.findByText("second")).toBeInTheDocument()
    await act(async () => {
      window.history.pushState(null, "", "/stories/alpha/overview/guide")
      window.dispatchEvent(new PopStateEvent("popstate"))
    })
    expect(await screen.findByRole("heading", { name: "Guide" })).toBeInTheDocument()
  })

  it("shows the bare view without the nav, the scene region focused", async () => {
    const Wrapper = ({ children, search }: { children: React.ReactNode; search: URLSearchParams }) => (
      <div data-testid="wrapper" data-device={search.get("device") ?? ""}>{children}</div>
    )
    window.history.replaceState(null, "", "/frame/stories/beta/ten?device=phone")
    render(<App scenes={scenes} router={router} wrapper={Wrapper} />)
    expect(await screen.findByText("ten")).toBeInTheDocument()
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
    expect(screen.getByTestId("wrapper")).toHaveAttribute("data-device", "phone")
    await waitFor(() => expect(screen.getByTestId("wrapper").parentElement).toHaveFocus())
  })

  it("renders a scene's sidebar right of the nav, outside the scene region; none on other pages or the bare view", async () => {
    let region: HTMLElement | null = null
    const Region = ({ children }: { children: React.ReactNode }) => {
      region = useSceneRegion().current
      return <>{children}</>
    }
    window.history.replaceState(null, "", "/stories/gamma/steps")
    const { unmount } = render(<App scenes={scenes} router={router} wrapper={Region} />)
    await screen.findByText("with steps")
    const steps = await screen.findByText("steps")
    const sidebar = steps.parentElement!
    expect(sidebar.previousElementSibling).toContainElement(screen.getByRole("navigation"))
    expect(region).not.toContainElement(steps)
    await act(async () => {
      window.history.pushState(null, "", "/stories/alpha/solo")
      window.dispatchEvent(new PopStateEvent("popstate"))
    })
    await screen.findByText("solo")
    expect(sidebar).toBeEmptyDOMElement()
    unmount()
    window.history.replaceState(null, "", "/frame/stories/gamma/steps")
    render(<App scenes={scenes} router={router} />)
    await screen.findByText("with steps")
    expect(screen.queryByText("steps")).not.toBeInTheDocument()
  })

  it("renders the logo in the header row above the nav and the scene sidebar; none in the bare view", async () => {
    window.history.replaceState(null, "", "/stories/gamma/steps")
    const { unmount } = render(<App scenes={scenes} router={router} />)
    await screen.findByText("steps")
    const header = screen.getByRole("img", { name: "Nice Prototypes" }).parentElement!
    expect(header.nextElementSibling).toContainElement(screen.getByRole("navigation"))
    expect(header.nextElementSibling).toContainElement(screen.getByText("steps"))
    // The header carries the gap below it; the scrolling nav under it has no top padding to scroll away.
    expect(getComputedStyle(header).paddingBlockEnd).toBe("var(--np--gap)")
    expect(getComputedStyle(screen.getByRole("navigation").parentElement!).paddingBlockStart).toBe("0")
    unmount()
    window.history.replaceState(null, "", "/frame/stories/gamma/steps")
    render(<App scenes={scenes} router={router} />)
    await screen.findByText("with steps")
    expect(screen.queryByRole("img", { name: "Nice Prototypes" })).not.toBeInTheDocument()
  })

  it("sizes the sidebar from the app.sidebar.minWidth token", async () => {
    window.history.replaceState(null, "", "/stories/alpha/solo")
    render(<App scenes={scenes} router={router} />)
    await screen.findByText("solo")
    // nav → its column → the columns → the drawer → the sidebar
    const aside = screen.getByRole("navigation").closest("div")!.parentElement!.parentElement!.parentElement!
    expect(aside).toHaveStyle({ minWidth: "var(--np--app--sidebar--min-width)" })
  })

  it("tells a scene the bare view is on", async () => {
    window.history.replaceState(null, "", "/frame/stories/alpha/pair/first-and-last")
    render(<App scenes={scenes} router={router} />)
    expect(await screen.findByText("next")).toHaveAttribute("data-bare", "true")
  })
})

describe("App below tablet", () => {
  const innerWidth = window.innerWidth
  /** Resizes the window, as useBreakpoint reads it. */
  const resize = (width: number) =>
    act(() => {
      window.innerWidth = width
      window.dispatchEvent(new Event("resize"))
    })

  beforeEach(() => {
    window.history.replaceState(null, "", "/stories/beta/nine")
    resize(390)
  })
  afterEach(() => resize(innerWidth))

  const renderPhone = async (props: Partial<React.ComponentProps<typeof App>> = {}) => {
    render(<App scenes={scenes} router={plainRouter} {...props} />)
    await screen.findByText("nine")
    return screen.getByRole("button", { name: "Menu" })
  }

  it("hides the sidebar behind a menu button in the header row, which controls the drawer", async () => {
    const menu = await renderPhone()
    expect(screen.getByRole("img", { name: "Nice Prototypes" }).parentElement).toContainElement(menu)
    expect(menu).toHaveAttribute("aria-expanded", "false")
    const drawer = document.getElementById(menu.getAttribute("aria-controls")!)!
    expect(drawer).toContainElement(screen.getByRole("navigation", { hidden: true }))
    expect(drawer).toHaveStyle({ display: "none" })
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
  })

  it("opens the drawer over the scene region, focus on the current page's link, and closes it again, focus back on the button", async () => {
    const menu = await renderPhone()
    fireEvent.click(menu)
    expect(menu).toHaveAttribute("aria-expanded", "true")
    const drawer = document.getElementById(menu.getAttribute("aria-controls")!)!
    // The drawer and the scene region (after the sidebar) share the cell under the header row.
    expect(drawer).toHaveStyle({ display: "flex", gridRow: "2", gridColumn: "1" })
    expect(drawer.parentElement!.nextElementSibling).toHaveStyle({ gridRow: "2", gridColumn: "1" })
    expect(screen.getByRole("link", { name: "Nine" })).toHaveFocus()
    fireEvent.click(menu)
    expect(menu).toHaveAttribute("aria-expanded", "false")
    expect(drawer).toHaveStyle({ display: "none" })
    expect(menu).toHaveFocus()
  })

  it("closes on Escape", async () => {
    const menu = await renderPhone()
    fireEvent.click(menu)
    fireEvent.keyDown(screen.getByRole("link", { name: "Nine" }), { key: "Escape" })
    expect(menu).toHaveAttribute("aria-expanded", "false")
    expect(menu).toHaveFocus()
  })

  it("closes when a page is picked, on that page", async () => {
    const menu = await renderPhone()
    fireEvent.click(menu)
    fireEvent.click(screen.getByRole("link", { name: "Ten" }))
    expect(await screen.findByText("ten")).toBeInTheDocument()
    expect(window.location.pathname).toBe("/stories/beta/ten")
    expect(menu).toHaveAttribute("aria-expanded", "false")
    expect(menu).toHaveFocus()
  })

  it("follows sidebarOpen when set, reporting through onSidebarOpenChange", async () => {
    const onSidebarOpenChange = jest.fn()
    const menu = await renderPhone({ sidebarOpen: true, onSidebarOpenChange })
    expect(menu).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    fireEvent.click(menu)
    expect(onSidebarOpenChange).toHaveBeenLastCalledWith(false)
    expect(menu).toHaveAttribute("aria-expanded", "true")
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onSidebarOpenChange).toHaveBeenCalledTimes(2)
  })

  it("shows the sidebar beside the scene region from tablet up, with no menu button", async () => {
    resize(700)
    render(<App scenes={scenes} router={plainRouter} sidebarOpen={false} />)
    await screen.findByText("nine")
    expect(screen.queryByRole("button", { name: "Menu" })).not.toBeInTheDocument()
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Nice Prototypes" }).parentElement!.nextElementSibling).toHaveStyle({ display: "contents" })
  })
})

describe("App search", () => {
  beforeEach(() => window.history.replaceState(null, "", "/stories/beta/nine"))

  const renderSearch = async (props: Partial<React.ComponentProps<typeof App>> = {}) => {
    render(<App scenes={scenes} docs={docs} pages={pages} router={plainRouter} search aria-label="Docs" {...props} />)
    await screen.findByText("nine")
    const button = screen.queryByRole("button", { name: "Search Docs", hidden: true })
    if (button) fireEvent.click(button)
    return screen.queryByRole("combobox", { name: "Search Docs", hidden: true })!
  }
  const type = (field: HTMLElement, value: string) => fireEvent.change(field, { target: { value } })
  const results = () => screen.getAllByRole("option").map(option => option.textContent)

  it("shows no search without search", async () => {
    expect(await renderSearch({ search: undefined })).toBeNull()
    expect(screen.queryByRole("button", { name: "Search Docs" })).not.toBeInTheDocument()
  })

  it("starts as a square search button that expands into the focused field, and collapses on Escape or an empty blur", async () => {
    render(<App scenes={scenes} router={plainRouter} search aria-label="Docs" />)
    await screen.findByText("nine")
    const button = screen.getByRole("button", { name: "Search Docs" })
    const block = button.parentElement!
    expect(block).toHaveStyle({ width: "var(--np--input--size--small)" })
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument()
    fireEvent.click(button)
    const field = screen.getByRole("combobox", { name: "Search Docs" })
    expect(field).toHaveFocus()
    expect(block).toHaveStyle({ width: "100%" })
    fireEvent.keyDown(field, { key: "Escape" })
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Search Docs" })).toHaveFocus()
    fireEvent.click(screen.getByRole("button", { name: "Search Docs" }))
    type(screen.getByRole("combobox"), "x")
    fireEvent.blur(screen.getByRole("combobox"))
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    type(screen.getByRole("combobox"), "")
    fireEvent.blur(screen.getByRole("combobox"))
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument()
  })

  it("lists names that start with the query, then names that hold it, then pages under a matching story or chapter", async () => {
    const field = await renderSearch()
    type(field, "te")
    // "Ten" and "Ten pages" start with it; "Steps" and "Getting started" hold it, in nav order.
    expect(results()).toEqual(["TenBeta", "Ten pages", "StepsGamma", "Getting started"])
    type(field, "pair")
    expect(results()).toEqual(["First & lastAlpha / Pair", "SecondAlpha / Pair"])
  })

  it("opens a result with the arrow keys and Enter, keeping the query string, and collapses", async () => {
    window.history.replaceState(null, "", "/stories/beta/nine?device=desktop")
    const field = await renderSearch()
    type(field, "second")
    fireEvent.keyDown(field, { key: "ArrowDown" })
    fireEvent.keyDown(field, { key: "ArrowUp" })
    fireEvent.keyDown(field, { key: "Enter" })
    expect(await screen.findByText("second")).toBeInTheDocument()
    expect(window.location.pathname + window.location.search).toBe("/stories/alpha/pair/second?device=desktop")
    // The field collapses back to the button.
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Search Docs" })).toBeInTheDocument()
    expect(screen.queryByRole("option")).not.toBeInTheDocument()
  })

  it("sits in the header row right of the logo, the large gap apart, at the nav labels' size, in the app.search colors", async () => {
    const field = await renderSearch({ navSize: "base" })
    const logo = screen.getByRole("img", { name: "Nice Prototypes" })
    // The logo, then the icon group, which the search block sits in.
    const group = logo.nextElementSibling as HTMLElement
    const block = group.firstElementChild as HTMLElement
    expect(group).toHaveStyle({ flexGrow: "1", justifyContent: "flex-end" })
    expect(block).toContainElement(field)
    expect(logo.parentElement).toHaveStyle({ alignItems: "center", gap: "var(--np--gap--large)" })
    expect(logo.parentElement!.style.getPropertyValue("--np--logo--height") || getComputedStyle(logo.parentElement!).getPropertyValue("--np--logo--height")).toBe(
      "var(--np--app--logo--height)",
    )
    expect(block).toHaveStyle({ fontSize: "var(--np--font-size)" })
    const property = (name: string) => getComputedStyle(block).getPropertyValue(name)
    expect(property("--np--input--font-size")).toBe("var(--np--app--search--font-size)")
    expect(property("--np--input--focus-ring--color")).toBe("var(--np--app--search--focus-color)")
    expect(property("--np--input--background-color--raised")).toBe("var(--np--app--search--background-color)")
    expect(property("--np--button--icon--color")).toBe("var(--np--app--header--icon--color)")
    expect(property("--np--button--icon--color--hover")).toBe("var(--np--app--header--icon--color--hover)")
    expect(property("--np--button--focus-ring--color")).toBe("var(--np--app--header--focus-ring--color)")
    // The nav keeps the header row's gap below it.
    expect(logo.parentElement!.nextElementSibling).toContainElement(screen.getByRole("navigation"))
    expect(getComputedStyle(screen.getByRole("navigation").parentElement!).paddingBlockStart).toBe("0")
  })

  it("stays in the header row beside the menu button below tablet, and a picked result closes the drawer", async () => {
    const innerWidth = window.innerWidth
    act(() => {
      window.innerWidth = 390
      window.dispatchEvent(new Event("resize"))
    })
    try {
      render(<App scenes={scenes} docs={docs} pages={pages} router={plainRouter} search aria-label="Docs" />)
      await screen.findByText("nine")
      const menu = screen.getByRole("button", { name: "Menu" })
      fireEvent.click(menu)
      const button = screen.getByRole("button", { name: "Search Docs" })
      expect(menu.parentElement).toContainElement(button)
      fireEvent.click(button)
      const field = screen.getByRole("combobox", { name: "Search Docs" })
      type(field, "ten pages")
      fireEvent.click(screen.getByRole("option"))
      expect(await screen.findByText("ten pages")).toBeInTheDocument()
      expect(window.location.pathname).toBe("/docs/ten-pages")
      expect(menu).toHaveAttribute("aria-expanded", "false")
    } finally {
      act(() => {
        window.innerWidth = innerWidth
        window.dispatchEvent(new Event("resize"))
      })
    }
  })
})

describe("App docs link", () => {
  beforeEach(() => window.history.replaceState(null, "", "/stories/beta/nine"))

  it("opens the first docs section page in a new tab from the header row, after the search, in the header buttons' tokens", async () => {
    render(<App scenes={scenes} pages={pages} router={plainRouter} search docsLink />)
    await screen.findByText("nine")
    const link = screen.getByRole("link", { name: "Docs (opens in a new tab)" })
    expect(link).toHaveAttribute("href", "/docs/getting-started")
    expect(link).toHaveAttribute("target", "_blank")
    expect(link.getAttribute("rel")).toContain("noopener")
    const block = link.parentElement!
    // Flush beside the search in the icon group: the group has no gap.
    expect(block.previousElementSibling).toContainElement(screen.getByRole("button", { name: "Search Scenes" }))
    expect(getComputedStyle(block.parentElement!).gap).toBe("")
    expect(getComputedStyle(block).getPropertyValue("--np--button--icon--color")).toBe("var(--np--app--header--icon--color)")
  })

  it("shows no docs link without docsLink, or without docs section pages", async () => {
    const { unmount } = render(<App scenes={scenes} pages={pages} router={plainRouter} />)
    await screen.findByText("nine")
    expect(screen.queryByRole("link", { name: "Docs (opens in a new tab)" })).not.toBeInTheDocument()
    unmount()
    render(<App scenes={scenes} router={plainRouter} docsLink />)
    await screen.findByText("nine")
    expect(screen.queryByRole("link", { name: "Docs (opens in a new tab)" })).not.toBeInTheDocument()
  })
})

describe("App sidebar footer", () => {
  /** The footer content's height in jsdom, which lays nothing out. */
  const CONTENT = 100
  const offsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetHeight")!

  beforeAll(() => {
    // jsdom lacks pointer capture and PointerEvent (ResizeObserver: jest.setup.js).
    HTMLElement.prototype.setPointerCapture = () => {}
    HTMLElement.prototype.releasePointerCapture = () => {}
    class PointerEvent extends MouseEvent {
      pointerId: number
      constructor(type: string, init: PointerEventInit = {}) {
        super(type, init)
        this.pointerId = init.pointerId ?? 1
      }
    }
    Object.assign(window, { PointerEvent })
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", { configurable: true, get: () => CONTENT })
  })
  afterAll(() => Object.defineProperty(HTMLElement.prototype, "offsetHeight", offsetHeight))
  beforeEach(() => window.history.replaceState(null, "", "/stories/gamma/settings"))

  const renderFooter = async () => {
    render(<App scenes={scenes} router={plainRouter} />)
    await screen.findByText("settings")
    return screen.getByRole("separator")
  }

  it("renders a scene's settings under the nav and the scene sidebar, fully open", async () => {
    const handle = await renderFooter()
    expect(handle.parentElement!.previousElementSibling).toContainElement(screen.getByRole("navigation"))
    expect(handle.parentElement).toContainElement(screen.getByText("settings"))
    expect(handle).toHaveAttribute("aria-orientation", "horizontal")
    expect(handle).toHaveAttribute("aria-valuemin", "0")
    expect(handle).toHaveAttribute("aria-valuemax", String(CONTENT))
    expect(handle).toHaveAttribute("aria-valuenow", String(CONTENT))
  })

  it("scrolls the body under the handle when shorter than its content; follows the content when fully open", async () => {
    const handle = await renderFooter()
    const body = handle.nextElementSibling as HTMLElement
    expect(body).toContainElement(screen.getByText("settings"))
    expect(body).not.toContainElement(handle)
    expect(body).toHaveStyle({ overflowY: "auto" })
    expect(body.style.height).toBe("")
    fireEvent.pointerDown(handle, { clientY: 500 })
    fireEvent.pointerMove(handle, { clientY: 550 })
    fireEvent.pointerUp(handle)
    expect(body).toHaveStyle({ height: `${CONTENT - 50}px`, overflowY: "auto" })
  })

  it("stops at the content height when dragged or keyed up, and collapses to the handle when dragged or keyed down", async () => {
    const handle = await renderFooter()
    fireEvent.pointerDown(handle, { clientY: 500 })
    fireEvent.pointerMove(handle, { clientY: 200 })
    expect(handle).toHaveAttribute("aria-valuenow", String(CONTENT))
    fireEvent.pointerMove(handle, { clientY: 560 })
    expect(handle).toHaveAttribute("aria-valuenow", String(CONTENT - 60))
    fireEvent.pointerMove(handle, { clientY: 900 })
    fireEvent.pointerUp(handle)
    expect(handle).toHaveAttribute("aria-valuenow", "0")
    expect(handle.nextElementSibling).toHaveStyle({ height: "0px" })
    fireEvent.keyDown(handle, { key: "ArrowDown" })
    expect(handle).toHaveAttribute("aria-valuenow", "0")
    for (let press = 0; press < 12; press++) fireEvent.keyDown(handle, { key: "ArrowUp" })
    expect(handle).toHaveAttribute("aria-valuenow", String(CONTENT))
    fireEvent.keyDown(handle, { key: "ArrowDown" })
    expect(handle).toHaveAttribute("aria-valuenow", String(CONTENT * 0.9))
  })
})

describe("getAppPageUrl", () => {
  it("gives a docs page's URL from its pages key, as the nav links it", () => {
    expect(getAppPageUrl("./docs/2 Components/1 Forms/10 Dev & Watch/index.tsx")).toBe("/docs/components/forms/dev-and-watch")
  })
})
