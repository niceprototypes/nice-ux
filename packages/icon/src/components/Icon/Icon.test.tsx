import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { getToken } from "nice-react-styles"
import Icon from "./Icon"

jest.mock("../../utilities/resolveIconComponent", () => ({
  resolveIconComponent: jest.fn().mockImplementation((name: string, variant: string = "base") => {
    if (name === "unknown") return undefined
    return function MockSvg(props: React.SVGAttributes<SVGElement>) {
      return React.createElement("svg", {
        ...props,
        "data-testid": "svg-icon",
        "data-name": name,
        "data-variant": variant,
      })
    }
  }),
}))

describe("Icon", () => {
  it("renders an icon with default props", () => {
    render(<Icon name="check" />)
    const svg = screen.getByTestId("svg-icon")
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute("data-name", "check")
    expect(svg).toHaveAttribute("data-variant", "base")
  })

  it("renders the requested variant", () => {
    render(<Icon name="arrow-right" variant="fill" />)
    const svg = screen.getByTestId("svg-icon")
    expect(svg).toHaveAttribute("data-variant", "fill")
  })

  it("maps deprecated outlined prop to the fill variant", () => {
    render(<Icon name="arrow-right" outlined />)
    const svg = screen.getByTestId("svg-icon")
    expect(svg).toHaveAttribute("data-variant", "fill")
  })

  it("prefers an explicit variant over deprecated outlined", () => {
    render(<Icon name="arrow-right" variant="base" outlined />)
    const svg = screen.getByTestId("svg-icon")
    expect(svg).toHaveAttribute("data-variant", "base")
  })

  it("renders with different icon names", () => {
    const icons = ["arrow-right", "check", "x", "search", "cog"] as const
    const { rerender } = render(<Icon name="arrow-right" />)

    icons.forEach((iconName) => {
      rerender(<Icon name={iconName} />)
      expect(screen.getByTestId("svg-icon")).toHaveAttribute("data-name", iconName)
    })
  })

  it("renders image when url prop is provided", () => {
    const { container } = render(<Icon name="circle" url="https://example.com/icon.svg" />)
    const img = container.querySelector("img")
    expect(img).toHaveAttribute("src", "https://example.com/icon.svg")
  })

  it("applies className to wrapper", () => {
    const { container } = render(<Icon name="check" className="custom-icon" />)
    expect(container.firstChild).toHaveClass("custom-icon")
  })

  it("renders the circle fallback when icon is not found", () => {
    render(<Icon name={"unknown" as "check"} />)
    expect(screen.getByTestId("svg-icon")).toHaveAttribute("data-name", "circle")
  })

  it("renders spinner icon with spinning animation class", () => {
    const { container } = render(<Icon name="spinner" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders with different sizes", () => {
    const sizes = ["smaller", "small", "base", "large", "larger"] as const
    const { rerender, container } = render(<Icon name="check" size="base" />)

    sizes.forEach((size) => {
      rerender(<Icon name="check" size={size} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  it("renders with different colors", () => {
    const colors = ["base", "success", "error", "warning", "disabled"] as const
    const { rerender, container } = render(<Icon name="check" color="base" />)

    colors.forEach((color) => {
      rerender(<Icon name="check" color={color} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  it("renders with different stroke widths", () => {
    const strokeWidths = ["small", "base", "large"] as const
    const { rerender, container } = render(<Icon name="check" strokeWidth="base" />)

    strokeWidths.forEach((strokeWidth) => {
      rerender(<Icon name="check" strokeWidth={strokeWidth} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })
})

describe("Icon darkAntialiasing", () => {
  /** The stroke-width declarations in the rules for `wrapper`'s own classes. */
  function strokeWidths(wrapper: Element): string[] {
    const css = Array.from(document.head.querySelectorAll("style"))
      .map(tag => tag.textContent ?? "")
      .join("\n")
    return Array.from(wrapper.classList).flatMap(className =>
      Array.from(css.matchAll(new RegExp(`\\.${className}[^{]*\\{([^}]*)\\}`, "g"))).flatMap(([, body]) =>
        Array.from(body.matchAll(/stroke-width:([^;]+);/g)).map(([, value]) => value)
      )
    )
  }

  const wrapperOf = () => screen.getByTestId("svg-icon").parentElement!
  const themedScale = getToken("icon.strokeWidthScale:base")
  const nightScale = "var(--np--icon--stroke-width-scale--night, var(--np--stroke-width-scale--night))"

  it.each(["small", "base", "large"] as const)("follows the theme by default (%s)", strokeWidth => {
    render(<Icon name="check" strokeWidth={strokeWidth} />)
    expect(strokeWidths(wrapperOf())).toEqual([`calc(${getToken(`icon.strokeWidth:${strokeWidth}`)} * ${themedScale})`])
  })

  it.each(["small", "base", "large"] as const)("uses the night scale in any theme when true (%s)", strokeWidth => {
    render(<Icon name="check" strokeWidth={strokeWidth} darkAntialiasing />)
    expect(strokeWidths(wrapperOf())).toEqual([`calc(${getToken(`icon.strokeWidth:${strokeWidth}`)} * ${nightScale})`])
  })

  it.each(["small", "base", "large"] as const)("keeps the plain stroke width when false (%s)", strokeWidth => {
    render(<Icon name="check" strokeWidth={strokeWidth} darkAntialiasing={false} />)
    expect(strokeWidths(wrapperOf())).toEqual([getToken(`icon.strokeWidth:${strokeWidth}`)])
  })

  it("leaves the fill variant without a stroke width", () => {
    render(<Icon name="check" variant="fill" />)
    expect(strokeWidths(wrapperOf())).toEqual([])
  })

  it("reads 1 in day and 0.9 in night, at the root and through the icon token", () => {
    expect(getToken("icon.strokeWidthScale:base")).toBe("var(--np--icon--stroke-width-scale)")
    for (const address of ["strokeWidthScale", "icon.strokeWidthScale:base"] as const) {
      expect(getToken(address, { theme: "day", as: "value" })).toBe("1")
      expect(getToken(address, { theme: "night", as: "value" })).toBe("0.9")
    }
  })
})
