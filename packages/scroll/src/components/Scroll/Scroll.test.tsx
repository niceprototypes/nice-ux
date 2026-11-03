import * as React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Scroll from "./index"

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
})
