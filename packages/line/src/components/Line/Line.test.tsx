import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import Line from "./Line"
import { resolveCorners } from "../../utilities/resolveCorners"
import { framePath } from "../../utilities/framePath"
import { fitDasharray } from "../../utilities/fitDasharray"

// jsdom has no ResizeObserver; the frame is measured once on mount.
class ResizeObserverStub {
  observe() {}
  disconnect() {}
}
;(globalThis as { ResizeObserver?: unknown }).ResizeObserver = ResizeObserverStub

const MEASUREMENTS = { width: 4, rimWidth: 1.5, dashLength: 18, gap: 5 }

describe("resolveCorners", () => {
  it("uses one number for every corner", () => {
    expect(resolveCorners(8, null, 100, 50)).toEqual([0, 1, 2, 3].map(() => ({ x: 8, y: 8 })))
  })

  it("keeps per-corner and elliptical radii", () => {
    expect(resolveCorners([4, [10, 6], 0, 2], null, 100, 50)).toEqual([
      { x: 4, y: 4 },
      { x: 10, y: 6 },
      { x: 0, y: 0 },
      { x: 2, y: 2 },
    ])
  })

  it("scales radii that don't fit down together, as border-radius does", () => {
    // 2 × 40 on a 50px-tall box: scaled by 50 / 80
    expect(resolveCorners(40, null, 200, 50)[0]).toEqual({ x: 25, y: 25 })
  })

  it("reads the element's computed radii, resolving percentages", () => {
    const element = document.createElement("div")
    // jsdom doesn't expand the border-radius shorthand into corners; browsers do.
    element.style.borderTopLeftRadius = "50%"
    document.body.append(element)
    expect(resolveCorners("element", element, 100, 40)[0]).toEqual({ x: 50, y: 20 })
    element.remove()
  })
})

describe("resolveCorners with an Element", () => {
  it("reads that element's radii instead of the parent's", () => {
    const element = document.createElement("div")
    element.style.borderTopLeftRadius = "12px"
    document.body.append(element)
    expect(resolveCorners(element, null, 100, 40)[0]).toEqual({ x: 12, y: 12 })
    element.remove()
  })
})

describe("framePath", () => {
  it("measures a square-cornered box as its perimeter", () => {
    expect(framePath(100, 50, resolveCorners(0, null, 100, 50)).length).toBeCloseTo(300)
  })

  it("measures circular corners as quarter circles", () => {
    const { length } = framePath(100, 100, resolveCorners(10, null, 100, 100))
    expect(length).toBeCloseTo(4 * 80 + 2 * Math.PI * 10)
  })
})

describe("fitDasharray", () => {
  it("fits a whole number of repeats around the path", () => {
    const length = 1000
    const [dash, gap] = fitDasharray(length, MEASUREMENTS).split(" ").map(Number)
    const repeats = length / (dash + gap)
    expect(repeats).toBeCloseTo(Math.round(repeats))
  })

  it("keeps the dash-to-gap proportion: dash is the length minus the round caps", () => {
    const [dash, gap] = fitDasharray(26 * 10, MEASUREMENTS).split(" ").map(Number)
    expect(dash).toBeCloseTo(14)
    expect(gap).toBeCloseTo(12)
  })
})

describe("Line", () => {
  it("renders a hidden frame with a rim path under a dash path", () => {
    const { container } = render(
      <div style={{ position: "relative" }}>
        <Line className="frame" />
      </div>,
    )
    const root = container.querySelector(".frame")
    expect(root).toHaveAttribute("aria-hidden", "true")
    const paths = root?.querySelectorAll("path") ?? []
    expect(paths).toHaveLength(2)
    expect(paths[0].getAttribute("d")).toBe(paths[1].getAttribute("d"))
    expect(paths[0].getAttribute("stroke-dasharray")).toBe(paths[1].getAttribute("stroke-dasharray"))
  })
})

describe("Line dev warning", () => {
  let warn: jest.SpyInstance

  beforeEach(() => {
    warn = jest.spyOn(console, "warn").mockImplementation(() => {})
  })

  afterEach(() => {
    warn.mockRestore()
  })

  it("warns once per instance when the parent is statically positioned", () => {
    const { rerender } = render(
      <div style={{ position: "static" }}>
        <Line />
      </div>,
    )
    rerender(
      <div style={{ position: "static" }}>
        <Line color="link" />
      </div>,
    )
    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn.mock.calls[0][0]).toContain("not a divider")
  })

  it("does not warn when the parent is positioned", () => {
    render(
      <div style={{ position: "relative" }}>
        <Line />
      </div>,
    )
    expect(warn).not.toHaveBeenCalled()
  })

  it("does not warn in production", () => {
    const previous = process.env.NODE_ENV
    process.env.NODE_ENV = "production"
    render(
      <div style={{ position: "static" }}>
        <Line />
      </div>,
    )
    process.env.NODE_ENV = previous
    expect(warn).not.toHaveBeenCalled()
  })
})
