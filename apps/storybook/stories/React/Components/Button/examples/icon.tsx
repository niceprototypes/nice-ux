import * as React from "react"
import Button from "nice-react-button"
import type { ComponentExample } from "./examples.types"

// Ad-hoc rows rather than a uniform variant list: an icon beside a label, and an
// icon-only button. Each variant object carries the props its row needs.
export const icon = {
  name: "icon",
  description:
    "Renders a nice-react-icon alongside the button label, or as the sole content when no children are provided.",
  variants: [
    { variant: "label", icon: "arrow-right", children: "Next" },
    { variant: "iconOnly", icon: "plus", ariaLabel: "Add item" },
  ],
  preview: (item) =>
    item.children ? (
      <Button onClick={() => {}} icon={item.icon}>
        {item.children}
      </Button>
    ) : (
      <Button onClick={() => {}} icon={item.icon} aria-label={item.ariaLabel} />
    ),
  code: (item) =>
    item.children
      ? `<Button icon="${item.icon}" />`
      : `<Button icon="${item.icon}" aria-label="${item.ariaLabel}" />`,
} satisfies ComponentExample
