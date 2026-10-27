import Button from "@niceprototypes/button"
import { cap } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

export const buttonSize = {
  name: "size",
  description:
    "Scales the button's height, padding, and font size using size tokens.",
  variants: ["smaller", "small", "base", "large", "larger"],
  preview: (variant) => (
    <Button onClick={() => {}} size={variant}>
      {cap(variant)}
    </Button>
  ),
  code: (variant) => (variant === "base" ? `<Button />` : `<Button size="${variant}" />`),
} satisfies ComponentExample
