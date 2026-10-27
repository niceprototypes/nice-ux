import Button from "nice-react-button"
import type { ComponentExample } from "../../../components/demos/Components"
import { cap } from "../../../utilities"

export const buttonType = {
  name: "type",
  description:
    "Type attribute of the native <button>. Defaults to \"button\", so a Button inside a form submits only when given type=\"submit\". Ignored when as is set.",
  variants: ["button", "submit", "reset"],
  default: "button",
  preview: (variant) => (
    <Button onClick={() => {}} type={variant}>
      {cap(variant)}
    </Button>
  ),
  code: (variant) => (variant === "button" ? `<Button />` : `<Button type="${variant}" />`),
} satisfies ComponentExample
