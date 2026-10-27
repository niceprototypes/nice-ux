import Button from "@niceprototypes/button"
import type { ComponentExample } from "../../../components/demos/Components"
import { cap } from "../../../utilities"

export const buttonAriaHasPopup = {
  name: "aria-haspopup",
  description:
    "Forwarded to the root element. Names the kind of popup the button opens.",
  variants: ["menu", "listbox", "dialog"],
  default: "menu",
  preview: (variant) => (
    <Button onClick={() => {}} aria-haspopup={variant}>
      {cap(variant)}
    </Button>
  ),
  code: (variant) => `<Button aria-haspopup="${variant}" />`,
} satisfies ComponentExample
