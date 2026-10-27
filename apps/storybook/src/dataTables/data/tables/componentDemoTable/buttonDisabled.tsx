import Button from "@niceprototypes/button"
import type { ComponentExample } from "../../../components/demos/Components"

export const buttonDisabled = {
  name: "disabled",
  description:
    "Disables the button. Same effect as status=\"disabled\": the button is disabled when either asks for it, and takes the disabled colouring either way.",
  variants: ["false", "true"],
  default: "false",
  preview: (variant) => (
    <Button onClick={() => {}} disabled={variant === "true"}>
      Save
    </Button>
  ),
  code: (variant) => (variant === "true" ? `<Button disabled />` : `<Button />`),
} satisfies ComponentExample
