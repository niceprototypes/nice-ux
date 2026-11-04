import * as React from "react"
import { render, screen } from "@testing-library/react"
import { act } from "react"
import "@testing-library/jest-dom"
import Scroll from "./index"
import { useScroll } from "../../hooks/useScroll"
import { getFadeOpacity } from "./ScrollFade.helpers"

/** The declarations of an element's styled-components class (jsdom drops `scrollbar-width` from computed style). */
const rulesOf = (element: HTMLElement): string => {
  const css = Array.from(document.querySelectorAll("style"), (style) => style.textContent).join("")
  const classes = Array.from(element.classList)
  return classes.map((name) => css.match(new RegExp(`\\.${name}\\{([^}]*)\\}`))?.[1] ?? "").join("")
}

describe("Scroll", () => {
  it("scrolls vertically by default", () => {
    render(<Scroll data-testid="scroll">Content</Scroll>)
    expect(screen.getByTestId("scroll")).toHaveStyle({ overflowY: "auto" })
  })

  it("scrolls on the axis it is given", () => {
    render(
      <>
        <Scroll data-testid="x" axis="x" />
        <Scroll data-testid="both" axis="both" />
      </>
    )
    expect(screen.getByTestId("x")).toHaveStyle({ overflowX: "auto" })
    expect(screen.getByTestId("x")).not.toHaveStyle({ overflowY: "auto" })
    expect(screen.getByTestId("both")).toHaveStyle({ overflow: "auto" })
  })

  it("reads the scrollbar width from the project default token when showScrollbar is unset", () => {
    render(<Scroll data-testid="scroll" />)
    expect(rulesOf(screen.getByTestId("scroll"))).toContain("scrollbar-width:var(--np--scroll--scrollbar-width);")
  })

  it("shows or hides the scrollbar per showScrollbar", () => {
    render(
      <>
        <Scroll data-testid="shown" showScrollbar />
        <Scroll data-testid="hidden" showScrollbar={false} />
      </>
    )
    expect(rulesOf(screen.getByTestId("shown"))).toContain("scrollbar-width:var(--np--scroll--scrollbar-width--shown);")
    expect(rulesOf(screen.getByTestId("hidden"))).toContain("scrollbar-width:var(--np--scroll--scrollbar-width--hidden);")
  })

  it("renders the element it is given and passes attributes through", () => {
    render(
      <Scroll as="nav" aria-label="Contents" tabIndex={0}>
        Rows
      </Scroll>
    )
    const nav = screen.getByRole("navigation", { name: "Contents" })
    expect(nav.tagName).toBe("NAV")
    expect(nav).toHaveAttribute("tabindex", "0")
  })

  it("forwards its ref to the element", () => {
    const ref = React.createRef<HTMLElement>()
    render(<Scroll ref={ref} data-testid="scroll" />)
    expect(ref.current).toBe(screen.getByTestId("scroll"))
  })

  it("renders only its children as a root, with no element of its own", () => {
    const { container } = render(<Scroll root>Page</Scroll>)
    expect(container.innerHTML).toBe("Page")
  })

  it("feeds useScroll the window's scroll offset under a window root", async () => {
    const Offset = () => <span data-testid="offset">{useScroll()}</span>
    render(
      <Scroll root>
        <Offset />
      </Scroll>
    )
    await act(async () => {
      Object.defineProperty(window, "scrollY", { configurable: true, value: 120 })
      window.dispatchEvent(new Event("scroll"))
      await new Promise(resolve => requestAnimationFrame(resolve))
    })
    expect(screen.getByTestId("offset")).toHaveTextContent("120")
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 })
  })

  it("keeps a sticky bar fixed in the window, with a spacer in the flow", () => {
    render(
      <Scroll root>
        <Scroll sticky data-testid="bar">Header</Scroll>
      </Scroll>
    )
    const bar = screen.getByTestId("bar")
    expect(bar).toHaveStyle({ position: "fixed" })
    expect(bar.previousElementSibling).not.toBeNull()
    expect(bar).not.toHaveStyle({ overflowY: "auto" })
  })

  it("renders a sticky bar's children in place outside a root", () => {
    const { container } = render(<Scroll sticky>Header</Scroll>)
    expect(container.innerHTML).toBe("Header")
  })

  it("fades in from start to peak and out to end", () => {
    const positions = [0, 50, 100] as const
    const opacities = [0, 1, 0] as const
    expect(getFadeOpacity(-10, positions, opacities)).toBe(0)
    expect(getFadeOpacity(25, positions, opacities)).toBe(0.5)
    expect(getFadeOpacity(50, positions, opacities)).toBe(1)
    expect(getFadeOpacity(75, positions, opacities)).toBe(0.5)
    expect(getFadeOpacity(110, positions, opacities)).toBe(0)
  })
})
