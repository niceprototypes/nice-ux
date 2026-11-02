import Button from "@niceprototypes/button"
import type { ComponentExample } from "../../../components/demos/Components"
import { cap } from "../../../utilities"

export const buttonWeight = {
  name: "weight",
  description:
    "Font weight of the label, forwarded to the underlying Ink. Unset, the label is medium (an inlined button keeps Ink's default).",
  variants: ["light", "base", "medium", "semibold", "bold", "extrabold", "black"],
  default: "medium",
  preview: (variant) => (
    <Button onClick={() => {}} weight={variant}>
      {cap(variant)}
    </Button>
  ),
  code: (variant) => `<Button weight="${variant}" />`,
} satisfies ComponentExample
