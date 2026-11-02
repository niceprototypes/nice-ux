import * as React from "react"
import { act, fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Contents from "."
import type { ContentsItemsType } from "./Contents.types"

const items: ContentsItemsType = [
  { id: "docs", label: "Docs" },
  { id: "props", label: "Props", items: [{ id: "size", label: "size" }, { id: "color", label: "color" }] },
]

/** Section elements for the ids, each reporting `top` from getBoundingClientRect. */
const mountSections = (tops: Record<string, number>) => {
  const sections = Object.entries(tops).map(([id, top]) => {
    const section = document.createElement("section")
    section.id = id
    section.getBoundingClientRect = () => ({ top }) as DOMRect
    section.scrollIntoView = jest.fn()
    document.body.appendChild(section)
    return section
  })
  return () => sections.forEach(section => section.remove())
}

beforeAll(() => {
  window.requestAnimationFrame = (callback: FrameRequestCallback) => {
    callback(0)
    return 0
  }
  window.cancelAnimationFrame = () => {}
})

describe("Contents", () => {
  it("renders a nav named by its heading, with nested lists of section links", () => {
    render(<Contents items={items} />)
    const nav = screen.getByRole("navigation", { name: "Contents" })
    expect(nav).toBeInTheDocument()
    expect(screen.getAllByRole("list")).toHaveLength(2)
    expect(screen.getByRole("link", { name: "size" })).toHaveAttribute("href", "#size")
  })

  it("takes aria-label over the heading as the nav name", () => {
    render(<Contents items={items} heading="On this page" aria-label="Page content" />)
    expect(screen.getByRole("navigation", { name: "Page content" })).toBeInTheDocument()
    expect(screen.getByText("On this page")).toBeInTheDocument()
  })

  it("marks the controlled activeId with aria-current", () => {
    render(<Contents items={items} activeId="color" />)
    expect(screen.getByRole("link", { name: "color" })).toHaveAttribute("aria-current", "location")
    expect(screen.getByRole("link", { name: "Docs" })).not.toHaveAttribute("aria-current")
  })

  it("scroll-spies the last section whose top passed the line", () => {
    const unmount = mountSections({ docs: -800, props: -200, size: 10, color: 900 })
    const onActiveChange = jest.fn()
    render(<Contents items={items} onActiveChange={onActiveChange} />)
    expect(screen.getByRole("link", { name: "size" })).toHaveAttribute("aria-current", "location")
    expect(onActiveChange).toHaveBeenCalledWith("size")
    unmount()
  })

  it("scrolls to a clicked section and activates it", () => {
    const unmount = mountSections({ docs: 0, props: 600, size: 900, color: 1200 })
    render(<Contents items={items} />)
    const color = document.getElementById("color")!
    act(() => {
      fireEvent.click(screen.getByRole("link", { name: "color" }))
    })
    expect(color.scrollIntoView).toHaveBeenCalledWith(expect.objectContaining({ block: "start" }))
    expect(screen.getByRole("link", { name: "color" })).toHaveAttribute("aria-current", "location")
    unmount()
  })
})
