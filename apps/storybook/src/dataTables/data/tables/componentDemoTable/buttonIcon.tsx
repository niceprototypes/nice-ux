import Button from "@niceprototypes/button"
import type { ComponentExample } from "../../../components/demos/Components"

// Ad-hoc rows rather than a uniform variant list: an icon beside a label, an
// icon-only button, and a vendor (Lucide) icon. Each variant object carries the
// props its row needs.
export const buttonIcon = {
  name: "icon",
  description:
    "Renders a @niceprototypes/icon alongside the button label, or as the sole content when no children are provided. iconLeft and iconRight take any name Icon's name prop takes: a built-in icon, or a vendor (Lucide, PascalCase) name with iconVendor.",
  variants: [
    { variant: "label", iconRight: "arrow-right", children: "Next" },
    { variant: "iconOnly", iconRight: "plus", ariaLabel: "Add item" },
    { variant: "vendor", iconLeft: "Pencil", children: "Edit" },
  ],
  preview: (item) =>
    item.variant === "vendor" ? (
      <Button onClick={() => {}} iconLeft={item.iconLeft} iconVendor>
        {item.children}
      </Button>
    ) : item.children ? (
      <Button onClick={() => {}} iconRight={item.iconRight}>
        {item.children}
      </Button>
    ) : (
      <Button onClick={() => {}} iconRight={item.iconRight} aria-label={item.ariaLabel} />
    ),
  code: (item) =>
    item.variant === "vendor"
      ? `<Button iconLeft="${item.iconLeft}" iconVendor />`
      : item.children
        ? `<Button iconRight="${item.iconRight}" />`
        : `<Button iconRight="${item.iconRight}" aria-label="${item.ariaLabel}" />`,
} satisfies ComponentExample
