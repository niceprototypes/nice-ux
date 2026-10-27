import Button from "nice-react-button"
import { cap } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

export const buttonFilled = {
  name: "filled",
  description:
    "Renders the button filled — the current status's color fills the background and border with an inverse label — instead of the default outline.",
  variants: ["outline", "filled"],
  default: "outline",
  // outline is the default, so it renders with no filled prop.
  preview: (variant) => (
    <Button onClick={() => {}} filled={variant === "filled"}>
      {cap(variant)}
    </Button>
  ),
  code: (variant) => (variant === "filled" ? `<Button filled />` : `<Button />`),
} satisfies ComponentExample
