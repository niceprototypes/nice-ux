import React from "react"
import { act, fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
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

const fruit: SelectOptionsType = [
  { value: "a", label: "Apple" },
  { value: "b", label: "Banana", disabled: true },
  { value: "c", label: "Cherry" },
  { value: "d", label: "Date" },
]

const combobox = () => screen.getByRole("combobox")
const listbox = () => screen.getByRole("listbox")
const options = () => screen.getAllByRole("option")
const key = (name: string, init: Partial<KeyboardEventInit> = {}) =>
  fireEvent.keyDown(combobox(), { key: name, ...init })
const activeOption = () => {
  const id = combobox().getAttribute("aria-activedescendant")
  return id ? document.getElementById(id) : null
}
const hidden = (container: HTMLElement) => container.querySelector<HTMLInputElement>('input[type="hidden"]')!
/** Chevron holder: the last child of Input's field chrome. */
const chevron = () => combobox().parentElement!.lastElementChild as HTMLElement

describe("Select (custom, default)", () => {
  it("renders a read-only combobox input, not a native select", () => {
    const { container } = render(
      <Select
        aria-label="fruit"
        options={fruit}
      />
    )
    const trigger = combobox()
    expect(trigger.tagName).toBe("INPUT")
    expect(trigger).toHaveAttribute("readonly")
    expect(trigger).toHaveAttribute("aria-haspopup", "listbox")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(trigger).toHaveAttribute("aria-controls")
    expect(trigger).not.toHaveAttribute("aria-activedescendant")
    expect(container.querySelector("select")).toBeNull()
    expect(screen.queryByRole("listbox")).toBeNull()
  })

  it("renders the platform select when native is set", () => {
    const { container } = render(
      <Select
        native
        aria-label="fruit"
        options={fruit}
      />
    )
    expect(combobox().tagName).toBe("SELECT")
    expect(container.querySelector('input[type="hidden"]')).toBeNull()
  })

  it("shows the selected label, or the placeholder while empty", () => {
    const { rerender } = render(
      <Select
        aria-label="fruit"
        options={fruit}
        placeholder="Pick a fruit"
      />
    )
    expect(combobox()).toHaveValue("")
    expect(combobox()).toHaveAttribute("placeholder", "Pick a fruit")
    rerender(
      <Select
        aria-label="fruit"
        options={fruit}
        value="c"
      />
    )
    expect(combobox()).toHaveValue("Cherry")
  })

  it("defaults to the first enabled option without a placeholder (like native)", () => {
    const { container } = render(
      <Select
        aria-label="fruit"
        options={[{ value: "x", label: "X", disabled: true }, ...fruit]}
      />
    )
    expect(combobox()).toHaveValue("Apple")
    expect(hidden(container)).toHaveValue("a")
  })

  describe("pointer", () => {
    it("clicking the trigger toggles the listbox", () => {
      render(
        <Select
          aria-label="fruit"
          options={fruit}
        />
      )
      fireEvent.click(combobox())
      expect(combobox()).toHaveAttribute("aria-expanded", "true")
      expect(combobox()).toHaveAttribute("aria-controls", listbox().id)
      fireEvent.click(combobox())
      expect(combobox()).toHaveAttribute("aria-expanded", "false")
      expect(screen.queryByRole("listbox")).toBeNull()
    })

    it("clicking the chevron toggles without dismissing first (ignoreOutsideRefs)", () => {
      render(
        <Select
          aria-label="fruit"
          options={fruit}
        />
      )
      expect(chevron()).toHaveAttribute("aria-hidden", "true")
      fireEvent.pointerDown(chevron())
      fireEvent.mouseDown(chevron())
      fireEvent.click(chevron())
      expect(combobox()).toHaveAttribute("aria-expanded", "true")
      expect(document.activeElement).toBe(combobox())
      fireEvent.pointerDown(chevron())
      fireEvent.click(chevron())
      expect(combobox()).toHaveAttribute("aria-expanded", "false")
    })

    it("clicking an option selects it and closes; a disabled option does nothing", () => {
      const onChange = jest.fn()
      render(
        <Select
          aria-label="fruit"
          options={fruit}
          onChange={onChange}
        />
      )
      fireEvent.click(combobox())
      fireEvent.click(options()[1])
      expect(onChange).not.toHaveBeenCalled()
      expect(combobox()).toHaveAttribute("aria-expanded", "true")
      fireEvent.click(options()[2])
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange.mock.calls[0][0]).toBe("c")
      expect(onChange.mock.calls[0][1].type).toBe("click")
      expect(combobox()).toHaveValue("Cherry")
      expect(combobox()).toHaveAttribute("aria-expanded", "false")
    })

    it("pointer move sets the active option, skipping disabled", () => {
      render(
        <Select
          aria-label="fruit"
          options={fruit}
        />
      )
      fireEvent.click(combobox())
      fireEvent.pointerMove(options()[3])
      expect(activeOption()).toBe(options()[3])
      fireEvent.pointerMove(options()[1])
      expect(activeOption()).toBe(options()[3])
    })

    it("an outside pointerdown closes without change", () => {
      const onChange = jest.fn()
      render(
        <Select
          aria-label="fruit"
          options={fruit}
          onChange={onChange}
        />
      )
      fireEvent.click(combobox())
      fireEvent.pointerDown(document.body)
      expect(combobox()).toHaveAttribute("aria-expanded", "false")
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe("keyboard (closed)", () => {
    it.each([["ArrowDown"], ["ArrowUp"], ["Enter"], [" "]])(
      "%s opens on the selected option without changing the value",
      name => {
        const onChange = jest.fn()
        render(
          <Select
            aria-label="fruit"
            options={fruit}
            defaultValue="c"
            onChange={onChange}
          />
        )
        key(name)
        expect(combobox()).toHaveAttribute("aria-expanded", "true")
        expect(activeOption()).toHaveTextContent("Cherry")
        expect(onChange).not.toHaveBeenCalled()
      }
    )

    it("Alt+ArrowDown opens", () => {
      render(
        <Select
          aria-label="fruit"
          options={fruit}
        />
      )
      key("ArrowDown", { altKey: true })
      expect(combobox()).toHaveAttribute("aria-expanded", "true")
      expect(activeOption()).toHaveTextContent("Apple")
    })

    it("Home / End open on the first / last enabled option", () => {
      render(
        <Select
          aria-label="fruit"
          options={fruit}
          defaultValue="c"
        />
      )
      key("End")
      expect(activeOption()).toHaveTextContent("Date")
      key("Escape")
      key("Home")
      expect(activeOption()).toHaveTextContent("Apple")
    })

    it("other keys do not open", () => {
      render(
        <Select
          aria-label="fruit"
          options={fruit}
        />
      )
      key("Escape")
      key("Tab")
      expect(combobox()).toHaveAttribute("aria-expanded", "false")
    })
  })

  describe("keyboard (open)", () => {
    const openFruit = (props: Partial<React.ComponentProps<typeof Select>> = {}) => {
      const onChange = jest.fn()
      const utils = render(
        <Select
          aria-label="fruit"
          options={fruit}
          onChange={onChange}
          {...(props as object)}
        />
      )
      key("ArrowDown")
      return { onChange, ...utils }
    }

    it("ArrowDown / ArrowUp move the active option, skip disabled, and do not wrap", () => {
      openFruit()
      expect(activeOption()).toHaveTextContent("Apple")
      key("ArrowDown")
      expect(activeOption()).toHaveTextContent("Cherry")
      key("ArrowDown")
      expect(activeOption()).toHaveTextContent("Date")
      key("ArrowDown")
      expect(activeOption()).toHaveTextContent("Date")
      key("ArrowUp")
      key("ArrowUp")
      expect(activeOption()).toHaveTextContent("Apple")
      key("ArrowUp")
      expect(activeOption()).toHaveTextContent("Apple")
    })

    it("Home / End / PageDown / PageUp", () => {
      const many = Array.from({ length: 25 }, (_, i) => ({
        value: String(i),
        label: `Item ${i}`,
        disabled: i === 10,
      }))
      render(
        <Select
          aria-label="many"
          options={many}
        />
      )
      key("ArrowDown")
      key("PageDown")
      expect(activeOption()).toHaveTextContent("Item 11")
      key("PageDown")
      expect(activeOption()).toHaveTextContent("Item 21")
      key("PageDown")
      expect(activeOption()).toHaveTextContent("Item 24")
      key("PageUp")
      expect(activeOption()).toHaveTextContent("Item 14")
      key("Home")
      expect(activeOption()).toHaveTextContent("Item 0")
      key("End")
      expect(activeOption()).toHaveTextContent("Item 24")
    })

    it("aria-activedescendant is the active option's id; aria-selected marks the value", () => {
      openFruit({ defaultValue: "c" })
      const [apple, , cherry] = options()
      expect(combobox().getAttribute("aria-activedescendant")).toBe(cherry.id)
      expect(cherry).toHaveAttribute("aria-selected", "true")
      expect(apple).toHaveAttribute("aria-selected", "false")
      key("ArrowUp")
      expect(combobox().getAttribute("aria-activedescendant")).toBe(apple.id)
      expect(cherry).toHaveAttribute("aria-selected", "true")
    })

    it("Enter selects the active option and closes", () => {
      const { onChange } = openFruit()
      key("ArrowDown")
      key("Enter")
      expect(onChange).toHaveBeenCalledWith("c", expect.objectContaining({ key: "Enter" }))
      expect(combobox()).toHaveValue("Cherry")
      expect(combobox()).toHaveAttribute("aria-expanded", "false")
      expect(combobox()).not.toHaveAttribute("aria-activedescendant")
    })

    it("Space selects the active option and closes", () => {
      const { onChange } = openFruit()
      key("End")
      key(" ")
      expect(onChange.mock.calls[0][0]).toBe("d")
      expect(combobox()).toHaveAttribute("aria-expanded", "false")
    })

    it("Escape closes without changing the value", () => {
      const { onChange } = openFruit()
      key("End")
      key("Escape")
      expect(onChange).not.toHaveBeenCalled()
      expect(combobox()).toHaveValue("Apple")
      expect(combobox()).toHaveAttribute("aria-expanded", "false")
    })

    it("Tab selects the active option, closes, and does not prevent focus moving", () => {
      const { onChange } = openFruit()
      key("End")
      const notPrevented = fireEvent.keyDown(combobox(), { key: "Tab" })
      expect(notPrevented).toBe(true)
      expect(onChange.mock.calls[0][0]).toBe("d")
      expect(combobox()).toHaveAttribute("aria-expanded", "false")
    })

    it("Alt+ArrowUp selects the active option and closes", () => {
      const { onChange } = openFruit()
      key("ArrowDown")
      key("ArrowUp", { altKey: true })
      expect(onChange.mock.calls[0][0]).toBe("c")
      expect(combobox()).toHaveAttribute("aria-expanded", "false")
    })

    it("does not call onChange when the active option is already selected", () => {
      const { onChange } = openFruit({ defaultValue: "a" })
      key("Enter")
      expect(onChange).not.toHaveBeenCalled()
    })

    it("blur closes without changing the value", () => {
      const { onChange } = openFruit()
      key("End")
      fireEvent.blur(combobox())
      expect(combobox()).toHaveAttribute("aria-expanded", "false")
      expect(onChange).not.toHaveBeenCalled()
    })

    it("keeps focus on the trigger: pressing in the listbox is default-prevented", () => {
      openFruit()
      expect(fireEvent.mouseDown(options()[2])).toBe(false)
    })

    it("scrolls the active option into view", () => {
      const scrollIntoView = jest.fn()
      Element.prototype.scrollIntoView = scrollIntoView
      openFruit()
      key("ArrowDown")
      expect(scrollIntoView).toHaveBeenLastCalledWith({ block: "nearest" })
      expect(scrollIntoView.mock.contexts[scrollIntoView.mock.contexts.length - 1]).toBe(options()[2])
      delete (Element.prototype as Partial<Element>).scrollIntoView
    })
  })

  describe("typeahead", () => {
    beforeEach(() => jest.useFakeTimers())
    afterEach(() => jest.useRealTimers())

    const names: SelectOptionsType = [
      { value: "1", label: "Alpha" },
      { value: "2", label: "Bravo" },
      { value: "3", label: "Beta", disabled: true },
      { value: "4", label: "Bingo" },
      { value: "5", label: "Charlie" },
    ]

    it("closed: a printable key opens on the first match", () => {
      render(
        <Select
          aria-label="names"
          options={names}
        />
      )
      key("c")
      expect(combobox()).toHaveAttribute("aria-expanded", "true")
      expect(activeOption()).toHaveTextContent("Charlie")
    })

    it("open: matches a multi-character prefix within the buffer window", () => {
      render(
        <Select
          aria-label="names"
          options={names}
        />
      )
      key("ArrowDown")
      key("b")
      key("i")
      expect(activeOption()).toHaveTextContent("Bingo")
    })

    it("repeating one character cycles its matches, skipping disabled", () => {
      render(
        <Select
          aria-label="names"
          options={names}
        />
      )
      key("ArrowDown")
      key("b")
      expect(activeOption()).toHaveTextContent("Bravo")
      key("b")
      expect(activeOption()).toHaveTextContent("Bingo")
      key("b")
      expect(activeOption()).toHaveTextContent("Bravo")
    })

    it("resets the buffer after 500ms", () => {
      render(
        <Select
          aria-label="names"
          options={names}
        />
      )
      key("ArrowDown")
      key("b")
      act(() => jest.advanceTimersByTime(600))
      key("c")
      expect(activeOption()).toHaveTextContent("Charlie")
      act(() => jest.advanceTimersByTime(600))
      key("a")
      expect(activeOption()).toHaveTextContent("Alpha")
    })

    it("a space inside a typeahead run searches instead of selecting", () => {
      render(
        <Select
          aria-label="cities"
          options={[
            { value: "ny", label: "New York" },
            { value: "nw", label: "Newark" },
          ]}
        />
      )
      key("ArrowDown")
      key("n")
      key("e")
      key("w")
      key(" ")
      expect(combobox()).toHaveAttribute("aria-expanded", "true")
      key("y")
      expect(activeOption()).toHaveTextContent("New York")
    })
  })

  describe("value", () => {
    it("uncontrolled: defaultValue, then updates on selection", () => {
      const { container } = render(
        <Select
          aria-label="fruit"
          name="fruit"
          options={fruit}
          defaultValue="c"
        />
      )
      expect(hidden(container)).toHaveValue("c")
      key("ArrowDown")
      key("ArrowDown")
      key("Enter")
      expect(hidden(container)).toHaveValue("d")
      expect(combobox()).toHaveValue("Date")
    })

    it("controlled: follows value only", () => {
      const onChange = jest.fn()
      const { rerender } = render(
        <Select
          aria-label="fruit"
          options={fruit}
          value="a"
          onChange={onChange}
        />
      )
      key("End")
      key("Enter")
      expect(onChange.mock.calls[0][0]).toBe("d")
      expect(combobox()).toHaveValue("Apple")
      rerender(
        <Select
          aria-label="fruit"
          options={fruit}
          value="d"
          onChange={onChange}
        />
      )
      expect(combobox()).toHaveValue("Date")
    })

    it("submits through a hidden input; the combobox has no name", () => {
      const { container } = render(
        <form>
          <Select
            aria-label="fruit"
            name="fruit"
            options={fruit}
            defaultValue="c"
          />
        </form>
      )
      expect(combobox()).not.toHaveAttribute("name")
      expect(hidden(container)).toHaveAttribute("name", "fruit")
      const data = new FormData(container.querySelector("form")!)
      expect(data.get("fruit")).toBe("c")
    })

    it("forwards ref to the combobox input", () => {
      const ref = React.createRef<HTMLInputElement>()
      render(
        <Select
          aria-label="fruit"
          options={fruit}
          ref={ref}
        />
      )
      expect(ref.current).toBe(combobox())
    })
  })

  describe("listbox", () => {
    it("renders option start / end slots", () => {
      render(
        <Select
          aria-label="fruit"
          options={[
            { value: "a", label: "Apple", start: <span data-testid="start" />, end: <span data-testid="end">⌘A</span> },
          ]}
        />
      )
      key("ArrowDown")
      const [apple] = options()
      expect(apple).toContainElement(screen.getByTestId("start"))
      expect(apple).toContainElement(screen.getByTestId("end"))
    })

    it("renders a divider between options (from List)", () => {
      render(
        <Select
          aria-label="fruit"
          options={fruit}
        />
      )
      key("ArrowDown")
      expect(listbox().querySelectorAll("hr")).toHaveLength(fruit.length - 1)
      expect(options()).toHaveLength(fruit.length)
    })

    it("marks disabled options aria-disabled", () => {
      render(
        <Select
          aria-label="fruit"
          options={fruit}
        />
      )
      key("ArrowDown")
      expect(options()[1]).toHaveAttribute("aria-disabled", "true")
    })

    it("names the listbox with aria-label outside a Field", () => {
      render(
        <Select
          aria-label="fruit"
          options={fruit}
        />
      )
      key("ArrowDown")
      expect(screen.getByRole("listbox", { name: "fruit" })).toBeInTheDocument()
    })

    it("maps <option> / <optgroup> children to options", () => {
      render(
        <Select aria-label="fruit">
          <option value="k">Kiwi</option>
          <optgroup
            label="Stone"
            disabled
          >
            <option value="p">Peach</option>
          </optgroup>
          <option>Lime</option>
        </Select>
      )
      expect(combobox()).toHaveValue("Kiwi")
      key("ArrowDown")
      expect(options().map(o => o.textContent)).toEqual(["Kiwi", "Peach", "Lime"])
      expect(options()[1]).toHaveAttribute("aria-disabled", "true")
      key("End")
      key("Enter")
      expect(combobox()).toHaveValue("Lime")
    })
  })

  describe("status disabled", () => {
    it("cannot be opened and dims the chevron", () => {
      render(
        <Select
          aria-label="fruit"
          options={fruit}
          status="disabled"
        />
      )
      expect(combobox()).toBeDisabled()
      fireEvent.click(combobox())
      fireEvent.click(chevron())
      key("ArrowDown")
      expect(combobox()).toHaveAttribute("aria-expanded", "false")
      expect(screen.queryByRole("listbox")).toBeNull()
      expect(screen.getByTestId("icon")).toHaveAttribute("data-color", "disabled")
    })
  })

  describe("inside a Field", () => {
    it("the label targets the combobox and names the listbox", () => {
      render(
        <Field
          label="Fruit"
          description="Pick one."
        >
          <Select options={fruit} />
        </Field>
      )
      const trigger = screen.getByRole("combobox", { name: "Fruit" })
      const label = screen.getByText("Fruit").closest("label")!
      expect(label).toHaveAttribute("for", trigger.id)
      expect(trigger.getAttribute("aria-describedby")).toContain("description")
      key("ArrowDown")
      expect(listbox()).toHaveAttribute("aria-labelledby", label.id)
      expect(screen.getByRole("listbox", { name: "Fruit" })).toBeInTheDocument()
    })

    it("carries required and aria-invalid onto the combobox", () => {
      render(
        <Field
          label="Fruit"
          error="Required"
          invalid
          required
        >
          <Select options={fruit} />
        </Field>
      )
      expect(combobox()).toBeRequired()
      expect(combobox()).toHaveAttribute("aria-invalid", "true")
    })
  })
})
