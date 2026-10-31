import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"
import { expect, fn, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { BackgroundColorType, BorderColorType, BorderWidthType, SizeType } from "@niceprototypes/styles"
import Icon, { iconNames } from "@niceprototypes/icon"
import type {
  InputAriaAutocompleteType,
  InputBorderRadiusType,
  InputDirType,
  InputEnterKeyHintType,
  InputInputModeType,
  InputRoleType,
  InputStatusType,
  InputWidthType,
} from "@niceprototypes/input"
import Select from "@niceprototypes/select"
import type { SelectCustomProps, SelectNativeProps, SelectOptionsType } from "@niceprototypes/select"

/**
 * Option lists. Union props are typed against the union on disk, so a renamed token fails
 * the build; colour variants are read from the token data at runtime.
 */
const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly SizeType[]
const STATUS_OPTIONS = ["base", "disabled", "error", "success", "warning"] as const satisfies readonly InputStatusType[]
const BORDER_RADIUS_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly InputBorderRadiusType[]
const BORDER_WIDTH_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly BorderWidthType[]
const WIDTH_OPTIONS = ["2", "3", "4", "5", "10", "20", "full"] as const satisfies readonly InputWidthType[]
const INPUT_MODE_OPTIONS = ["none", "text", "tel", "url", "email", "numeric", "decimal", "search"] as const satisfies readonly InputInputModeType[]
const ENTER_KEY_HINT_OPTIONS = ["enter", "done", "go", "next", "previous", "search", "send"] as const satisfies readonly InputEnterKeyHintType[]
const DIR_OPTIONS = ["ltr", "rtl", "auto"] as const satisfies readonly InputDirType[]
const ROLE_OPTIONS = ["combobox", "searchbox", "spinbutton", "textbox"] as const satisfies readonly InputRoleType[]
const ARIA_AUTOCOMPLETE_OPTIONS = ["none", "inline", "list", "both"] as const satisfies readonly NonNullable<InputAriaAutocompleteType>[]
const ARIA_HAS_POPUP_OPTIONS = ["true", "false", "menu", "listbox", "tree", "grid", "dialog"]
const THEME_OPTIONS = Object.keys(themeTokensData)
const BACKGROUND_COLOR_OPTIONS = Object.keys(themeTokensData.day.backgroundColor) as BackgroundColorType[]
const BORDER_COLOR_OPTIONS = Object.keys(themeTokensData.day.borderColor) as BorderColorType[]
const ICON_OPTIONS = iconNames as readonly string[]

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/** `options` presets; `icons` fills each option's `start` and `end`. */
const OPTIONS_PRESETS: Record<string, SelectOptionsType> = {
  fruits: [
    { value: "apple", label: "Apple" },
    { value: "pear", label: "Pear" },
    { value: "plum", label: "Plum", disabled: true },
  ],
  icons: [
    { value: "apple", label: "Apple", start: <Icon name="star" />, end: <Icon name="check" /> },
    { value: "pear", label: "Pear", start: <Icon name="star" />, end: <Icon name="check" /> },
  ],
  grouped: [
    {
      label: "Pome",
      options: [
        { value: "apple", label: "Apple" },
        { value: "pear", label: "Pear" },
      ],
    },
    {
      label: "Stone",
      options: [
        { value: "peach", label: "Peach" },
        { value: "cherry", label: "Cherry" },
      ],
    },
  ],
}

/** `children` presets: an array of `<option>` elements (not a Fragment), which win over `options`. */
const CHILDREN_PRESETS = {
  [NONE]: undefined,
  vegetables: [
    <option key="leek" value="leek">Leek</option>,
    <option key="kale" value="kale">Kale</option>,
  ],
}

/**
 * PlaygroundArgs
 *
 * One flat arg set for both `native` branches, recomposed in `render`:
 * - `controlled`: `value` (kept in sync through useArgs) or `defaultValue`
 * - `options` / `children`: preset names
 * - `start`: an icon name rendered as an Icon
 * - `ghost`: one boolean per interaction state
 * - `backgroundColor` / `borderColor`: variant plus an optional theme pin
 * - native-only ARIA / `readOnly` args are shown only while `native` is on
 */
type PlaygroundArgs = Omit<
  SelectNativeProps,
  "native" | "options" | "children" | "ref" | "start" | "ghost" | "backgroundColor" | "borderColor"
> & {
  native: boolean
  options: string
  children: keyof typeof CHILDREN_PRESETS
  controlled: boolean
  start: string
  ghostRest: boolean
  ghostHover: boolean
  ghostFocus: boolean
  backgroundColor: BackgroundColorType | typeof NONE
  backgroundColorTheme: string
  borderColor: BorderColorType | typeof NONE
  borderColorTheme: string
}

const meta = {
  title: "Components/Forms/Select",
  component: Select,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Select>

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

const nativeOnly = { if: { arg: "native" } }

const HIDDEN = { table: { disable: true } }

/** A token variant, optionally pinned to a theme. */
const toColor = <Name extends string>(name: Name | typeof NONE | undefined, theme: string | undefined) =>
  name && name !== NONE ? (theme && theme !== NONE ? { name, theme } : name) : undefined

export const Playground: Story = {
  args: {
    native: false,
    options: "fruits",
    children: NONE,
    controlled: true,
    value: "",
    defaultValue: "",
    placeholder: "Choose a fruit",
    "aria-label": "Fruit",
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onKeyDown: fn(),
    size: "base",
    status: "base",
    disabled: false,
    required: false,
    autoFocus: false,
    filled: false,
    ghostRest: false,
    ghostHover: false,
    ghostFocus: false,
    borderRadius: "base",
    borderWidth: "base",
    width: "full",
    start: NONE,
    backgroundColor: NONE,
    backgroundColorTheme: NONE,
    borderColor: NONE,
    borderColorTheme: NONE,
  },
  argTypes: {
    native: { control: "boolean", table: { category: "Element" } },
    options: { ...select(Object.keys(OPTIONS_PRESETS), "Content"), mapping: OPTIONS_PRESETS },
    children: { ...select(Object.keys(CHILDREN_PRESETS), "Content"), mapping: CHILDREN_PRESETS },
    placeholder: { control: "text", table: { category: "Content" } },
    start: optionalSelect(ICON_OPTIONS, "Content"),

    controlled: { control: "boolean", table: { category: "Value" } },
    value: { control: "text", table: { category: "Value" }, if: { arg: "controlled" } },
    defaultValue: { control: "text", table: { category: "Value" }, if: { arg: "controlled", truthy: false } },

    size: select(SIZE_OPTIONS, "Appearance"),
    status: select(STATUS_OPTIONS, "Appearance"),
    filled: { control: "boolean", table: { category: "Appearance" } },
    width: select(WIDTH_OPTIONS, "Appearance"),
    theme: optionalSelect(THEME_OPTIONS, "Appearance"),

    ghostRest: { control: "boolean", table: { category: "Ghost" } },
    ghostHover: { control: "boolean", table: { category: "Ghost" } },
    ghostFocus: { control: "boolean", table: { category: "Ghost" } },

    backgroundColor: optionalSelect(BACKGROUND_COLOR_OPTIONS, "Color"),
    backgroundColorTheme: optionalSelect(THEME_OPTIONS, "Color"),
    borderColor: optionalSelect(BORDER_COLOR_OPTIONS, "Color"),
    borderColorTheme: optionalSelect(THEME_OPTIONS, "Color"),

    borderRadius: select(BORDER_RADIUS_OPTIONS, "Border"),
    borderWidth: select(BORDER_WIDTH_OPTIONS, "Border"),

    disabled: { control: "boolean", table: { category: "State" } },
    required: { control: "boolean", table: { category: "State" } },
    autoFocus: { control: "boolean", table: { category: "State" } },
    readOnly: { control: "boolean", table: { category: "State" }, ...nativeOnly },

    name: { control: "text", table: { category: "Attributes" } },
    autoComplete: { control: "text", table: { category: "Attributes" } },
    maxLength: { control: "number", table: { category: "Attributes" } },
    minLength: { control: "number", table: { category: "Attributes" } },
    pattern: { control: "text", table: { category: "Attributes" } },
    inputMode: optionalSelect(INPUT_MODE_OPTIONS, "Attributes"),
    enterKeyHint: optionalSelect(ENTER_KEY_HINT_OPTIONS, "Attributes"),
    spellCheck: { control: "boolean", table: { category: "Attributes" } },
    dir: optionalSelect(DIR_OPTIONS, "Attributes"),
    dirName: { control: "text", table: { category: "Attributes" } },

    "aria-label": { control: "text", table: { category: "Accessibility" } },
    "aria-describedby": { control: "text", table: { category: "Accessibility" } },
    role: { ...optionalSelect(ROLE_OPTIONS, "Accessibility"), ...nativeOnly },
    "aria-expanded": { control: "boolean", table: { category: "Accessibility" }, ...nativeOnly },
    "aria-controls": { control: "text", table: { category: "Accessibility" }, ...nativeOnly },
    "aria-activedescendant": { control: "text", table: { category: "Accessibility" }, ...nativeOnly },
    "aria-haspopup": { ...optionalSelect(ARIA_HAS_POPUP_OPTIONS, "Accessibility"), ...nativeOnly },
    "aria-autocomplete": { ...optionalSelect(ARIA_AUTOCOMPLETE_OPTIONS, "Accessibility"), ...nativeOnly },

    onChange: { table: { category: "Events" } },
    onFocus: { table: { category: "Events" } },
    onBlur: { table: { category: "Events" } },
    onKeyDown: { table: { category: "Events" } },

    className: HIDDEN,
    style: HIDDEN,
    id: HIDDEN,
    "data-testid": HIDDEN,
  },
  // Recompose the flattened args; each `native` branch is checked against its props.
  render: function Render({
    native,
    options,
    children,
    controlled,
    value,
    defaultValue,
    start,
    ghostRest,
    ghostHover,
    ghostFocus,
    backgroundColor,
    backgroundColorTheme,
    borderColor,
    borderColorTheme,
    onChange,
    readOnly,
    role,
    "aria-expanded": ariaExpanded,
    "aria-controls": ariaControls,
    "aria-activedescendant": ariaActiveDescendant,
    "aria-haspopup": ariaHasPopup,
    "aria-autocomplete": ariaAutocomplete,
    ...rest
  }) {
    // Local state drives the render (portable stories under Vitest do not re-render on
    // updateArgs); useArgs keeps the Controls panel in sync.
    const [, updateArgs] = useArgs<PlaygroundArgs>()
    const [current, setCurrent] = React.useState(value ?? "")
    React.useEffect(() => setCurrent(value ?? ""), [value])
    const shared = {
      ...rest,
      // `mapping` has already turned the preset names into their values; the casts restore the types.
      options: options as unknown as SelectOptionsType,
      children: children as unknown as SelectCustomProps["children"],
      ...(controlled ? { value: current } : { defaultValue }),
      onChange: ((next, event) => {
        onChange?.(next, event)
        if (!controlled) return
        setCurrent(next)
        updateArgs({ value: next })
      }) satisfies SelectCustomProps["onChange"],
      start: start && start !== NONE ? <Icon name={start} /> : undefined,
      ghost: ghostHover || ghostFocus ? { rest: ghostRest, hover: ghostHover, focus: ghostFocus } : ghostRest,
      backgroundColor: toColor(backgroundColor, backgroundColorTheme),
      borderColor: toColor(borderColor, borderColorTheme),
    }
    // Remount when the uncontrolled initial value or the branch changes.
    const key = `${native}-${controlled}-${defaultValue}`
    if (native) {
      const props: SelectNativeProps = {
        ...shared,
        native,
        readOnly,
        role,
        "aria-expanded": ariaExpanded,
        "aria-controls": ariaControls,
        "aria-activedescendant": ariaActiveDescendant,
        "aria-haspopup": ariaHasPopup,
        "aria-autocomplete": ariaAutocomplete,
      }
      return <Select key={key} {...props} />
    }
    const props: SelectCustomProps = { ...shared, native }
    return <Select key={key} {...props} />
  },
  play: async ({ canvasElement, args, userEvent }) => {
    const combobox = within(canvasElement).getByRole("combobox", { name: "Fruit" })
    await expect(combobox).toHaveAttribute("placeholder", "Choose a fruit")
    await userEvent.click(combobox)
    await expect(combobox).toHaveAttribute("aria-expanded", "true")
    // The listbox is portalled to <body>.
    const listbox = within(document.body).getByRole("listbox")
    await expect(within(listbox).getAllByRole("option")).toHaveLength(3)
    await userEvent.click(within(listbox).getByRole("option", { name: "Pear" }))
    await expect(args.onChange).toHaveBeenLastCalledWith("pear", expect.anything())
    await expect(combobox).toHaveValue("Pear")
    await expect(combobox).toHaveAttribute("aria-expanded", "false")
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

export const Keyboard: Story = {
  ...Playground,
  play: async ({ canvasElement, args, userEvent }) => {
    const combobox = within(canvasElement).getByRole("combobox", { name: "Fruit" })
    combobox.focus()
    await userEvent.keyboard("{ArrowDown}")
    await expect(combobox).toHaveAttribute("aria-expanded", "true")
    await userEvent.keyboard("{ArrowDown}{Enter}")
    await expect(args.onChange).toHaveBeenLastCalledWith("pear", expect.anything())
    await expect(args.onKeyDown).toHaveBeenCalled()
    await userEvent.keyboard("{ArrowDown}")
    await userEvent.keyboard("{Escape}")
    await expect(combobox).toHaveAttribute("aria-expanded", "false")
    await expect(combobox).toHaveValue("Pear")
  },
}

/** Option groups: each a `role="group"` named by its title; keyboard travel and typeahead skip the titles. */
export const Grouped: Story = {
  ...Playground,
  args: { ...Playground.args, options: "grouped" },
  play: async ({ canvasElement, args, userEvent }) => {
    const combobox = within(canvasElement).getByRole("combobox", { name: "Fruit" })
    const active = () => document.getElementById(combobox.getAttribute("aria-activedescendant") ?? "")
    combobox.focus()
    await userEvent.keyboard("{ArrowDown}")
    const listbox = within(document.body).getByRole("listbox")
    await expect(within(within(listbox).getByRole("group", { name: "Pome" })).getAllByRole("option")).toHaveLength(2)
    await expect(within(within(listbox).getByRole("group", { name: "Stone" })).getAllByRole("option")).toHaveLength(2)
    await expect(active()).toHaveTextContent("Apple")
    await userEvent.keyboard("{ArrowDown}{ArrowDown}")
    await expect(active()).toHaveTextContent("Peach")
    await userEvent.keyboard("c")
    await expect(active()).toHaveTextContent("Cherry")
    await userEvent.keyboard("{Enter}")
    await expect(args.onChange).toHaveBeenLastCalledWith("cherry", expect.anything())
    await expect(combobox).toHaveValue("Cherry")
  },
}

export const DisabledOption: Story = {
  ...Playground,
  play: async ({ canvasElement, args, userEvent }) => {
    await userEvent.click(within(canvasElement).getByRole("combobox", { name: "Fruit" }))
    const plum = within(document.body).getByRole("option", { name: "Plum" })
    await expect(plum).toHaveAttribute("aria-disabled", "true")
    await userEvent.click(plum)
    await expect(args.onChange).not.toHaveBeenCalled()
  },
}

export const Native: Story = {
  ...Playground,
  args: { ...Playground.args, native: true },
  play: async ({ canvasElement, args, userEvent }) => {
    const combobox = within(canvasElement).getByRole("combobox", { name: "Fruit" })
    await expect(combobox.tagName).toBe("SELECT")
    await expect(within(combobox).getByRole("option", { name: "Plum" })).toBeDisabled()
    await userEvent.selectOptions(combobox, "apple")
    await expect(args.onChange).toHaveBeenLastCalledWith("apple", expect.anything())
    await expect(combobox).toHaveValue("apple")
  },
}

export const Children: Story = {
  ...Playground,
  args: { ...Playground.args, children: "vegetables", placeholder: undefined, value: "kale" },
  play: async ({ canvasElement, userEvent }) => {
    const combobox = within(canvasElement).getByRole("combobox", { name: "Fruit" })
    await expect(combobox).toHaveValue("Kale")
    await userEvent.click(combobox)
    const options = within(document.body).getAllByRole("option")
    await expect(options.map(option => option.textContent)).toEqual(["Leek", "Kale"])
  },
}

export const OptionIcons: Story = {
  ...Playground,
  args: { ...Playground.args, options: "icons" },
  play: async ({ canvasElement, userEvent }) => {
    await userEvent.click(within(canvasElement).getByRole("combobox", { name: "Fruit" }))
    const apple = within(document.body).getByRole("option", { name: /Apple/ })
    await expect(apple.querySelectorAll("svg")).toHaveLength(2)
  },
}

export const Uncontrolled: Story = {
  ...Playground,
  args: { ...Playground.args, controlled: false, defaultValue: "pear" },
  play: async ({ canvasElement, args, userEvent }) => {
    const combobox = within(canvasElement).getByRole("combobox", { name: "Fruit" })
    await expect(combobox).toHaveValue("Pear")
    await userEvent.click(combobox)
    await userEvent.click(within(document.body).getByRole("option", { name: "Apple" }))
    await expect(args.onChange).toHaveBeenLastCalledWith("apple", expect.anything())
    await expect(combobox).toHaveValue("Apple")
  },
}

export const Disabled: Story = {
  ...Playground,
  args: { ...Playground.args, disabled: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("combobox", { name: "Fruit" })).toBeDisabled()
  },
}

export const StatusDisabled: Story = {
  ...Playground,
  args: { ...Playground.args, status: "disabled" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("combobox", { name: "Fruit" })).toBeDisabled()
  },
}

export const Size: Story = {
  ...Playground,
  args: { ...Playground.args, size: "larger" },
  play: async ({ canvasElement }) => {
    const chrome = within(canvasElement).getByRole("combobox", { name: "Fruit" }).parentElement!
    await expect(getComputedStyle(chrome).height).toBe(resolveCss(canvasElement, "height", getToken("input.size:larger")))
  },
}

export const FormValue: Story = {
  ...Playground,
  args: { ...Playground.args, name: "fruit", value: "pear" },
  play: async ({ canvasElement }) => {
    // A hidden input carries the custom select's value for FormData.
    await expect(canvasElement.querySelector('input[type="hidden"][name="fruit"]')).toHaveValue("pear")
  },
}
