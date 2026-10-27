import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { getToken } from "nice-react-styles"
import { Field } from "nice-react-field"
import Toggle from "./Toggle"

/** CSS text of every styled-components rule that targets one of `element`'s classes. */
function cssFor(element: Element): string {
  const sheet = Array.from(document.head.querySelectorAll("style"))
    .map(tag => tag.textContent ?? "")
    .join("\n")
  return Array.from(element.classList)
    .flatMap(className => sheet.match(new RegExp(`\\.${className}[^{]*\\{[^}]*\\}`, "g")) ?? [])
    .join("\n")
}

describe("Toggle", () => {
  it("renders a native checkbox with the switch role", () => {
    render(<Toggle aria-label="Hidden" id="hidden" name="hidden" />)
    const control = screen.getByRole("switch", { name: "Hidden" })
    expect(control).toHaveAttribute("type", "checkbox")
    expect(control).toHaveAttribute("id", "hidden")
    expect(control).toHaveAttribute("name", "hidden")
    expect(control).not.toBeChecked()
  })

  it("uses children as the visible label, and clicking the label toggles", async () => {
    const user = userEvent.setup()
    render(<Toggle>Notifications</Toggle>)
    const control = screen.getByRole("switch", { name: "Notifications" })
    await user.click(screen.getByText("Notifications"))
    expect(control).toBeChecked()
  })

  it("toggles uncontrolled from defaultChecked, with Space", async () => {
    const user = userEvent.setup()
    render(<Toggle aria-label="x" defaultChecked />)
    const control = screen.getByRole("switch")
    expect(control).toBeChecked()
    control.focus()
    await user.keyboard(" ")
    expect(control).not.toBeChecked()
  })

  it("calls onChange with the new value first, then the event", async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<Toggle aria-label="x" checked={false} onChange={onChange} />)
    await user.click(screen.getByRole("switch"))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toBe(true)
    expect(onChange.mock.calls[0][1].target).toBe(screen.getByRole("switch"))
  })

  it("stays as the parent sets it when controlled", async () => {
    const user = userEvent.setup()
    render(<Toggle aria-label="x" checked={false} onChange={() => {}} />)
    await user.click(screen.getByRole("switch"))
    expect(screen.getByRole("switch")).not.toBeChecked()
  })

  it("follows a controlling parent", async () => {
    const user = userEvent.setup()
    const Parent = () => {
      const [checked, setChecked] = React.useState(false)
      return <Toggle aria-label="x" checked={checked} onChange={setChecked} />
    }
    render(<Parent />)
    await user.click(screen.getByRole("switch"))
    expect(screen.getByRole("switch")).toBeChecked()
  })

  it("does not toggle or call onChange when disabled", async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<Toggle aria-label="x" disabled onChange={onChange} />)
    const control = screen.getByRole("switch")
    expect(control).toBeDisabled()
    await user.click(control)
    expect(control).not.toBeChecked()
    expect(onChange).not.toHaveBeenCalled()
  })

  it("forwards className to the root label", () => {
    const { container } = render(<Toggle aria-label="x" className="mine" />)
    expect(container.firstElementChild?.tagName).toBe("LABEL")
    expect(container.firstElementChild).toHaveClass("mine")
  })

  it("sizes the track from the toggle tokens for its size", () => {
    render(<Toggle aria-label="x" size="large" />)
    const css = cssFor(screen.getByRole("switch").parentElement!)
    expect(css).toContain(`width:${getToken("toggle.track.width:large")}`)
    expect(css).toContain(`height:${getToken("toggle.track.height:large")}`)
  })

  it("draws the keyboard focus ring on the track", () => {
    render(<Toggle aria-label="x" />)
    const track = screen.getByRole("switch").nextElementSibling!
    const sheet = Array.from(document.head.querySelectorAll("style"))
      .map(tag => tag.textContent ?? "")
      .join("\n")
    const trackClass = Array.from(track.classList).find(className => sheet.includes(`:focus-visible+.${className}`))
    const rule = sheet.match(new RegExp(`:focus-visible\\+\\.${trackClass}\\{[^}]*\\}`))?.[0] ?? ""
    expect(rule).toContain(
      `${getToken("toggle.focusRing.width:base")} solid ${getToken("toggle.focusRing.color:base")}`,
    )
  })

  it("forwards ref to the native input", () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Toggle aria-label="x" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current).toBe(screen.getByRole("switch"))
  })

  it("can be named by aria-labelledby", () => {
    render(
      <>
        <Toggle aria-labelledby="toggle-name" />
        <span id="toggle-name">Sync</span>
      </>
    )
    expect(screen.getByRole("switch", { name: "Sync" })).toBeInTheDocument()
  })

  describe("inside a Field", () => {
    it("is labelled by the Field label and described by its description and error", () => {
      render(
        <Field label="Visible" id="visible" description="Shown to everyone." error="Required" invalid required>
          <Toggle />
        </Field>
      )
      const control = screen.getByRole("switch", { name: "Visible" })
      expect(control).toHaveAttribute("id", "visible")
      expect(screen.getByText("Visible").closest("label")).toHaveAttribute("for", "visible")
      expect(control).toHaveAttribute("aria-describedby", "visible-description visible-error")
      expect(control).toHaveAttribute("aria-invalid", "true")
      expect(control).toBeRequired()
    })

    it("renders no aria-invalid, aria-describedby or required when the Field sets none", () => {
      const { container } = render(
        <Field label="Visible">
          <Toggle />
        </Field>
      )
      const control = screen.getByRole("switch")
      expect(control).not.toHaveAttribute("aria-invalid")
      expect(control).not.toHaveAttribute("aria-describedby")
      expect(control).not.toBeRequired()
      expect(container.querySelector('[aria-invalid="false"]')).toBeNull()
    })
  })
})
