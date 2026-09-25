import * as React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { List } from "./index"
import { ListItem } from "../ListItem"

const dividersOf = (list: HTMLElement) =>
  Array.from(list.children).filter((child) => child.getAttribute("role") === "presentation")

describe("List", () => {
  it("renders n-1 dividers between n items, none at the ends", () => {
    render(
      <List data-testid="list">
        <ListItem>One</ListItem>
        <ListItem>Two</ListItem>
        <ListItem>Three</ListItem>
      </List>
    )
    const list = screen.getByTestId("list")
    const children = Array.from(list.children)
    expect(dividersOf(list)).toHaveLength(2)
    expect(children).toHaveLength(5)
    expect(children[0]).toHaveTextContent("One")
    expect(children[0]).not.toHaveAttribute("role", "presentation")
    expect(children[children.length - 1]).toHaveTextContent("Three")
    expect(children[children.length - 1]).not.toHaveAttribute("role", "presentation")
  })

  it("ignores null and false children when placing dividers", () => {
    const hidden = false
    render(
      <List data-testid="list">
        {null}
        <ListItem>One</ListItem>
        {hidden && <ListItem>Hidden</ListItem>}
        <ListItem>Two</ListItem>
        {null}
      </List>
    )
    const list = screen.getByTestId("list")
    expect(dividersOf(list)).toHaveLength(1)
    expect(list.children).toHaveLength(3)
    expect(list.firstElementChild).toHaveTextContent("One")
    expect(list.lastElementChild).toHaveTextContent("Two")
  })

  it("renders no divider for a single item", () => {
    render(
      <List data-testid="list">
        <ListItem>Only</ListItem>
      </List>
    )
    expect(dividersOf(screen.getByTestId("list"))).toHaveLength(0)
  })

  it("wraps each divider hr in an aria-hidden presentation li", () => {
    render(
      <List data-testid="list">
        <ListItem>One</ListItem>
        <ListItem>Two</ListItem>
      </List>
    )
    const [divider] = dividersOf(screen.getByTestId("list"))
    expect(divider.tagName).toBe("LI")
    expect(divider).toHaveAttribute("aria-hidden", "true")
    expect(divider.children).toHaveLength(1)
    expect(divider.firstElementChild!.tagName).toBe("HR")
  })

  it("applies overflow and max-height when scrollable", () => {
    render(
      <List data-testid="list" scrollable>
        <ListItem>One</ListItem>
      </List>
    )
    const list = screen.getByTestId("list")
    expect(list).toHaveStyle({ overflowY: "auto" })
    expect(getComputedStyle(list).maxHeight).toBe("var(--np--list--max-height)")
  })

  it("does not apply overflow or max-height by default", () => {
    render(
      <List data-testid="list">
        <ListItem>One</ListItem>
      </List>
    )
    const style = getComputedStyle(screen.getByTestId("list"))
    expect(style.overflowY).not.toBe("auto")
    expect(style.maxHeight).toBe("")
  })

  it("passes role, aria-* and data-* through to the ul", () => {
    render(
      <List role="listbox" aria-label="Fruit" aria-activedescendant="fruit-1" data-kind="fruit" tabIndex={0}>
        <ListItem id="fruit-1">Apple</ListItem>
      </List>
    )
    const list = screen.getByRole("listbox", { name: "Fruit" })
    expect(list.tagName).toBe("UL")
    expect(list).toHaveAttribute("aria-activedescendant", "fruit-1")
    expect(list).toHaveAttribute("data-kind", "fruit")
    expect(list).toHaveAttribute("tabindex", "0")
  })

  it("renders native list semantics without a role", () => {
    render(
      <List aria-label="Plain">
        <ListItem>One</ListItem>
        <ListItem>Two</ListItem>
      </List>
    )
    const list = screen.getByRole("list", { name: "Plain" })
    expect(list).not.toHaveAttribute("role")
    // Divider lis are presentation, so only the two items are listitems.
    expect(screen.getAllByRole("listitem")).toHaveLength(2)
  })

  it("forwards className and ref to the ul", () => {
    const ref = React.createRef<HTMLUListElement>()
    render(
      <List className="custom" ref={ref}>
        <ListItem>One</ListItem>
      </List>
    )
    expect(ref.current).toBeInstanceOf(HTMLUListElement)
    expect(ref.current).toHaveClass("custom")
  })
})
