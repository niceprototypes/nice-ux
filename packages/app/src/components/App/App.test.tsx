import * as React from "react"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import App from "."
import type { AppRouterType } from "./App.types"
import { createPortal } from "react-dom"
import { useSceneRegion, useScenes, useSceneSidebar, useSceneSidebarFooter } from "../../services"
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
const docs = { "./stories/1 Alpha/Overview/Guide.md": () => Promise.resolve("# Guide\n\nRead [solo](/alpha/solo).") }

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
    expect(window.location.pathname + window.location.search).toBe("/alpha/solo?device=desktop")
  })

  it("lists stories, chapters and scenes in folder order, numbers by value and left out of names", async () => {
    window.history.replaceState(null, "", "/beta/nine")
    render(<App scenes={scenes} docs={docs} router={router} />)
    await screen.findByText("nine")
    const rows = screen.getAllByRole("link", { hidden: true }).map(link => link.textContent)
    expect(rows).toEqual(["Solo", "First & last", "Second", "Guide", "Nine", "Ten", "Steps", "Settings"])
    expect(screen.getByRole("link", { name: "Nine" })).toHaveAttribute("aria-current", "page")
    expect(screen.getByRole("button", { name: "Beta" })).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByRole("button", { name: "Alpha" })).toHaveAttribute("aria-expanded", "false")
  })

  it("navigates from the nav and back and forward", async () => {
    window.history.replaceState(null, "", "/alpha/solo")
    render(<App scenes={scenes} docs={docs} router={router} />)
    await screen.findByText("solo")
    fireEvent.click(screen.getByRole("button", { name: "Pair" }))
    fireEvent.click(screen.getByRole("link", { name: "Second", hidden: true }))
    expect(await screen.findByText("second")).toBeInTheDocument()
    expect(window.location.pathname).toBe("/alpha/pair/second")
    await act(async () => window.history.back())
    expect(await screen.findByText("solo")).toBeInTheDocument()
    await act(async () => window.history.forward())
    expect(await screen.findByText("second")).toBeInTheDocument()
  })

  it("lets a scene open the next page, and renders a docs page", async () => {
    window.history.replaceState(null, "", "/alpha/pair/first-and-last")
    render(<App scenes={scenes} docs={docs} router={router} />)
    expect(await screen.findByText("next")).toHaveAttribute("data-bare", "false")
    fireEvent.click(screen.getByText("next"))
    expect(await screen.findByText("second")).toBeInTheDocument()
    await act(async () => {
      window.history.pushState(null, "", "/alpha/overview/guide")
      window.dispatchEvent(new PopStateEvent("popstate"))
    })
    expect(await screen.findByRole("heading", { name: "Guide" })).toBeInTheDocument()
  })

  it("shows the bare view without the nav, the scene region focused", async () => {
    const Wrapper = ({ children, search }: { children: React.ReactNode; search: URLSearchParams }) => (
      <div data-testid="wrapper" data-device={search.get("device") ?? ""}>{children}</div>
    )
    window.history.replaceState(null, "", "/frame/beta/ten?device=phone")
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
    window.history.replaceState(null, "", "/gamma/steps")
    const { unmount } = render(<App scenes={scenes} router={router} wrapper={Region} />)
    await screen.findByText("with steps")
    const steps = await screen.findByText("steps")
    const sidebar = steps.parentElement!
    expect(sidebar.previousElementSibling).toContainElement(screen.getByRole("navigation"))
    expect(region).not.toContainElement(steps)
    await act(async () => {
      window.history.pushState(null, "", "/alpha/solo")
      window.dispatchEvent(new PopStateEvent("popstate"))
    })
    await screen.findByText("solo")
    expect(sidebar).toBeEmptyDOMElement()
    unmount()
    window.history.replaceState(null, "", "/frame/gamma/steps")
    render(<App scenes={scenes} router={router} />)
    await screen.findByText("with steps")
    expect(screen.queryByText("steps")).not.toBeInTheDocument()
  })

  it("tells a scene the bare view is on", async () => {
    window.history.replaceState(null, "", "/frame/alpha/pair/first-and-last")
    render(<App scenes={scenes} router={router} />)
    expect(await screen.findByText("next")).toHaveAttribute("data-bare", "true")
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
  beforeEach(() => window.history.replaceState(null, "", "/gamma/settings"))

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
