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

  // Tooltip parity: align "center" reproduces nice-react-tooltip's
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

  it("accepts a DOMRect-shaped object with extra fields", () => {
    const domRect = { ...rect, x: 200, y: 300, toJSON: () => ({}) }
    expect(computeAnchorPosition(domRect, "bottom", "start", 0)).toEqual({ top: 340, left: 200, transform: "translate(0, 0)" })
  })
})
