import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import ButtonIcon from "./ButtonIcon"

jest.mock("nice-react-icon", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: function MockIcon(props: any) {
    return React.createElement("span", {
      "data-testid": "icon",
      "data-name": props.name,
      "data-size": props.size,
      "data-color": props.color,
    }, props.name)
  },
}))

describe("ButtonIcon", () => {
  it("renders icon with required props", () => {
    render(<ButtonIcon icon="check" size="base" />)
    const icon = screen.getByTestId("icon")
    expect(icon).toHaveTextContent("check")
    expect(icon).toHaveAttribute("data-name", "check")
    expect(icon).toHaveAttribute("data-size", "base")
  })

  it("passes color prop to Icon", () => {
    render(<ButtonIcon icon="arrow" size="large" color="success" />)
    const icon = screen.getByTestId("icon")
    expect(icon).toHaveAttribute("data-color", "success")
  })

  it("renders with different icon names", () => {
    const icons = ["arrow", "check", "x", "search", "cog"] as const
    const { rerender } = render(<ButtonIcon icon="arrow" size="base" />)

    icons.forEach((iconName) => {
      rerender(<ButtonIcon icon={iconName} size="base" />)
      expect(screen.getByTestId("icon")).toHaveAttribute("data-name", iconName)
    })
  })

  it("renders with different sizes", () => {
    const sizes = ["smaller", "small", "base", "large", "larger"] as const
    const { rerender } = render(<ButtonIcon icon="check" size="base" />)

    sizes.forEach((size) => {
      rerender(<ButtonIcon icon="check" size={size} />)
      expect(screen.getByTestId("icon")).toHaveAttribute("data-size", size)
    })
  })
})