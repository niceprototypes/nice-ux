import Button from "nice-react-button"
import type { ComponentExample } from "../../../components/demos/Components"

export const buttonAriaLabel = {
  name: "aria-label",
  description:
    "Accessible name of the button. Required for an icon-only button, which has no text content to name it.",
  variants: ["Add item"],
  default: "Add item",
  preview: (variant) => <Button onClick={() => {}} iconRight="plus" aria-label={variant} />,
  code: (variant) => `<Button iconRight="plus" aria-label="${variant}" />`,
} satisfies ComponentExample
