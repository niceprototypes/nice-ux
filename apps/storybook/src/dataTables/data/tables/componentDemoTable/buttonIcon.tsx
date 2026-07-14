import Button from "nice-react-button"
import type { ComponentExample } from "../../../components/demos/Components"

// Ad-hoc rows rather than a uniform variant list: an icon beside a label, and an
// icon-only button. Each variant object carries the props its row needs.
export const buttonIcon = {
  name: "icon",
  description:
    "Renders a nice-react-icon alongside the button label, or as the sole content when no children are provided.",
  variants: [
    { variant: "label", iconRight: "arrow-right", children: "Next" },
    { variant: "iconOnly", iconRight: "plus", ariaLabel: "Add item" },
  ],
  preview: (item) =>
    item.children ? (
      <Button onClick={() => {}} iconRight={item.iconRight}>
        {item.children}
      </Button>
    ) : (
      <Button onClick={() => {}} iconRight={item.iconRight} aria-label={item.ariaLabel} />
    ),
  code: (item) =>
    item.children
      ? `<Button iconRight="${item.iconRight}" />`
      : `<Button iconRight="${item.iconRight}" aria-label="${item.ariaLabel}" />`,
} satisfies ComponentExample
