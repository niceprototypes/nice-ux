import * as React from "react"
import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import Tooltip from "./Tooltip"
import type { TooltipAnchorType, TooltipPositionType, TooltipProps, TooltipTriggerType } from "./Tooltip.types"

// nice-icons re-exports raw .svg sources, which jest cannot parse; the bubble
// styles only need encoded mask URLs.
jest.mock("nice-icons", () => ({ getIconEncoded: (name: string) => `data:${name}` }))

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

  describe("click trigger", () => {
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

  it("applies className to the trigger wrapper", () => {
    renderTooltip({ className: "custom" })
    expect(triggerEl()).toHaveClass("custom")
  })
})
