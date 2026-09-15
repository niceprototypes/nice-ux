import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import Input from "./Input"

const mockOnChange = jest.fn()

describe("Input", () => {
  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it("renders an input element", () => {
    render(<Input aria-label="email" />)
    expect(screen.getByRole("textbox", { name: "email" })).toBeInTheDocument()
  })

  it("renders with placeholder", () => {
    render(<Input placeholder="Enter your name" />)
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument()
  })

  it("calls onChange with new value and event", () => {
    render(<Input aria-label="name" onChange={mockOnChange} />)
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "abc" } })
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith("abc", expect.anything())
  })

  it("respects controlled value", () => {
    render(<Input aria-label="name" value="hello" onChange={mockOnChange} />)
    expect(screen.getByRole("textbox")).toHaveValue("hello")
  })

  it("does not fire onChange when status is disabled", async () => {
    // userEvent types like a real user, which a disabled input blocks.
    // fireEvent.change dispatches directly and reaches onChange regardless.
    const user = userEvent.setup()
    render(<Input aria-label="name" status="disabled" onChange={mockOnChange} />)
    const el = screen.getByRole("textbox") as HTMLInputElement
    expect(el).toBeDisabled()
    await user.type(el, "x")
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it("forwards type attribute", () => {
    const { rerender } = render(<Input aria-label="email" type="email" />)
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email")

    rerender(<Input aria-label="phone" type="tel" />)
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "tel")
  })

  it("renders password type without textbox role", () => {
    render(<Input aria-label="password" type="password" />)
    expect(screen.getByLabelText("password")).toHaveAttribute("type", "password")
  })

  it("applies custom className", () => {
    render(<Input aria-label="x" className="custom-class" />)
    expect(screen.getByRole("textbox")).toHaveClass("custom-class")
  })

  it("applies data-testid", () => {
    render(<Input data-testid="email-input" />)
    expect(screen.getByTestId("email-input")).toBeInTheDocument()
  })

  it("renders with different sizes", () => {
    const { rerender } = render(<Input aria-label="x" size="smaller" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()

    rerender(<Input aria-label="x" size="larger" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("renders with different statuses", () => {
    const statuses = ["base", "disabled", "error", "success", "warning"] as const
    const { rerender } = render(<Input aria-label="x" status="base" />)

    statuses.forEach((status) => {
      rerender(<Input aria-label="x" status={status} />)
      expect(screen.getByLabelText("x")).toBeInTheDocument()
    })
  })

  it("renders filled", () => {
    const { rerender } = render(<Input aria-label="x" filled />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()

    rerender(<Input aria-label="x" filled status="error" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("forwards readOnly", () => {
    render(<Input aria-label="x" readOnly />)
    expect(screen.getByRole("textbox")).toHaveAttribute("readonly")
  })

  it("forwards required", () => {
    render(<Input aria-label="x" required />)
    expect(screen.getByRole("textbox")).toBeRequired()
  })
})