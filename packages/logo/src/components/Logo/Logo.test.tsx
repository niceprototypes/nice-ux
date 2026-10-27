import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { getToken } from "@niceprototypes/styles"
import Logo from "./Logo"

jest.mock("@niceprototypes/icon", () => ({
  __esModule: true,
  Illustration: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="heart" className={className}>
      {name}
    </span>
  ),
}))

/** CSS text of every rule whose selector starts at one of `element`'s classes. */
function cssFor(element: Element): string {
  const css = Array.from(document.head.querySelectorAll("style"))
    .map(tag => tag.textContent ?? "")
    .join("\n")
  return Array.from(element.classList)
    .flatMap(className => css.match(new RegExp(`\\.${className}[^{]*\\{[^}]*\\}`, "g")) ?? [])
    .join("\n")
}

describe("Logo", () => {
  it("renders one image named Nice Prototypes by default", () => {
    render(<Logo />)
    expect(screen.getByRole("img", { name: "Nice Prototypes" })).toBeInTheDocument()
  })

  it("takes its accessible name from aria-label", () => {
    render(<Logo aria-label="Home" />)
    expect(screen.getByRole("img", { name: "Home" })).toBeInTheDocument()
  })

  it("renders the nice-heart illustration and the name by default", () => {
    render(<Logo />)
    expect(screen.getByTestId("heart")).toHaveTextContent("nice-heart")
    const name = screen.getByRole("img").querySelector("svg")
    expect(name).toHaveAttribute("viewBox", "0 0 1050 1000")
    expect(name).toHaveAttribute("aria-hidden", "true")
    expect(name?.querySelectorAll("path")).toHaveLength(5)
  })

  it("hides the name, keeping the heart, when showName is false", () => {
    render(<Logo showName={false} />)
    expect(screen.getByTestId("heart")).toBeInTheDocument()
    expect(screen.getByRole("img").querySelector("svg")).toBeNull()
  })

  it("sizes the name to 60% of the logo's height by default", () => {
    render(<Logo />)
    const name = screen.getByRole("img").querySelector("svg")!.parentElement!
    expect(cssFor(name)).toContain("height:60%")
  })

  it("sizes the name by nameHeightScale", () => {
    render(<Logo nameHeightScale={0.75} />)
    const name = screen.getByRole("img").querySelector("svg")!.parentElement!
    expect(cssFor(name)).toContain("height:75%")
  })

  it("takes the logo.height token as its default height", () => {
    render(<Logo />)
    expect(cssFor(screen.getByRole("img"))).toContain(`height:calc(${getToken("logo.height")} * 1px)`)
  })

  it("takes its height from the height prop, in pixels", () => {
    render(<Logo height={35} />)
    expect(cssFor(screen.getByRole("img"))).toContain("height:calc(35 * 1px)")
  })

  it("puts a 4px gap between heart and name by default", () => {
    render(<Logo />)
    expect(cssFor(screen.getByRole("img"))).toContain("gap:4px")
  })

  it("takes its gap from the gap prop, in pixels", () => {
    render(<Logo gap={6} />)
    expect(cssFor(screen.getByRole("img"))).toContain("gap:6px")
  })

  it("sizes the heart square at the logo's full height", () => {
    render(<Logo height={35} />)
    const css = cssFor(screen.getByTestId("heart"))
    expect(css).toContain("height:100%")
    expect(css).toContain("aspect-ratio:1")
  })

  it("fills the name with the logo color token", () => {
    render(<Logo />)
    const css = cssFor(screen.getByRole("img").querySelector("svg")!.parentElement!)
    expect(css).toContain(`fill:${getToken("logo.color:base")}`)
  })

  it("pins a theme through a Theme wrapper", () => {
    const { container } = render(<Logo theme="night" />)
    expect(container.querySelector('[data-theme="night"]')).toContainElement(screen.getByRole("img"))
  })
})
