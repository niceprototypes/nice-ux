import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Icon from "./Icon"

jest.mock("../services/getIcon", () => ({
  getIcon: jest.fn().mockImplementation((name: string, outlined: boolean) => {
    if (name === "unknown") return undefined
    return function MockSvg(props: React.SVGAttributes<SVGElement>) {
      return React.createElement("svg", {
        ...props,
        "data-testid": "svg-icon",
        "data-name": name,
        "data-outlined": outlined ? "true" : "false",
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
    expect(svg).toHaveAttribute("data-outlined", "false")
  })

  it("renders an outlined icon when outlined prop is true", () => {
    render(<Icon name="arrow" outlined />)
    const svg = screen.getByTestId("svg-icon")
    expect(svg).toHaveAttribute("data-outlined", "true")
  })

  it("renders with different icon names", () => {
    const icons = ["arrow", "check", "x", "search", "cog"] as const
    const { rerender } = render(<Icon name="arrow" />)

    icons.forEach((iconName) => {
      rerender(<Icon name={iconName} />)
      expect(screen.getByTestId("svg-icon")).toHaveAttribute("data-name", iconName)
    })
  })

  it("renders image when url prop is provided", () => {
    const { container } = render(<Icon name="placeholder" url="https://example.com/icon.svg" />)
    const img = container.querySelector("img")
    expect(img).toHaveAttribute("src", "https://example.com/icon.svg")
  })

  it("applies className to wrapper", () => {
    const { container } = render(<Icon name="check" className="custom-icon" />)
    expect(container.firstChild).toHaveClass("custom-icon")
  })

  it("renders nothing when icon is not found", () => {
    render(<Icon name={"unknown" as "check"} />)
    expect(screen.queryByTestId("svg-icon")).not.toBeInTheDocument()
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