import * as React from "react"
import Button from "nice-react-button"
import type { ComponentExample } from "./examples.types"

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const borderRadius = {
  name: "borderRadius",
  description: "Controls the corner rounding of the button.",
  variants: ["none", "small", "base", "large", "rounded"],
  preview: (variant) => (
    <Button onClick={() => {}} borderRadius={variant}>
      {cap(variant)}
    </Button>
  ),
  code: (variant) =>
    variant === "base"
      ? `<Button>\n  {children}\n</Button>`
      : `<Button borderRadius="${variant}">\n  {children}\n</Button>`,
} satisfies ComponentExample
