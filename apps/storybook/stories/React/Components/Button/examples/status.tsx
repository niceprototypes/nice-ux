import * as React from "react"
import Button from "nice-react-button"
import type { ComponentExample } from "./examples.types"

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const status = {
  name: "status",
  description:
    "Selects the button's visual emphasis — primary (default) or secondary.",
  variants: ["primary", "secondary"],
  default: "primary",
  // primary is the default, so it renders with no status prop.
  preview: (variant) => (
    <Button onClick={() => {}} status={variant === "primary" ? undefined : variant}>
      {cap(variant)}
    </Button>
  ),
  code: (variant) =>
    variant === "primary"
      ? `<Button>\n  {children}\n</Button>`
      : `<Button status="${variant}">\n  {children}\n</Button>`,
} satisfies ComponentExample
