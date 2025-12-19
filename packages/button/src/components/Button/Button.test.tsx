import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import Button from "./Button"

jest.mock("nice-react-typography", () => ({
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
    render(<Button onClick={mockOnClick} icon="check" aria-label="Confirm" />)
    expect(screen.getByTestId("icon")).toHaveTextContent("check")
  })

  it("renders button with both text and icon", () => {
    render(<Button onClick={mockOnClick} icon="arrow">Next</Button>)
    expect(screen.getByRole("button")).toHaveTextContent("Next")
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("calls onClick when clicked", () => {
    render(<Button onClick={mockOnClick}>Click me</Button>)
    fireEvent.click(screen.getByRole("button"))
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it("does not call onClick when state is disabled", () => {
    render(<Button onClick={mockOnClick} state="disabled">Disabled</Button>)
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

  it("renders with different statuses", () => {
    const { rerender } = render(<Button onClick={mockOnClick} status="primary">Primary</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()

    rerender(<Button onClick={mockOnClick} status="secondary">Secondary</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("renders with different states", () => {
    const states = ["base", "disabled", "error", "success", "warning"] as const
    const { rerender } = render(<Button onClick={mockOnClick} state="base">Base</Button>)

    states.forEach((state) => {
      rerender(<Button onClick={mockOnClick} state={state}>{state}</Button>)
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
})
