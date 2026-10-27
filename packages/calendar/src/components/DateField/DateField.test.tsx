import React from "react"
import { act, fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Field } from "nice-react-field"
import DateField from "./DateField"
import { DateField as ResponsiveDateField } from "."

// react-icon's dist requires nice-styles without declaring it; mock it the way
// react-button's tests do.
jest.mock("nice-react-icon", () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <span data-testid="icon">{name}</span>,
}))

// Today is fixed at 2026-09-24. Fake timers also drive requestAnimationFrame,
// which DateField uses to move focus into the opened calendar.
beforeEach(() => {
  jest.useFakeTimers({ now: new Date(2026, 8, 24, 12) })
})
afterEach(() => {
  jest.useRealTimers()
})

const trigger = () => screen.getByRole("button", { name: "Choose date" })
const control = () => screen.getByRole("textbox")
const hidden = (container: HTMLElement) => container.querySelector<HTMLInputElement>('input[type="hidden"]')!
const day = (iso: string) => document.querySelector<HTMLButtonElement>(`[data-date="${iso}"]`)!
const flushFrame = () => act(() => jest.advanceTimersByTime(20))
const open = () => {
  fireEvent.pointerDown(trigger())
  fireEvent.click(trigger())
  flushFrame()
}

describe("DateField", () => {
  it("renders a read-only Input with the formatted value and a hidden ISO input", () => {
    const { container } = render(<DateField name="start" defaultValue="2026-09-15" locale="en-US" aria-label="Start" />)
    expect(control()).toHaveAttribute("readonly")
    expect(control()).toHaveValue("Sep 15, 2026")
    expect(control()).not.toHaveAttribute("name")
    expect(hidden(container)).toHaveAttribute("name", "start")
    expect(hidden(container)).toHaveValue("2026-09-15")
  })

  it("opens a dialog with the calendar and moves focus to the tabbable day", () => {
    render(<DateField defaultValue="2026-09-15" locale="en-US" aria-label="Start" />)
    expect(trigger()).toHaveAttribute("aria-haspopup", "dialog")
    expect(trigger()).toHaveAttribute("aria-expanded", "false")
    open()
    const dialog = screen.getByRole("dialog", { name: "Choose date" })
    expect(trigger()).toHaveAttribute("aria-expanded", "true")
    expect(trigger()).toHaveAttribute("aria-controls", dialog.id)
    expect(dialog).toContainElement(screen.getByRole("grid"))
    expect(document.activeElement).toBe(day("2026-09-15"))
  })

  it("selecting a date sets the hidden ISO value and display text, closes, and returns focus", () => {
    const onChange = jest.fn()
    const { container } = render(<DateField name="start" onChange={onChange} locale="en-US" aria-label="Start" />)
    expect(hidden(container)).toHaveValue("")
    open()
    fireEvent.click(day("2026-09-20"))
    expect(onChange).toHaveBeenCalledWith("2026-09-20")
    expect(hidden(container)).toHaveValue("2026-09-20")
    expect(control()).toHaveValue("Sep 20, 2026")
    expect(screen.queryByRole("dialog")).toBeNull()
    expect(document.activeElement).toBe(control())
  })

  it("selects with the keyboard", () => {
    const { container } = render(<DateField name="start" locale="en-US" aria-label="Start" />)
    open()
    fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" })
    fireEvent.keyDown(document.activeElement!, { key: "Enter" })
    expect(hidden(container)).toHaveValue("2026-09-25")
  })

  it("submits the ISO value through native FormData", () => {
    const { container } = render(
      <form>
        <DateField name="start" defaultValue="2026-09-15" locale="en-US" aria-label="Start" />
      </form>
    )
    const data = new FormData(container.querySelector("form")!)
    expect(data.get("start")).toBe("2026-09-15")
    expect(Array.from(data.keys())).toEqual(["start"])
  })

  it("closes on Escape and returns focus to the control", () => {
    render(<DateField locale="en-US" aria-label="Start" />)
    open()
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    fireEvent.keyDown(document.activeElement!, { key: "Escape" })
    expect(screen.queryByRole("dialog")).toBeNull()
    expect(trigger()).toHaveAttribute("aria-expanded", "false")
    expect(document.activeElement).toBe(control())
  })

  it("closes when the trigger is pressed again", () => {
    render(<DateField locale="en-US" aria-label="Start" />)
    open()
    fireEvent.pointerDown(trigger())
    fireEvent.click(trigger())
    expect(screen.queryByRole("dialog")).toBeNull()
  })

  it("is controlled: display follows value, onChange reports the pick", () => {
    const onChange = jest.fn()
    const { container, rerender } = render(
      <DateField name="d" value="2026-09-15" onChange={onChange} locale="en-US" aria-label="Start" />
    )
    open()
    fireEvent.click(day("2026-09-20"))
    expect(onChange).toHaveBeenCalledWith("2026-09-20")
    expect(control()).toHaveValue("Sep 15, 2026")
    expect(hidden(container)).toHaveValue("2026-09-15")
    rerender(<DateField name="d" value="2026-09-20" onChange={onChange} locale="en-US" aria-label="Start" />)
    expect(control()).toHaveValue("Sep 20, 2026")
    expect(hidden(container)).toHaveValue("2026-09-20")
  })

  it("formats the display with the locale", () => {
    render(<DateField defaultValue="2026-09-15" locale="de-DE" aria-label="Start" />)
    expect(control()).toHaveValue("15.09.2026")
  })

  it("passes min / max / isDateDisabled to the calendar", () => {
    render(
      <DateField locale="en-US" aria-label="Start" min="2026-09-10" isDateDisabled={(d) => d === "2026-09-25"} />
    )
    open()
    expect(day("2026-09-09")).toHaveAttribute("aria-disabled", "true")
    expect(day("2026-09-25")).toHaveAttribute("aria-disabled", "true")
    expect(day("2026-09-26")).not.toHaveAttribute("aria-disabled")
  })

  it("disables the trigger when status is disabled", () => {
    render(<DateField status="disabled" locale="en-US" aria-label="Start" />)
    expect(trigger()).toBeDisabled()
  })

  it("disables the trigger and the control with the disabled prop", () => {
    render(<DateField disabled locale="en-US" aria-label="Start" />)
    expect(trigger()).toBeDisabled()
    expect(control()).toBeDisabled()
  })

  it("inherits Field wiring from Input (label, describedby)", () => {
    render(
      <Field label="Start date" description="First day of the booking">
        <DateField locale="en-US" />
      </Field>
    )
    const input = screen.getByLabelText("Start date")
    expect(input).toBe(control())
    const describedBy = input.getAttribute("aria-describedby")!
    expect(document.getElementById(describedBy)).toHaveTextContent("First day of the booking")
  })

  it("forwards ref to the native input and className to the chrome", () => {
    const ref = React.createRef<HTMLInputElement>()
    const { container } = render(
      <ResponsiveDateField ref={ref} className="custom" locale="en-US" aria-label="Start" />
    )
    expect(ref.current).toBe(control())
    expect(container.querySelector(".custom")).toContainElement(control())
  })
})
