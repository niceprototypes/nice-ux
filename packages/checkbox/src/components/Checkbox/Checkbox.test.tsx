import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { getToken } from "nice-react-styles"
import { Field } from "nice-react-field"
import Checkbox from "./Checkbox"

jest.mock("nice-react-icon", () => ({
  __esModule: true,
  default: ({ name, vendor }: { name: string; vendor: boolean }) => (
    <span data-testid="icon" data-vendor={String(vendor)}>
      {name}
    </span>
  ),
}))

/** Every styled-components rule in the document. */
const sheet = () =>
  Array.from(document.head.querySelectorAll("style"))
    .map(tag => tag.textContent ?? "")
    .join("\n")

/** CSS text of every rule whose selector starts at one of `element`'s classes. */
function cssFor(element: Element): string {
  const css = sheet()
  return Array.from(element.classList)
    .flatMap(className => css.match(new RegExp(`\\.${className}[^{]*\\{[^}]*\\}`, "g")) ?? [])
    .join("\n")
}

/** The rule for `:<pseudo>+.<box class>`, the box's state when the checkbox is checked/focused. */
function stateRule(box: Element, pseudo: string): string {
  const css = sheet()
  const boxClass = Array.from(box.classList).find(className => css.includes(`:${pseudo}+.${className}{`))
  return css.match(new RegExp(`:${pseudo}\\+\\.${boxClass}\\{[^}]*\\}`))?.[0] ?? ""
}

const box = () => screen.getByRole("checkbox").nextElementSibling!

describe("Checkbox", () => {
  it("renders a native checkbox named by aria-label, with a check icon", () => {
    render(<Checkbox aria-label="Visible" id="visible" name="visible" />)
    const control = screen.getByRole("checkbox", { name: "Visible" })
    expect(control).toHaveAttribute("type", "checkbox")
    expect(control).toHaveAttribute("id", "visible")
    expect(control).toHaveAttribute("name", "visible")
    expect(control).not.toBeChecked()
    expect(screen.getByTestId("icon")).toHaveTextContent("check")
    expect(box()).toHaveAttribute("aria-hidden", "true")
  })

  it("draws the icon named by iconName, from the built-in set by default", () => {
    render(<Checkbox aria-label="x" iconName="minus" />)
    expect(screen.getByTestId("icon")).toHaveTextContent("minus")
    expect(screen.getByTestId("icon")).toHaveAttribute("data-vendor", "false")
  })

  it("passes iconVendor to the icon's vendor prop", () => {
    render(<Checkbox aria-label="x" iconName="CheckCheck" iconVendor />)
    expect(screen.getByTestId("icon")).toHaveTextContent("CheckCheck")
    expect(screen.getByTestId("icon")).toHaveAttribute("data-vendor", "true")
  })

  it("can be named by aria-labelledby", () => {
    render(
      <>
        <span id="row-name">Row 1</span>
        <Checkbox aria-labelledby="row-name" />
      </>,
    )
    expect(screen.getByRole("checkbox", { name: "Row 1" })).toBeInTheDocument()
  })

  it("toggles uncontrolled from defaultChecked, by click and Space", async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="x" defaultChecked />)
    const control = screen.getByRole("checkbox")
    expect(control).toBeChecked()
    await user.click(control)
    expect(control).not.toBeChecked()
    control.focus()
    await user.keyboard(" ")
    expect(control).toBeChecked()
  })

  it("calls onChange with the new value first, then the event", async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<Checkbox aria-label="x" checked={false} onChange={onChange} />)
    await user.click(screen.getByRole("checkbox"))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toBe(true)
    expect(onChange.mock.calls[0][1].target).toBe(screen.getByRole("checkbox"))
  })

  it("stays as the parent sets it when controlled, and follows a controlling parent", async () => {
    const user = userEvent.setup()
    const Parent = () => {
      const [checked, setChecked] = React.useState(false)
      return (
        <>
          <Checkbox aria-label="fixed" checked={false} onChange={() => {}} />
          <Checkbox aria-label="followed" checked={checked} onChange={setChecked} />
        </>
      )
    }
    render(<Parent />)
    await user.click(screen.getByRole("checkbox", { name: "fixed" }))
    await user.click(screen.getByRole("checkbox", { name: "followed" }))
    expect(screen.getByRole("checkbox", { name: "fixed" })).not.toBeChecked()
    expect(screen.getByRole("checkbox", { name: "followed" })).toBeChecked()
  })

  it("is read-only when checked has no onChange", () => {
    render(<Checkbox aria-label="x" checked />)
    expect(screen.getByRole("checkbox")).toHaveAttribute("readonly")
  })

  it("does not toggle or call onChange when disabled", async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<Checkbox aria-label="x" disabled onChange={onChange} />)
    const control = screen.getByRole("checkbox")
    expect(control).toBeDisabled()
    await user.click(control)
    expect(control).not.toBeChecked()
    expect(onChange).not.toHaveBeenCalled()
  })

  it("forwards className to the root", () => {
    const { container } = render(<Checkbox aria-label="x" className="mine" />)
    expect(container.firstElementChild).toHaveClass("mine")
  })

  it("sizes the box and the check from the checkbox tokens for its size", () => {
    const { container } = render(<Checkbox aria-label="x" size="large" />)
    const css = cssFor(container.firstElementChild!)
    expect(css).toContain(`width:${getToken("checkbox.size:large")}`)
    expect(css).toContain(`--np--icon--size:${getToken("checkbox.icon.size:large")}`)
  })

  it("reads border props from the checkbox tokens", () => {
    render(<Checkbox aria-label="x" borderColor="error" borderRadius="large" borderWidth="large" />)
    const css = cssFor(box())
    expect(css).toContain(`border-color:${getToken("checkbox.borderColor:error")}`)
    expect(css).toContain(`border-radius:${getToken("checkbox.borderRadius:large")}`)
    expect(css).toContain(`border-width:${getToken("checkbox.borderWidth:large")}`)
  })

  it("fills the box with backgroundColor when checked", () => {
    render(<Checkbox aria-label="x" backgroundColor="success" />)
    expect(stateRule(box(), "checked")).toContain(
      `background-color:${getToken("checkbox.backgroundColor:success")}`,
    )
  })

  it("draws the keyboard focus ring on the box", () => {
    render(<Checkbox aria-label="x" />)
    expect(stateRule(box(), "focus-visible")).toContain(
      `${getToken("checkbox.focusRing.width:base")} solid ${getToken("checkbox.focusRing.color:base")}`,
    )
  })

  it("forwards ref to the native input", () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Checkbox aria-label="x" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current).toBe(screen.getByRole("checkbox"))
  })

  describe("children", () => {
    it("renders a visible label that names the checkbox", () => {
      const { container } = render(<Checkbox className="mine">Visible</Checkbox>)
      const root = container.firstElementChild!
      expect(root.tagName).toBe("LABEL")
      expect(root).toHaveClass("mine")
      expect(root).toHaveTextContent("Visible")
      expect(screen.getByRole("checkbox", { name: "Visible" })).toBe(root.querySelector("input"))
    })

    it("toggles when the label text is clicked", async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<Checkbox onChange={onChange}>Visible</Checkbox>)
      await user.click(screen.getByText("Visible"))
      expect(screen.getByRole("checkbox")).toBeChecked()
      expect(onChange).toHaveBeenCalledWith(true, expect.anything())
    })

    it("spaces the label from the box with the core small gap", () => {
      const { container } = render(<Checkbox>Visible</Checkbox>)
      expect(cssFor(container.firstElementChild!)).toContain(`gap:${getToken("gap", "small")}`)
    })

    it("dims the label and box together when disabled", () => {
      const { container } = render(<Checkbox disabled>Visible</Checkbox>)
      expect(cssFor(container.firstElementChild!)).toContain(`opacity:${getToken("checkbox.disabledOpacity:base")}`)
    })

    it("renders no label without children", () => {
      const { container } = render(<Checkbox aria-label="x" className="mine" />)
      expect(container.querySelector("label")).toBeNull()
      expect(container.firstElementChild!.tagName).toBe("SPAN")
      expect(container.firstElementChild).toHaveClass("mine")
    })
  })

  describe("inside a Field", () => {
    it("is labelled by the Field label and described by its description and error", () => {
      render(
        <Field label="Visible" id="visible" description="Shown to everyone." error="Required" invalid required>
          <Checkbox />
        </Field>
      )
      const control = screen.getByRole("checkbox", { name: "Visible" })
      expect(control).toHaveAttribute("id", "visible")
      expect(screen.getByText("Visible").closest("label")).toHaveAttribute("for", "visible")
      expect(control).toHaveAttribute("aria-describedby", "visible-description visible-error")
      expect(control).toHaveAttribute("aria-invalid", "true")
      expect(control).toBeRequired()
    })

    it("renders no aria-invalid, aria-describedby or required when the Field sets none", () => {
      const { container } = render(
        <Field label="Visible">
          <Checkbox />
        </Field>
      )
      const control = screen.getByRole("checkbox")
      expect(control).not.toHaveAttribute("aria-invalid")
      expect(control).not.toHaveAttribute("aria-describedby")
      expect(control).not.toBeRequired()
      expect(container.querySelector('[aria-invalid="false"]')).toBeNull()
    })
  })
})
