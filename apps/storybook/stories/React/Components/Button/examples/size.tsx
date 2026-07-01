import * as React from "react"
import Button from "nice-react-button"
import type { ComponentExample } from "./examples.types"

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const size = {
  name: "size",
  description:
    "Scales the button's height, padding, and font size using cell-height tokens.",
  variants: ["smaller", "small", "base", "large", "larger"],
  preview: (variant) => (
    <Button onClick={() => {}} size={variant}>
      {cap(variant)}
    </Button>
  ),
  code: (variant) =>
    variant === "base"
      ? `<Button>\n  {children}\n</Button>`
      : `<Button size="${variant}">\n  {children}\n</Button>`,
} satisfies ComponentExample
