import { computeAnchorPosition } from "./computeAnchorPosition"
import type { PopoverAlignType, PopoverPositionType } from "../components/Popover/Popover.types"

// Anchor: 100×40 box at (200, 300). right = 300, bottom = 340.
const rect = { top: 300, left: 200, right: 300, bottom: 340, width: 100, height: 40 }
const OFFSET = 8

type Case = [PopoverPositionType, PopoverAlignType, { top: number; left: number; transform: string }]

const rectCases: Case[] = [
  ["top", "start", { top: 292, left: 200, transform: "translate(0, -100%)" }],
  ["top", "center", { top: 292, left: 250, transform: "translate(-50%, -100%)" }],
  ["top", "end", { top: 292, left: 300, transform: "translate(-100%, -100%)" }],
  ["bottom", "start", { top: 348, left: 200, transform: "translate(0, 0)" }],
  ["bottom", "center", { top: 348, left: 250, transform: "translate(-50%, 0)" }],
  ["bottom", "end", { top: 348, left: 300, transform: "translate(-100%, 0)" }],
  ["left", "start", { top: 300, left: 192, transform: "translate(-100%, 0)" }],
  ["left", "center", { top: 320, left: 192, transform: "translate(-100%, -50%)" }],
  ["left", "end", { top: 340, left: 192, transform: "translate(-100%, -100%)" }],
  ["right", "start", { top: 300, left: 308, transform: "translate(0, 0)" }],
  ["right", "center", { top: 320, left: 308, transform: "translate(0, -50%)" }],
  ["right", "end", { top: 340, left: 308, transform: "translate(0, -100%)" }],
]

describe("computeAnchorPosition", () => {
  describe("rect anchor", () => {
    it.each(rectCases)("%s / %s", (position, align, expected) => {
      expect(computeAnchorPosition(rect, position, align, OFFSET)).toEqual(expected)
    })
  })

  // Tooltip parity: align "center" reproduces @niceprototypes/tooltip's
  // computeCoords + transformFor for the trigger anchor.
  describe("tooltip parity (center)", () => {
    const tooltip = (position: PopoverPositionType) => {
      const r = rect
      switch (position) {
        case "bottom":
          return { top: r.bottom + OFFSET, left: r.left + r.width / 2, transform: "translate(-50%, 0)" }
        case "left":
          return { top: r.top + r.height / 2, left: r.left - OFFSET, transform: "translate(-100%, -50%)" }
        case "right":
          return { top: r.top + r.height / 2, left: r.right + OFFSET, transform: "translate(0, -50%)" }
        default:
          return { top: r.top - OFFSET, left: r.left + r.width / 2, transform: "translate(-50%, -100%)" }
      }
    }
    it.each<PopoverPositionType>(["top", "bottom", "left", "right"])("%s", (position) => {
      expect(computeAnchorPosition(rect, position, "center", OFFSET)).toEqual(tooltip(position))
    })
  })

  describe("point anchor", () => {
    const point = { x: 50, y: 60 }
    const pointCases: Case[] = [
      ["top", "start", { top: 52, left: 50, transform: "translate(0, -100%)" }],
      ["top", "center", { top: 52, left: 50, transform: "translate(-50%, -100%)" }],
      ["top", "end", { top: 52, left: 50, transform: "translate(-100%, -100%)" }],
      ["bottom", "start", { top: 68, left: 50, transform: "translate(0, 0)" }],
      ["bottom", "center", { top: 68, left: 50, transform: "translate(-50%, 0)" }],
      ["bottom", "end", { top: 68, left: 50, transform: "translate(-100%, 0)" }],
      ["left", "start", { top: 60, left: 42, transform: "translate(-100%, 0)" }],
      ["left", "center", { top: 60, left: 42, transform: "translate(-100%, -50%)" }],
      ["left", "end", { top: 60, left: 42, transform: "translate(-100%, -100%)" }],
      ["right", "start", { top: 60, left: 58, transform: "translate(0, 0)" }],
      ["right", "center", { top: 60, left: 58, transform: "translate(0, -50%)" }],
      ["right", "end", { top: 60, left: 58, transform: "translate(0, -100%)" }],
    ]
    it.each(pointCases)("%s / %s", (position, align, expected) => {
      expect(computeAnchorPosition(point, position, align, OFFSET)).toEqual(expected)
    })
  })

  describe("bounds (flip and shift)", () => {
    const viewport = { width: 1000, height: 800 }
    const size = { width: 120, height: 60 }

    it("leaves a fitting element unchanged", () => {
      expect(computeAnchorPosition(rect, "bottom", "start", OFFSET, { size, viewport })).toEqual(
        computeAnchorPosition(rect, "bottom", "start", OFFSET)
      )
    })

    it("flips bottom to top when the bottom overflows", () => {
      const low = { top: 760, left: 200, right: 300, bottom: 790, width: 100, height: 30 }
      expect(computeAnchorPosition(low, "bottom", "start", OFFSET, { size, viewport })).toEqual(
        computeAnchorPosition(low, "top", "start", OFFSET)
      )
    })

    it("flips left to right when the left overflows", () => {
      const edge = { top: 300, left: 20, right: 60, bottom: 340, width: 40, height: 40 }
      expect(computeAnchorPosition(edge, "left", "center", OFFSET, { size, viewport })).toEqual(
        computeAnchorPosition(edge, "right", "center", OFFSET)
      )
    })

    it("keeps the side when the opposite side overflows more", () => {
      const tall = { width: 120, height: 500 }
      const nearBottom = { top: 400, left: 200, right: 300, bottom: 440, width: 100, height: 40 }
      // bottom overflows 448 + 500 - 800 = 148; top overflows 500 - 392 = 108 → flip
      expect(computeAnchorPosition(nearBottom, "bottom", "start", OFFSET, { size: tall, viewport }).transform).toBe("translate(0, -100%)")
      const nearTop = { top: 360, left: 200, right: 300, bottom: 400, width: 100, height: 40 }
      // bottom overflows 408 + 500 - 800 = 108; top overflows 500 - 352 = 148 → stay
      expect(computeAnchorPosition(nearTop, "bottom", "start", OFFSET, { size: tall, viewport }).transform).toBe("translate(0, 0)")
    })

    it("shifts along the cross axis to stay inside the right edge", () => {
      const right = { top: 300, left: 920, right: 980, bottom: 340, width: 60, height: 40 }
      const coords = computeAnchorPosition(right, "bottom", "start", OFFSET, { size, viewport })
      expect(coords).toEqual({ top: 348, left: 880, transform: "translate(0, 0)" })
    })

    it("shifts a centered element inside the left edge", () => {
      const left = { top: 300, left: 0, right: 40, bottom: 340, width: 40, height: 40 }
      const coords = computeAnchorPosition(left, "top", "center", OFFSET, { size, viewport })
      // centre at 20, box left = 20 - 60 = -40 → shift +40
      expect(coords).toEqual({ top: 292, left: 60, transform: "translate(-50%, -100%)" })
    })

    it("shifts vertically for a side placement", () => {
      const bottomEdge = { top: 770, left: 200, right: 300, bottom: 790, width: 100, height: 20 }
      const coords = computeAnchorPosition(bottomEdge, "right", "start", OFFSET, { size, viewport })
      expect(coords).toEqual({ top: 740, left: 308, transform: "translate(0, 0)" })
    })

    it("keeps the start edge visible when the element is larger than the viewport", () => {
      const huge = { width: 1200, height: 60 }
      const coords = computeAnchorPosition(rect, "bottom", "start", OFFSET, { size: huge, viewport })
      expect(coords.left).toBe(0)
    })
  })

  it("accepts a DOMRect-shaped object with extra fields", () => {
    const domRect = { ...rect, x: 200, y: 300, toJSON: () => ({}) }
    expect(computeAnchorPosition(domRect, "bottom", "start", 0)).toEqual({ top: 340, left: 200, transform: "translate(0, 0)" })
  })
})
