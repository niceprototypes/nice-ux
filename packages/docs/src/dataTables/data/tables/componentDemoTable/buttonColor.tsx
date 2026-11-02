import Button, { type ButtonColorType } from "@niceprototypes/button"
import type { ComponentExample } from "../../../components/demos/Components"

// Each variant's label color; hover, focus (Tab) and press the previews to see the states.
const colorVariants: Record<string, { color?: ButtonColorType; code: string }> = {
  default: { code: `<Button ghost>Remixer</Button>` },
  one: { color: "color:link", code: `<Button ghost color="color:link">Remixer</Button>` },
  "per state": {
    color: { rest: "color:light", hover: "color" },
    code: `<Button ghost color={{ rest: "color:light", hover: "color" }}>\n  Remixer\n</Button>`,
  },
}

export const buttonColor = {
  name: "color",
  description:
    "Color of the label, as a color or border-color token address. One value applies in every state; an object sets a color per state (rest, hover, focus, active), and a state it leaves out keeps the status color. It wins over the status color, filled and ghost included. A disabled button shows its rest color.",
  variants: Object.keys(colorVariants),
  default: "default",
  preview: (variant) => (
    <Button onClick={() => {}} ghost color={colorVariants[variant].color}>
      Remixer
    </Button>
  ),
  code: (variant) => colorVariants[variant].code,
} satisfies ComponentExample
