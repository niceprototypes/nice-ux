import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { getToken } from "@niceprototypes/styles"
import Tabs from "./Tabs"
import { findTabIndex } from "../../utilities/findTabIndex"
import type { TabsItemType } from "./Tabs.types"

const ITEMS: TabsItemType[] = [
  { id: "one", label: "One" },
  { id: "two", label: "Two" },
  { id: "three", label: "Three" },
]

/** CSS text of every rule whose selector starts at one of `element`'s classes. */
function cssFor(element: Element): string {
  const css = Array.from(document.head.querySelectorAll("style"))
    .map(tag => tag.textContent ?? "")
    .join("\n")
  return Array.from(element.classList)
    .flatMap(className => css.match(new RegExp(`\\.${className}[^{]*\\{[^}]*\\}`, "g")) ?? [])
    .join("\n")
}

describe("findTabIndex", () => {
  const items: TabsItemType[] = [
    { id: "a", label: "A" },
    { id: "b", label: "B", disabled: true },
    { id: "c", label: "C" },
  ]

  it("skips disabled tabs and wraps", () => {
    expect(findTabIndex(items, 0, "ArrowRight")).toBe(2)
    expect(findTabIndex(items, 2, "ArrowRight")).toBe(0)
    expect(findTabIndex(items, 0, "ArrowLeft")).toBe(2)
  })

  it("goes to the first and last enabled tab", () => {
    expect(findTabIndex(items, 2, "Home")).toBe(0)
    expect(findTabIndex(items, 0, "End")).toBe(2)
  })

  it("returns -1 when no tab is enabled", () => {
    expect(findTabIndex([{ id: "a", label: "A", disabled: true }], 0, "ArrowRight")).toBe(-1)
  })
})

describe("Tabs", () => {
  it("renders the tablist, tabs and the selected tab's panel", () => {
    render(
      <Tabs items={ITEMS} aria-label="Pages">
        Panel
      </Tabs>,
    )
    expect(screen.getByRole("tablist", { name: "Pages" })).toBeInTheDocument()
    const tabs = screen.getAllByRole("tab")
    expect(tabs.map(tab => tab.tagName)).toEqual(["DIV", "DIV", "DIV"])
    expect(tabs[0]).toHaveAttribute("aria-selected", "true")
    expect(tabs[1]).toHaveAttribute("aria-selected", "false")
    const panel = screen.getByRole("tabpanel")
    expect(panel).toHaveTextContent("Panel")
    expect(panel).toHaveAttribute("aria-labelledby", tabs[0].id)
    expect(tabs[0]).toHaveAttribute("aria-controls", panel.id)
  })

  it("keeps only the selected tab in the tab order", () => {
    render(<Tabs items={ITEMS} defaultSelected="two" />)
    expect(screen.getAllByRole("tab").map(tab => tab.tabIndex)).toEqual([-1, 0, -1])
  })

  it("selects a clicked tab when uncontrolled, and calls onSelect(id, event)", async () => {
    const user = userEvent.setup()
    const onSelect = jest.fn()
    render(<Tabs items={ITEMS} onSelect={onSelect} />)
    await user.click(screen.getByRole("tab", { name: "Two" }))
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("aria-selected", "true")
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect.mock.calls[0][0]).toBe("two")
    expect(onSelect.mock.calls[0][1].type).toBe("click")
  })

  it("stays as the parent sets it when controlled", async () => {
    const user = userEvent.setup()
    const onSelect = jest.fn()
    render(<Tabs items={ITEMS} selected="one" onSelect={onSelect} />)
    await user.click(screen.getByRole("tab", { name: "Two" }))
    expect(onSelect).toHaveBeenCalledWith("two", expect.anything())
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute("aria-selected", "true")
  })

  it("moves focus and selection with arrow keys, Home and End, skipping disabled tabs", async () => {
    const user = userEvent.setup()
    render(<Tabs items={[ITEMS[0], { ...ITEMS[1], disabled: true }, ITEMS[2]]} />)
    const [one, , three] = screen.getAllByRole("tab")
    one.focus()
    await user.keyboard("{ArrowRight}")
    expect(three).toHaveFocus()
    expect(three).toHaveAttribute("aria-selected", "true")
    await user.keyboard("{ArrowRight}")
    expect(one).toHaveFocus()
    await user.keyboard("{End}")
    expect(three).toHaveFocus()
    await user.keyboard("{Home}")
    expect(one).toHaveFocus()
    expect(one).toHaveAttribute("aria-selected", "true")
  })

  it("does not select a disabled tab on click", async () => {
    const user = userEvent.setup()
    const onSelect = jest.fn()
    render(<Tabs items={[ITEMS[0], { ...ITEMS[1], disabled: true }]} onSelect={onSelect} />)
    const disabled = screen.getByRole("tab", { name: "Two" })
    expect(disabled).toHaveAttribute("aria-disabled", "true")
    await user.click(disabled)
    expect(onSelect).not.toHaveBeenCalled()
  })

  it("lets an input inside a label take its own keys, and selects its tab on click", async () => {
    const user = userEvent.setup()
    const LabelInput = () => {
      const [value, setValue] = React.useState("Page 1")
      return <input aria-label="Page name" value={value} onChange={event => setValue(event.target.value)} />
    }
    render(<Tabs items={[{ id: "one", label: "One" }, { id: "page", label: <LabelInput /> }]} />)
    const input = screen.getByRole("textbox", { name: "Page name" })
    await user.click(input)
    expect(screen.getAllByRole("tab")[1]).toHaveAttribute("aria-selected", "true")
    await user.keyboard("{ArrowLeft}{Home} x")
    expect(input).toHaveFocus()
    expect(input).toHaveValue(" xPage 1")
    expect(screen.getAllByRole("tab")[1]).toHaveAttribute("aria-selected", "true")
  })

  it("renders end content in the row, outside the tablist", () => {
    render(<Tabs items={ITEMS} end={<button type="button">Add</button>} />)
    const add = screen.getByRole("button", { name: "Add" })
    expect(screen.getByRole("tablist")).not.toContainElement(add)
    expect(add.parentElement).toBe(screen.getByRole("tablist").parentElement)
  })

  it("forwards className to the root", () => {
    const { container } = render(<Tabs items={ITEMS} className="mine" />)
    expect(container.firstElementChild).toHaveClass("mine")
  })

  it("reads padding and font size from the tabs tokens for its size", () => {
    render(<Tabs items={ITEMS} size="small" />)
    const css = cssFor(screen.getAllByRole("tab")[0])
    expect(css).toContain(`padding:${getToken("tabs.padding:small")}`)
    expect(css).toContain(`font-size:${getToken("tabs.fontSize:small")}`)
    expect(css).toContain(`background-color:${getToken("tabs.indicator.color:base")}`)
    expect(css).toMatch(/:focus-visible\{[^}]*outline:/)
  })

  it("places the tab list and end along the row with justifyContent, unset by default", () => {
    const { unmount } = render(<Tabs items={ITEMS} />)
    expect(cssFor(screen.getByRole("tablist").parentElement!)).not.toContain("justify-content")
    unmount()
    render(<Tabs items={ITEMS} justifyContent="center" />)
    expect(cssFor(screen.getByRole("tablist").parentElement!)).toContain("justify-content:center")
  })

  it("reads the gap from the gap token when set, else from the tabs token for its size", () => {
    const { unmount } = render(<Tabs items={ITEMS} size="small" />)
    expect(cssFor(screen.getByRole("tablist"))).toContain(`gap:${getToken("tabs.gap:small")}`)
    unmount()
    render(<Tabs items={ITEMS} size="small" gap="large" />)
    const tablist = screen.getByRole("tablist")
    expect(cssFor(tablist)).toContain(`gap:${getToken("gap", "large")}`)
    expect(cssFor(tablist.parentElement!)).toContain(`gap:${getToken("gap", "large")}`)
  })

  it("draws the row border and the selected underline by default", () => {
    render(<Tabs items={ITEMS} />)
    expect(cssFor(screen.getByRole("tablist").parentElement!)).toContain(
      `border-bottom:${getToken("tabs.borderWidth:base")} solid ${getToken("tabs.borderColor:base")}`,
    )
    expect(cssFor(screen.getAllByRole("tab")[0])).toMatch(/::after\{/)
    expect(cssFor(screen.getAllByRole("tab")[0])).not.toContain("border-radius")
  })

  it("draws a rounded border per tab from the pill tokens, without the row border or underline", () => {
    render(<Tabs items={[ITEMS[0], ITEMS[1], { ...ITEMS[2], disabled: true }]} variant="pill" />)
    const [selected, rest, disabled] = screen.getAllByRole("tab")
    expect(cssFor(screen.getByRole("tablist").parentElement!)).not.toContain("border-bottom")
    const selectedCss = cssFor(selected)
    expect(selectedCss).toContain(`border-radius:${getToken("tabs.pill.borderRadius:base")}`)
    expect(selectedCss).toContain(
      `border:${getToken("tabs.pill.borderWidth:base")} solid ${getToken("tabs.pill.borderColor:selected")}`,
    )
    expect(selectedCss).not.toMatch(/::after\{/)
    expect(selectedCss).not.toMatch(/:hover\{/)
    const restCss = cssFor(rest)
    expect(restCss).toContain(`solid ${getToken("tabs.pill.borderColor:base")}`)
    expect(restCss).toContain(`:hover{border-color:${getToken("tabs.pill.borderColor:hover")}`)
    expect(cssFor(disabled)).not.toMatch(/:hover\{/)
    expect(restCss).toMatch(/:focus-visible\{[^}]*outline:/)
  })

  it("keeps the keyboard and ARIA behaviour in the pill variant", async () => {
    const user = userEvent.setup()
    render(<Tabs items={ITEMS} variant="pill" aria-label="Pages" />)
    const [one, two] = screen.getAllByRole("tab")
    expect(screen.getByRole("tablist", { name: "Pages" })).toBeInTheDocument()
    expect(one).toHaveAttribute("aria-selected", "true")
    one.focus()
    await user.keyboard("{ArrowRight}")
    expect(two).toHaveFocus()
    expect(two).toHaveAttribute("aria-selected", "true")
    expect(screen.getAllByRole("tab").map(tab => tab.tabIndex)).toEqual([-1, 0, -1])
  })
})
