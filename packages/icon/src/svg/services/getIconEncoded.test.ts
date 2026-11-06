import { getIconEncoded } from "./getIconEncoded.js"

describe("getIconEncoded theme", () => {
  it("defaults to day, which matches the base alias", () => {
    expect(getIconEncoded("check")).toBe(getIconEncoded("check", "base", { theme: "day" }))
    expect(getIconEncoded("check", "base", { theme: "base" })).toBe(getIconEncoded("check", "base", { theme: "day" }))
  })

  it("returns a different glyph color for night", () => {
    expect(getIconEncoded("check", "base", { theme: "night" })).not.toBe(getIconEncoded("check", "base", { theme: "day" }))
  })
})
