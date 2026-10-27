import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import Lightbox from "./Lightbox"

jest.mock("@niceprototypes/ink", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}))

const renderLightbox = () =>
  render(
    <Lightbox imageUrl="/image.png" alt="Expanded">
      <img src="/thumb.png" alt="Thumbnail" />
    </Lightbox>
  )

const expandedImage = () => screen.queryByAltText("Expanded")

describe("Lightbox trigger", () => {
  it("is a focusable button", () => {
    renderLightbox()
    const trigger = screen.getByRole("button")
    expect(trigger).toHaveAttribute("tabindex", "0")
    trigger.focus()
    expect(trigger).toHaveFocus()
  })

  it("opens on click", () => {
    renderLightbox()
    fireEvent.click(screen.getByRole("button"))
    expect(expandedImage()).toBeInTheDocument()
  })

  it("opens on Enter", () => {
    renderLightbox()
    fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" })
    expect(expandedImage()).toBeInTheDocument()
  })

  it("opens on Space and prevents the page scroll", () => {
    renderLightbox()
    const notPrevented = fireEvent.keyDown(screen.getByRole("button"), { key: " " })
    expect(notPrevented).toBe(false)
    expect(expandedImage()).toBeInTheDocument()
  })

  it("ignores other keys", () => {
    renderLightbox()
    fireEvent.keyDown(screen.getByRole("button"), { key: "a" })
    expect(expandedImage()).not.toBeInTheDocument()
  })

  it("closes on Escape", () => {
    renderLightbox()
    fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" })
    fireEvent.keyDown(document, { key: "Escape" })
    expect(expandedImage()).not.toBeInTheDocument()
  })
})
