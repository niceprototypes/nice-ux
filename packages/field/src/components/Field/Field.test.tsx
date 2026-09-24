import * as React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Field from "./Field"
import { Field as WrappedField } from "./index"
import { useField } from "../../hooks/useField"
import { mergeDescribedBy } from "../../services/mergeDescribedBy"

/** A control that applies the Field wiring the way nice-react-input will. */
const Control: React.FC<{ "aria-describedby"?: string }> = ({ "aria-describedby": consumer }) => {
  const field = useField()
  return (
    <input
      id={field?.id}
      aria-describedby={mergeDescribedBy(field?.describedBy, consumer)}
      aria-invalid={field?.invalid ? true : undefined}
      required={field?.required}
    />
  )
}

/** A control that ignores the Field id. */
const IgnoringControl: React.FC = () => <input />

let warn: jest.SpyInstance

beforeEach(() => {
  warn = jest.spyOn(console, "warn").mockImplementation(() => {})
})

afterEach(() => {
  warn.mockRestore()
})

describe("Field", () => {
  it("points the native label's htmlFor at the control id", () => {
    render(
      <Field label="Email">
        <Control />
      </Field>
    )
    const input = screen.getByRole("textbox")
    const label = screen.getByText("Email").closest("label")
    expect(label).not.toBeNull()
    expect(label).toHaveAttribute("for", input.id)
    expect(input.id).not.toBe("")
    expect(screen.getByLabelText("Email")).toBe(input)
  })

  it("uses the id prop as the control id", () => {
    render(
      <Field label="Email" id="email">
        <Control />
      </Field>
    )
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "email")
    expect(screen.getByText("Email").closest("label")).toHaveAttribute("id", "email-label")
  })

  it("orders describedBy as [description, error, consumer]", () => {
    render(
      <Field label="Email" id="email" description="Work address" error="Required">
        <Control aria-describedby="hint" />
      </Field>
    )
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      "email-description email-error hint"
    )
    expect(screen.getByText("Work address").closest("[id]")).toHaveAttribute("id", "email-description")
    expect(screen.getByText("Required").closest("[id]")).toHaveAttribute("id", "email-error")
  })

  it("omits absent parts from describedBy", () => {
    const seen: Array<string | undefined> = []
    const Probe = () => {
      seen.push(useField()?.describedBy)
      return <input id={useField()?.id} />
    }
    const { rerender } = render(
      <Field label="A" id="a">
        <Probe />
      </Field>
    )
    rerender(
      <Field label="A" id="a" error="Bad">
        <Probe />
      </Field>
    )
    expect(seen[0]).toBeUndefined()
    expect(seen[seen.length - 1]).toBe("a-error")
  })

  it("keeps the polite error region mounted and empty without an error, unreferenced by describedBy", () => {
    const { container } = render(
      <Field label="Email" id="email">
        <Control />
      </Field>
    )
    const region = container.querySelector("#email-error")
    expect(region).not.toBeNull()
    expect(region).toHaveAttribute("aria-live", "polite")
    expect(region).toBeEmptyDOMElement()
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-describedby")
  })

  it("fills the same live region node when an error arrives, and empties it when cleared", () => {
    const { container, rerender } = render(
      <Field label="Email" id="email">
        <Control />
      </Field>
    )
    const region = container.querySelector("#email-error")

    rerender(
      <Field label="Email" id="email" error="Required">
        <Control />
      </Field>
    )
    expect(container.querySelector("#email-error")).toBe(region)
    expect(region).toHaveAttribute("aria-live", "polite")
    expect(region).toHaveTextContent("Required")
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-describedby", "email-error")

    rerender(
      <Field label="Email" id="email">
        <Control />
      </Field>
    )
    expect(container.querySelector("#email-error")).toBe(region)
    expect(region).toBeEmptyDOMElement()
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-describedby")
  })

  it("exposes invalid only when the invalid prop is true, never aria-invalid=false", () => {
    const { rerender } = render(
      <Field label="Email">
        <Control />
      </Field>
    )
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid")

    rerender(
      <Field label="Email" invalid={false} error="Shown but not invalid">
        <Control />
      </Field>
    )
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid")

    rerender(
      <Field label="Email" invalid>
        <Control />
      </Field>
    )
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
  })

  it("exposes required for the control's native required attribute, with no asterisk", () => {
    render(
      <Field label="Email" required optionalLabel="(optional)">
        <Control />
      </Field>
    )
    expect(screen.getByRole("textbox")).toBeRequired()
    const label = screen.getByText("Email").closest("label")
    expect(label).toHaveTextContent(/^Email$/)
    expect(screen.queryByText("(optional)")).toBeNull()
  })

  it("renders optionalLabel after the label only when not required", () => {
    const { rerender } = render(
      <Field label="Phone">
        <Control />
      </Field>
    )
    expect(screen.getByText("Phone").closest("label")).toHaveTextContent(/^Phone$/)

    rerender(
      <Field label="Phone" optionalLabel="(optional)">
        <Control />
      </Field>
    )
    expect(screen.getByText("Phone").closest("label")).toHaveTextContent("Phone (optional)")
  })

  it("returns null from useField outside a Field", () => {
    let value: ReturnType<typeof useField> | undefined
    const Probe = () => {
      value = useField()
      return null
    }
    render(<Probe />)
    expect(value).toBeNull()
  })

  it("warns once in development when the child does not apply the control id", () => {
    const { rerender } = render(
      <Field label="Email" id="email">
        <IgnoringControl />
      </Field>
    )
    rerender(
      <Field label="Email" id="email" description="x">
        <IgnoringControl />
      </Field>
    )
    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn.mock.calls[0][0]).toContain('"email"')
  })

  it("does not warn when the child applies the control id", () => {
    render(
      <Field label="Email">
        <Control />
      </Field>
    )
    expect(warn).not.toHaveBeenCalled()
  })

  it("forwards className and ref to the root element", () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <WrappedField label="Email" className="custom" ref={ref}>
        <Control />
      </WrappedField>
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass("custom")
    expect(ref.current?.contains(container.querySelector("label"))).toBe(true)
  })

  it("wraps in a Theme pin when theme is set", () => {
    const { container } = render(
      <Field label="Email" theme="night">
        <Control />
      </Field>
    )
    expect(container.querySelector('[data-theme="night"]')).not.toBeNull()
  })
})
