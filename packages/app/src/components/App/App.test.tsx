import * as React from "react"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import App from "."
import type { AppRouterType } from "./App.types"
import { useScenes } from "../../services"
import { plainRouter } from "../../adapters/plain"
import { reactRouter } from "../../adapters/react-router"
import { tanstackRouter } from "../../adapters/tanstack-router"

const scene = (text: string) => () => Promise.resolve({ default: () => <p>{text}</p> })

/** A scene that opens the next page through useScenes, as a stepper's chain does. */
const Chaining = () => {
  const { entries, current, open } = useScenes()
  const next = entries[entries.findIndex(entry => entry === current) + 1]
  return <button onClick={() => next && open(next)}>next</button>
}

const scenes = {
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
    expect(rows).toEqual(["Solo", "First & last", "Second", "Guide", "Nine", "Ten"])
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
    fireEvent.click(await screen.findByText("next"))
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
})
