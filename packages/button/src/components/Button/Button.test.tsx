import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { getToken } from "nice-react-styles"
import Button from "./Button"
import ResponsiveButton from "."
import type { ButtonRefType } from "./Button.types"

jest.mock("nice-react-ink", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}))

jest.mock("nice-react-icon", () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <span data-testid="icon">{name}</span>,
}))

const mockOnClick = jest.fn()

describe("Button", () => {
  beforeEach(() => {
    mockOnClick.mockClear()
  })

  it("renders button with text", () => {
    render(<Button onClick={mockOnClick}>Click me</Button>)
    expect(screen.getByRole("button")).toHaveTextContent("Click me")
  })

  it("renders button with icon only", () => {
    render(<Button onClick={mockOnClick} iconRight="check" aria-label="Confirm" />)
    expect(screen.getByTestId("icon")).toHaveTextContent("check")
  })

  it("renders button with both text and icon", () => {
    render(<Button onClick={mockOnClick} iconRight="arrow-right">Next</Button>)
    expect(screen.getByRole("button")).toHaveTextContent("Next")
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("renders iconRight", () => {
    render(<Button onClick={mockOnClick} iconRight="arrow-right">Next</Button>)
    expect(screen.getByTestId("icon")).toHaveTextContent("arrow-right")
  })

  it("renders iconLeft", () => {
    render(<Button onClick={mockOnClick} iconLeft="arrow-left">Back</Button>)
    expect(screen.getByTestId("icon")).toHaveTextContent("arrow-left")
  })

  it("renders iconLeft before the label and iconRight after it", () => {
    render(
      <Button onClick={mockOnClick} iconLeft="arrow-left" iconRight="arrow-right">
        Both
      </Button>
    )
    const icons = screen.getAllByTestId("icon")
    expect(icons).toHaveLength(2)
    expect(icons[0]).toHaveTextContent("arrow-left")
    expect(icons[1]).toHaveTextContent("arrow-right")
  })

  it("calls onClick when clicked", () => {
    render(<Button onClick={mockOnClick}>Click me</Button>)
    fireEvent.click(screen.getByRole("button"))
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it("does not call onClick when status is disabled", () => {
    render(<Button onClick={mockOnClick} status="disabled">Disabled</Button>)
    fireEvent.click(screen.getByRole("button"))
    expect(mockOnClick).not.toHaveBeenCalled()
  })

  it("applies custom className", () => {
    render(<Button onClick={mockOnClick} className="custom-class">Button</Button>)
    expect(screen.getByRole("button")).toHaveClass("custom-class")
  })

  it("applies aria-label", () => {
    render(<Button onClick={mockOnClick} aria-label="Submit form">Submit</Button>)
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Submit form")
  })

  it("applies data-testid", () => {
    render(<Button onClick={mockOnClick} data-testid="submit-btn">Submit</Button>)
    expect(screen.getByTestId("submit-btn")).toBeInTheDocument()
  })

  it("renders with different sizes", () => {
    const { rerender } = render(<Button onClick={mockOnClick} size="smaller">Small</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()

    rerender(<Button onClick={mockOnClick} size="larger">Large</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("renders filled and outline", () => {
    const { rerender } = render(<Button onClick={mockOnClick} filled>Filled</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()

    rerender(<Button onClick={mockOnClick}>Outline</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("renders with different statuses", () => {
    const statuses = ["base", "disabled", "error", "success", "warning"] as const
    const { rerender } = render(<Button onClick={mockOnClick} status="base">Base</Button>)

    statuses.forEach((status) => {
      rerender(<Button onClick={mockOnClick} status={status}>{status}</Button>)
      expect(screen.getByRole("button")).toBeInTheDocument()
    })
  })

  it("renders with different border radius options", () => {
    const { rerender } = render(<Button onClick={mockOnClick} borderRadius="small">Small</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()

    rerender(<Button onClick={mockOnClick} borderRadius="base">Base</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()

    rerender(<Button onClick={mockOnClick} borderRadius="large">Large</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("renders with different button types", () => {
    const { rerender } = render(<Button onClick={mockOnClick} type="button">Button</Button>)
    expect(screen.getByRole("button")).toHaveAttribute("type", "button")

    rerender(<Button onClick={mockOnClick} type="submit">Submit</Button>)
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit")

    rerender(<Button onClick={mockOnClick} type="reset">Reset</Button>)
    expect(screen.getByRole("button")).toHaveAttribute("type", "reset")
  })

  describe("ref", () => {
    const cases = [
      { as: undefined, element: HTMLButtonElement, tag: "BUTTON" },
      { as: "a" as const, element: HTMLAnchorElement, tag: "A" },
      { as: "div" as const, element: HTMLDivElement, tag: "DIV" },
    ]

    it.each(cases)("forwards ref to the root element (as=$as)", ({ as, element, tag }) => {
      const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>()
      render(
        <Button onClick={mockOnClick} as={as} href="#" ref={ref} data-testid="root">
          Label
        </Button>
      )
      expect(ref.current).toBeInstanceOf(element)
      expect(ref.current?.tagName).toBe(tag)
      expect(ref.current).toBe(screen.getByTestId("root"))
    })

    it.each(cases)("forwards ref through withBreakpoints (as=$as)", ({ as, element }) => {
      const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>()
      render(
        <ResponsiveButton onClick={mockOnClick} as={as} href="#" ref={ref} data-testid="root">
          Label
        </ResponsiveButton>
      )
      expect(ref.current).toBeInstanceOf(element)
      expect(ref.current).toBe(screen.getByTestId("root"))
    })

    it("calls a callback ref with the element", () => {
      let node: HTMLElement | null = null
      const ref: ButtonRefType = (el) => {
        node = el
      }
      render(<Button onClick={mockOnClick} ref={ref}>Label</Button>)
      expect(node).toBe(screen.getByRole("button"))
    })
  })

  describe("focus indicator", () => {
    const injectedCss = () =>
      Array.from(document.querySelectorAll("style"))
        .map((tag) => tag.textContent ?? "")
        .join("")

    it("keeps outline: none for non-keyboard focus", () => {
      render(<Button onClick={mockOnClick}>Label</Button>)
      expect(injectedCss()).toContain("outline:none;")
    })

    it("emits a token-driven :focus-visible outline", () => {
      render(<Button onClick={mockOnClick}>Label</Button>)
      expect(injectedCss()).toContain(
        `:focus-visible{outline:${getToken("borderWidth:large")} solid ${getToken("color:link")};` +
          `outline-offset:${getToken("gap:smaller")};}`
      )
    })
  })
})
