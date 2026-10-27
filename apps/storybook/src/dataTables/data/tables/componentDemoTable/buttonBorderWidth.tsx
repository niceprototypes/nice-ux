import Button from "nice-react-button"
import type { ComponentExample } from "../../../components/demos/Components"
import { cap } from "../../../utilities"

export const buttonBorderWidth = {
  name: "borderWidth",
  description:
    "Border width, from the button.borderWidth token scale.",
  variants: ["none", "smaller", "small", "base", "large", "larger"],
  preview: (variant) => (
    <Button onClick={() => {}} borderWidth={variant}>
      {cap(variant)}
    </Button>
  ),
  code: (variant) => (variant === "base" ? `<Button />` : `<Button borderWidth="${variant}" />`),
} satisfies ComponentExample
