import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { getToken, resolveColorProp } from "@niceprototypes/styles"
import Button from "./Button"
import ResponsiveButton from "."
import type { ButtonRefType } from "./Button.types"
import { resolveGhost } from "../../utilities/resolveGhost"
import { resolveStateColor } from "../../utilities/resolveStateColor"

jest.mock("@niceprototypes/ink", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}))

jest.mock("@niceprototypes/icon", () => ({
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
    render(<Button onClick={mockOnClick} iconRight="check" aria-label="Confirm" />)
    expect(screen.getByTestId("icon")).toHaveTextContent("check")
  })

  it("renders button with both text and icon", () => {
    render(<Button onClick={mockOnClick} iconRight="arrow-right">Next</Button>)
    expect(screen.getByRole("button")).toHaveTextContent("Next")
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("renders iconRight", () => {
    render(<Button onClick={mockOnClick} iconRight="arrow-right">Next</Button>)
    expect(screen.getByTestId("icon")).toHaveTextContent("arrow-right")
  })

  it("centers its content by default", () => {
    render(<Button data-testid="root" iconRight="arrow-right">Next</Button>)
    const content = screen.getByTestId("root").firstElementChild!
    expect(content).toHaveStyle({ justifyContent: "center" })
    expect(getComputedStyle(content).flexGrow).not.toBe("1")
  })

  it("spreads its content across its width with justifyContent", () => {
    render(<Button data-testid="root" iconRight="arrow-right" justifyContent="space-between">Next</Button>)
    const content = screen.getByTestId("root").firstElementChild!
    expect(content).toHaveStyle({ justifyContent: "space-between", flexGrow: "1" })
  })

  it("renders iconLeft", () => {
    render(<Button onClick={mockOnClick} iconLeft="arrow-left">Back</Button>)
    expect(screen.getByTestId("icon")).toHaveTextContent("arrow-left")
  })

  it("accepts a vendor icon name in iconLeft and iconRight", () => {
    render(
      <Button onClick={mockOnClick} iconLeft="Pencil" iconRight="ChevronRight" iconVendor>
        Edit
      </Button>
    )
    const icons = screen.getAllByTestId("icon")
    expect(icons[0]).toHaveTextContent("Pencil")
    expect(icons[1]).toHaveTextContent("ChevronRight")
  })

  it("renders iconLeft before the label and iconRight after it", () => {
    render(
      <Button onClick={mockOnClick} iconLeft="arrow-left" iconRight="arrow-right">
        Both
      </Button>
    )
    const icons = screen.getAllByTestId("icon")
    expect(icons).toHaveLength(2)
    expect(icons[0]).toHaveTextContent("arrow-left")
    expect(icons[1]).toHaveTextContent("arrow-right")
  })

  it("calls onClick when clicked", () => {
    render(<Button onClick={mockOnClick}>Click me</Button>)
    fireEvent.click(screen.getByRole("button"))
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it("does not call onClick when status is disabled", () => {
    render(<Button onClick={mockOnClick} status="disabled">Disabled</Button>)
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

  it("renders filled and outline", () => {
    const { rerender } = render(<Button onClick={mockOnClick} filled>Filled</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()

    rerender(<Button onClick={mockOnClick}>Outline</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("renders with different statuses", () => {
    const statuses = ["base", "disabled", "error", "success", "warning"] as const
    const { rerender } = render(<Button onClick={mockOnClick} status="base">Base</Button>)

    statuses.forEach((status) => {
      rerender(<Button onClick={mockOnClick} status={status}>{status}</Button>)
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

  describe("disabled", () => {
    const triggers = [
      { label: "disabled prop", props: { disabled: true } },
      { label: 'status="disabled"', props: { status: "disabled" as const } },
    ]

    it.each(triggers)("as=button: sets native disabled and blocks onClick ($label)", ({ props }) => {
      render(<Button onClick={mockOnClick} {...props}>Label</Button>)
      const button = screen.getByRole("button")
      expect(button).toBeDisabled()
      fireEvent.click(button)
      expect(mockOnClick).not.toHaveBeenCalled()
    })

    it.each(triggers)("as=a: aria-disabled, no href, tabIndex -1, no onClick ($label)", ({ props }) => {
      render(
        <Button onClick={mockOnClick} as="a" href="/next" data-testid="root" {...props}>
          Label
        </Button>
      )
      const anchor = screen.getByTestId("root")
      expect(anchor).toHaveAttribute("aria-disabled", "true")
      expect(anchor).not.toHaveAttribute("href")
      expect(anchor).toHaveAttribute("tabindex", "-1")
      fireEvent.click(anchor)
      expect(mockOnClick).not.toHaveBeenCalled()
    })

    it.each(triggers)("as=div: aria-disabled, tabIndex -1, no onClick or key activation ($label)", ({ props }) => {
      render(<Button onClick={mockOnClick} as="div" {...props}>Label</Button>)
      const div = screen.getByRole("button")
      expect(div).toHaveAttribute("aria-disabled", "true")
      expect(div).toHaveAttribute("tabindex", "-1")
      expect(div).not.toHaveAttribute("disabled")
      fireEvent.click(div)
      fireEvent.keyDown(div, { key: "Enter" })
      expect(mockOnClick).not.toHaveBeenCalled()
    })

    it("stays enabled and focusable when not disabled", () => {
      render(<Button onClick={mockOnClick} as="a" href="/next" data-testid="root">Label</Button>)
      expect(screen.getByTestId("root")).toHaveAttribute("href", "/next")
      expect(screen.getByTestId("root")).not.toHaveAttribute("tabindex")
    })

    it("applies the status=\"disabled\" styling when only the disabled prop is set", () => {
      const { rerender } = render(<Button onClick={mockOnClick} status="disabled">Label</Button>)
      const statusClass = screen.getByRole("button").className
      rerender(<Button onClick={mockOnClick} disabled>Label</Button>)
      const propClass = screen.getByRole("button").className
      rerender(<Button onClick={mockOnClick}>Label</Button>)
      const baseClass = screen.getByRole("button").className
      expect(propClass).toBe(statusClass)
      expect(propClass).not.toBe(baseClass)
    })
  })

  describe("aria attributes", () => {
    it.each([undefined, "a" as const, "div" as const])("forwards aria-expanded/haspopup/controls/pressed (as=%s)", (as) => {
      render(
        <Button
          onClick={mockOnClick}
          as={as}
          href="#"
          data-testid="root"
          aria-expanded
          aria-haspopup="dialog"
          aria-controls="popover-1"
          aria-pressed="mixed"
        >
          Label
        </Button>
      )
      const root = screen.getByTestId("root")
      expect(root).toHaveAttribute("aria-expanded", "true")
      expect(root).toHaveAttribute("aria-haspopup", "dialog")
      expect(root).toHaveAttribute("aria-controls", "popover-1")
      expect(root).toHaveAttribute("aria-pressed", "mixed")
    })

    it("forwards aria-expanded={false} and omits unset attributes", () => {
      render(<Button onClick={mockOnClick} aria-expanded={false}>Label</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("aria-expanded", "false")
      expect(button).not.toHaveAttribute("aria-haspopup")
      expect(button).not.toHaveAttribute("aria-controls")
      expect(button).not.toHaveAttribute("aria-pressed")
    })
  })

  describe("role, aria-selected, tabIndex and id", () => {
    it.each([undefined, "a" as const, "div" as const])("forwards them to the root (as=%s)", (as) => {
      render(
        <Button as={as} href="#" data-testid="root" role="tab" aria-selected tabIndex={-1} id="tab-1">
          Label
        </Button>
      )
      const root = screen.getByTestId("root")
      expect(root).toHaveAttribute("role", "tab")
      expect(root).toHaveAttribute("aria-selected", "true")
      expect(root).toHaveAttribute("tabindex", "-1")
      expect(root).toHaveAttribute("id", "tab-1")
    })

    it("keeps as=div's role=\"button\" and tabIndex 0 when they are unset", () => {
      render(<Button as="div" data-testid="root">Label</Button>)
      const root = screen.getByTestId("root")
      expect(root).toHaveAttribute("role", "button")
      expect(root).toHaveAttribute("tabindex", "0")
      expect(root).not.toHaveAttribute("aria-selected")
      expect(root).not.toHaveAttribute("id")
    })

    it("adds no role or tabindex to a button or anchor when they are unset", () => {
      render(<Button data-testid="root">Label</Button>)
      expect(screen.getByTestId("root")).not.toHaveAttribute("role")
      expect(screen.getByTestId("root")).not.toHaveAttribute("tabindex")
    })

    it.each(["a" as const, "div" as const])("keeps tabIndex -1 when disabled, over a consumer tabIndex (as=%s)", (as) => {
      render(<Button as={as} href="#" data-testid="root" disabled tabIndex={0}>Label</Button>)
      expect(screen.getByTestId("root")).toHaveAttribute("tabindex", "-1")
    })

    it("keeps the native disabled attribute and drops a consumer tabIndex when disabled (as=button)", () => {
      render(<Button data-testid="root" disabled tabIndex={0}>Label</Button>)
      const root = screen.getByTestId("root")
      expect(root).toBeDisabled()
      expect(root).not.toHaveAttribute("tabindex")
    })
  })

  describe("ref", () => {
    const cases = [
      { as: undefined, element: HTMLButtonElement, tag: "BUTTON" },
      { as: "a" as const, element: HTMLAnchorElement, tag: "A" },
      { as: "div" as const, element: HTMLDivElement, tag: "DIV" },
    ]

    it.each(cases)("forwards ref to the root element (as=$as)", ({ as, element, tag }) => {
      const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>()
      render(
        <Button onClick={mockOnClick} as={as} href="#" ref={ref} data-testid="root">
          Label
        </Button>
      )
      expect(ref.current).toBeInstanceOf(element)
      expect(ref.current?.tagName).toBe(tag)
      expect(ref.current).toBe(screen.getByTestId("root"))
    })

    it.each(cases)("forwards ref through withBreakpoints (as=$as)", ({ as, element }) => {
      const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>()
      render(
        <ResponsiveButton onClick={mockOnClick} as={as} href="#" ref={ref} data-testid="root">
          Label
        </ResponsiveButton>
      )
      expect(ref.current).toBeInstanceOf(element)
      expect(ref.current).toBe(screen.getByTestId("root"))
    })

    it("calls a callback ref with the element", () => {
      let node: HTMLElement | null = null
      const ref: ButtonRefType = (el) => {
        node = el
      }
      render(<Button onClick={mockOnClick} ref={ref}>Label</Button>)
      expect(node).toBe(screen.getByRole("button"))
    })
  })

  describe("grow", () => {
    it.each([undefined, "a" as const, "div" as const])("grow={1} sets flex-grow: 1 and flex-basis: 0 on the root (as=%s)", (as) => {
      render(<Button onClick={mockOnClick} as={as} href="#" data-testid="root" grow={1}>Label</Button>)
      const root = screen.getByTestId("root")
      expect(root).toHaveStyle({ flexGrow: "1", flexBasis: "0" })
    })

    it("emits no flex-grow when grow is omitted", () => {
      render(<Button onClick={mockOnClick} data-testid="root">Label</Button>)
      expect(getComputedStyle(screen.getByTestId("root")).flexGrow).toBe("")
    })
  })

  describe("aria-current and form", () => {
    it.each([undefined, "a" as const, "div" as const])("forwards aria-current to the root (as=%s)", (as) => {
      render(<Button as={as} href="#" data-testid="root" aria-current="page">2</Button>)
      expect(screen.getByTestId("root")).toHaveAttribute("aria-current", "page")
    })

    it("omits aria-current when unset", () => {
      render(<Button data-testid="root">2</Button>)
      expect(screen.getByTestId("root")).not.toHaveAttribute("aria-current")
    })

    it("forwards form to the native button, which then submits that form from outside it", () => {
      const onSubmit = jest.fn((event: React.FormEvent) => event.preventDefault())
      render(
        <>
          <form id="checkout" onSubmit={onSubmit} />
          <Button data-testid="root" type="submit" form="checkout">Pay</Button>
        </>
      )
      const root = screen.getByTestId("root")
      expect(root).toHaveAttribute("form", "checkout")
      fireEvent.click(root)
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it.each(["a" as const, "div" as const])("does not pass form to a non-button root (as=%s)", (as) => {
      render(<Button as={as} href="#" data-testid="root" form="checkout">Label</Button>)
      expect(screen.getByTestId("root")).not.toHaveAttribute("form")
    })
  })

  describe("inlined", () => {
    const RESET = "border:0;background:none;padding:0;"
    /** The injected CSS rules of `element`'s own classes. */
    const ownRules = (element: Element) => {
      const css = Array.from(document.head.querySelectorAll("style"))
        .map(tag => tag.textContent ?? "")
        .join("\n")
      return Array.from(element.classList).flatMap(className =>
        Array.from(css.matchAll(new RegExp(`\\.${className}\\{([^}]*)\\}`, "g"))).map(([, body]) => body)
      )
    }

    it.each([undefined, "a" as const, "div" as const])("resets border, background and padding (as=%s)", (as) => {
      render(<Button as={as} href="#" data-testid="root" inlined>Label</Button>)
      expect(ownRules(screen.getByTestId("root")).join("")).toContain(RESET)
    })

    it("emits the same rule for a native button, an anchor and a div", () => {
      render(
        <>
          <Button data-testid="button" inlined>Label</Button>
          <Button data-testid="a" as="a" href="#">Label</Button>
          <Button data-testid="div" as="div" inlined>Label</Button>
        </>
      )
      const [button, a, div] = ["button", "a", "div"].map(id => ownRules(screen.getByTestId(id)).join(""))
      expect(a).toBe(button)
      expect(div).toBe(button)
    })

    it("keeps the button chrome when not inlined", () => {
      render(<Button data-testid="root">Label</Button>)
      expect(ownRules(screen.getByTestId("root")).join("")).not.toContain(RESET)
    })
  })

  describe("focus indicator", () => {
    const injectedCss = () =>
      Array.from(document.querySelectorAll("style"))
        .map((tag) => tag.textContent ?? "")
        .join("")

    it("keeps outline: none for non-keyboard focus", () => {
      render(<Button onClick={mockOnClick}>Label</Button>)
      expect(injectedCss()).toContain("outline:none;")
    })

    it("emits a token-driven :focus-visible outline", () => {
      render(<Button onClick={mockOnClick}>Label</Button>)
      expect(injectedCss()).toContain(
        `:focus-visible{outline:${getToken("button.focusRing.width:base")} solid ${getToken("button.focusRing.color:base")};` +
          `outline-offset:${getToken("button.focusRing.offset:base")};}`
      )
    })
  })
})

describe("Button ghost", () => {
  const TRANSPARENT = "background-color:transparent;background-image:none;border-color:transparent;"

  /**
   * Selectors of the rules that make `element` transparent. Reads only rules for the
   * element's own classes, so styles injected by other tests don't leak in.
   */
  function ghostSelectors(element: Element): string[] {
    const css = Array.from(document.head.querySelectorAll("style"))
      .map(tag => tag.textContent ?? "")
      .join("\n")
    return Array.from(element.classList).flatMap(className =>
      Array.from(css.matchAll(new RegExp(`\\.${className}([^{,]*)\\{([^}]*)\\}`, "g")))
        .filter(([, , body]) => body.includes(TRANSPARENT))
        .map(([, selector]) => selector),
    )
  }

  const STATE_SELECTORS = {
    rest: ":not(:hover):not(:focus-visible):not(:active)",
    hover: ":hover:not(:focus-visible):not(:active)",
    focus: ":focus-visible:not(:active)",
    active: ":active",
  }

  it("ghosts the rest state only when ghost is true", () => {
    render(<Button data-testid="root" ghost>Ghost</Button>)
    expect(ghostSelectors(screen.getByTestId("root"))).toEqual([STATE_SELECTORS.rest])
  })

  it("emits no ghost rule by default", () => {
    render(<Button data-testid="root">Solid</Button>)
    expect(ghostSelectors(screen.getByTestId("root"))).toEqual([])
  })

  it("ghosts exactly the states an object sets to true", () => {
    render(<Button data-testid="root" ghost={{ hover: true, focus: true, rest: false }}>Ghost</Button>)
    expect(ghostSelectors(screen.getByTestId("root"))).toEqual([STATE_SELECTORS.hover, STATE_SELECTORS.focus])
  })

  it("can ghost every state", () => {
    render(<Button data-testid="root" ghost={{ rest: true, hover: true, focus: true, active: true }}>Ghost</Button>)
    expect(ghostSelectors(screen.getByTestId("root"))).toEqual(Object.values(STATE_SELECTORS))
  })

  it("keeps a filled button's label visible while ghosted: the status color, not the inverse", () => {
    render(<Button data-testid="root" filled status="error" ghost>Ghost</Button>)
    const css = Array.from(document.head.querySelectorAll("style"))
      .map(tag => tag.textContent ?? "")
      .join("\n")
    const className = Array.from(screen.getByTestId("root").classList).find(name =>
      css.includes(`.${name}${STATE_SELECTORS.rest}{`),
    )
    const rule = css.match(new RegExp(`\\.${className}:not\\(:hover\\)[^{]*\\{([^}]*)\\}`))?.[1] ?? ""
    expect(rule).toContain(`color:${getToken("color", "error")}`)
  })

  it("shows the rest setting in every state when disabled", () => {
    render(<Button data-testid="root" disabled ghost>Ghost</Button>)
    expect(ghostSelectors(screen.getByTestId("root"))).toEqual([""])
  })

  it("ignores hover, focus and active ghosting when disabled", () => {
    render(<Button data-testid="root" disabled ghost={{ hover: true, focus: true, active: true }}>Ghost</Button>)
    expect(ghostSelectors(screen.getByTestId("root"))).toEqual([])
  })

  it("has no effect on the inlined layout", () => {
    render(<Button data-testid="root" as="a" href="#" ghost>Link</Button>)
    expect(ghostSelectors(screen.getByTestId("root"))).toEqual([])
  })
})

describe("resolveGhost", () => {
  it("expands true to the rest state, false to none, and fills an object's missing states", () => {
    expect(resolveGhost(true)).toEqual({ rest: true, hover: false, focus: false, active: false })
    expect(resolveGhost(false)).toEqual({ rest: false, hover: false, focus: false, active: false })
    expect(resolveGhost({ hover: true })).toEqual({ rest: false, hover: true, focus: false, active: false })
  })
})

describe("Button iconColor", () => {
  const STATE_SELECTORS = {
    rest: ":not(:hover):not(:focus-visible):not(:active)",
    hover: ":hover:not(:focus-visible):not(:active)",
    focus: ":focus-visible:not(:active)",
    active: ":active",
  } as const

  /**
   * [selector, value] for each rule that sets --np--icon--color on `element`, in stylesheet order,
   * leaving out the unconditional base default. Reads only the element's own classes, so other
   * tests' styles don't leak in.
   */
  function iconColorRules(element: Element): [string, string][] {
    const css = Array.from(document.head.querySelectorAll("style"))
      .map(tag => tag.textContent ?? "")
      .join("\n")
    const baseColor = getToken("button.icon.color:base")
    return Array.from(element.classList).flatMap(className =>
      Array.from(css.matchAll(new RegExp(`\\.${className}([^{,]*)\\{([^}]*)\\}`, "g"))).flatMap(([, selector, body]) =>
        Array.from(body.matchAll(/--np--icon--color:([^;]+);/g))
          .map(([, value]) => value)
          .filter(value => !(selector === "" && value === baseColor))
          .map((value): [string, string] => [selector, value])
      )
    )
  }

  /** The rules the button.icon.color state tokens add to every button. */
  const TOKEN_RULES: [string, string][] = (["hover", "focus", "active"] as const).map(state => [
    STATE_SELECTORS[state],
    getToken(`button.icon.color:${state}`),
  ])

  /** Only the rules the iconColor prop adds. */
  const propRules = (element: Element) =>
    iconColorRules(element).filter(([selector, value]) => !TOKEN_RULES.some(([s, v]) => s === selector && v === value))

  it("reads hover, focus and active from the button.icon.color state tokens by default", () => {
    render(<Button data-testid="root" iconLeft="plus" aria-label="Add" />)
    expect(iconColorRules(screen.getByTestId("root"))).toEqual(TOKEN_RULES)
  })

  it("applies one color in every state", () => {
    render(<Button data-testid="root" iconLeft="plus" aria-label="Add" iconColor="borderColor" />)
    const color = getToken("borderColor")
    expect(propRules(screen.getByTestId("root"))).toEqual(
      Object.values(STATE_SELECTORS).map(selector => [selector, color])
    )
  })

  it.each(Object.keys(STATE_SELECTORS) as (keyof typeof STATE_SELECTORS)[])(
    "sets only the %s state when the object names only it",
    state => {
      render(<Button data-testid="root" iconLeft="plus" aria-label="Add" iconColor={{ [state]: "borderColor:stronger" }} />)
      expect(propRules(screen.getByTestId("root"))).toEqual([
        [STATE_SELECTORS[state], getToken("borderColor:stronger")],
      ])
    }
  )

  it("sets a different color per state", () => {
    render(
      <Button
        data-testid="root"
        iconLeft="plus"
        aria-label="Add"
        iconColor={{ rest: "borderColor", hover: "borderColor:stronger" }}
      />
    )
    expect(propRules(screen.getByTestId("root"))).toEqual([
      [STATE_SELECTORS.rest, getToken("borderColor")],
      [STATE_SELECTORS.hover, getToken("borderColor:stronger")],
    ])
  })

  it("puts the prop's rule after the token's for the same state, so the prop wins", () => {
    render(<Button data-testid="root" iconLeft="plus" aria-label="Add" iconColor={{ hover: "borderColor:stronger" }} />)
    const hoverRules = iconColorRules(screen.getByTestId("root")).filter(([selector]) => selector === STATE_SELECTORS.hover)
    expect(hoverRules).toEqual([
      [STATE_SELECTORS.hover, getToken("button.icon.color:hover")],
      [STATE_SELECTORS.hover, getToken("borderColor:stronger")],
    ])
  })

  it("shows only the base and the rest color when disabled", () => {
    render(
      <Button
        data-testid="root"
        iconLeft="plus"
        aria-label="Add"
        disabled
        iconColor={{ rest: "borderColor", hover: "borderColor:stronger" }}
      />
    )
    expect(iconColorRules(screen.getByTestId("root"))).toEqual([["", getToken("borderColor")]])
  })

  it("applies in the inlined layout", () => {
    render(<Button data-testid="root" as="a" href="#" iconLeft="plus" iconColor="color:link">Link</Button>)
    expect(propRules(screen.getByTestId("root"))).toHaveLength(4)
  })
})

describe("resolveStateColor", () => {
  it("spreads one color over every state, keeps an object, and is empty when unset", () => {
    expect(resolveStateColor("borderColor")).toEqual({
      rest: "borderColor",
      hover: "borderColor",
      focus: "borderColor",
      active: "borderColor",
    })
    expect(resolveStateColor({ hover: "borderColor:stronger" })).toEqual({ hover: "borderColor:stronger" })
    expect(resolveStateColor(undefined)).toEqual({})
  })
})

describe("Button animationDuration", () => {
  /** The `transition` declarations on `element`'s own classes. */
  function transitions(element: Element): string[] {
    const css = Array.from(document.head.querySelectorAll("style"))
      .map(tag => tag.textContent ?? "")
      .join("\n")
    return Array.from(element.classList).flatMap(className =>
      Array.from(css.matchAll(new RegExp(`\\.${className}\\{([^}]*)\\}`, "g"))).flatMap(([, body]) =>
        Array.from(body.matchAll(/transition:([^;]+);/g)).map(([, value]) => value)
      )
    )
  }

  const easing = getToken("button.animationEasing:base")

  it("transitions over the base duration token with the easing token by default", () => {
    render(<Button data-testid="root">Save</Button>)
    expect(transitions(screen.getByTestId("root"))).toEqual([
      `all ${getToken("button.animationDuration:base")} ${easing}`,
    ])
  })

  it.each(["none", "faster", "fast", "base", "slow", "slower"] as const)("reads the %s duration token", duration => {
    render(<Button data-testid="root" animationDuration={duration}>Save</Button>)
    expect(transitions(screen.getByTestId("root"))).toEqual([
      `all ${getToken(`button.animationDuration:${duration}`)} ${easing}`,
    ])
  })

  it("has no transition in the inlined layout, which has no chrome to animate", () => {
    render(<Button data-testid="root" as="a" href="#" animationDuration="slow">Link</Button>)
    expect(transitions(screen.getByTestId("root"))).toEqual([])
  })
})

describe("Button color", () => {
  const STATE_SELECTORS = {
    rest: ":not(:hover):not(:focus-visible):not(:active)",
    hover: ":hover:not(:focus-visible):not(:active)",
    focus: ":focus-visible:not(:active)",
    active: ":active",
  } as const

  /** [selector, value] for each state rule that sets `color` on `element`, in stylesheet order. */
  function stateColorRules(element: Element): [string, string][] {
    const css = Array.from(document.head.querySelectorAll("style"))
      .map(tag => tag.textContent ?? "")
      .join("\n")
    return Array.from(element.classList).flatMap(className =>
      Array.from(css.matchAll(new RegExp(`\\.${className}(:[^{,]*)\\{([^}]*)\\}`, "g"))).flatMap(([, selector, body]) =>
        Array.from(body.matchAll(/(?:^|;)color:([^;]+);/g)).map(([, value]): [string, string] => [selector, value])
      )
    )
  }

  it("adds no state color rule when color is unset", () => {
    render(<Button data-testid="root">Save</Button>)
    expect(stateColorRules(screen.getByTestId("root"))).toEqual([])
  })

  it("applies one color in every state", () => {
    render(<Button data-testid="root" color="color:light">Save</Button>)
    expect(stateColorRules(screen.getByTestId("root"))).toEqual(
      Object.values(STATE_SELECTORS).map(selector => [selector, getToken("color:light")])
    )
  })

  it("sets a color per state", () => {
    render(<Button data-testid="root" color={{ rest: "color:light", hover: "color" }}>Save</Button>)
    expect(stateColorRules(screen.getByTestId("root"))).toEqual([
      [STATE_SELECTORS.rest, getToken("color:light")],
      [STATE_SELECTORS.hover, getToken("color")],
    ])
  })

  it("comes after the ghost rest rule, so it wins over the ghost's status color", () => {
    render(<Button data-testid="root" ghost color={{ rest: "color:lighter" }}>Save</Button>)
    const rest = stateColorRules(screen.getByTestId("root")).filter(([selector]) => selector === STATE_SELECTORS.rest)
    expect(rest).toEqual([
      [STATE_SELECTORS.rest, getToken("color", "base")],
      [STATE_SELECTORS.rest, getToken("color:lighter")],
    ])
  })

  it("shows the rest color in every state when disabled", () => {
    render(<Button data-testid="root" disabled color={{ rest: "color:light", hover: "color" }}>Save</Button>)
    const css = Array.from(document.head.querySelectorAll("style")).map(tag => tag.textContent ?? "").join("\n")
    const element = screen.getByTestId("root")
    expect(stateColorRules(element)).toEqual([])
    const plain = Array.from(element.classList).some(className =>
      new RegExp(`\\.${className}\\{[^}]*color:${getToken("color:light").replace(/[()]/g, "\\$&")};`).test(css)
    )
    expect(plain).toBe(true)
  })

  it("applies in the inlined layout", () => {
    render(<Button data-testid="root" as="a" href="#" color="color:light">Link</Button>)
    expect(stateColorRules(screen.getByTestId("root"))).toHaveLength(4)
  })
})

describe("Button selected", () => {
  /** The `border-color` declarations on `element`'s own unconditional classes, in stylesheet order. */
  function borderColors(element: Element): string[] {
    const css = Array.from(document.head.querySelectorAll("style"))
      .map(tag => tag.textContent ?? "")
      .join("\n")
    return Array.from(element.classList).flatMap(className =>
      Array.from(css.matchAll(new RegExp(`\\.${className}\\{([^}]*)\\}`, "g"))).flatMap(([, body]) =>
        Array.from(body.matchAll(/(?:^|;)border-color:([^;]+);/g)).map(([, value]) => value)
      )
    )
  }

  /** Selectors of the rules that make `element` transparent (the ghost rules). */
  function ghostSelectors(element: Element): string[] {
    const transparent = "background-color:transparent;background-image:none;border-color:transparent;"
    const css = Array.from(document.head.querySelectorAll("style"))
      .map(tag => tag.textContent ?? "")
      .join("\n")
    return Array.from(element.classList).flatMap(className =>
      Array.from(css.matchAll(new RegExp(`\\.${className}([^{,]*)\\{([^}]*)\\}`, "g")))
        .filter(([, , body]) => body.includes(transparent))
        .map(([, selector]) => selector),
    )
  }

  it("reads the button.selected.borderColor token when unfilled", () => {
    render(<Button data-testid="root" selected>Tab</Button>)
    expect(borderColors(screen.getByTestId("root"))).toEqual([getToken("button.selected.borderColor:base")])
  })

  it("keeps the status border when not selected", () => {
    render(<Button data-testid="root">Tab</Button>)
    expect(borderColors(screen.getByTestId("root"))).toEqual([getToken("borderColor", "base")])
  })

  it("keeps a filled button's border transparent", () => {
    render(<Button data-testid="root" selected filled>Tab</Button>)
    expect(borderColors(screen.getByTestId("root"))).toEqual(["transparent"])
  })

  it("lets an explicit borderColor prop win, emitted after the selected border", () => {
    render(<Button data-testid="root" selected borderColor="link">Tab</Button>)
    expect(borderColors(screen.getByTestId("root"))).toEqual([
      getToken("button.selected.borderColor:base"),
      resolveColorProp("button", "borderColor", "link"),
    ])
  })

  it.each([true, { rest: true, hover: true, focus: true, active: true }])("overrides ghost in every state (ghost=%p)", ghost => {
    render(<Button data-testid="root" selected ghost={ghost}>Tab</Button>)
    expect(ghostSelectors(screen.getByTestId("root"))).toEqual([])
  })

  it("sets no ARIA attribute by itself", () => {
    render(<Button data-testid="root" selected>Tab</Button>)
    const root = screen.getByTestId("root")
    expect(root).not.toHaveAttribute("aria-pressed")
    expect(root).not.toHaveAttribute("aria-selected")
  })
})
