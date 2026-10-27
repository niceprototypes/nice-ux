import * as React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { ListItem } from "./index"
import { List } from "../List"

describe("ListItem", () => {
  it("renders start, content and end in that order", () => {
    render(
      <List>
        <ListItem data-testid="item" start={<span>S</span>} end={<span>E</span>}>
          Content
        </ListItem>
      </List>
    )
    const item = screen.getByTestId("item")
    expect(item.tagName).toBe("LI")
    expect(Array.from(item.children).map((child) => child.textContent)).toEqual(["S", "Content", "E"])
  })

  it("omits empty slots", () => {
    render(
      <List>
        <ListItem data-testid="item">Content</ListItem>
      </List>
    )
    expect(screen.getByTestId("item").children).toHaveLength(1)
  })

  it("sets aria-disabled when disabled", () => {
    render(
      <List>
        <ListItem data-testid="on">On</ListItem>
        <ListItem data-testid="off" disabled>
          Off
        </ListItem>
      </List>
    )
    expect(screen.getByTestId("off")).toHaveAttribute("aria-disabled", "true")
    expect(screen.getByTestId("on")).not.toHaveAttribute("aria-disabled")
  })

  it("does not map selected or active to ARIA", () => {
    render(
      <List>
        <ListItem data-testid="item" selected active>
          Item
        </ListItem>
      </List>
    )
    const item = screen.getByTestId("item")
    expect(item).not.toHaveAttribute("aria-selected")
    expect(item).not.toHaveAttribute("aria-current")
  })

  it("passes role, aria-*, data-* and handlers through to the li", () => {
    const onClick = jest.fn()
    render(
      <List role="listbox" aria-label="Fruit">
        <ListItem id="fruit-1" role="option" aria-selected="true" data-value="apple" onClick={onClick}>
          Apple
        </ListItem>
      </List>
    )
    const option = screen.getByRole("option", { name: "Apple" })
    expect(option.tagName).toBe("LI")
    expect(option).toHaveAttribute("id", "fruit-1")
    expect(option).toHaveAttribute("aria-selected", "true")
    expect(option).toHaveAttribute("data-value", "apple")
    option.click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("forwards className and ref to the li", () => {
    const ref = React.createRef<HTMLLIElement>()
    render(
      <List>
        <ListItem className="custom" ref={ref}>
          Item
        </ListItem>
      </List>
    )
    expect(ref.current).toBeInstanceOf(HTMLLIElement)
    expect(ref.current).toHaveClass("custom")
  })
})
