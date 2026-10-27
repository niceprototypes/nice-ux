import Button from "@niceprototypes/button"
import type { ComponentExample } from "../../../components/demos/Components"

export const buttonAriaCurrent = {
  name: "aria-current",
  description:
    "Forwarded to the root element. Marks the current item in a set, e.g. the link to the current page in a navigation.",
  variants: ["none", "page"],
  default: "none",
  preview: (variant) => (
    <Button as="a" href="#" aria-current={variant === "page" ? "page" : undefined}>
      Home
    </Button>
  ),
  code: (variant) => (variant === "page" ? `<Button as="a" href="/" aria-current="page" />` : `<Button as="a" href="/" />`),
} satisfies ComponentExample
