import * as React from "react"
import { act, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Scroll from "./index"
import { useScrollEnd } from "../../hooks/useScrollEnd"

/** jsdom has no layout: the box is 100px tall; each row adds 50px of content. */
const VIEW_HEIGHT = 100
const ROW_HEIGHT = 50

let resizeCallbacks: ResizeObserverCallback[] = []
let reducedMotion = false

beforeEach(() => {
  resizeCallbacks = []
  reducedMotion = false
  window.ResizeObserver = class {
    constructor(callback: ResizeObserverCallback) {
      resizeCallbacks.push(callback)
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
  // jsdom has no Element.scrollTo; layOut gives the log one that scrolls.
  HTMLElement.prototype.scrollTo = jest.fn()
  window.matchMedia = ((query: string) => ({ matches: query.includes("reduce") && reducedMotion })) as unknown as typeof window.matchMedia
})

/** Give the element a box, an offset and a scrollTo that clamps and fires scroll, like a browser. */
const layOut = (element: HTMLElement) => {
  let scrollTop = 0
  const maxScrollTop = () => Math.max(0, element.scrollHeight - VIEW_HEIGHT)
  Object.defineProperty(element, "clientHeight", { configurable: true, get: () => VIEW_HEIGHT })
  Object.defineProperty(element, "scrollHeight", { configurable: true, get: () => element.children.length * ROW_HEIGHT })
  Object.defineProperty(element, "scrollTop", {
    configurable: true,
    get: () => scrollTop,
    set: (value: number) => {
      scrollTop = Math.min(value, maxScrollTop())
      element.dispatchEvent(new Event("scroll"))
    },
  })
  element.scrollTo = jest.fn((options: ScrollToOptions) => {
    element.scrollTop = options.top ?? 0
  }) as unknown as typeof element.scrollTo
}

const End = () => {
  const { atEnd, scrollToEnd } = useScrollEnd()
  return (
    <button data-testid="end" data-at-end={atEnd} onClick={() => scrollToEnd()}>
      Latest
    </button>
  )
}

/** A follow Scroll whose box is laid out before its effects run. */
const Log = ({ rows }: { rows: number }) => {
  const ref = React.useCallback((element: HTMLElement | null) => element && layOut(element), [])
  return (
    <Scroll follow data-testid="log" ref={ref}>
      {Array.from({ length: rows }, (_, index) => (
        <div key={index}>Row {index}</div>
      ))}
      <End />
    </Scroll>
  )
}

const logOf = () => screen.getByTestId("log")
const atEndOf = () => screen.getByTestId("end").dataset.atEnd

/** Mutation observer callbacks run as microtasks. */
const flush = () => act(async () => {})

describe("Scroll follow", () => {
  it("is the scroll container", () => {
    render(<Log rows={1} />)
    expect(logOf()).toHaveStyle({ overflowY: "auto" })
  })

  it("opens at the end, instantly", () => {
    render(<Log rows={5} />)
    expect(logOf().scrollTo).toHaveBeenCalledWith({ top: 6 * ROW_HEIGHT, behavior: "instant" })
    expect(logOf().scrollTop).toBe(6 * ROW_HEIGHT - VIEW_HEIGHT)
    expect(atEndOf()).toBe("true")
  })

  it("stays pinned to the end while the content grows, instantly", async () => {
    const { rerender } = render(<Log rows={5} />)
    rerender(<Log rows={8} />)
    await flush()
    expect(logOf().scrollTo).toHaveBeenLastCalledWith({ top: 9 * ROW_HEIGHT, behavior: "instant" })
    expect(logOf().scrollTop).toBe(9 * ROW_HEIGHT - VIEW_HEIGHT)
  })

  it("follows a size change without a mutation", () => {
    render(<Log rows={5} />)
    const calls = (logOf().scrollTo as jest.Mock).mock.calls.length
    Object.defineProperty(logOf(), "scrollHeight", { configurable: true, get: () => 7 * ROW_HEIGHT })
    act(() => resizeCallbacks.forEach(callback => callback([], {} as ResizeObserver)))
    expect((logOf().scrollTo as jest.Mock).mock.calls.length).toBe(calls + 1)
  })

  it("ignores a change that leaves the end in place", () => {
    render(<Log rows={5} />)
    const calls = (logOf().scrollTo as jest.Mock).mock.calls.length
    act(() => resizeCallbacks.forEach(callback => callback([], {} as ResizeObserver)))
    expect((logOf().scrollTo as jest.Mock).mock.calls.length).toBe(calls)
  })

  it("scrolls instantly under prefers-reduced-motion", async () => {
    const { rerender } = render(<Log rows={5} />)
    reducedMotion = true
    rerender(<Log rows={8} />)
    await flush()
    expect(logOf().scrollTo).toHaveBeenLastCalledWith({ top: 9 * ROW_HEIGHT, behavior: "instant" })
  })

  it("releases the pin when scrolled up, and does not follow growth", async () => {
    const { rerender } = render(<Log rows={5} />)
    act(() => {
      logOf().scrollTop = 0
    })
    expect(atEndOf()).toBe("false")
    const calls = (logOf().scrollTo as jest.Mock).mock.calls.length
    rerender(<Log rows={8} />)
    await flush()
    expect((logOf().scrollTo as jest.Mock).mock.calls.length).toBe(calls)
    expect(logOf().scrollTop).toBe(0)
  })

  it("pins again on returning to the end", async () => {
    const { rerender } = render(<Log rows={5} />)
    act(() => {
      logOf().scrollTop = 0
    })
    act(() => {
      logOf().scrollTop = 6 * ROW_HEIGHT
    })
    expect(atEndOf()).toBe("true")
    rerender(<Log rows={8} />)
    await flush()
    expect(logOf().scrollTop).toBe(9 * ROW_HEIGHT - VIEW_HEIGHT)
  })

  it("counts within scroll.follow.threshold of the end as the end", () => {
    render(<Log rows={5} />)
    logOf().style.setProperty("--np--scroll--follow--threshold", "20px")
    // The threshold is read on content changes.
    act(() => resizeCallbacks.forEach(callback => callback([], {} as ResizeObserver)))
    act(() => {
      logOf().scrollTop = 6 * ROW_HEIGHT - VIEW_HEIGHT - 15
    })
    expect(atEndOf()).toBe("true")
    act(() => {
      logOf().scrollTop = 6 * ROW_HEIGHT - VIEW_HEIGHT - 25
    })
    expect(atEndOf()).toBe("false")
  })

  it("scrollToEnd scrolls to the end and pins", async () => {
    const { rerender } = render(<Log rows={5} />)
    act(() => {
      logOf().scrollTop = 0
    })
    act(() => screen.getByTestId("end").click())
    expect(logOf().scrollTo).toHaveBeenLastCalledWith({ top: 6 * ROW_HEIGHT, behavior: "smooth" })
    expect(atEndOf()).toBe("true")
    rerender(<Log rows={8} />)
    await flush()
    expect(logOf().scrollTop).toBe(9 * ROW_HEIGHT - VIEW_HEIGHT)
  })

  it("forwards its ref to the element", () => {
    const ref = React.createRef<HTMLElement>()
    render(<Scroll follow ref={ref} data-testid="log" />)
    expect(ref.current).toBe(logOf())
  })

  it("useScrollEnd throws outside a follow Scroll", () => {
    jest.spyOn(console, "error").mockImplementation(() => {})
    expect(() => render(<End />)).toThrow("useScrollEnd must be used within a <Scroll follow>")
    jest.mocked(console.error).mockRestore()
  })
})
