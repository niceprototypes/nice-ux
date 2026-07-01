import * as React from "react"
import Button from "nice-react-button"
import Flex from "nice-react-flex"
import type { ComponentExample } from "./examples.types"

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const state = {
  name: "state",
  description:
    "Applies a semantic state style to the button (disabled, error, success, or warning).",
  variants: ["base", "disabled", "error", "success", "warning"],
  // Shown on both statuses; base renders with no state prop.
  preview: (variant) => (
    <Flex gap="small">
      <Button onClick={() => {}} state={variant === "base" ? undefined : variant}>
        {cap(variant)}
      </Button>
      <Button
        status="secondary"
        onClick={() => {}}
        state={variant === "base" ? undefined : variant}
      >
        {cap(variant)}
      </Button>
    </Flex>
  ),
  code: (variant) =>
    variant === "base"
      ? `<Button>\n  {children}\n</Button>`
      : `<Button state="${variant}">\n  {children}\n</Button>`,
} satisfies ComponentExample
