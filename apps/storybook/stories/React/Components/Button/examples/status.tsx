import * as React from "react"
import Button from "nice-react-button"
import type { ComponentExample } from "./examples.types"

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const status = {
  name: "status",
  description:
    "Selects the button's visual emphasis — base (default) or primary.",
  variants: ["base", "primary"],
  default: "base",
  // base is the default, so it renders with no status prop.
  preview: (variant) => (
    <Button onClick={() => {}} status={variant === "base" ? undefined : variant}>
      {cap(variant)}
    </Button>
  ),
  code: (variant) =>
    variant === "base"
      ? `<Button />`
      : `<Button status="${variant}" />`,
} satisfies ComponentExample
