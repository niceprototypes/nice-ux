import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"
import { expect, fn, waitFor, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { SizeType } from "@niceprototypes/styles"
import Listbox from "@niceprototypes/listbox"
import type { ListboxOptionsType, ListboxProps } from "@niceprototypes/listbox"

/** Option lists. Union props are typed against the union on disk, so a renamed token fails the build. */
const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly SizeType[]
const THEME_OPTIONS = Object.keys(themeTokensData)

/** The story's options: value → label. */
const LOOPS = { story: "Loop story", chapter: "Loop chapter", scene: "Loop scene", off: "No loop" } as const
const LOOP_VALUES = Object.keys(LOOPS) as (keyof typeof LOOPS)[]

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/**
 * PlaygroundArgs
 *
 * ListboxProps plus `disabledOption`, which disables one option. `options` is built from
 * LOOPS in `render`. `value` is controlled: `onChange` writes the choice back to the args.
 */
type PlaygroundArgs = Omit<ListboxProps, "options"> & {
  disabledOption?: string
}

const meta = {
  title: "Components/Forms/Listbox",
  component: Listbox,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Listbox>

export default meta

type Story = StoryObj<PlaygroundArgs>

const select = (options: readonly string[], category: string) => ({
  control: "select" as const,
  options,
  table: { category },
})

const optionalSelect = (options: readonly string[], category: string) => ({
  ...select([NONE, ...options], category),
  mapping: { [NONE]: undefined },
})

const HIDDEN = { table: { disable: true } }

export const Playground: Story = {
  args: {
    "aria-label": "Loop",
    value: "story",
    onChange: fn(),
    onActiveChange: fn(),
    focusable: true,
    size: "base",
  },
  argTypes: {
    value: optionalSelect(LOOP_VALUES, "State"),
    activeValue: optionalSelect(LOOP_VALUES, "State"),
    disabledOption: optionalSelect(LOOP_VALUES, "State"),
    focusable: { control: "boolean", table: { category: "State" } },

    size: select(SIZE_OPTIONS, "Appearance"),
    theme: optionalSelect(THEME_OPTIONS, "Appearance"),

    id: { control: "text", table: { category: "Element" } },
    "aria-label": { control: "text", table: { category: "Accessibility" } },
    "aria-labelledby": { control: "text", table: { category: "Accessibility" } },

    onChange: { table: { category: "Events" } },
    onActiveChange: { table: { category: "Events" } },

    ref: HIDDEN,
  },
  render: function Render({ value, onChange, disabledOption, ...rest }) {
    const [, updateArgs] = useArgs<PlaygroundArgs>()
    // Local mirror of `value`: the test runner renders without a manager, so updateArgs
    // alone does not re-render there.
    const [current, setCurrent] = useState(value)
    useEffect(() => setCurrent(value), [value])
    const options: ListboxOptionsType = LOOP_VALUES.map(loop => ({
      value: loop,
      label: LOOPS[loop],
      disabled: loop === disabledOption ? true : undefined,
    }))
    return (
      <Listbox
        {...rest}
        options={options}
        value={current}
        onChange={(next, event) => {
          onChange?.(next, event)
          setCurrent(next)
          updateArgs({ value: next })
        }}
      />
    )
  },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    const listbox = canvas.getByRole("listbox", { name: "Loop" })
    const active = () => document.getElementById(listbox.getAttribute("aria-activedescendant") ?? "")
    await expect(canvas.getAllByRole("option")).toHaveLength(LOOP_VALUES.length)
    await expect(canvas.getByRole("option", { name: "Loop story" })).toHaveAttribute("aria-selected", "true")

    // Keyboard: focus activates the selected option; arrows, End, Home move; Enter selects.
    await userEvent.tab()
    await expect(listbox).toHaveFocus()
    await expect(active()).toHaveTextContent("Loop story")
    await userEvent.keyboard("{ArrowDown}")
    await expect(active()).toHaveTextContent("Loop chapter")
    await userEvent.keyboard("{End}")
    await expect(active()).toHaveTextContent("No loop")
    await userEvent.keyboard("{Home}{ArrowDown}{Enter}")
    await expect(args.onChange).toHaveBeenLastCalledWith("chapter", expect.anything())
    await waitFor(() =>
      expect(canvas.getByRole("option", { name: "Loop chapter" })).toHaveAttribute("aria-selected", "true"),
    )

    // Typeahead jumps to the first option starting with the typed text.
    await userEvent.keyboard("n")
    await expect(active()).toHaveTextContent("No loop")

    // Pointer: a click selects.
    await userEvent.click(canvas.getByText("Loop scene"))
    await expect(args.onChange).toHaveBeenLastCalledWith("scene", expect.anything())
    await waitFor(() =>
      expect(canvas.getByRole("option", { name: "Loop scene" })).toHaveAttribute("aria-selected", "true"),
    )
  },
}

/** The computed value of a CSS property set to `value`, read from a throwaway element in the canvas. */
const resolveCss = (canvasElement: HTMLElement, property: string, value: string) => {
  const probe = document.createElement("div")
  probe.style.setProperty(property, value)
  canvasElement.appendChild(probe)
  const resolved = getComputedStyle(probe).getPropertyValue(property)
  probe.remove()
  return resolved
}

/** The Ink label inside an option. */
const label = (canvasElement: HTMLElement, name: string) =>
  within(canvasElement).getByText(name)

/** Labels are set in the Nice base font, not the browser default. */
export const Font: Story = {
  ...Playground,
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(label(canvasElement, "Loop story")).fontFamily).toBe(
      resolveCss(canvasElement, "font-family", getToken("fontFamily", "base")),
    )
  },
}

export const Selected: Story = {
  ...Playground,
  play: async ({ canvasElement }) => {
    const option = within(canvasElement).getByRole("option", { name: "Loop story" })
    await expect(getComputedStyle(option).backgroundColor).toBe(
      resolveCss(canvasElement, "background-color", getToken("backgroundColor", "link")),
    )
    await expect(getComputedStyle(option).color).toBe(resolveCss(canvasElement, "color", getToken("color", "link")))
  },
}

export const DisabledOption: Story = {
  ...Playground,
  args: { ...Playground.args, disabledOption: "chapter" },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    const option = canvas.getByRole("option", { name: "Loop chapter" })
    await expect(option).toHaveAttribute("aria-disabled", "true")
    await userEvent.click(canvas.getByText("Loop chapter"))
    await expect(args.onChange).not.toHaveBeenCalled()
    // The press focused the listbox on the selected option; arrow keys skip the disabled one.
    await userEvent.keyboard("{ArrowDown}")
    const listbox = canvas.getByRole("listbox")
    await expect(document.getElementById(listbox.getAttribute("aria-activedescendant") ?? "")).toHaveTextContent(
      "Loop scene",
    )
  },
}

/** Driven by another element: no tab stop, the active option comes from `activeValue`. */
export const NotFocusable: Story = {
  ...Playground,
  args: { ...Playground.args, focusable: false, activeValue: "scene" },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    const listbox = canvas.getByRole("listbox")
    await expect(listbox).not.toHaveAttribute("tabindex")
    await expect(listbox).not.toHaveAttribute("aria-activedescendant")
    await expect(getComputedStyle(canvas.getByRole("option", { name: "Loop scene" })).backgroundColor).toBe(
      resolveCss(canvasElement, "background-color", getToken("borderColor", "base")),
    )
    await userEvent.hover(canvas.getByText("No loop"))
    await expect(args.onActiveChange).toHaveBeenCalledWith("off")
  },
}

export const Size: Story = {
  ...Playground,
  args: { ...Playground.args, size: "larger" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(label(canvasElement, "Loop story")).fontSize).toBe(
      resolveCss(canvasElement, "font-size", getToken("fontSize", "larger")),
    )
  },
}
