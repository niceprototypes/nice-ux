import { mergeDescribedBy } from "./mergeDescribedBy"

describe("mergeDescribedBy", () => {
  it("orders field ids before consumer ids", () => {
    expect(mergeDescribedBy("desc err", "hint")).toBe("desc err hint")
  })

  it("dedupes, keeping the first occurrence", () => {
    expect(mergeDescribedBy("desc err", "err hint desc")).toBe("desc err hint")
  })

  it("dedupes within the consumer list", () => {
    expect(mergeDescribedBy(undefined, "a a b")).toBe("a b")
  })

  it("handles either side missing", () => {
    expect(mergeDescribedBy("desc", undefined)).toBe("desc")
    expect(mergeDescribedBy(undefined, "hint")).toBe("hint")
  })

  it("collapses extra whitespace", () => {
    expect(mergeDescribedBy("  desc   err ", " hint ")).toBe("desc err hint")
  })

  it("returns undefined when empty", () => {
    expect(mergeDescribedBy()).toBeUndefined()
    expect(mergeDescribedBy("", "  ")).toBeUndefined()
  })
})
