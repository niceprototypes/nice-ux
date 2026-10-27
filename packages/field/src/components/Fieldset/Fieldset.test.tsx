import * as React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Fieldset as WrappedFieldset } from "./index"

describe("Fieldset", () => {
  it("renders a native fieldset named by its legend", () => {
    render(
      <WrappedFieldset legend="Address">
        <input aria-label="Street" />
      </WrappedFieldset>
    )
    const group = screen.getByRole("group", { name: "Address" })
    expect(group.tagName).toBe("FIELDSET")
    expect(group.querySelector("legend")).toHaveTextContent("Address")
  })

  it("references the description with aria-describedby", () => {
    render(
      <WrappedFieldset legend="Address" description="Where we deliver">
        <input aria-label="Street" />
      </WrappedFieldset>
    )
    const group = screen.getByRole("group")
    const description = screen.getByText("Where we deliver").closest("[id]")
    expect(description).not.toBeNull()
    expect(group).toHaveAttribute("aria-describedby", description!.id)
  })

  it("omits aria-describedby without a description", () => {
    render(
      <WrappedFieldset legend="Address">
        <input aria-label="Street" />
      </WrappedFieldset>
    )
    expect(screen.getByRole("group")).not.toHaveAttribute("aria-describedby")
  })

  it("disables its controls natively", () => {
    render(
      <WrappedFieldset legend="Address" disabled>
        <input aria-label="Street" />
      </WrappedFieldset>
    )
    expect(screen.getByRole("group")).toBeDisabled()
    expect(screen.getByRole("textbox")).toBeDisabled()
  })

  it("forwards className and ref to the fieldset", () => {
    const ref = React.createRef<HTMLFieldSetElement>()
    render(
      <WrappedFieldset legend="Address" className="custom" ref={ref}>
        <input aria-label="Street" />
      </WrappedFieldset>
    )
    expect(ref.current).toBeInstanceOf(HTMLFieldSetElement)
    expect(ref.current).toHaveClass("custom")
  })
})
