import * as React from "react"
import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import Tooltip from "./Tooltip"
import type { TooltipAnchorType, TooltipPositionType, TooltipProps, TooltipTriggerType } from "./Tooltip.types"

// Trigger rect stubbed so positions are deterministic under jsdom (no layout).
const TRIGGER_RECT = { top: 100, left: 40, right: 140, bottom: 130, width: 100, height: 30, x: 40, y: 100 }
// Pointer position carried by the activating event, for anchor="cursor".
const POINTER = { clientX: 300, clientY: 200 }

// Expected inline position per anchor and side, written out as literals (8px
// offset) so they pin the rendered output independently of the implementation.
const EXPECTED: Record<TooltipAnchorType, Record<TooltipPositionType, { top: string; left: string; transform: string }>> = {
  trigger: {
    top: { top: "92px", left: "90px", transform: "translate(-50%, -100%)" },
    bottom: { top: "138px", left: "90px", transform: "translate(-50%, 0)" },
    left: { top: "115px", left: "32px", transform: "translate(-100%, -50%)" },
    right: { top: "115px", left: "148px", transform: "translate(0, -50%)" },
  },
  cursor: {
    top: { top: "192px", left: "300px", transform: "translate(-50%, -100%)" },
    bottom: { top: "208px", left: "300px", transform: "translate(-50%, 0)" },
    left: { top: "200px", left: "292px", transform: "translate(-100%, -50%)" },
    right: { top: "200px", left: "308px", transform: "translate(0, -50%)" },
  },
}

const renderTooltip = (props: Partial<TooltipProps> = {}) =>
  render(
    <Tooltip content="tip" {...props}>
      <button>trigger</button>
    </Tooltip>
  )

const triggerEl = () => screen.getByText("trigger").parentElement as HTMLElement
const bubble = () => screen.queryByText("tip")

/** Activate via the given trigger mode, then flush the (possibly zero) show delay. */
const activate = (trigger: TooltipTriggerType, ms = 0) => {
  if (trigger === "click") fireEvent.click(triggerEl(), POINTER)
  else fireEvent.mouseEnter(triggerEl(), POINTER)
  act(() => {
    jest.advanceTimersByTime(ms)
  })
}

beforeEach(() => {
  jest.useFakeTimers()
  jest
    .spyOn(HTMLElement.prototype, "getBoundingClientRect")
    .mockReturnValue({ ...TRIGGER_RECT, toJSON: () => ({}) } as DOMRect)
})

afterEach(() => {
  jest.useRealTimers()
  jest.restoreAllMocks()
})

describe("Tooltip", () => {
  describe("hover trigger", () => {
    it("shows on mouseenter and hides on mouseleave", () => {
      renderTooltip()
      expect(bubble()).not.toBeInTheDocument()
      activate("hover")
      expect(bubble()).toBeInTheDocument()
      fireEvent.mouseLeave(triggerEl())
      act(() => {
        jest.advanceTimersByTime(0)
      })
      expect(bubble()).not.toBeInTheDocument()
    })

    it("renders the bubble into document.body", () => {
      const { container } = renderTooltip()
      activate("hover")
      expect(bubble()?.parentElement).toBe(document.body)
      expect(container.contains(bubble())).toBe(false)
    })
  })

  describe("keyboard", () => {
    const flush = () =>
      act(() => {
        jest.advanceTimersByTime(0)
      })

    it("shows on focus of a focusable child and hides on blur", () => {
      renderTooltip()
      fireEvent.focus(screen.getByText("trigger"))
      flush()
      expect(bubble()).toBeInTheDocument()
      fireEvent.blur(screen.getByText("trigger"))
      flush()
      expect(bubble()).not.toBeInTheDocument()
    })

    it("makes the wrapper focusable when the trigger has no focusable child", () => {
      render(
        <Tooltip content="tip">
          <span>plain</span>
        </Tooltip>
      )
      const wrapper = screen.getByText("plain").parentElement!
      expect(wrapper).toHaveAttribute("tabindex", "0")
      act(() => wrapper.focus())
      flush()
      expect(bubble()).toBeInTheDocument()
    })

    it("leaves the wrapper out of the tab order when a child is focusable", () => {
      render(
        <Tooltip content="tip">
          <button>action</button>
        </Tooltip>
      )
      expect(screen.getByText("action").parentElement).not.toHaveAttribute("tabindex")
    })

    it("stays shown while focus moves between children of the trigger", () => {
      render(
        <Tooltip content="tip">
          <button>first</button>
          <button>second</button>
        </Tooltip>
      )
      const first = screen.getByText("first")
      const second = screen.getByText("second")
      fireEvent.focus(first)
      flush()
      fireEvent.blur(first, { relatedTarget: second })
      flush()
      expect(bubble()).toBeInTheDocument()
      fireEvent.focus(second, { relatedTarget: first })
      flush()
      expect(bubble()).toBeInTheDocument()
    })

    it("anchors a focus-shown bubble to the trigger even with anchor cursor", () => {
      renderTooltip({ anchor: "cursor" })
      fireEvent.focus(screen.getByText("trigger"))
      flush()
      const el = bubble() as HTMLElement
      expect(el.style.top).toBe(EXPECTED.trigger.top.top)
      expect(el.style.left).toBe(EXPECTED.trigger.top.left)
    })

    it("hides on Escape, bypassing delayHide", () => {
      renderTooltip({ delayHide: 300 })
      activate("hover")
      fireEvent.keyDown(document, { key: "Escape" })
      expect(bubble()).not.toBeInTheDocument()
    })

    it("ignores other keys", () => {
      renderTooltip()
      activate("hover")
      fireEvent.keyDown(document, { key: "Enter" })
      expect(bubble()).toBeInTheDocument()
    })

    it("hides a click-opened bubble on Escape", () => {
      renderTooltip({ trigger: "click" })
      activate("click")
      fireEvent.keyDown(document, { key: "Escape" })
      expect(bubble()).not.toBeInTheDocument()
    })

    it("does not open on focus in click mode", () => {
      renderTooltip({ trigger: "click" })
      fireEvent.focus(screen.getByText("trigger"))
      flush()
      expect(bubble()).not.toBeInTheDocument()
    })
  })

  describe("click trigger", () => {
    const flush = () =>
      act(() => {
        jest.advanceTimersByTime(0)
      })

    it.each(["Enter", " "])("toggles a focusable wrapper on %p", (key) => {
      render(
        <Tooltip content="tip" trigger="click">
          <span>plain</span>
        </Tooltip>
      )
      const wrapper = screen.getByText("plain").parentElement!
      expect(wrapper).toHaveAttribute("tabindex", "0")
      fireEvent.keyDown(wrapper, { key })
      flush()
      expect(bubble()).toBeInTheDocument()
      fireEvent.keyDown(wrapper, { key })
      flush()
      expect(bubble()).not.toBeInTheDocument()
    })

    it("ignores Enter on a focusable child (its own click toggles)", () => {
      renderTooltip({ trigger: "click" })
      fireEvent.keyDown(screen.getByText("trigger"), { key: "Enter" })
      flush()
      expect(bubble()).not.toBeInTheDocument()
    })

    it("ignores other keys on the wrapper", () => {
      render(
        <Tooltip content="tip" trigger="click">
          <span>plain</span>
        </Tooltip>
      )
      fireEvent.keyDown(screen.getByText("plain").parentElement!, { key: "a" })
      flush()
      expect(bubble()).not.toBeInTheDocument()
    })

    it("toggles on click", () => {
      renderTooltip({ trigger: "click" })
      activate("click")
      expect(bubble()).toBeInTheDocument()
      fireEvent.click(triggerEl())
      act(() => {
        jest.advanceTimersByTime(0)
      })
      expect(bubble()).not.toBeInTheDocument()
    })

    it("does not open on hover", () => {
      renderTooltip({ trigger: "click" })
      activate("hover")
      expect(bubble()).not.toBeInTheDocument()
    })
  })

  describe("delays", () => {
    it("defers show by delayShow", () => {
      renderTooltip({ delayShow: 500 })
      activate("hover", 499)
      expect(bubble()).not.toBeInTheDocument()
      act(() => {
        jest.advanceTimersByTime(1)
      })
      expect(bubble()).toBeInTheDocument()
    })

    it("defers hide by delayHide", () => {
      renderTooltip({ delayHide: 300 })
      activate("hover")
      fireEvent.mouseLeave(triggerEl())
      act(() => {
        jest.advanceTimersByTime(299)
      })
      expect(bubble()).toBeInTheDocument()
      act(() => {
        jest.advanceTimersByTime(1)
      })
      expect(bubble()).not.toBeInTheDocument()
    })

    it("cancels a pending show when the pointer leaves first", () => {
      renderTooltip({ delayShow: 500 })
      activate("hover", 200)
      fireEvent.mouseLeave(triggerEl())
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      expect(bubble()).not.toBeInTheDocument()
    })

    it("clears a pending show on unmount", () => {
      const { unmount } = renderTooltip({ delayShow: 500 })
      activate("hover", 0)
      unmount()
      expect(() =>
        act(() => {
          jest.advanceTimersByTime(1000)
        })
      ).not.toThrow()
      expect(bubble()).not.toBeInTheDocument()
    })
  })

  describe("positions", () => {
    const anchors: TooltipAnchorType[] = ["trigger", "cursor"]
    const positions: TooltipPositionType[] = ["top", "bottom", "left", "right"]
    const triggers: TooltipTriggerType[] = ["hover", "click"]
    const cases = anchors.flatMap((anchor) =>
      positions.flatMap((position) => triggers.map((trigger) => [anchor, position, trigger] as const))
    )

    it.each(cases)("anchor %s / position %s / %s trigger", (anchor, position, trigger) => {
      renderTooltip({ anchor, position, trigger })
      activate(trigger)
      const el = bubble() as HTMLElement
      expect(el.style.top).toBe(EXPECTED[anchor][position].top)
      expect(el.style.left).toBe(EXPECTED[anchor][position].left)
      expect(el.style.transform).toBe(EXPECTED[anchor][position].transform)
    })

    it("defaults to anchor trigger / position top", () => {
      renderTooltip()
      activate("hover")
      const el = bubble() as HTMLElement
      expect(el.style.top).toBe(EXPECTED.trigger.top.top)
      expect(el.style.left).toBe(EXPECTED.trigger.top.left)
      expect(el.style.transform).toBe(EXPECTED.trigger.top.transform)
    })
  })

  describe("viewport", () => {
    it("flips to the opposite side when its side overflows", () => {
      jest.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(200)
      jest.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(40)
      renderTooltip()
      activate("hover")
      // top: 92 - 200 < 0 → bottom
      expect((bubble() as HTMLElement).style.transform).toBe(EXPECTED.trigger.bottom.transform)
      expect((bubble() as HTMLElement).style.top).toBe(EXPECTED.trigger.bottom.top)
    })

    it("shifts along the cross axis to stay inside the viewport", () => {
      jest.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(200)
      renderTooltip()
      activate("hover")
      // centre 90, box left 90 - 100 = -10 → shifted +10
      expect((bubble() as HTMLElement).style.left).toBe("100px")
    })
  })

  describe("open", () => {
    it("shows the bubble without activation when true", () => {
      renderTooltip({ open: true })
      const el = bubble() as HTMLElement
      expect(el).toBeInTheDocument()
      expect(el.style.top).toBe(EXPECTED.trigger.top.top)
      expect(triggerEl()).toHaveAttribute("aria-describedby", el.id)
    })

    it("keeps the bubble shown on mouseleave and Escape when true", () => {
      renderTooltip({ open: true })
      fireEvent.mouseLeave(triggerEl())
      fireEvent.keyDown(document, { key: "Escape" })
      act(() => {
        jest.advanceTimersByTime(0)
      })
      expect(bubble()).toBeInTheDocument()
    })

    it("hides the bubble on hover when false", () => {
      renderTooltip({ open: false })
      activate("hover")
      expect(bubble()).not.toBeInTheDocument()
    })
  })

  describe("theme", () => {
    it("wraps the bubble in Theme", () => {
      renderTooltip({ open: true, theme: "night" })
      expect(bubble()?.parentElement).toHaveAttribute("data-theme", "night")
    })

    it("renders the bubble directly into body without a theme", () => {
      renderTooltip({ open: true })
      expect(bubble()?.parentElement).toBe(document.body)
    })
  })

  describe("aria", () => {
    it("gives the bubble role tooltip", () => {
      renderTooltip()
      activate("hover")
      expect(screen.getByRole("tooltip")).toHaveTextContent("tip")
    })

    it("links trigger to bubble with aria-describedby only while visible", () => {
      renderTooltip()
      expect(triggerEl()).not.toHaveAttribute("aria-describedby")
      activate("hover")
      const tooltip = screen.getByRole("tooltip")
      expect(tooltip.id).not.toBe("")
      expect(triggerEl()).toHaveAttribute("aria-describedby", tooltip.id)
      fireEvent.mouseLeave(triggerEl())
      act(() => {
        jest.advanceTimersByTime(0)
      })
      expect(triggerEl()).not.toHaveAttribute("aria-describedby")
    })
  })

  it("applies className to the trigger wrapper", () => {
    renderTooltip({ className: "custom" })
    expect(triggerEl()).toHaveClass("custom")
  })
})
