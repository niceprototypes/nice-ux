import Button from "@niceprototypes/button"
import type { ComponentExample } from "../../../components/demos/Components"

export const buttonPadding = {
  name: "padding",
  description:
    "Internal padding of the content, as a CSS-like shorthand of gap tokens (1\u20134 values), applied via @niceprototypes/flex. Overrides the default size-derived horizontal padding; non-zero vertical values grow the button beyond its base height.",
  variants: ["default", "none", "none larger", "small larger"],
  default: "default",
  preview: (variant) => (
    <Button onClick={() => {}} padding={variant === "default" ? undefined : variant}>
      Padding
    </Button>
  ),
  code: (variant) => (variant === "default" ? `<Button />` : `<Button padding="${variant}" />`),
} satisfies ComponentExample
