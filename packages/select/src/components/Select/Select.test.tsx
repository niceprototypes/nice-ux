import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { getToken } from "nice-react-styles"
import { Field } from "nice-react-field"
import Select from "."
import type { SelectOptionsType } from "./Select.types"

// Stub Icon (as react-button does): renders the name and colour it receives.
jest.mock("nice-react-icon", () => ({
  __esModule: true,
  default: ({ name, color }: { name: string; color?: string }) => (
    <span
      data-testid="icon"
      data-color={color}
    >
      {name}
    </span>
  ),
}))

/** CSS text of every styled-components rule that targets one of `el`'s classes. */
function cssFor(el: Element): string {
  const sheet = Array.from(document.head.querySelectorAll("style"))
    .map(tag => tag.textContent ?? "")
    .join("\n")
  return Array.from(el.classList)
    .flatMap(
      cls => sheet.match(new RegExp(`\\.${cls}[^{]*\\{[^}]*\\}`, "g")) ?? []
    )
    .join("\n")
}

/** Input's `end` slot is the last child of the field chrome. */
function chevronOf(select: HTMLElement): HTMLElement {
  return select.parentElement!.lastElementChild as HTMLElement
}

const fruit: SelectOptionsType = [
  { value: "a", label: "Apple" },
  { value: "b", label: "Banana", disabled: true },
  { value: "c", label: "Cherry" },
]

describe("Select", () => {
  it("renders options in order with disabled", () => {
    render(
      <Select
        aria-label="fruit"
        options={fruit}
      />
    )
    const options = screen.getAllByRole("option") as HTMLOptionElement[]
    expect(options.map(o => [o.value, o.textContent, o.disabled])).toEqual([
      ["a", "Apple", false],
      ["b", "Banana", true],
      ["c", "Cherry", false],
    ])
  })

  it("renders native option / optgroup children", () => {
    render(
      <Select aria-label="fruit">
        <optgroup label="Stone">
          <option value="p">Peach</option>
        </optgroup>
        <option value="k">Kiwi</option>
      </Select>
    )
    expect(screen.getByRole("group", { name: "Stone" })).toBeInTheDocument()
    expect(screen.getAllByRole("option").map(o => o.textContent)).toEqual([
      "Peach",
      "Kiwi",
    ])
  })

  it("prefers children over options when both are given", () => {
    render(
      <Select
        aria-label="fruit"
        options={fruit}
      >
        <option value="k">Kiwi</option>
      </Select>
    )
    expect(screen.getAllByRole("option").map(o => o.textContent)).toEqual([
      "Kiwi",
    ])
  })

  describe("placeholder", () => {
    it("renders a first disabled, hidden, empty option that is selected initially", () => {
      render(
        <Select
          aria-label="fruit"
          options={fruit}
          placeholder="Pick a fruit"
        />
      )
      const select = screen.getByRole("combobox") as HTMLSelectElement
      const first = select.options[0]
      expect(first.value).toBe("")
      expect(first.textContent).toBe("Pick a fruit")
      expect(first.disabled).toBe(true)
      expect(first.hidden).toBe(true)
      expect(select.value).toBe("")
      expect(select.selectedIndex).toBe(0)
      expect(select).not.toHaveAttribute("placeholder")
    })

    it("keeps a given defaultValue over the placeholder", () => {
      render(
        <Select
          aria-label="fruit"
          options={fruit}
          placeholder="Pick a fruit"
          defaultValue="c"
        />
      )
      expect(screen.getByRole("combobox")).toHaveValue("c")
    })

    it("renders no placeholder option when placeholder is not set", () => {
      render(
        <Select
          aria-label="fruit"
          options={fruit}
        />
      )
      const select = screen.getByRole("combobox") as HTMLSelectElement
      expect(select.options).toHaveLength(3)
      expect(select.value).toBe("a")
    })
  })

  it("is controlled by value and calls onChange(value, event)", () => {
    const onChange = jest.fn()
    const Controlled = () => {
      const [value, setValue] = React.useState("a")
      return (
        <Select
          aria-label="fruit"
          options={fruit}
          value={value}
          onChange={(next, event) => {
            onChange(next, event)
            setValue(next)
          }}
        />
      )
    }
    render(<Controlled />)
    const select = screen.getByRole("combobox")
    expect(select).toHaveValue("a")
    fireEvent.change(select, { target: { value: "c" } })
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toBe("c")
    expect(onChange.mock.calls[0][1].target).toBe(select)
    expect(select).toHaveValue("c")
  })

  it("forwards ref to the native HTMLSelectElement", () => {
    const ref = React.createRef<HTMLSelectElement>()
    render(
      <Select
        aria-label="fruit"
        options={fruit}
        ref={ref}
      />
    )
    expect(ref.current).toBeInstanceOf(HTMLSelectElement)
    expect(ref.current).toBe(screen.getByRole("combobox"))
  })

  it("renders an aria-hidden, pointer-transparent chevron icon in the end slot", () => {
    render(
      <Select
        aria-label="fruit"
        options={fruit}
      />
    )
    const chevron = chevronOf(screen.getByRole("combobox"))
    expect(chevron).toHaveAttribute("aria-hidden", "true")
    const icon = screen.getByTestId("icon")
    expect(chevron).toContainElement(icon)
    expect(icon).toHaveTextContent("carat-bottom")
    expect(cssFor(chevron)).toContain("pointer-events:none")
  })

  it("sizes the chevron from select.chevron.size at the select's size", () => {
    const sizes = ["smaller", "small", "base", "large", "larger"] as const
    const { rerender } = render(<Select aria-label="fruit" />)
    sizes.forEach(size => {
      rerender(
        <Select
          aria-label="fruit"
          size={size}
        />
      )
      expect(
        cssFor(chevronOf(screen.getByRole("combobox")))
      ).toContain(`--np--icon--size:${getToken(`select.chevron.size:${size}`)}`)
    })
    expect(getToken("select.chevron.size:large")).toBe(
      "var(--np--select--chevron--size--large)"
    )
  })

  it("dims the chevron with the disabled colour when status is disabled", () => {
    const { rerender } = render(<Select aria-label="fruit" />)
    expect(screen.getByTestId("icon")).toHaveAttribute("data-color", "base")
    rerender(
      <Select
        aria-label="fruit"
        status="disabled"
      />
    )
    expect(screen.getByRole("combobox")).toBeDisabled()
    expect(screen.getByTestId("icon")).toHaveAttribute("data-color", "disabled")
    expect(getToken("icon.color:disabled", { as: "value" })).toBe(
      getToken("color", "disabled", { as: "value" })
    )
  })

  it("applies className to Input's wrapper, not the native select", () => {
    render(
      <Select
        aria-label="fruit"
        className="custom"
      />
    )
    const select = screen.getByRole("combobox")
    expect(select).not.toHaveClass("custom")
    expect(select.parentElement).toHaveClass("custom")
  })

  it("does not accept multiple (compile-time)", () => {
    // @ts-expect-error — v1 is single-value only
    render(<Select aria-label="m" multiple />)
    expect(screen.getByRole("combobox")).not.toHaveAttribute("multiple")
  })

  describe("inside a Field", () => {
    it("is labelled by the Field label (label targets the select)", () => {
      render(
        <Field label="Fruit">
          <Select options={fruit} />
        </Field>
      )
      const select = screen.getByRole("combobox", { name: "Fruit" })
      expect(select.tagName).toBe("SELECT")
      expect(screen.getByText("Fruit").closest("label")).toHaveAttribute(
        "for",
        select.id
      )
    })

    it("orders aria-describedby as [description, error, consumer]", () => {
      render(
        <Field
          label="Fruit"
          id="fruit"
          description="Pick one."
          error="Required"
          invalid
          required
        >
          <Select
            options={fruit}
            aria-describedby="hint"
          />
        </Field>
      )
      const select = screen.getByRole("combobox")
      expect(select).toHaveAttribute(
        "aria-describedby",
        "fruit-description fruit-error hint"
      )
      expect(select).toHaveAttribute("aria-invalid", "true")
      expect(select).toBeRequired()
    })
  })
})
