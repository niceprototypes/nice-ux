import * as React from "react"
import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { ChatLog } from "."

/** jsdom has no layout: the box is 100px tall; each message adds 50px. */
const VIEW_HEIGHT = 100
const ROW_HEIGHT = 50

beforeEach(() => {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
  HTMLElement.prototype.scrollTo = jest.fn()
  window.matchMedia = (() => ({ matches: false })) as unknown as typeof window.matchMedia
})

/** Give the log a box and a scrollTo that clamps and fires scroll, like a browser. */
const layOut = (element: HTMLElement, rows: number) => {
  let scrollTop = 0
  const scrollHeight = rows * ROW_HEIGHT
  Object.defineProperty(element, "clientHeight", { configurable: true, get: () => VIEW_HEIGHT })
  Object.defineProperty(element, "scrollHeight", { configurable: true, get: () => scrollHeight })
  Object.defineProperty(element, "scrollTop", {
    configurable: true,
    get: () => scrollTop,
    set: (value: number) => {
      scrollTop = Math.max(0, Math.min(value, scrollHeight - VIEW_HEIGHT))
      element.dispatchEvent(new Event("scroll"))
    },
  })
  element.scrollTo = jest.fn((options: ScrollToOptions) => {
    element.scrollTop = options.top ?? 0
  }) as unknown as typeof element.scrollTo
}

/** Layout is applied before ChatLog's effects run, through a ref on the first message's log. */
const renderLog = (streaming = false) => {
  const Probe = () => {
    const ref = React.useCallback((element: HTMLElement | null) => {
      const log = element?.closest<HTMLElement>("[role=log]")
      if (log) layOut(log, 6)
    }, [])
    return <div ref={ref}>First</div>
  }
  return render(
    <ChatLog
      aria-label="Conversation"
      streaming={streaming}
    >
      <Probe />
    </ChatLog>
  )
}

const log = () => screen.getByRole("log", { name: "Conversation" })

describe("ChatLog", () => {
  it("is a labelled log, busy only while streaming", () => {
    const { unmount } = renderLog()
    expect(log()).not.toHaveAttribute("aria-busy")
    unmount()
    renderLog(true)
    expect(log()).toHaveAttribute("aria-busy", "true")
  })

  it("shows the end button only when not at the end; it scrolls to the end", async () => {
    renderLog()
    expect(screen.queryByRole("button", { name: "Scroll to latest" })).not.toBeInTheDocument()
    act(() => {
      log().scrollTop = 0
    })
    const end = screen.getByRole("button", { name: "Scroll to latest" })
    await userEvent.click(end)
    expect(log().scrollTo).toHaveBeenLastCalledWith({ top: 6 * ROW_HEIGHT, behavior: "smooth" })
    expect(screen.queryByRole("button", { name: "Scroll to latest" })).not.toBeInTheDocument()
  })
})
