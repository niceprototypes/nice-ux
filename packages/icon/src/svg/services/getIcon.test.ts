import { getIcon } from "./getIcon.js"
import { getIllustration } from "./getIllustration.js"

describe("getIcon tokens", () => {
  it("sizes, colors and strokes from icon tokens", () => {
    const svg = getIcon("check", "base", { size: "large", color: "link", strokeWidth: "small" })!
    expect(svg).toContain('width="var(--np--icon--size--large)"')
    expect(svg).toContain("color:var(--np--icon--color--link);")
    expect(svg).toContain("stroke:var(--np--icon--color--link);")
    expect(svg).toContain("stroke-width:var(--np--icon--stroke-width--small);")
  })

  it("defaults to the base icon tokens", () => {
    const svg = getIcon("check", "fill")!
    expect(svg).toContain('width="var(--np--icon--size)"')
    expect(svg).toContain("fill:var(--np--icon--color);")
  })
})

describe("getIllustration tokens", () => {
  it("sizes from the icon size token", () => {
    expect(getIllustration("nice-heart", "base", { size: "small" })).toContain('width="var(--np--icon--size--small)"')
  })
})
