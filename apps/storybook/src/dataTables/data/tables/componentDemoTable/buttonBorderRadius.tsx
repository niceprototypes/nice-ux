import Button from "nice-react-button"
import { cap } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

export const buttonBorderRadius = {
  name: "borderRadius",
  description: "Controls the corner rounding of the button.",
  variants: ["none", "small", "base", "large", "rounded"],
  preview: (variant) => (
    <Button onClick={() => {}} borderRadius={variant}>
      {cap(variant)}
    </Button>
  ),
  code: (variant) => (variant === "base" ? `<Button />` : `<Button borderRadius="${variant}" />`),
} satisfies ComponentExample
