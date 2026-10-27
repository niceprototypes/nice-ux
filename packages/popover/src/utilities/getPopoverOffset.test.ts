import { getToken } from "@niceprototypes/styles"
import { getPopoverOffset, POPOVER_OFFSET_FALLBACK } from "./getPopoverOffset"

jest.mock("@niceprototypes/styles", () => {
  const actual = jest.requireActual("@niceprototypes/styles")
  return { ...actual, getToken: jest.fn(actual.getToken) }
})

const mockedGetToken = getToken as jest.MockedFunction<typeof getToken>
const actualGetToken = jest.requireActual("@niceprototypes/styles").getToken as typeof getToken

describe("getPopoverOffset", () => {
  afterEach(() => mockedGetToken.mockImplementation(actualGetToken))

  it("reads popover.offset as a raw value", () => {
    getPopoverOffset()
    expect(mockedGetToken).toHaveBeenCalledWith("popover.offset", { as: "value" })
  })

  it("reads the real token: the seed alias resolves to 8px", () => {
    expect(actualGetToken("popover.offset", { as: "value" })).toBe("8px")
    expect(getPopoverOffset()).toBe(8)
  })

  it("falls back to 8px when the token is not a plain px value", () => {
    mockedGetToken.mockReturnValue("calc(var(--np--gap--small) + 2px)")
    expect(getPopoverOffset()).toBe(POPOVER_OFFSET_FALLBACK)
    expect(POPOVER_OFFSET_FALLBACK).toBe(8)
  })

  it.each([
    ["12px", 12],
    [" 4.5px ", 4.5],
    ["0", 0],
    ["-2px", -2],
  ])("parses %p as %p", (raw, expected) => {
    mockedGetToken.mockReturnValue(raw)
    expect(getPopoverOffset()).toBe(expected)
  })

  it.each(["1rem", "calc(8px + 2px)", "var(--x)", ""])("falls back for %p", (raw) => {
    mockedGetToken.mockReturnValue(raw)
    expect(getPopoverOffset()).toBe(POPOVER_OFFSET_FALLBACK)
  })
})
