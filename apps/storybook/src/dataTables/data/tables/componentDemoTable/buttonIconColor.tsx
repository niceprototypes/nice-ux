import Button, { type ButtonIconColorType } from "nice-react-button"
import type { ComponentExample } from "../../../components/demos/Components"

// Each variant's icon color; hover, focus (Tab) and press the previews to see the states.
const iconColorVariants: Record<string, { iconColor?: ButtonIconColorType; code: string }> = {
  default: { code: `<Button iconLeft="plus" aria-label="Add" />` },
  one: { iconColor: "color:link", code: `<Button iconLeft="plus" aria-label="Add" iconColor="color:link" />` },
  "per state": {
    iconColor: { rest: "borderColor", hover: "borderColor:stronger" },
    code: `<Button\n  iconLeft="plus"\n  aria-label="Add"\n  iconColor={{ rest: "borderColor", hover: "borderColor:stronger" }}\n/>`,
  },
}

export const buttonIconColor = {
  name: "iconColor",
  description:
    "Color of the button's icons, as a color or border-color token address. One value applies in every state; an object sets a color per state (rest, hover, focus, active), and a state it leaves out keeps the default. The default comes from the button.icon.color tokens, which have the same states (base for rest, then hover, focus and active, each following base unless a project overrides it with setTokens); the prop beats the tokens. A disabled button shows its rest color.",
  variants: Object.keys(iconColorVariants),
  default: "default",
  preview: (variant) => (
    <Button onClick={() => {}} iconLeft="plus" aria-label="Add" iconColor={iconColorVariants[variant].iconColor} />
  ),
  code: (variant) => iconColorVariants[variant].code,
} satisfies ComponentExample
