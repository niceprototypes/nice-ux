import Button, { type ButtonGhostType } from "@niceprototypes/button"
import type { ComponentExample } from "../../../components/demos/Components"

// Each variant's ghost setting; hover, focus (Tab) and press the previews to see the states.
const ghostVariants: Record<string, { ghost: ButtonGhostType; filled?: boolean; code: string }> = {
  none: { ghost: false, code: `<Button>Ghost</Button>` },
  rest: { ghost: true, code: `<Button ghost>Ghost</Button>` },
  "rest, filled": { ghost: true, filled: true, code: `<Button filled ghost>Ghost</Button>` },
  hover: { ghost: { hover: true }, code: `<Button ghost={{ hover: true }}>Ghost</Button>` },
  "rest and focus": { ghost: { rest: true, focus: true }, code: `<Button ghost={{ rest: true, focus: true }}>Ghost</Button>` },
}

export const buttonGhost = {
  name: "ghost",
  description:
    "Transparent background and border, so only the label and icons show. true ghosts the button at rest and reveals it on hover, keyboard focus and press; an object ghosts each state set to true (rest, hover, focus, active). A filled button's label takes its status color while ghosted, and a disabled button shows its rest setting.",
  variants: Object.keys(ghostVariants),
  default: "none",
  preview: (variant) => (
    <Button onClick={() => {}} iconLeft="plus" ghost={ghostVariants[variant].ghost} filled={ghostVariants[variant].filled}>
      Ghost
    </Button>
  ),
  code: (variant) => ghostVariants[variant].code,
} satisfies ComponentExample
