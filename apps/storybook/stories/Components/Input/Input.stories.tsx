import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"
import { expect, fn, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { BackgroundColorType, BorderColorType, BorderWidthType, SizeType } from "@niceprototypes/styles"
import Icon, { iconNames } from "@niceprototypes/icon"
import Input from "@niceprototypes/input"
import type {
  InputAriaAutocompleteType,
  InputAsType,
  InputBorderRadiusType,
  InputDirType,
  InputElementType,
  InputEnterKeyHintType,
  InputInputModeType,
  InputProps,
  InputRoleType,
  InputStatusType,
  InputWidthType,
} from "@niceprototypes/input"

/**
 * Option lists. Union props are typed against the union on disk, so a renamed token fails
 * the build; colour variants are read from the token data at runtime.
 */
const AS_OPTIONS = ["input", "select", "textarea"] as const satisfies readonly InputAsType[]
const TYPE_OPTIONS = ["text", "email", "password", "number", "search", "tel", "url"] as const satisfies readonly InputElementType[]
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

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/** `children` presets for `as="select"`. */
const CHILDREN_PRESETS = {
  options: (
    <>
      <option value="">Choose a fruit</option>
      <option value="apple">Apple</option>
      <option value="pear">Pear</option>
    </>
  ),
}

/**
 * PlaygroundArgs
 *
 * One flat arg set for every `as` branch, recomposed into InputProps in `render`:
 * - `controlled`: `value` (kept in sync through useArgs) or `defaultValue`
 * - `start` / `end`: an icon name rendered as an Icon
 * - `ghost`: one boolean per interaction state
 * - `backgroundColor` / `borderColor`: variant plus an optional theme pin
 */
type PlaygroundArgs = Omit<
  InputProps,
  "as" | "type" | "rows" | "children" | "ref" | "start" | "end" | "ghost" | "backgroundColor" | "borderColor"
> & {
  as: InputAsType
  type: InputElementType
  rows?: number
  children: keyof typeof CHILDREN_PRESETS
  controlled: boolean
  start: string
  end: string
  ghostRest: boolean
  ghostHover: boolean
  ghostFocus: boolean
  backgroundColor: BackgroundColorType | typeof NONE
  backgroundColorTheme: string
  borderColor: BorderColorType | typeof NONE
  borderColorTheme: string
}

const meta = {
  title: "Components/Forms/Input",
  component: Input,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Input>

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

const ICON_OPTIONS = [NONE, ...iconNames]

/** A token variant, optionally pinned to a theme. */
const toColor = <Name extends string>(name: Name | typeof NONE | undefined, theme: string | undefined) =>
  name && name !== NONE ? (theme && theme !== NONE ? { name, theme } : name) : undefined

const toIcon = (name: string | undefined) => (name && name !== NONE ? <Icon name={name} /> : undefined)

export const Playground: Story = {
  args: {
    as: "input",
    type: "text",
    children: "options",
    controlled: true,
    value: "",
    defaultValue: "",
    placeholder: "Placeholder",
    "aria-label": "Field",
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onKeyDown: fn(),
    size: "base",
    status: "base",
    disabled: false,
    readOnly: false,
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
    end: NONE,
    backgroundColor: NONE,
    backgroundColorTheme: NONE,
    borderColor: NONE,
    borderColorTheme: NONE,
  },
  argTypes: {
    as: select(AS_OPTIONS, "Element"),
    type: { ...select(TYPE_OPTIONS, "Element"), if: { arg: "as", eq: "input" } },
    rows: { control: "number", table: { category: "Element" }, if: { arg: "as", eq: "textarea" } },
    children: { ...select(Object.keys(CHILDREN_PRESETS), "Element"), mapping: CHILDREN_PRESETS, if: { arg: "as", eq: "select" } },

    controlled: { control: "boolean", table: { category: "Value" } },
    value: { control: "text", table: { category: "Value" }, if: { arg: "controlled" } },
    defaultValue: { control: "text", table: { category: "Value" }, if: { arg: "controlled", truthy: false } },
    placeholder: { control: "text", table: { category: "Value" } },

    start: optionalSelect(ICON_OPTIONS.slice(1), "Content"),
    end: optionalSelect(ICON_OPTIONS.slice(1), "Content"),

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
    readOnly: { control: "boolean", table: { category: "State" } },
    required: { control: "boolean", table: { category: "State" } },
    autoFocus: { control: "boolean", table: { category: "State" } },

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
    role: optionalSelect(ROLE_OPTIONS, "Accessibility"),
    "aria-expanded": { control: "boolean", table: { category: "Accessibility" } },
    "aria-controls": { control: "text", table: { category: "Accessibility" } },
    "aria-activedescendant": { control: "text", table: { category: "Accessibility" } },
    "aria-haspopup": optionalSelect(ARIA_HAS_POPUP_OPTIONS, "Accessibility"),
    "aria-autocomplete": optionalSelect(ARIA_AUTOCOMPLETE_OPTIONS, "Accessibility"),

    onChange: { table: { category: "Events" } },
    onFocus: { table: { category: "Events" } },
    onBlur: { table: { category: "Events" } },
    onKeyDown: { table: { category: "Events" } },

    className: HIDDEN,
    style: HIDDEN,
    id: HIDDEN,
    "data-testid": HIDDEN,
  },
  // Recompose the flattened args; each `as` branch is checked against InputProps.
  render: function Render({
    as,
    type,
    rows,
    children,
    controlled,
    value,
    defaultValue,
    start,
    end,
    ghostRest,
    ghostHover,
    ghostFocus,
    backgroundColor,
    backgroundColorTheme,
    borderColor,
    borderColorTheme,
    onChange,
    ...rest
  }) {
    // Local state drives the render (portable stories under Vitest do not re-render on
    // updateArgs); useArgs keeps the Controls panel in sync.
    const [, updateArgs] = useArgs<PlaygroundArgs>()
    const [current, setCurrent] = React.useState(value ?? "")
    React.useEffect(() => setCurrent(value ?? ""), [value])
    const shared = {
      ...rest,
      ...(controlled ? { value: current } : { defaultValue }),
      onChange: ((next, event) => {
        onChange?.(next, event)
        if (!controlled) return
        setCurrent(next)
        updateArgs({ value: next })
      }) satisfies InputProps["onChange"],
      // `mapping` has already turned "none" into undefined; the casts restore the arg types.
      start: toIcon(start),
      end: toIcon(end),
      ghost: ghostHover || ghostFocus ? { rest: ghostRest, hover: ghostHover, focus: ghostFocus } : ghostRest,
      backgroundColor: toColor(backgroundColor, backgroundColorTheme),
      borderColor: toColor(borderColor, borderColorTheme),
    }
    const props: InputProps =
      as === "select"
        ? { ...shared, as, children: children as unknown as InputProps["children"] }
        : as === "textarea"
          ? { ...shared, as, rows }
          : { ...shared, as, type }
    // Remount when the uncontrolled initial value or the element changes.
    return <Input key={`${as}-${controlled}-${defaultValue}`} {...props} />
  },
  play: async ({ canvasElement, args, userEvent }) => {
    const textbox = within(canvasElement).getByRole("textbox", { name: "Field" })
    await userEvent.type(textbox, "Ada")
    await expect(args.onFocus).toHaveBeenCalled()
    await expect(args.onKeyDown).toHaveBeenCalledTimes(3)
    await expect(args.onChange).toHaveBeenLastCalledWith("Ada", expect.anything())
    await expect(textbox).toHaveValue("Ada")
    await userEvent.tab()
    await expect(args.onBlur).toHaveBeenCalled()
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

/** The field chrome: the native control's parent. */
const field = (canvasElement: HTMLElement) => within(canvasElement).getByLabelText("Field").parentElement!

export const Uncontrolled: Story = {
  ...Playground,
  args: { ...Playground.args, controlled: false, defaultValue: "Initial" },
  play: async ({ canvasElement, args, userEvent }) => {
    const textbox = within(canvasElement).getByRole("textbox", { name: "Field" })
    await expect(textbox).toHaveValue("Initial")
    await userEvent.type(textbox, "!")
    await expect(args.onChange).toHaveBeenLastCalledWith("Initial!", expect.anything())
  },
}

export const Disabled: Story = {
  ...Playground,
  args: { ...Playground.args, disabled: true },
  play: async ({ canvasElement, args, userEvent }) => {
    const textbox = within(canvasElement).getByRole("textbox", { name: "Field" })
    await expect(textbox).toBeDisabled()
    await userEvent.type(textbox, "Ada")
    await expect(args.onChange).not.toHaveBeenCalled()
  },
}

export const StatusDisabled: Story = {
  ...Playground,
  args: { ...Playground.args, status: "disabled" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("textbox", { name: "Field" })).toBeDisabled()
  },
}

export const StatusError: Story = {
  ...Playground,
  args: { ...Playground.args, status: "error" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(field(canvasElement)).borderTopColor).toBe(
      resolveCss(canvasElement, "color", getToken("borderColor:error")),
    )
  },
}

export const BorderColor: Story = {
  ...Playground,
  args: { ...Playground.args, borderColor: "link" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(field(canvasElement)).borderTopColor).toBe(
      resolveCss(canvasElement, "color", getToken("borderColor:link")),
    )
  },
}

export const BackgroundColor: Story = {
  ...Playground,
  args: { ...Playground.args, backgroundColor: "warning" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(field(canvasElement)).backgroundColor).toBe(
      resolveCss(canvasElement, "color", getToken("backgroundColor:warning")),
    )
  },
}

export const Filled: Story = {
  ...Playground,
  args: { ...Playground.args, filled: true },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(field(canvasElement)).backgroundColor).toBe(
      resolveCss(canvasElement, "color", getToken("backgroundColor:raised")),
    )
  },
}

export const Ghost: Story = {
  ...Playground,
  args: { ...Playground.args, ghostRest: true },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(field(canvasElement))
    await expect(style.backgroundColor).toBe("rgba(0, 0, 0, 0)")
    await expect(style.borderTopColor).toBe("rgba(0, 0, 0, 0)")
  },
}

export const Size: Story = {
  ...Playground,
  args: { ...Playground.args, size: "larger" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(field(canvasElement)).height).toBe(
      resolveCss(canvasElement, "height", getToken("input.size:larger")),
    )
  },
}

export const Width: Story = {
  ...Playground,
  args: { ...Playground.args, width: "10" },
  play: async ({ canvasElement }) => {
    const { width } = field(canvasElement).getBoundingClientRect()
    await expect(width).toBeLessThan(field(canvasElement).parentElement!.getBoundingClientRect().width)
  },
}

export const StartEnd: Story = {
  ...Playground,
  args: { ...Playground.args, start: "search", end: "close" },
  play: async ({ canvasElement }) => {
    const chrome = field(canvasElement)
    await expect(chrome.querySelectorAll("svg")).toHaveLength(2)
    await expect(chrome.firstElementChild?.querySelector("svg")).toBeTruthy()
  },
}

export const Textarea: Story = {
  ...Playground,
  args: { ...Playground.args, as: "textarea", rows: 4 },
  play: async ({ canvasElement }) => {
    const textbox = within(canvasElement).getByRole("textbox", { name: "Field" })
    await expect(textbox.tagName).toBe("TEXTAREA")
    await expect(textbox).toHaveAttribute("rows", "4")
  },
}

export const AsSelect: Story = {
  ...Playground,
  args: { ...Playground.args, as: "select" },
  play: async ({ canvasElement, args, userEvent }) => {
    const combobox = within(canvasElement).getByRole("combobox", { name: "Field" })
    await expect(combobox.tagName).toBe("SELECT")
    await expect(combobox).not.toHaveAttribute("placeholder")
    await userEvent.selectOptions(combobox, "pear")
    await expect(args.onChange).toHaveBeenLastCalledWith("pear", expect.anything())
    await expect(combobox).toHaveValue("pear")
  },
}

export const Attributes: Story = {
  ...Playground,
  args: {
    ...Playground.args,
    type: "email",
    name: "email",
    autoComplete: "email",
    maxLength: 40,
    minLength: 3,
    pattern: ".+@.+",
    inputMode: "email",
    enterKeyHint: "send",
    spellCheck: false,
    dir: "rtl",
    dirName: "email.dir",
    readOnly: true,
    required: true,
    "aria-describedby": "email-hint",
  },
  play: async ({ canvasElement }) => {
    const textbox = within(canvasElement).getByRole("textbox", { name: "Field" })
    await expect(textbox).toHaveAttribute("type", "email")
    await expect(textbox).toHaveAttribute("name", "email")
    await expect(textbox).toHaveAttribute("autocomplete", "email")
    await expect(textbox).toHaveAttribute("maxlength", "40")
    await expect(textbox).toHaveAttribute("minlength", "3")
    await expect(textbox).toHaveAttribute("pattern", ".+@.+")
    await expect(textbox).toHaveAttribute("inputmode", "email")
    await expect(textbox).toHaveAttribute("enterkeyhint", "send")
    await expect(textbox).toHaveAttribute("spellcheck", "false")
    await expect(textbox).toHaveAttribute("dir", "rtl")
    await expect(textbox).toHaveAttribute("dirname", "email.dir")
    await expect(textbox).toHaveAttribute("readonly")
    await expect(textbox).toBeRequired()
    await expect(textbox).toHaveAttribute("aria-describedby", "email-hint")
    await expect(textbox).toHaveAttribute("placeholder", "Placeholder")
  },
}

export const Combobox: Story = {
  ...Playground,
  args: {
    ...Playground.args,
    role: "combobox",
    "aria-expanded": false,
    "aria-controls": "listbox-id",
    "aria-haspopup": "listbox",
    "aria-autocomplete": "list",
    "aria-activedescendant": "option-id",
  },
  play: async ({ canvasElement }) => {
    const combobox = within(canvasElement).getByRole("combobox", { name: "Field" })
    await expect(combobox).toHaveAttribute("aria-expanded", "false")
    await expect(combobox).toHaveAttribute("aria-controls", "listbox-id")
    await expect(combobox).toHaveAttribute("aria-haspopup", "listbox")
    await expect(combobox).toHaveAttribute("aria-autocomplete", "list")
    await expect(combobox).toHaveAttribute("aria-activedescendant", "option-id")
  },
}

export const AutoFocus: Story = {
  ...Playground,
  args: { ...Playground.args, autoFocus: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("textbox", { name: "Field" })).toHaveFocus()
  },
}

export const Theme: Story = {
  ...Playground,
  args: { ...Playground.args, theme: "night" },
  play: async ({ canvasElement }) => {
    await expect(field(canvasElement).closest("[data-theme]")).toHaveAttribute("data-theme", "night")
  },
}
