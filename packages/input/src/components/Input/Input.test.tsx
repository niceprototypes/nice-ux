import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { getToken } from "nice-react-styles"
import { Field } from "nice-react-field"
import Input from "./Input"
import type { InputProps } from "./Input.types"

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
    render(
      <Input
        aria-label="name"
        onChange={mockOnChange}
      />
    )
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "abc" } })
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith("abc", expect.anything())
  })

  it("respects controlled value", () => {
    render(
      <Input
        aria-label="name"
        value="hello"
        onChange={mockOnChange}
      />
    )
    expect(screen.getByRole("textbox")).toHaveValue("hello")
  })

  it("does not fire onChange when status is disabled", async () => {
    // userEvent types like a real user, which a disabled input blocks.
    // fireEvent.change dispatches directly and reaches onChange regardless.
    const user = userEvent.setup()
    render(
      <Input
        aria-label="name"
        status="disabled"
        onChange={mockOnChange}
      />
    )
    const el = screen.getByRole("textbox") as HTMLInputElement
    expect(el).toBeDisabled()
    await user.type(el, "x")
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it("forwards type attribute", () => {
    const { rerender } = render(
      <Input
        aria-label="email"
        type="email"
      />
    )
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email")

    rerender(
      <Input
        aria-label="phone"
        type="tel"
      />
    )
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "tel")
  })

  it("renders password type without textbox role", () => {
    render(
      <Input
        aria-label="password"
        type="password"
      />
    )
    expect(screen.getByLabelText("password")).toHaveAttribute(
      "type",
      "password"
    )
  })

  it("applies className and style to the wrapper, not the native control", () => {
    render(
      <Input
        aria-label="x"
        className="custom-class"
        style={{ marginTop: "3px" }}
      />
    )
    const control = screen.getByRole("textbox")
    const wrapper = control.parentElement as HTMLElement
    expect(control).not.toHaveClass("custom-class")
    expect(wrapper).toHaveClass("custom-class")
    expect(wrapper.style.marginTop).toBe("3px")
    expect(control.style.marginTop).toBe("")
  })

  describe("as", () => {
    it("forwards ref to the native input by default", () => {
      const ref = React.createRef<HTMLInputElement>()
      render(
        <Input
          aria-label="x"
          ref={ref}
        />
      )
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
      expect(ref.current).toBe(screen.getByRole("textbox"))
    })

    it("renders a select with its options and forwards ref", () => {
      const ref = React.createRef<HTMLSelectElement>()
      render(
        <Input
          as="select"
          aria-label="fruit"
          ref={ref}
          defaultValue="b"
        >
          <option value="a">Apple</option>
          <option value="b">Banana</option>
        </Input>
      )
      const select = screen.getByRole("combobox", { name: "fruit" })
      expect(ref.current).toBeInstanceOf(HTMLSelectElement)
      expect(ref.current).toBe(select)
      expect(screen.getAllByRole("option").map(o => o.textContent)).toEqual([
        "Apple",
        "Banana",
      ])
      expect(select).toHaveValue("b")
      expect(select).not.toHaveAttribute("type")
    })

    it("does not emit placeholder on a select, but does on input and textarea", () => {
      const { rerender } = render(
        <Input
          as="select"
          aria-label="fruit"
          placeholder="Pick one"
        >
          <option value="a">Apple</option>
        </Input>
      )
      expect(screen.getByRole("combobox")).not.toHaveAttribute("placeholder")

      rerender(
        <Input
          as="textarea"
          aria-label="fruit"
          placeholder="Pick one"
        />
      )
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "placeholder",
        "Pick one"
      )

      rerender(
        <Input
          aria-label="fruit"
          placeholder="Pick one"
        />
      )
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "placeholder",
        "Pick one"
      )
    })

    it("types ref and element-only props per as (compile-time)", () => {
      const selectRef = React.createRef<HTMLSelectElement>()
      // @ts-expect-error — a <select> ref is not accepted for the default <input>
      render(
        <Input
          aria-label="a"
          ref={selectRef}
        />
      )
      // @ts-expect-error — `type` applies only to as="input"
      render(
        <Input
          as="textarea"
          aria-label="b"
          type="email"
        />
      )
      // @ts-expect-error — `rows` applies only to as="textarea"
      render(
        <Input
          as="select"
          aria-label="c"
          rows={2}
        />
      )
      expect(screen.getAllByLabelText(/^[abc]$/)).toHaveLength(3)
    })

    it("calls onChange with the value for a select", () => {
      render(
        <Input
          as="select"
          aria-label="fruit"
          onChange={mockOnChange}
          defaultValue="a"
        >
          <option value="a">Apple</option>
          <option value="b">Banana</option>
        </Input>
      )
      fireEvent.change(screen.getByRole("combobox"), { target: { value: "b" } })
      expect(mockOnChange).toHaveBeenCalledWith("b", expect.anything())
    })

    it("renders a textarea with rows, forwards ref, and sizes to content", () => {
      const ref = React.createRef<HTMLTextAreaElement>()
      render(
        <Input
          as="textarea"
          aria-label="notes"
          rows={4}
          ref={ref}
        />
      )
      const textarea = screen.getByRole("textbox", { name: "notes" })
      expect(textarea.tagName).toBe("TEXTAREA")
      expect(ref.current).toBe(textarea)
      expect(textarea).toHaveAttribute("rows", "4")
      expect(textarea).not.toHaveAttribute("type")
      const css = cssFor(textarea)
      expect(css).toContain("field-sizing:content")
      expect(css).toMatch(/min-block-size:calc\(\s*4 \* 1lh/)
      expect(css).toContain("min-inline-size:0")
    })
  })

  it("renders start and end slots in order start → control → end", () => {
    render(
      <Input
        aria-label="x"
        start={<span data-testid="start" />}
        end={<button type="button">Clear</button>}
      />
    )
    const wrapper = screen.getByRole("textbox").parentElement as HTMLElement
    const children = Array.from(wrapper.children)
    expect(children).toHaveLength(3)
    expect(children[0]).toBe(screen.getByTestId("start"))
    expect(children[1]).toBe(screen.getByRole("textbox"))
    expect(children[2]).toBe(screen.getByRole("button", { name: "Clear" }))
    // Slots are not forced aria-hidden
    expect(children[2]).not.toHaveAttribute("aria-hidden")
  })

  describe("width", () => {
    const numericWidths = ["2", "3", "4", "5", "10", "20"] as const
    const sizes = ["smaller", "small", "base", "large", "larger"] as const

    /** The wrapper's own `width:` declaration (not border-width etc.). */
    function wrapperWidth(): string | undefined {
      const css = cssFor(screen.getByRole("textbox").parentElement!)
      return css.match(/[;{]width:([^;}]*)/)?.[1]
    }

    it("uses the full token as-is by default", () => {
      render(<Input aria-label="x" />)
      expect(getToken("input.width:full", { as: "value" })).toBe("100%")
      expect(wrapperWidth()).toBe(getToken("input.width:full"))
    })

    it("uses the full token as-is at every size", () => {
      const { rerender } = render(<Input aria-label="x" />)
      sizes.forEach(size => {
        rerender(
          <Input
            aria-label="x"
            width="full"
            size={size}
          />
        )
        expect(wrapperWidth()).toBe(getToken("input.width:full"))
      })
    })

    it.each(numericWidths.flatMap(width => sizes.map(size => [width, size])))(
      "adds size padding and border to the %sch content width at size %s",
      (width, size) => {
        render(
          <Input
            aria-label="x"
            width={width as (typeof numericWidths)[number]}
            size={size as (typeof sizes)[number]}
          />
        )
        expect(wrapperWidth()).toBe(
          `calc(${getToken(`input.width:${width as (typeof numericWidths)[number]}`)} + 2 * ${getToken(`input.spacing:${size as (typeof sizes)[number]}`)} + 2 * ${getToken("input.borderWidth:base")})`
        )
      }
    )

    it("uses the borderWidth prop's token in the calc", () => {
      render(
        <Input
          aria-label="x"
          width="10"
          size="large"
          borderWidth="small"
        />
      )
      expect(wrapperWidth()).toBe(
        `calc(${getToken("input.width:10")} + 2 * ${getToken("input.spacing:large")} + 2 * ${getToken("input.borderWidth:small")})`
      )
    })
  })

  describe("colour props", () => {
    it("resolves a backgroundColor variant to the input component var on the wrapper", () => {
      render(
        <Input
          aria-label="x"
          backgroundColor="highlight"
        />
      )
      const wrapper = screen.getByRole("textbox").parentElement!
      expect(getToken("input.backgroundColor:highlight")).toBe(
        "var(--np--input--background-color--highlight)"
      )
      expect(cssFor(wrapper)).toContain(
        `background-color:${getToken("input.backgroundColor:highlight")}`
      )
    })

    it("resolves a borderColor variant to the input component var on the wrapper", () => {
      render(
        <Input
          aria-label="x"
          borderColor="error"
        />
      )
      const wrapper = screen.getByRole("textbox").parentElement!
      expect(getToken("input.borderColor:error")).toBe(
        "var(--np--input--border-color--error)"
      )
      expect(cssFor(wrapper)).toContain(
        `border-color:${getToken("input.borderColor:error")}`
      )
    })

    it("resolves the effect object form (inverse) like Button", () => {
      render(
        <Input
          aria-label="x"
          backgroundColor={{ name: "raised", inverse: true }}
          borderColor={{ name: "strong", inverse: true }}
        />
      )
      const css = cssFor(screen.getByRole("textbox").parentElement!)
      expect(css).toContain(
        `background-color:${getToken("input.backgroundColor:raised", { inverse: true })}`
      )
      expect(css).toContain(
        `border-color:${getToken("input.borderColor:strong", { inverse: true })}`
      )
      expect(css).toContain("var(--np--input--background-color--raised--inverse)")
      expect(css).toContain("var(--np--input--border-color--strong--inverse)")
    })

    it("rejects raw CSS strings (compile-time)", () => {
      // Type-only: not rendered, so getToken never looks the raw string up.
      const props: InputProps[] = [
        // @ts-expect-error — raw colour strings are not token variants
        { "aria-label": "y", backgroundColor: "#f00" },
        // @ts-expect-error — raw colour strings are not token variants
        { "aria-label": "z", borderColor: "red" },
      ]
      expect(props).toHaveLength(2)
    })
  })

  describe("inside a Field", () => {
    it("is labelled by the Field label (label targets the control id)", () => {
      render(
        <Field label="Email">
          <Input />
        </Field>
      )
      const control = screen.getByRole("textbox", { name: "Email" })
      expect(control.id).not.toBe("")
      expect(screen.getByText("Email").closest("label")).toHaveAttribute(
        "for",
        control.id
      )
    })

    it("keeps an explicit id over the Field id", () => {
      // The Field then warns that no element carries its id — expected here.
      const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {})
      render(
        <Field
          label="Email"
          id="field-id"
        >
          <Input id="own-id" />
        </Field>
      )
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "own-id")
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('no element inside this Field has id "field-id"')
      )
      warnSpy.mockRestore()
    })

    it("orders aria-describedby as [description, error, consumer]", () => {
      render(
        <Field
          label="Email"
          id="email"
          description="We never share it."
          error="Required"
          invalid
        >
          <Input aria-describedby="hint" />
        </Field>
      )
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-describedby",
        "email-description email-error hint"
      )
    })

    it("sets aria-invalid only when the Field is invalid, never \"false\"", () => {
      const { rerender, container } = render(
        <Field label="Email">
          <Input />
        </Field>
      )
      expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid")
      rerender(
        <Field
          label="Email"
          invalid
        >
          <Input />
        </Field>
      )
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true"
      )
      rerender(
        <Field
          label="Email"
          invalid={false}
        >
          <Input status="error" />
        </Field>
      )
      expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid")
      expect(container.querySelector('[aria-invalid="false"]')).toBeNull()
    })

    it("is required when the Field is required", () => {
      render(
        <Field
          label="Email"
          required
        >
          <Input />
        </Field>
      )
      expect(screen.getByRole("textbox")).toBeRequired()
    })
  })

  describe("outside a Field", () => {
    it("renders no id, aria-describedby or aria-invalid unless passed", () => {
      render(<Input aria-label="x" />)
      const control = screen.getByRole("textbox")
      expect(control).not.toHaveAttribute("id")
      expect(control).not.toHaveAttribute("aria-describedby")
      expect(control).not.toHaveAttribute("aria-invalid")
      expect(control).not.toBeRequired()
    })

    it("passes id and aria-describedby through unchanged", () => {
      render(
        <Input
          aria-label="x"
          id="own"
          aria-describedby="a b"
        />
      )
      const control = screen.getByRole("textbox")
      expect(control).toHaveAttribute("id", "own")
      expect(control).toHaveAttribute("aria-describedby", "a b")
    })
  })

  it("applies the font-size floor token to the control", () => {
    render(<Input aria-label="x" />)
    expect(cssFor(screen.getByRole("textbox"))).toContain(
      `font-size:${getToken("input.fontSize:base")}`
    )
  })

  it("draws the keyboard focus ring on the wrapper via :has(:focus-visible)", () => {
    render(<Input aria-label="x" />)
    const control = screen.getByRole("textbox")
    const css = cssFor(control.parentElement!)
    expect(css).toMatch(/:has\(:focus-visible\)\{[^}]*outline:/)
    expect(css).toContain(
      `${getToken("input.focusRing.width:base")} solid ${getToken("input.focusRing.color:base")}`
    )
    expect(css).toContain(
      `outline-offset:${getToken("input.focusRing.offset:base")}`
    )
    expect(cssFor(control)).toContain("outline:none")
  })

  it("passes inputMode, enterKeyHint, spellCheck, dir and dirName to the DOM", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {})
    render(
      <Input
        aria-label="x"
        inputMode="numeric"
        enterKeyHint="next"
        spellCheck={false}
        dir="auto"
        dirName="x.dir"
      />
    )
    const control = screen.getByRole("textbox")
    expect(control).toHaveAttribute("inputmode", "numeric")
    expect(control).toHaveAttribute("enterkeyhint", "next")
    expect(control).toHaveAttribute("spellcheck", "false")
    expect(control).toHaveAttribute("dir", "auto")
    expect(control).toHaveAttribute("dirname", "x.dir")
    expect(errorSpy).not.toHaveBeenCalled()
    errorSpy.mockRestore()
  })

  describe("combobox attributes", () => {
    const comboboxProps = {
      role: "combobox",
      "aria-expanded": true,
      "aria-controls": "fruit-listbox",
      "aria-activedescendant": "fruit-option-2",
      "aria-haspopup": "listbox",
      "aria-autocomplete": "none",
    } as const

    it("forwards role and each combobox aria attribute to the native control", () => {
      render(
        <Input
          aria-label="fruit"
          readOnly
          {...comboboxProps}
        />
      )
      const control = screen.getByRole("combobox", { name: "fruit" })
      expect(control.tagName).toBe("INPUT")
      expect(control).toHaveAttribute("role", "combobox")
      expect(control).toHaveAttribute("aria-expanded", "true")
      expect(control).toHaveAttribute("aria-controls", "fruit-listbox")
      expect(control).toHaveAttribute("aria-activedescendant", "fruit-option-2")
      expect(control).toHaveAttribute("aria-haspopup", "listbox")
      expect(control).toHaveAttribute("aria-autocomplete", "none")
    })

    it("does not put them on the wrapper", () => {
      render(
        <Input
          aria-label="fruit"
          readOnly
          {...comboboxProps}
        />
      )
      const wrapper = screen.getByRole("combobox").parentElement as HTMLElement
      ;[
        "role",
        "aria-expanded",
        "aria-controls",
        "aria-activedescendant",
        "aria-haspopup",
        "aria-autocomplete",
      ].forEach(attribute => {
        expect(wrapper).not.toHaveAttribute(attribute)
      })
    })

    it("renders none of them unless passed", () => {
      render(<Input aria-label="x" />)
      const control = screen.getByRole("textbox")
      ;[
        "role",
        "aria-expanded",
        "aria-controls",
        "aria-activedescendant",
        "aria-haspopup",
        "aria-autocomplete",
      ].forEach(attribute => {
        expect(control).not.toHaveAttribute(attribute)
      })
    })

    it("renders aria-expanded=\"false\" when closed", () => {
      render(
        <Input
          aria-label="fruit"
          readOnly
          {...comboboxProps}
          aria-expanded={false}
        />
      )
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-expanded",
        "false"
      )
    })

    it("leaves Field id, aria-describedby, aria-invalid and required wiring unchanged", () => {
      render(
        <Field
          label="Fruit"
          id="fruit"
          description="Pick one."
          error="Required"
          invalid
          required
        >
          <Input
            readOnly
            aria-describedby="hint"
            {...comboboxProps}
          />
        </Field>
      )
      const control = screen.getByRole("combobox", { name: "Fruit" })
      expect(control).toHaveAttribute("id", "fruit")
      expect(control).toHaveAttribute(
        "aria-describedby",
        "fruit-description fruit-error hint"
      )
      expect(control).toHaveAttribute("aria-invalid", "true")
      expect(control).toBeRequired()
      expect(control).toHaveAttribute("aria-controls", "fruit-listbox")
      expect(control).toHaveAttribute("aria-expanded", "true")
    })

    it("restricts role to text-like control roles (compile-time)", () => {
      const props: InputProps[] = [
        { "aria-label": "a", role: "searchbox" },
        { "aria-label": "b", role: "spinbutton" },
        { "aria-label": "c", role: "textbox" },
        // @ts-expect-error — "button" is not a text-like control role
        { "aria-label": "d", role: "button" },
      ]
      expect(props).toHaveLength(4)
    })
  })

  it("applies data-testid", () => {
    render(<Input data-testid="email-input" />)
    expect(screen.getByTestId("email-input")).toBeInTheDocument()
  })

  it("renders with different sizes", () => {
    const { rerender } = render(
      <Input
        aria-label="x"
        size="smaller"
      />
    )
    expect(screen.getByRole("textbox")).toBeInTheDocument()

    rerender(
      <Input
        aria-label="x"
        size="larger"
      />
    )
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("renders with different statuses", () => {
    const statuses = [
      "base",
      "disabled",
      "error",
      "success",
      "warning",
    ] as const
    const { rerender } = render(
      <Input
        aria-label="x"
        status="base"
      />
    )

    statuses.forEach(status => {
      rerender(
        <Input
          aria-label="x"
          status={status}
        />
      )
      expect(screen.getByLabelText("x")).toBeInTheDocument()
    })
  })

  it("renders filled", () => {
    const { rerender } = render(
      <Input
        aria-label="x"
        filled
      />
    )
    expect(screen.getByRole("textbox")).toBeInTheDocument()

    rerender(
      <Input
        aria-label="x"
        filled
        status="error"
      />
    )
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("forwards readOnly", () => {
    render(
      <Input
        aria-label="x"
        readOnly
      />
    )
    expect(screen.getByRole("textbox")).toHaveAttribute("readonly")
  })

  it("forwards required", () => {
    render(
      <Input
        aria-label="x"
        required
      />
    )
    expect(screen.getByRole("textbox")).toBeRequired()
  })
})
