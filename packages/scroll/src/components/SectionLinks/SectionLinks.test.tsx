import * as React from "react"
import { render, screen } from "@testing-library/react"
import { act } from "react"
import "@testing-library/jest-dom"
import { StickySectionLinks } from "./index"

/** The declarations of an element's styled-components class. */
const rulesOf = (element: HTMLElement): string => {
  const css = Array.from(document.querySelectorAll("style"), (style) => style.textContent).join("")
  const classes = Array.from(element.classList)
  return classes.map((name) => css.match(new RegExp(`\\.${name}\\{([^}]*)\\}`))?.[1] ?? "").join("")
}

/** The callback and disconnect spy of the last IntersectionObserver created. */
let observerCallback: IntersectionObserverCallback
const disconnect = jest.fn()

beforeEach(() => {
  disconnect.mockClear()
  window.IntersectionObserver = jest.fn((callback: IntersectionObserverCallback) => {
    observerCallback = callback
    return { observe: jest.fn(), unobserve: jest.fn(), disconnect }
  }) as unknown as typeof IntersectionObserver
})

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
]

const renderWithSections = () =>
  render(
    <>
      <StickySectionLinks links={LINKS} />
      <section id="about" />
      <section id="services" />
    </>
  )

describe("StickySectionLinks", () => {
  it("colours the link to the section in view with the active token", () => {
    renderWithSections()
    act(() =>
      observerCallback(
        [{ isIntersecting: true, target: document.getElementById("services")! } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    )
    expect(rulesOf(screen.getByRole("link", { name: "Services" }))).toContain(
      "color:var(--np--scroll--section-links--color--active);"
    )
    expect(rulesOf(screen.getByRole("link", { name: "About" }))).toContain("color:var(--np--scroll--section-links--color);")
  })

  it("disconnects its observer on unmount", () => {
    const { unmount } = renderWithSections()
    unmount()
    expect(disconnect).toHaveBeenCalledTimes(1)
  })
})
