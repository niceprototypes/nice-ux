import Button from "nice-react-button"
import type { ComponentExample } from "../../../components/demos/Components"

export const buttonAntialiased = {
  name: "antialiased",
  description:
    "Applies antialiased font smoothing to the label, forwarded to the underlying Ink.",
  variants: ["false", "true"],
  default: "false",
  preview: (variant) => (
    <Button onClick={() => {}} filled antialiased={variant === "true"}>
      Label
    </Button>
  ),
  code: (variant) => (variant === "true" ? `<Button antialiased />` : `<Button />`),
} satisfies ComponentExample
