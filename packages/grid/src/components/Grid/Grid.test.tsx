import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { getToken } from "@niceprototypes/styles"
import Grid from "./Grid"
import GridItem from "../GridItem/GridItem"

/** CSS text of every rule whose selector starts at one of `element`'s classes. */
function cssFor(element: Element): string {
  const css = Array.from(document.head.querySelectorAll("style"))
    .map(tag => tag.textContent ?? "")
    .join("\n")
  return Array.from(element.classList)
    .flatMap(className => css.match(new RegExp(`\\.${className}[^{]*\\{[^}]*\\}`, "g")) ?? [])
    .join("\n")
}

describe("Grid", () => {
  it("renders a div grid with one column, the base gap and stretched items by default", () => {
    const { container } = render(<Grid>Item</Grid>)
    const grid = container.firstElementChild!
    expect(grid.tagName).toBe("DIV")
    const css = cssFor(grid)
    expect(css).toContain("display:grid")
    expect(css).toContain("grid-template-columns:repeat(1, minmax(0, 1fr))")
    expect(css).toContain(`gap:${getToken("gap", "base")}`)
    expect(css).toContain("align-items:stretch")
    expect(css).not.toContain("grid-template-rows")
    expect(css).not.toContain("max-content")
  })

  it("makes equal column and row tracks", () => {
    const { container } = render(<Grid columns={3} rows={2} />)
    const css = cssFor(container.firstElementChild!)
    expect(css).toContain("grid-template-columns:repeat(3, minmax(0, 1fr))")
    expect(css).toContain("grid-template-rows:repeat(2, minmax(0, 1fr))")
  })

  it("auto-fills tracks from minChildWidth, ignoring columns", () => {
    const { container } = render(<Grid columns={3} minChildWidth="var(--card-width)" />)
    const css = cssFor(container.firstElementChild!)
    expect(css).toContain("grid-template-columns:repeat(auto-fill, minmax(min(var(--card-width), 100%), 1fr))")
    expect(css).not.toContain("repeat(3")
  })

  it("reads gap, padding and margin from the gap tokens", () => {
    const { container } = render(<Grid gap="large" padding="small base" margin="none" />)
    const css = cssFor(container.firstElementChild!)
    expect(css).toContain(`gap:${getToken("gap", "large")}`)
    expect(css).toContain(`padding-top:${getToken("gap", "small")}`)
    expect(css).toContain(`padding-left:${getToken("gap", "base")}`)
    expect(css).toContain("margin-top:0")
  })

  it("aligns items, fits content and renders the as element", () => {
    const { container } = render(<Grid as="ul" alignItems="center" fit />)
    const grid = container.firstElementChild!
    expect(grid.tagName).toBe("UL")
    const css = cssFor(grid)
    expect(css).toContain("align-items:center")
    expect(css).toContain("width:max-content")
  })
})

describe("GridItem", () => {
  it("spans one column and row by default", () => {
    render(<GridItem>Item</GridItem>)
    const css = cssFor(screen.getByText("Item"))
    expect(css).toContain("grid-column:span 1")
    expect(css).toContain("grid-row:span 1")
  })

  it("spans colSpan columns and rowSpan rows", () => {
    render(
      <GridItem colSpan={2} rowSpan={3}>
        Item
      </GridItem>,
    )
    const css = cssFor(screen.getByText("Item"))
    expect(css).toContain("grid-column:span 2")
    expect(css).toContain("grid-row:span 3")
  })

  it("spans the whole row when colSpan is full", () => {
    render(<GridItem colSpan="full">Item</GridItem>)
    expect(cssFor(screen.getByText("Item"))).toContain("grid-column:1/-1")
  })

  it("renders the as element", () => {
    render(
      <Grid as="ul">
        <GridItem as="li">Item</GridItem>
      </Grid>,
    )
    expect(screen.getByRole("listitem")).toHaveTextContent("Item")
    expect(screen.getByRole("list")).toBeInTheDocument()
  })
})
