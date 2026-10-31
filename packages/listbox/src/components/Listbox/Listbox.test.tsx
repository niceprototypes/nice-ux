import * as React from "react"
import { act, fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Listbox from "."
import type { ListboxOptionsType, ListboxProps } from "./Listbox.types"
import { getListboxOptionId } from "../../services/getListboxOptionId"

const fruit: ListboxOptionsType = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana", disabled: true },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
]

const Controlled = (props: Partial<ListboxProps>) => {
  const [value, setValue] = React.useState<string | undefined>(props.value)
  return (
    <Listbox
      aria-label="Fruit"
      options={fruit}
      {...props}
      value={value}
      onChange={(next, event) => {
        setValue(next)
        props.onChange?.(next, event)
      }}
    />
  )
}

const listbox = () => screen.getByRole("listbox", { name: "Fruit" })
const key = (name: string) => fireEvent.keyDown(listbox(), { key: name })
const active = () => {
  const id = listbox().getAttribute("aria-activedescendant")
  return id ? document.getElementById(id) : null
}

describe("Listbox", () => {
  it("renders role=listbox with role=option rows and aria-selected", () => {
    render(<Controlled value="cherry" />)
    const options = screen.getAllByRole("option")
    expect(options).toHaveLength(4)
    expect(options[2]).toHaveAttribute("aria-selected", "true")
    expect(options[0]).toHaveAttribute("aria-selected", "false")
    expect(options[1]).toHaveAttribute("aria-disabled", "true")
  })

  it("derives option ids from the listbox id", () => {
    render(<Controlled id="fruit" />)
    expect(screen.getAllByRole("option")[3]).toHaveAttribute("id", getListboxOptionId("fruit", 3))
  })

  it("activates the selected option on focus and moves with arrows past disabled options", () => {
    render(<Controlled value="apple" />)
    act(() => listbox().focus())
    expect(active()).toHaveTextContent("Apple")
    key("ArrowDown")
    expect(active()).toHaveTextContent("Cherry")
    key("ArrowUp")
    expect(active()).toHaveTextContent("Apple")
    key("End")
    expect(active()).toHaveTextContent("Date")
    key("Home")
    expect(active()).toHaveTextContent("Apple")
  })

  it("selects the active option with Enter and Space", () => {
    const onChange = jest.fn()
    render(<Controlled onChange={onChange} />)
    act(() => listbox().focus())
    key("ArrowDown")
    key("Enter")
    expect(onChange).toHaveBeenLastCalledWith("cherry", expect.anything())
    expect(screen.getAllByRole("option")[2]).toHaveAttribute("aria-selected", "true")
    key("ArrowDown")
    key(" ")
    expect(onChange).toHaveBeenLastCalledWith("date", expect.anything())
  })

  it("selects an option on click and ignores disabled options", () => {
    const onChange = jest.fn()
    render(<Controlled onChange={onChange} />)
    fireEvent.click(screen.getByText("Banana"))
    expect(onChange).not.toHaveBeenCalled()
    fireEvent.click(screen.getByText("Date"))
    expect(onChange).toHaveBeenCalledWith("date", expect.anything())
  })

  it("jumps to a matching option with typeahead", () => {
    jest.useFakeTimers()
    render(<Controlled />)
    act(() => listbox().focus())
    key("d")
    expect(active()).toHaveTextContent("Date")
    act(() => {
      jest.advanceTimersByTime(600)
    })
    key("c")
    expect(active()).toHaveTextContent("Cherry")
    jest.useRealTimers()
  })

  it("clears the active option on blur", () => {
    render(<Controlled />)
    act(() => listbox().focus())
    expect(active()).not.toBeNull()
    act(() => listbox().blur())
    expect(listbox()).not.toHaveAttribute("aria-activedescendant")
  })

  it("follows a controlled activeValue and reports pointer moves", () => {
    const onActiveChange = jest.fn()
    render(
      <Controlled
        focusable={false}
        activeValue="cherry"
        onActiveChange={onActiveChange}
      />
    )
    expect(listbox()).not.toHaveAttribute("tabindex")
    expect(listbox()).not.toHaveAttribute("aria-activedescendant")
    fireEvent.pointerMove(screen.getByText("Date"))
    expect(onActiveChange).toHaveBeenCalledWith("date")
  })
})
