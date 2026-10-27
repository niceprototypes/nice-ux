import Button from "@niceprototypes/button"
import type { ComponentExample } from "../../../components/demos/Components"

export const buttonAriaExpanded = {
  name: "aria-expanded",
  description:
    "Forwarded to the root element. Set it on a button that shows and hides another element (a menu, a disclosure), reflecting whether that element is open.",
  variants: ["false", "true"],
  default: "false",
  preview: (variant) => (
    <Button onClick={() => {}} aria-expanded={variant === "true"}>
      Menu
    </Button>
  ),
  code: (variant) => `<Button aria-expanded={${variant}} />`,
} satisfies ComponentExample
