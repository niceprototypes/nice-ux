import Button from "@niceprototypes/button"
import type { ComponentExample } from "../../../components/demos/Components"
import { cap } from "../../../utilities"

export const buttonBorderColor = {
  name: "borderColor",
  description:
    "Border color, from the borderColor token variants. Overrides the status border, and on a selected button the button.selected.borderColor token.",
  variants: ["base", "subtle", "strong", "stronger", "success", "highlight", "warning", "error", "link"],
  preview: (variant) => (
    <Button onClick={() => {}} borderColor={variant}>
      {cap(variant)}
    </Button>
  ),
  code: (variant) => (variant === "base" ? `<Button />` : `<Button borderColor="${variant}" />`),
} satisfies ComponentExample
