import React from "react"
import { act, fireEvent, render, screen, within } from "@testing-library/react"
import "@testing-library/jest-dom"
import Calendar from "./Calendar"
import { Calendar as ResponsiveCalendar } from "."

// react-icon's dist requires @niceprototypes/styles without declaring it; mock it the way
// react-button's tests do. The mock renders the icon name for assertions.
jest.mock("@niceprototypes/icon", () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <span data-testid="icon">{name}</span>,
}))

// Today is fixed at 2026-09-24 (a Thursday) for every test.
beforeEach(() => {
  jest.useFakeTimers({ now: new Date(2026, 8, 24, 12) })
})
afterEach(() => {
  jest.useRealTimers()
  document.documentElement.dir = ""
})

const day = (iso: string) => document.querySelector<HTMLButtonElement>(`[data-date="${iso}"]`)!
const focused = () => (document.activeElement as HTMLElement | null)?.getAttribute("data-date")
const tabbable = () =>
  Array.from(document.querySelectorAll<HTMLButtonElement>("[data-date]")).filter((b) => b.tabIndex === 0)
const columnHeaders = () => screen.getAllByRole("columnheader")
const press = (key: string, init: Partial<KeyboardEventInit> = {}) =>
  fireEvent.keyDown(document.activeElement!, { key, ...init })
const heading = () => screen.getByRole("grid").getAttribute("aria-labelledby")!

describe("Calendar", () => {
  describe("ISO value contract", () => {
    it("reads an ISO value and emits ISO strings", () => {
      const onChange = jest.fn()
      render(<Calendar value="2026-09-15" onChange={onChange} locale="en-US" />)
      expect(day("2026-09-15").closest("td")).toHaveAttribute("aria-selected", "true")
      fireEvent.click(day("2026-09-20"))
      expect(onChange).toHaveBeenCalledWith("2026-09-20")
      expect(typeof onChange.mock.calls[0][0]).toBe("string")
    })

    it("is controlled: selection follows value, not clicks", () => {
      const { rerender } = render(<Calendar value="2026-09-15" locale="en-US" />)
      fireEvent.click(day("2026-09-20"))
      expect(day("2026-09-15").closest("td")).toHaveAttribute("aria-selected", "true")
      rerender(<Calendar value="2026-11-02" locale="en-US" />)
      expect(day("2026-11-02").closest("td")).toHaveAttribute("aria-selected", "true")
    })

    it("is uncontrolled with defaultValue", () => {
      render(<Calendar defaultValue="2026-09-15" locale="en-US" />)
      fireEvent.click(day("2026-09-20"))
      expect(day("2026-09-20").closest("td")).toHaveAttribute("aria-selected", "true")
      expect(day("2026-09-15").closest("td")).not.toHaveAttribute("aria-selected")
    })

    it("treats an invalid ISO string as no selection", () => {
      render(<Calendar value="2026-02-30" locale="en-US" />)
      expect(document.querySelector('[aria-selected="true"]')).toBeNull()
    })
  })

  describe("ARIA", () => {
    it("renders a grid labelled by the month heading", () => {
      render(<Calendar locale="en-US" aria-label="Delivery date" />)
      const grid = screen.getByRole("grid")
      const label = document.getElementById(heading())!
      expect(label).toHaveTextContent("September 2026")
      expect(label).toHaveAttribute("aria-live", "polite")
      expect(screen.getByRole("group", { name: "Delivery date" })).toContainElement(grid)
      expect(within(grid).getAllByRole("row").length).toBeGreaterThan(4)
      expect(columnHeaders()).toHaveLength(7)
    })

    it("marks today with aria-current=date", () => {
      render(<Calendar locale="en-US" />)
      expect(day("2026-09-24")).toHaveAttribute("aria-current", "date")
      expect(day("2026-09-23")).not.toHaveAttribute("aria-current")
    })

    it("uses short weekday text with the full name in abbr and aria-label", () => {
      render(<Calendar locale="en-US" />)
      const first = columnHeaders()[0]
      expect(first).toHaveTextContent("Sun")
      expect(first).toHaveAttribute("abbr", "Sunday")
      expect(first).toHaveAttribute("aria-label", "Sunday")
    })

    it("formats day numbers in the locale's numbering system", () => {
      render(<Calendar locale="ar-EG" />)
      expect(day("2026-09-24")).toHaveTextContent("٢٤")
    })
  })

  describe("week start", () => {
    it("starts on Sunday for en-US and Monday for de-DE", () => {
      const { unmount } = render(<Calendar locale="en-US" />)
      expect(columnHeaders()[0]).toHaveAttribute("aria-label", "Sunday")
      unmount()
      render(<Calendar locale="de-DE" />)
      expect(columnHeaders()[0]).toHaveAttribute("aria-label", "Montag")
    })

    it("honours firstDayOfWeek", () => {
      render(<Calendar locale="en-US" firstDayOfWeek={3} />)
      expect(columnHeaders()[0]).toHaveAttribute("aria-label", "Wednesday")
    })

    it("falls back to the region table when Intl.Locale has no week info", () => {
      const proto = Intl.Locale.prototype as unknown as Record<string, unknown>
      const getWeekInfo = Object.getOwnPropertyDescriptor(proto, "getWeekInfo")
      const weekInfo = Object.getOwnPropertyDescriptor(proto, "weekInfo")
      delete proto.getWeekInfo
      delete proto.weekInfo
      try {
        const cases: [string, string][] = [
          ["en-US", "Sunday"],
          ["en", "Sunday"], // no region: maximize() → US
          ["de-DE", "Montag"],
          ["en-GB", "Monday"],
          ["en-EG", "Saturday"],
        ]
        for (const [locale, first] of cases) {
          const { unmount } = render(<Calendar locale={locale} />)
          expect(columnHeaders()[0]).toHaveAttribute("aria-label", first)
          unmount()
        }
      } finally {
        if (getWeekInfo) Object.defineProperty(proto, "getWeekInfo", getWeekInfo)
        if (weekInfo) Object.defineProperty(proto, "weekInfo", weekInfo)
      }
    })
  })

  describe("roving tabindex", () => {
    it("makes the selected day the only tabbable day", () => {
      render(<Calendar value="2026-09-10" locale="en-US" />)
      expect(tabbable().map((b) => b.dataset.date)).toEqual(["2026-09-10"])
    })

    it("falls back to today", () => {
      render(<Calendar locale="en-US" />)
      expect(tabbable().map((b) => b.dataset.date)).toEqual(["2026-09-24"])
    })

    it("falls back to the first enabled day when today is disabled", () => {
      render(<Calendar locale="en-US" isDateDisabled={(d) => d === "2026-09-24" || d === "2026-09-01"} />)
      expect(tabbable().map((b) => b.dataset.date)).toEqual(["2026-09-02"])
    })

    it("follows focus", () => {
      render(<Calendar locale="en-US" />)
      act(() => day("2026-09-24").focus())
      press("ArrowRight")
      expect(tabbable().map((b) => b.dataset.date)).toEqual(["2026-09-25"])
    })
  })

  describe("keyboard", () => {
    const start = (props: Partial<React.ComponentProps<typeof Calendar>> = {}) => {
      render(<Calendar locale="en-US" value="2026-09-24" {...props} />)
      act(() => day("2026-09-24").focus())
    }

    it.each<[string, Partial<KeyboardEventInit>, string]>([
      ["ArrowRight", {}, "2026-09-25"],
      ["ArrowLeft", {}, "2026-09-23"],
      ["ArrowDown", {}, "2026-10-01"],
      ["ArrowUp", {}, "2026-09-17"],
      ["Home", {}, "2026-09-20"], // Sunday (en-US week start)
      ["End", {}, "2026-09-26"], // Saturday
      ["PageDown", {}, "2026-10-24"],
      ["PageUp", {}, "2026-08-24"],
      ["PageDown", { shiftKey: true }, "2027-09-24"],
      ["PageUp", { shiftKey: true }, "2025-09-24"],
    ])("%s %o moves focus to %s", (key, init, expected) => {
      start()
      press(key, init)
      expect(focused()).toBe(expected)
    })

    it("uses the locale week start for Home/End", () => {
      start({ locale: "de-DE" })
      press("Home")
      expect(focused()).toBe("2026-09-21") // Monday
      press("End")
      expect(focused()).toBe("2026-09-27") // Sunday
    })

    it("clamps PageUp/PageDown to the target month's length", () => {
      render(<Calendar locale="en-US" value="2026-01-31" />)
      act(() => day("2026-01-31").focus())
      press("PageDown")
      expect(focused()).toBe("2026-02-28")
    })

    it("changes the visible month when focus leaves it, and announces the heading", () => {
      start()
      expect(document.getElementById(heading())).toHaveTextContent("September 2026")
      press("ArrowDown")
      expect(focused()).toBe("2026-10-01")
      expect(document.getElementById(heading())).toHaveTextContent("October 2026")
    })

    it.each(["Enter", " "])("%p selects the focused day", (key) => {
      const onChange = jest.fn()
      start({ onChange })
      press("ArrowRight")
      press(key)
      expect(onChange).toHaveBeenCalledWith("2026-09-25")
    })

    it("mirrors ArrowLeft/ArrowRight in RTL", () => {
      document.documentElement.dir = "rtl"
      start()
      press("ArrowRight")
      expect(focused()).toBe("2026-09-23")
      press("ArrowLeft")
      press("ArrowLeft")
      expect(focused()).toBe("2026-09-25")
    })
  })

  describe("month navigation", () => {
    it("moves by month and announces the new heading", () => {
      render(<Calendar locale="en-US" />)
      fireEvent.click(screen.getByRole("button", { name: "Next month" }))
      expect(document.getElementById(heading())).toHaveTextContent("October 2026")
      fireEvent.click(screen.getByRole("button", { name: "Previous month" }))
      fireEvent.click(screen.getByRole("button", { name: "Previous month" }))
      expect(document.getElementById(heading())).toHaveTextContent("August 2026")
      // No selection or today in August: the first day is tabbable
      expect(tabbable().map((b) => b.dataset.date)).toEqual(["2026-08-01"])
    })

    it("points the carets along the inline axis and swaps them in RTL", () => {
      const { unmount } = render(<Calendar locale="en-US" />)
      expect(screen.getAllByTestId("icon").map((i) => i.textContent)).toEqual(["carat-left", "carat-right"])
      unmount()
      document.documentElement.dir = "rtl"
      render(<Calendar locale="en-US" />)
      expect(screen.getAllByTestId("icon").map((i) => i.textContent)).toEqual(["carat-right", "carat-left"])
    })
  })

  describe("min / max / isDateDisabled", () => {
    it("disables dates outside min/max", () => {
      render(<Calendar locale="en-US" min="2026-09-10" max="2026-09-26" />)
      expect(day("2026-09-09")).toHaveAttribute("aria-disabled", "true")
      expect(day("2026-09-27")).toHaveAttribute("aria-disabled", "true")
      expect(day("2026-09-10")).not.toHaveAttribute("aria-disabled")
    })

    it("does not select disabled dates by click or key", () => {
      const onChange = jest.fn()
      render(<Calendar locale="en-US" onChange={onChange} isDateDisabled={(d) => d === "2026-09-25"} />)
      fireEvent.click(day("2026-09-25"))
      act(() => day("2026-09-24").focus())
      press("ArrowRight")
      expect(focused()).toBe("2026-09-25") // disabled days stay focusable
      press("Enter")
      expect(onChange).not.toHaveBeenCalled()
    })

    it("stops keyboard focus at min and max", () => {
      render(<Calendar locale="en-US" value="2026-09-24" min="2026-09-20" max="2026-09-26" />)
      act(() => day("2026-09-24").focus())
      press("PageDown")
      expect(focused()).toBe("2026-09-26")
      press("ArrowUp")
      expect(focused()).toBe("2026-09-20")
    })

    it("blocks month navigation past min/max", () => {
      render(<Calendar locale="en-US" min="2026-09-01" max="2026-09-30" />)
      fireEvent.click(screen.getByRole("button", { name: "Previous month" }))
      fireEvent.click(screen.getByRole("button", { name: "Next month" }))
      expect(document.getElementById(heading())).toHaveTextContent("September 2026")
    })
  })

  it("forwards className, ref and wraps with withBreakpoints", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<ResponsiveCalendar locale="en-US" className="custom" ref={ref} />)
    expect(ref.current).toHaveClass("custom")
    expect(ref.current).toHaveAttribute("role", "group")
  })
})
