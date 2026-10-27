import Button from "nice-react-button"
import type { ComponentExample } from "../../../components/demos/Components"

// Hover the previews: the border and background fade over the chosen duration.
export const buttonAnimationDuration = {
  name: "animationDuration",
  description:
    "How long the button's transitions take, from the button.animationDuration component tokens. Each variant follows the root animationDuration of the same name, except base, which is the root's fast so buttons stay quick by default. none turns transitions off.",
  variants: ["none", "faster", "fast", "base", "slow", "slower"],
  default: "base",
  preview: (variant) => (
    <Button onClick={() => {}} filled ghost animationDuration={variant}>
      Hover me
    </Button>
  ),
  code: (variant) =>
    variant === "base" ? `<Button>Save</Button>` : `<Button animationDuration="${variant}">Save</Button>`,
} satisfies ComponentExample
