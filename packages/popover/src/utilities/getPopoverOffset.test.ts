import { getToken } from "nice-react-styles"
import { getPopoverOffset, POPOVER_OFFSET_FALLBACK } from "./getPopoverOffset"

jest.mock("nice-react-styles", () => {
  const actual = jest.requireActual("nice-react-styles")
  return { ...actual, getToken: jest.fn(actual.getToken) }
})

const mockedGetToken = getToken as jest.MockedFunction<typeof getToken>
const actualGetToken = jest.requireActual("nice-react-styles").getToken as typeof getToken

describe("getPopoverOffset", () => {
  afterEach(() => mockedGetToken.mockImplementation(actualGetToken))

  it("reads popover.offset as a raw value", () => {
    getPopoverOffset()
    expect(mockedGetToken).toHaveBeenCalledWith("popover.offset", { as: "value" })
  })

  it("falls back for the seed alias (var(--np--gap--small) is not a plain px value)", () => {
    expect(actualGetToken("popover.offset", { as: "value" })).toBe("var(--np--gap--small)")
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
