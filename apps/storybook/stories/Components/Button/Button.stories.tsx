import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type {
  AnimationDurationType,
  BorderColorType,
  BorderWidthType,
  FontWeightType,
  SizeType,
} from "@niceprototypes/styles"
import type { FlexJustifyContentType } from "@niceprototypes/flex"
import { iconNames } from "@niceprototypes/icon"
import Button from "@niceprototypes/button"
import type {
  ButtonBorderRadiusType,
  ButtonColorStatesType,
  ButtonColorTokenType,
  ButtonGhostStatesType,
  ButtonProps,
  ButtonStatusType,
} from "@niceprototypes/button"

/**
 * Option lists. Union props are typed against the union on disk, so a renamed token fails
 * the build; colour addresses are read from the token data at runtime.
 */
const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly SizeType[]
const STATUS_OPTIONS = ["base", "disabled", "error", "success", "warning"] as const satisfies readonly ButtonStatusType[]
const WEIGHT_OPTIONS = ["light", "base", "medium", "semibold", "bold", "extrabold", "black"] as const satisfies readonly FontWeightType[]
const ANIMATION_DURATION_OPTIONS = ["none", "faster", "fast", "base", "slow", "slower"] as const satisfies readonly ("none" | AnimationDurationType)[]
const BORDER_WIDTH_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly BorderWidthType[]
const BORDER_RADIUS_OPTIONS = ["none", "small", "base", "large", "rounded"] as const satisfies readonly ButtonBorderRadiusType[]
const JUSTIFY_CONTENT_OPTIONS = ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"] as const satisfies readonly FlexJustifyContentType[]
const TYPE_OPTIONS = ["button", "submit", "reset"] as const satisfies readonly NonNullable<ButtonProps["type"]>[]
const AS_OPTIONS = ["a", "div"] as const satisfies readonly NonNullable<ButtonProps["as"]>[]
const TARGET_OPTIONS = ["_blank", "_self", "_parent", "_top"] as const satisfies readonly NonNullable<ButtonProps["target"]>[]
const THEME_OPTIONS = Object.keys(themeTokensData)
const ICON_OPTIONS = ["none", ...iconNames]
const BORDER_COLOR_OPTIONS = Object.keys(themeTokensData.day.borderColor) as BorderColorType[]

/** Every `color` / `borderColor` token address, plain and inverse. */
const COLOR_TOKEN_OPTIONS = (["color", "borderColor"] as const).flatMap(group =>
  Object.keys(themeTokensData.day[group]).flatMap(variant => [`${group}:${variant}`, `${group}:${variant}:inverse`]),
) as ButtonColorTokenType[]

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

type StateColor = ButtonColorTokenType | typeof NONE

/**
 * PlaygroundArgs
 *
 * ButtonProps with the object-valued props flattened into one scalar arg each and
 * recomposed in `render`:
 * - `color` / `iconColor`: one token for every state, plus a per-state override each
 * - `ghost`: one boolean per interaction state
 * - `borderColor`: variant plus an optional theme pin
 */
type PlaygroundArgs = Omit<ButtonProps, "color" | "iconColor" | "ghost" | "borderColor" | "iconLeft" | "iconRight"> & {
  iconLeft: string
  iconRight: string
  color: StateColor
  colorHover: StateColor
  colorFocus: StateColor
  colorActive: StateColor
  iconColor: StateColor
  iconColorHover: StateColor
  iconColorFocus: StateColor
  iconColorActive: StateColor
  ghostRest: boolean
  ghostHover: boolean
  ghostFocus: boolean
  ghostActive: boolean
  borderColor: BorderColorType | typeof NONE
  borderColorTheme: string
}

/** One colour token in every state, or a per-state object when any override is set. */
const toStateColor = (
  all: StateColor,
  hover: StateColor,
  focus: StateColor,
  active: StateColor,
): ButtonProps["color"] => {
  const pick = (value: StateColor) => (value === NONE ? undefined : value)
  if (hover === NONE && focus === NONE && active === NONE) return pick(all)
  const states: ButtonColorStatesType = { rest: pick(all), hover: pick(hover), focus: pick(focus), active: pick(active) }
  return states
}

const toGhost = (states: Required<ButtonGhostStatesType>): ButtonProps["ghost"] => {
  const { rest, hover, focus, active } = states
  if (!hover && !focus && !active) return rest
  return states
}

const meta = {
  title: "Components/Forms/Button",
  component: Button,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Button>

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
    children: "Button",
    onClick: fn(),
    onMouseEnter: fn(),
    onMouseLeave: fn(),
    filled: false,
    size: "base",
    status: "base",
    disabled: false,
    selected: false,
    inlined: false,
    antialiased: false,
    weight: "medium",
    justifyContent: "center",
    animationDuration: "base",
    borderWidth: "base",
    borderRadius: "base",
    iconLeft: NONE,
    iconRight: NONE,
    iconVendor: false,
    color: NONE,
    colorHover: NONE,
    colorFocus: NONE,
    colorActive: NONE,
    iconColor: NONE,
    iconColorHover: NONE,
    iconColorFocus: NONE,
    iconColorActive: NONE,
    ghostRest: false,
    ghostHover: false,
    ghostFocus: false,
    ghostActive: false,
    borderColor: NONE,
    borderColorTheme: NONE,
    type: "button",
  },
  argTypes: {
    children: { control: "text", table: { category: "Content" } },
    iconLeft: optionalSelect(ICON_OPTIONS.slice(1), "Content"),
    iconRight: optionalSelect(ICON_OPTIONS.slice(1), "Content"),
    iconVendor: { control: "boolean", table: { category: "Content" } },

    filled: { control: "boolean", table: { category: "Appearance" } },
    size: select(SIZE_OPTIONS, "Appearance"),
    status: select(STATUS_OPTIONS, "Appearance"),
    selected: { control: "boolean", table: { category: "Appearance" } },
    inlined: { control: "boolean", table: { category: "Appearance" } },
    weight: select(WEIGHT_OPTIONS, "Appearance"),
    antialiased: { control: "boolean", table: { category: "Appearance" } },
    animationDuration: select(ANIMATION_DURATION_OPTIONS, "Appearance"),
    theme: optionalSelect(THEME_OPTIONS, "Appearance"),
    backgroundImage: { control: "text", table: { category: "Appearance" } },

    // Explicit selects override preview.tsx's `color` matcher (a colour picker).
    color: optionalSelect(COLOR_TOKEN_OPTIONS, "Color"),
    colorHover: optionalSelect(COLOR_TOKEN_OPTIONS, "Color"),
    colorFocus: optionalSelect(COLOR_TOKEN_OPTIONS, "Color"),
    colorActive: optionalSelect(COLOR_TOKEN_OPTIONS, "Color"),
    iconColor: optionalSelect(COLOR_TOKEN_OPTIONS, "Icon color"),
    iconColorHover: optionalSelect(COLOR_TOKEN_OPTIONS, "Icon color"),
    iconColorFocus: optionalSelect(COLOR_TOKEN_OPTIONS, "Icon color"),
    iconColorActive: optionalSelect(COLOR_TOKEN_OPTIONS, "Icon color"),

    ghostRest: { control: "boolean", table: { category: "Ghost" } },
    ghostHover: { control: "boolean", table: { category: "Ghost" } },
    ghostFocus: { control: "boolean", table: { category: "Ghost" } },
    ghostActive: { control: "boolean", table: { category: "Ghost" } },

    borderWidth: select(BORDER_WIDTH_OPTIONS, "Border"),
    borderRadius: select(BORDER_RADIUS_OPTIONS, "Border"),
    borderColor: optionalSelect(BORDER_COLOR_OPTIONS, "Border"),
    borderColorTheme: optionalSelect(THEME_OPTIONS, "Border"),

    padding: { control: "text", table: { category: "Layout" } },
    grow: { control: "number", table: { category: "Layout" } },
    justifyContent: select(JUSTIFY_CONTENT_OPTIONS, "Layout"),

    disabled: { control: "boolean", table: { category: "Element" } },
    as: optionalSelect(AS_OPTIONS, "Element"),
    href: { control: "text", table: { category: "Element" } },
    target: optionalSelect(TARGET_OPTIONS, "Element"),
    type: select(TYPE_OPTIONS, "Element"),
    form: { control: "text", table: { category: "Element" } },
    role: { control: "text", table: { category: "Element" } },
    tabIndex: { control: "number", table: { category: "Element" } },
    "aria-label": { control: "text", table: { category: "Accessibility" } },
    "aria-expanded": { control: "boolean", table: { category: "Accessibility" } },
    "aria-pressed": { control: "boolean", table: { category: "Accessibility" } },
    "aria-selected": { control: "boolean", table: { category: "Accessibility" } },
    "aria-controls": { control: "text", table: { category: "Accessibility" } },
    "aria-haspopup": optionalSelect(["true", "menu", "listbox", "tree", "grid", "dialog"], "Accessibility"),
    "aria-current": optionalSelect(["true", "page", "step", "location", "date", "time"], "Accessibility"),

    onClick: { table: { category: "Events" } },
    onMouseEnter: { table: { category: "Events" } },
    onMouseLeave: { table: { category: "Events" } },

    ref: HIDDEN,
    className: HIDDEN,
    style: HIDDEN,
    id: HIDDEN,
    "data-testid": HIDDEN,
  },
  // Recompose the flattened args; the result is checked against ButtonProps.
  render: ({
    iconLeft,
    iconRight,
    color,
    colorHover,
    colorFocus,
    colorActive,
    iconColor,
    iconColorHover,
    iconColorFocus,
    iconColorActive,
    ghostRest,
    ghostHover,
    ghostFocus,
    ghostActive,
    borderColor,
    borderColorTheme,
    ...rest
  }) => {
    const props: ButtonProps = {
      ...rest,
      // `mapping` has already turned "none" into undefined; the casts restore the arg types.
      iconLeft: (iconLeft as string | undefined) || undefined,
      iconRight: (iconRight as string | undefined) || undefined,
      color: toStateColor(color ?? NONE, colorHover ?? NONE, colorFocus ?? NONE, colorActive ?? NONE),
      iconColor: toStateColor(iconColor ?? NONE, iconColorHover ?? NONE, iconColorFocus ?? NONE, iconColorActive ?? NONE),
      ghost: toGhost({ rest: ghostRest, hover: ghostHover, focus: ghostFocus, active: ghostActive }),
      borderColor:
        borderColor && borderColor !== NONE
          ? borderColorTheme && borderColorTheme !== NONE
            ? { name: borderColor, theme: borderColorTheme }
            : borderColor
          : undefined,
    }
    return <Button {...props} />
  },
  play: async ({ canvasElement, args, userEvent }) => {
    const button = within(canvasElement).getByRole("button", { name: "Button" })
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
    await userEvent.hover(button)
    await expect(args.onMouseEnter).toHaveBeenCalled()
    await userEvent.unhover(button)
    await expect(args.onMouseLeave).toHaveBeenCalled()
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

export const Disabled: Story = {
  ...Playground,
  args: { ...Playground.args, disabled: true },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button", { name: "Button" })
    await expect(button).toBeDisabled()
    button.click()
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

export const StatusDisabled: Story = {
  ...Playground,
  args: { ...Playground.args, status: "disabled" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("button", { name: "Button" })).toBeDisabled()
  },
}

export const Filled: Story = {
  ...Playground,
  args: { ...Playground.args, filled: true, status: "error" },
  play: async ({ canvasElement }) => {
    const { backgroundColor } = getComputedStyle(within(canvasElement).getByRole("button", { name: "Button" }))
    await expect(backgroundColor).not.toBe("rgba(0, 0, 0, 0)")
  },
}

export const Ghost: Story = {
  ...Playground,
  args: { ...Playground.args, filled: true, ghostRest: true },
  play: async ({ canvasElement }) => {
    const { backgroundColor } = getComputedStyle(within(canvasElement).getByRole("button", { name: "Button" }))
    await expect(backgroundColor).toBe("rgba(0, 0, 0, 0)")
  },
}

export const Icons: Story = {
  ...Playground,
  args: { ...Playground.args, iconLeft: "plus", iconRight: "arrow-right" },
  play: async ({ canvasElement }) => {
    // The icons' titles join the accessible name, so match the label by text.
    const button = within(canvasElement).getByText("Button").closest("button")
    await expect(button?.querySelectorAll("svg")).toHaveLength(2)
  },
}

export const IconOnly: Story = {
  ...Playground,
  args: { ...Playground.args, children: "", iconLeft: "plus", "aria-label": "Add" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Add" })
    const { width, height } = button.getBoundingClientRect()
    await expect(Math.round(width)).toBe(Math.round(height))
  },
}

export const Size: Story = {
  ...Playground,
  args: { ...Playground.args, size: "larger" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Button" })
    await expect(getComputedStyle(button).height).toBe(resolveCss(canvasElement, "height", getToken("button.size:larger")))
  },
}

export const Anchor: Story = {
  ...Playground,
  args: { ...Playground.args, as: "a", href: "#target", target: "_blank" },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "Button" })
    await expect(link).toHaveAttribute("href", "#target")
    await expect(link).toHaveAttribute("rel", "noopener noreferrer")
  },
}

export const Div: Story = {
  ...Playground,
  args: { ...Playground.args, as: "div" },
  play: async ({ canvasElement, args, userEvent }) => {
    const button = within(canvasElement).getByRole("button", { name: "Button" })
    await expect(button.tagName).toBe("DIV")
    button.focus()
    await userEvent.keyboard("{Enter}")
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const Selected: Story = {
  ...Playground,
  args: { ...Playground.args, selected: true, ghostRest: true, "aria-pressed": true },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Button", pressed: true })
    // selected overrides ghost: the border stays visible.
    await expect(getComputedStyle(button).borderTopColor).not.toBe("rgba(0, 0, 0, 0)")
  },
}

export const Color: Story = {
  ...Playground,
  args: { ...Playground.args, color: "color:error" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Button" })
    await expect(getComputedStyle(button).color).toBe(resolveCss(canvasElement, "color", getToken("color:error")))
  },
}
