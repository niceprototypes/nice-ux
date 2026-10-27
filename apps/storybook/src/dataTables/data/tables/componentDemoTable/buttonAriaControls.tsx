import Button from "nice-react-button"
import type { ComponentExample } from "../../../components/demos/Components"

export const buttonAriaControls = {
  name: "aria-controls",
  description:
    "Forwarded to the root element. Id of the element the button controls, typically paired with aria-expanded.",
  variants: ["menu-1"],
  default: "menu-1",
  preview: (variant) => (
    <Button onClick={() => {}} aria-controls={variant} aria-expanded={false}>
      Menu
    </Button>
  ),
  code: (variant) => `<Button aria-controls="${variant}" aria-expanded={open} />`,
} satisfies ComponentExample
