import React from "react"
import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import { getToken } from "@niceprototypes/styles"
import Lightbox from "./Lightbox"
import type { LightboxProps } from "./Lightbox.types"

jest.mock("@niceprototypes/ink", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}))

// jsdom 20 has HTMLDialogElement but no showModal / close. Stand-ins toggle the `open` attribute
// and queue `close` as a task like the native close steps.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.setAttribute("open", "")
  }
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    if (!this.hasAttribute("open")) return
    this.removeAttribute("open")
    setTimeout(() => this.dispatchEvent(new Event("close")), 0)
  }
})

const renderLightbox = (props: Partial<LightboxProps> = {}) =>
  render(
    <Lightbox imageUrl="/image.png" alt="Expanded" {...props}>
      <img src="/thumb.png" alt="Thumbnail" />
    </Lightbox>
  )

const trigger = () => screen.getByRole("button")
const dialog = () => screen.queryByRole("dialog")
const expandedImage = () => screen.queryByAltText("Expanded")

/** Escape on a modal dialog: the native `cancel` event. */
const pressEscape = () => fireEvent(dialog()!, new Event("cancel", { cancelable: true }))

/** Lets a queued `close` event from the stand-in close() fire. */
const flushCloseEvent = () => act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)))

/** CSS text of every styled-components rule that targets one of `element`'s classes. */
const cssFor = (element: Element) => {
  const sheet = Array.from(document.head.querySelectorAll("style"))
    .map((tag) => tag.textContent ?? "")
    .join("\n")
  return Array.from(element.classList)
    .flatMap((className) => sheet.match(new RegExp(`\\.${className}[^{]*\\{[^}]*\\}`, "g")) ?? [])
    .join("\n")
}

describe("Lightbox trigger", () => {
  it("is a focusable button", () => {
    renderLightbox()
    expect(trigger()).toHaveAttribute("tabindex", "0")
    trigger().focus()
    expect(trigger()).toHaveFocus()
  })

  it("opens on click", () => {
    renderLightbox()
    fireEvent.click(trigger())
    expect(expandedImage()).toBeInTheDocument()
  })

  it("opens on Enter", () => {
    renderLightbox()
    fireEvent.keyDown(trigger(), { key: "Enter" })
    expect(expandedImage()).toBeInTheDocument()
  })

  it("opens on Space and prevents the page scroll", () => {
    renderLightbox()
    const notPrevented = fireEvent.keyDown(trigger(), { key: " " })
    expect(notPrevented).toBe(false)
    expect(expandedImage()).toBeInTheDocument()
  })

  it("ignores other keys", () => {
    renderLightbox()
    fireEvent.keyDown(trigger(), { key: "a" })
    expect(expandedImage()).not.toBeInTheDocument()
  })
})

describe("Lightbox modal dialog", () => {
  it("is a modal dialog shown with showModal, holding the focus", () => {
    renderLightbox()
    fireEvent.click(trigger())
    const overlay = dialog()!
    expect(overlay.tagName).toBe("DIALOG")
    expect(overlay).toHaveAttribute("aria-modal", "true")
    expect(overlay).toHaveAttribute("open")
    expect(overlay).toHaveFocus()
  })

  it("is named by the title, else by alt", () => {
    const { unmount } = renderLightbox({ title: "Ridge" })
    fireEvent.click(trigger())
    expect(screen.getByRole("dialog", { name: "Ridge" })).toBeInTheDocument()
    unmount()
    renderLightbox()
    fireEvent.click(trigger())
    expect(screen.getByRole("dialog", { name: "Expanded" })).toBeInTheDocument()
  })

  it("closes on a platform close request (cancel), preventing the native close, and returns focus to the trigger", () => {
    renderLightbox()
    trigger().focus()
    fireEvent.keyDown(trigger(), { key: "Enter" })
    const notPrevented = pressEscape()
    expect(notPrevented).toBe(false)
    expect(dialog()).not.toBeInTheDocument()
    expect(trigger()).toHaveFocus()
  })

  it("closes on an Escape keydown, preventing its default", () => {
    renderLightbox()
    fireEvent.click(trigger())
    const notPrevented = fireEvent.keyDown(dialog()!, { key: "Escape" })
    expect(notPrevented).toBe(false)
    expect(dialog()).not.toBeInTheDocument()
  })

  it("closes on a click outside the image, not on the image", () => {
    renderLightbox()
    fireEvent.click(trigger())
    fireEvent.click(expandedImage()!)
    expect(dialog()).toBeInTheDocument()
    fireEvent.click(dialog()!)
    expect(dialog()).not.toBeInTheDocument()
  })

  it("closes when the browser closes the dialog natively", async () => {
    renderLightbox()
    fireEvent.click(trigger())
    act(() => dialog()!.close())
    await flushCloseEvent()
    expect(dialog()).not.toBeInTheDocument()
  })

  it("locks the page scroll while open", () => {
    renderLightbox()
    fireEvent.click(trigger())
    expect(document.body.style.overflow).toBe("hidden")
    pressEscape()
    expect(document.body.style.overflow).toBe("")
  })

  it("draws the scrim and image limits from the lightbox tokens", () => {
    renderLightbox()
    fireEvent.click(trigger())
    expect(cssFor(dialog()!)).toContain(`background-color:${getToken("lightbox.backgroundColor:base")}`)
    const imageCss = cssFor(expandedImage()!)
    expect(imageCss).toContain(`max-width:${getToken("lightbox.image.maxWidth:base")}`)
    expect(imageCss).toContain(`max-height:${getToken("lightbox.image.maxHeight:base")}`)
  })

  it("lays out the caption from the lightbox caption tokens", () => {
    renderLightbox({ title: "Ridge" })
    fireEvent.click(trigger())
    const caption = screen.getByText("Ridge").parentElement!
    expect(cssFor(caption)).toContain(`max-width:${getToken("lightbox.caption.maxWidth:base")}`)
    expect(cssFor(caption)).toContain(`padding:${getToken("lightbox.caption.padding:base")}`)
  })
})

describe("Lightbox open state", () => {
  it("reports every requested change in uncontrolled use", () => {
    const onOpenChange = jest.fn()
    renderLightbox({ onOpenChange })
    fireEvent.click(trigger())
    pressEscape()
    expect(onOpenChange.mock.calls).toEqual([[true], [false]])
  })

  it("follows open when controlled, only requesting changes", () => {
    const onOpenChange = jest.fn()
    const { rerender } = renderLightbox({ open: false, onOpenChange })
    fireEvent.click(trigger())
    expect(onOpenChange).toHaveBeenLastCalledWith(true)
    expect(dialog()).not.toBeInTheDocument()

    rerender(
      <Lightbox imageUrl="/image.png" alt="Expanded" open onOpenChange={onOpenChange}>
        <img src="/thumb.png" alt="Thumbnail" />
      </Lightbox>
    )
    expect(dialog()).toBeInTheDocument()
    pressEscape()
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    expect(dialog()).toBeInTheDocument()

    rerender(
      <Lightbox imageUrl="/image.png" alt="Expanded" open={false} onOpenChange={onOpenChange}>
        <img src="/thumb.png" alt="Thumbnail" />
      </Lightbox>
    )
    expect(dialog()).not.toBeInTheDocument()
    expect(trigger()).toHaveFocus()
  })
})
