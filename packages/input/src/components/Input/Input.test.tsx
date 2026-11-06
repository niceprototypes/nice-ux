import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { getToken } from "@niceprototypes/styles"
import { Field } from "@niceprototypes/field"
import Input from "./Input"
import { resolveGhost } from "../../utilities/resolveGhost"
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

  describe("disabled", () => {
    it("disables the native control and blocks typing", async () => {
      const user = userEvent.setup()
      render(
        <Input
          aria-label="name"
          disabled
          onChange={mockOnChange}
        />
      )
      const el = screen.getByRole("textbox")
      expect(el).toBeDisabled()
      await user.type(el, "x")
      expect(mockOnChange).not.toHaveBeenCalled()
    })

    it("applies the same disabled styling as status=\"disabled\"", () => {
      const { unmount } = render(<Input aria-label="x" status="disabled" />)
      const byStatus = screen.getByRole("textbox")
      const statusControlCss = cssFor(byStatus)
      const statusFieldCss = cssFor(byStatus.parentElement!)
      unmount()

      render(<Input aria-label="x" disabled status="error" />)
      const byProp = screen.getByRole("textbox")
      const controlCss = cssFor(byProp)
      const fieldCss = cssFor(byProp.parentElement!)
      expect(controlCss).toContain(`color:${getToken("color", "disabled")}`)
      expect(fieldCss).toContain("cursor:not-allowed")
      // status="error" is overridden: the border is the disabled (base) one.
      expect(fieldCss).not.toContain(getToken("input.borderColor:error"))
      expect(controlCss).toBe(statusControlCss)
      expect(fieldCss).toBe(statusFieldCss)
    })

    it("transitions the border and background over the input animation tokens", () => {
      render(<Input aria-label="x" />)
      const timing = `${getToken("input.animationDuration:base")} ${getToken("input.animationEasing:base")}`
      expect(cssFor(screen.getByRole("textbox").parentElement!)).toContain(
        `transition:border-color ${timing},background-color ${timing};`
      )
    })

    it("leaves the control enabled when neither disabled nor status=\"disabled\" is set", () => {
      render(<Input aria-label="x" disabled={false} status="base" />)
      expect(screen.getByRole("textbox")).toBeEnabled()
    })

    it("disables select and textarea too", () => {
      render(
        <>
          <Input as="select" aria-label="s" disabled>
            <option value="a">A</option>
          </Input>
          <Input as="textarea" aria-label="t" disabled />
        </>
      )
      expect(screen.getByRole("combobox", { name: "s" })).toBeDisabled()
      expect(screen.getByRole("textbox", { name: "t" })).toBeDisabled()
    })
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

  describe("maxRows", () => {
    it("caps the textarea at maxRows lines and removes the resize handle", () => {
      render(
        <Input
          as="textarea"
          aria-label="notes"
          maxRows={6}
        />
      )
      const css = cssFor(screen.getByRole("textbox", { name: "notes" }))
      expect(css).toMatch(/max-block-size:calc\(\s*6 \* 1lh/)
      expect(css).toContain("resize:none")
    })

    it("leaves the textarea uncapped and resizable without maxRows", () => {
      render(
        <Input
          as="textarea"
          aria-label="notes"
        />
      )
      const css = cssFor(screen.getByRole("textbox", { name: "notes" }))
      expect(css).not.toContain("max-block-size")
      expect(css).toContain("resize:vertical")
    })

    it("is typed for as=\"textarea\" only", () => {
      // @ts-expect-error — `maxRows` applies only to as="textarea"
      render(<Input aria-label="a" maxRows={3} />)
      // @ts-expect-error — `onSubmit` applies only to as="textarea"
      render(<Input as="select" aria-label="b" onSubmit={jest.fn()} />)
      expect(screen.getAllByLabelText(/^[ab]$/)).toHaveLength(2)
    })
  })

  describe("onSubmit", () => {
    const renderComposer = (props: Partial<Extract<InputProps, { as: "textarea" }>> = {}) => {
      const onSubmit = jest.fn()
      render(
        <Input
          as="textarea"
          aria-label="message"
          onSubmit={onSubmit}
          {...props}
        />
      )
      return { onSubmit, textarea: screen.getByRole("textbox", { name: "message" }) }
    }

    it("submits the value on Enter without inserting a newline", async () => {
      const { onSubmit, textarea } = renderComposer()
      await userEvent.type(textarea, "Hello{Enter}")
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenCalledWith("Hello", expect.objectContaining({ key: "Enter" }))
      expect(textarea).toHaveValue("Hello")
    })

    it("inserts a newline on Shift+Enter and does not submit", async () => {
      const { onSubmit, textarea } = renderComposer()
      await userEvent.type(textarea, "a{Shift>}{Enter}{/Shift}b")
      expect(onSubmit).not.toHaveBeenCalled()
      expect(textarea).toHaveValue("a\nb")
    })

    it("ignores Enter during IME composition", () => {
      const { onSubmit, textarea } = renderComposer()
      const notCancelled = fireEvent.keyDown(textarea, { key: "Enter", isComposing: true })
      expect(onSubmit).not.toHaveBeenCalled()
      expect(notCancelled).toBe(true)
    })

    it("runs onKeyDown first, and preventDefault there cancels the submit", () => {
      const calls: string[] = []
      const { onSubmit, textarea } = renderComposer({
        onKeyDown: event => {
          calls.push("keydown")
          event.preventDefault()
        },
      })
      fireEvent.keyDown(textarea, { key: "Enter" })
      expect(calls).toEqual(["keydown"])
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it("calls onKeyDown before onSubmit when not prevented", () => {
      const calls: string[] = []
      const { textarea } = renderComposer({
        onKeyDown: () => calls.push("keydown"),
        onSubmit: () => calls.push("submit"),
      })
      fireEvent.keyDown(textarea, { key: "Enter" })
      expect(calls).toEqual(["keydown", "submit"])
    })

    it("keeps Enter native on a textarea without onSubmit", () => {
      render(
        <Input
          as="textarea"
          aria-label="notes"
        />
      )
      expect(fireEvent.keyDown(screen.getByRole("textbox", { name: "notes" }), { key: "Enter" })).toBe(true)
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

    it("sets aria-invalid when the Field is invalid or status is \"error\", never \"false\"", () => {
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
          <Input status="success" />
        </Field>
      )
      expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid")
      expect(container.querySelector('[aria-invalid="false"]')).toBeNull()
      rerender(
        <Field
          label="Email"
          invalid={false}
        >
          <Input status="error" />
        </Field>
      )
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
    })

    it("shows the error border when the Field is invalid and no status is set", () => {
      render(
        <Field
          label="Email"
          invalid
        >
          <Input />
        </Field>
      )
      const fieldCss = cssFor(screen.getByRole("textbox").parentElement!)
      expect(fieldCss).toContain(getToken("input.borderColor:error"))
    })

    it("keeps an explicit status inside an invalid Field", () => {
      render(
        <Field
          label="Email"
          invalid
        >
          <Input status="success" />
        </Field>
      )
      const fieldCss = cssFor(screen.getByRole("textbox").parentElement!)
      expect(fieldCss).toContain(getToken("input.borderColor:success"))
      expect(fieldCss).not.toContain(getToken("input.borderColor:error"))
    })

    it("shows the disabled styling when disabled inside an invalid Field", () => {
      render(
        <Field
          label="Email"
          invalid
        >
          <Input disabled />
        </Field>
      )
      const control = screen.getByRole("textbox")
      expect(control).toBeDisabled()
      expect(cssFor(control)).toContain(`color:${getToken("color", "disabled")}`)
      expect(cssFor(control.parentElement!)).not.toContain(
        getToken("input.borderColor:error")
      )
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

  it("shows focus as the border color, with no outline", () => {
    render(<Input aria-label="x" />)
    const control = screen.getByRole("textbox")
    const css = cssFor(control.parentElement!)
    expect(css).toMatch(
      new RegExp(`:focus\\)\\{border-color:${getToken("input.focusRing.color:base").replace(/[()]/g, "\\$&")};\\}`)
    )
    expect(css).not.toContain("outline")
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

  describe("ghost", () => {
    const GHOST = "{background-color:transparent;border-color:transparent;}"
    const fieldCss = () => cssFor(screen.getByRole("textbox").parentElement!)

    it("true ghosts rest and hover, not focus", () => {
      render(<Input aria-label="x" ghost />)
      const css = fieldCss()
      expect(css).toContain(`:not(:hover):not(:has(>`)
      expect(css).toMatch(/:hover:not\(:has\(>[^{]*:focus\)\)\{background-color:transparent;border-color:transparent;\}/)
      expect(css).not.toMatch(/[^t]\(?:has\(>[^{]*:focus\)\{background-color:transparent/)
    })

    it("a states object ghosts only the states it names", () => {
      render(<Input aria-label="x" ghost={{ focus: true }} />)
      const css = fieldCss()
      expect(css).toMatch(/:has\(>[^{]*:focus\)\{background-color:transparent;border-color:transparent;\}/)
      expect(css).not.toContain(":not(:hover)")
      expect(css).not.toMatch(/:hover:not/)
    })

    it("ghosts every state, focus included", () => {
      render(<Input aria-label="x" ghost={{ rest: true, hover: true, focus: true }} />)
      expect(fieldCss().split(GHOST).length - 1).toBe(3)
    })

    it("emits no ghost rule by default", () => {
      render(<Input aria-label="x" />)
      expect(fieldCss()).not.toContain(GHOST)
    })

    it("a ghosted focus draws the focus ring as an outline on focus-visible", () => {
      render(<Input aria-label="x" ghost={{ rest: true, hover: true, focus: true }} />)
      const escape = (value: string) => value.replace(/[()]/g, "\\$&")
      expect(fieldCss()).toMatch(
        new RegExp(
          `:has\\(>[^{]*:focus-visible\\)\\{outline:${escape(getToken("input.focusRing.width:base"))} solid ${escape(getToken("input.focusRing.color:base"))};outline-offset:${escape(getToken("input.focusRing.offset:base"))};\\}`
        )
      )
    })

    it("draws no focus outline unless focus is ghosted", () => {
      render(<Input aria-label="x" ghost />)
      const css = fieldCss()
      expect(css).not.toContain(":focus-visible")
      expect(css).not.toContain("outline")
    })
  })

  describe("resolveGhost", () => {
    it("expands true to rest and hover, and an object to its named states", () => {
      expect(resolveGhost(true)).toEqual({ rest: true, hover: true, focus: false })
      expect(resolveGhost(false)).toEqual({ rest: false, hover: false, focus: false })
      expect(resolveGhost({ focus: true })).toEqual({ rest: false, hover: false, focus: true })
    })
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

describe("Input component colour defaults", () => {
  it("reads the outline border and base background from the input tokens", () => {
    render(<Input aria-label="x" />)
    const fieldCss = cssFor(screen.getByRole("textbox").parentElement!)
    expect(fieldCss).toContain(`border-color:${getToken("input.borderColor:base")}`)
    expect(fieldCss).toContain(`background-color:${getToken("input.backgroundColor:base")}`)
  })

  it("reads the filled background from the input tokens", () => {
    render(<Input aria-label="x" filled />)
    const fieldCss = cssFor(screen.getByRole("textbox").parentElement!)
    expect(fieldCss).toContain(`background-color:${getToken("input.backgroundColor:raised")}`)
  })
})

describe("Input in a flex row", () => {
  it("lets the field shrink below its control's intrinsic width", () => {
    render(<Input aria-label="x" />)
    expect(cssFor(screen.getByRole("textbox").parentElement!)).toContain("min-inline-size:0")
  })
})

describe("Input passwordReveal", () => {
  it("toggles a password between hidden and visible", async () => {
    render(<Input aria-label="Key" type="password" passwordReveal defaultValue="secret" />)
    const control = screen.getByLabelText("Key")
    expect(control).toHaveAttribute("type", "password")
    await userEvent.click(screen.getByRole("button", { name: "Show" }))
    expect(control).toHaveAttribute("type", "text")
    expect(control).toHaveValue("secret")
    await userEvent.click(screen.getByRole("button", { name: "Hide" }))
    expect(control).toHaveAttribute("type", "password")
  })

  it("renders the toggle after the end content", () => {
    render(<Input aria-label="Key" type="password" passwordReveal end={<span data-testid="end" />} />)
    const chrome = screen.getByLabelText("Key").parentElement!
    expect(chrome.lastElementChild).toBe(screen.getByRole("button", { name: "Show" }))
    expect(chrome.lastElementChild?.previousElementSibling).toBe(screen.getByTestId("end"))
  })

  it("disables the toggle with the input", () => {
    render(<Input aria-label="Key" type="password" passwordReveal disabled />)
    expect(screen.getByRole("button", { name: "Show" })).toBeDisabled()
  })

  it("renders no toggle without passwordReveal or for other types", () => {
    const { unmount } = render(<Input aria-label="Key" type="password" />)
    expect(screen.queryByRole("button")).toBeNull()
    unmount()
    render(<Input aria-label="Key" type="text" passwordReveal />)
    expect(screen.queryByRole("button")).toBeNull()
  })
})
