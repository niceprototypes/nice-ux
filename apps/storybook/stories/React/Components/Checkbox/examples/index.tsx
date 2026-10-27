// Checkbox example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `checkboxExamples` is the
// Checkbox/Docs-page order; each Checkbox/<facet>.mdx renders one entry.
import { useState } from "react"
import Checkbox from "nice-react-checkbox"
import Flex from "nice-react-flex"
import { Theme, getToken } from "nice-react-styles"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/** A controlled Checkbox whose parent state starts at `initial`. */
const ControlledCheckbox = ({ initial }: { initial: boolean }) => {
  const [checked, setChecked] = useState(initial)
  return <Checkbox aria-label="Visible" checked={checked} onChange={setChecked} />
}

/** Shows the value onChange receives. */
const ReportingCheckbox = () => {
  const [last, setLast] = useState<boolean | null>(null)
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5em" }}>
      <Checkbox aria-label="Report" onChange={setLast} />
      <code>{last === null ? "–" : `onChange(${last})`}</code>
    </span>
  )
}

export const checkboxChecked = {
  name: "checked",
  description: "Whether the checkbox is checked, controlled by the parent. Pair it with onChange; without onChange the checkbox is read-only.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => <ControlledCheckbox initial={variant === "true"} />,
  code: variant =>
    `const [checked, setChecked] = useState(${variant})\n\n<Checkbox aria-label="Visible" checked={checked} onChange={setChecked} />`,
} satisfies ComponentExample

export const checkboxDefaultChecked = {
  name: "defaultChecked",
  description: "Whether the checkbox starts checked, when it keeps its own state (uncontrolled).",
  variants: ["false", "true"],
  default: "false",
  preview: variant => <Checkbox aria-label="Visible" defaultChecked={variant === "true"} />,
  code: variant =>
    variant === "true" ? `<Checkbox aria-label="Visible" defaultChecked />` : `<Checkbox aria-label="Visible" />`,
} satisfies ComponentExample

export const checkboxOnChange = {
  name: "onChange",
  description: "Called with the new checked value first, then the native change event.",
  variants: ["handler"],
  default: "handler",
  preview: () => <ReportingCheckbox />,
  code: () => `<Checkbox aria-label="Report" onChange={(checked, event) => setLast(checked)} />`,
} satisfies ComponentExample

export const checkboxDisabled = {
  name: "disabled",
  description: "Disables the checkbox: it can't be focused or toggled, and is drawn at the checkbox.disabledOpacity token.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => <Checkbox aria-label="Visible" defaultChecked disabled={variant === "true"} />,
  code: variant =>
    variant === "true" ? `<Checkbox aria-label="Visible" defaultChecked disabled />` : `<Checkbox aria-label="Visible" defaultChecked />`,
} satisfies ComponentExample

export const checkboxSize = {
  name: "size",
  description: "Box and check size, from the checkbox.size and checkbox.icon.size component tokens.",
  variants: ["smaller", "small", "base", "large", "larger"],
  default: "base",
  preview: variant => <Checkbox aria-label={variant} size={variant} defaultChecked />,
  code: variant => (variant === "base" ? `<Checkbox defaultChecked />` : `<Checkbox size="${variant}" defaultChecked />`),
} satisfies ComponentExample

export const checkboxBackgroundColor = {
  name: "backgroundColor",
  description: "Fill of the box when checked, from the checkbox.backgroundColor component tokens, which default to the root text colors.",
  variants: ["base", "link", "success", "highlight", "warning", "error"],
  default: "link",
  preview: variant => <Checkbox aria-label={variant} backgroundColor={variant} defaultChecked />,
  code: variant =>
    variant === "link" ? `<Checkbox defaultChecked />` : `<Checkbox backgroundColor="${variant}" defaultChecked />`,
} satisfies ComponentExample

export const checkboxBorderColor = {
  name: "borderColor",
  description: "Border of the box when unchecked, from the checkbox.borderColor component tokens, which default to the root border colors.",
  variants: ["base", "subtle", "strong", "stronger", "success", "highlight", "warning", "error", "link"],
  default: "strong",
  preview: variant => <Checkbox aria-label={variant} borderColor={variant} />,
  code: variant => (variant === "strong" ? `<Checkbox />` : `<Checkbox borderColor="${variant}" />`),
} satisfies ComponentExample

export const checkboxBorderRadius = {
  name: "borderRadius",
  description: "Corner radius of the box, from the checkbox.borderRadius component tokens.",
  variants: ["none", "smaller", "small", "base", "large", "larger"],
  default: "small",
  preview: variant => <Checkbox aria-label={variant} borderRadius={variant} size="larger" defaultChecked />,
  code: variant =>
    variant === "small"
      ? `<Checkbox size="larger" defaultChecked />`
      : `<Checkbox borderRadius="${variant}" size="larger" defaultChecked />`,
} satisfies ComponentExample

export const checkboxBorderWidth = {
  name: "borderWidth",
  description: "Border width of the box, from the checkbox.borderWidth component tokens.",
  variants: ["none", "smaller", "small", "base", "large", "larger"],
  default: "base",
  preview: variant => <Checkbox aria-label={variant} borderWidth={variant} size="larger" />,
  code: variant =>
    variant === "base" ? `<Checkbox size="larger" />` : `<Checkbox borderWidth="${variant}" size="larger" />`,
} satisfies ComponentExample

export const checkboxIconName = {
  name: "iconName",
  description: "Icon drawn in the box when checked: any name Icon's name prop accepts.",
  variants: ["check", "x", "minus", "plus"],
  default: "check",
  preview: variant => <Checkbox aria-label={variant} iconName={variant} defaultChecked />,
  code: variant => (variant === "check" ? `<Checkbox defaultChecked />` : `<Checkbox iconName="${variant}" defaultChecked />`),
} satisfies ComponentExample

export const checkboxIconVendor = {
  name: "iconVendor",
  description:
    "Resolves iconName through the vendor icon set (Icon's vendor prop), so Lucide names work. Needs nice-react-icon-vendor imported once at the app entry.",
  variants: ["false", "true"],
  default: "false",
  preview: variant =>
    variant === "true" ? (
      <Checkbox aria-label="CheckCheck" iconName="CheckCheck" iconVendor defaultChecked />
    ) : (
      <Checkbox aria-label="check" defaultChecked />
    ),
  code: variant =>
    variant === "true" ? `<Checkbox iconName="CheckCheck" iconVendor defaultChecked />` : `<Checkbox defaultChecked />`,
} satisfies ComponentExample

export const checkboxChildren = {
  name: "children",
  description:
    "A visible label next to the box; the root becomes a label, so clicking the text toggles the checkbox. Without children, pass aria-label or aria-labelledby.",
  variants: ["none", "label"],
  default: "none",
  preview: variant =>
    variant === "label" ? <Checkbox defaultChecked>Visible</Checkbox> : <Checkbox aria-label="Visible" defaultChecked />,
  code: variant =>
    variant === "label" ? `<Checkbox defaultChecked>Visible</Checkbox>` : `<Checkbox aria-label="Visible" defaultChecked />`,
} satisfies ComponentExample

export const checkboxAriaLabel = {
  name: "aria-label",
  description:
    "Without children, Checkbox has no visible label. Name it with aria-label, or with aria-labelledby pointing at the element that names it.",
  variants: ["aria-label", "aria-labelledby"],
  default: "aria-label",
  preview: variant =>
    variant === "aria-label" ? (
      <Checkbox aria-label="Select row" />
    ) : (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5em" }}>
        <Checkbox aria-labelledby="checkbox-row-name" />
        <span id="checkbox-row-name">Row 1</span>
      </span>
    ),
  code: variant =>
    variant === "aria-label"
      ? `<Checkbox aria-label="Select row" />`
      : `<Checkbox aria-labelledby="row-name" />\n<span id="row-name">Row 1</span>`,
} satisfies ComponentExample

export const checkboxName = {
  name: "name",
  description: "Form field name of the native checkbox, so it submits with its form (\"on\" while checked) and appears in FormData.",
  variants: ["newsletter"],
  default: "newsletter",
  preview: variant => (
    <Checkbox
      name={variant}
      defaultChecked
    >
      Newsletter
    </Checkbox>
  ),
  code: variant => `<Checkbox name="${variant}">Newsletter</Checkbox>`,
} satisfies ComponentExample

export const checkboxTheme = {
  name: "theme",
  description: "Pins token resolution to a theme. Each preview sits on its theme's base background.",
  variants: ["day", "night"],
  default: "day",
  preview: variant => (
    <Theme name={variant}>
      <Flex
        padding="small"
        style={{ backgroundColor: getToken("backgroundColor", "base") }}
      >
        <Checkbox
          theme={variant}
          defaultChecked
        >
          Visible
        </Checkbox>
      </Flex>
    </Theme>
  ),
  code: variant => `<Checkbox theme="${variant}" defaultChecked>Visible</Checkbox>`,
} satisfies ComponentExample

/** Every Checkbox example facet — key order is the Checkbox/Docs-page order. */
export const checkboxExamples = {
  checked: checkboxChecked,
  defaultChecked: checkboxDefaultChecked,
  onChange: checkboxOnChange,
  disabled: checkboxDisabled,
  size: checkboxSize,
  backgroundColor: checkboxBackgroundColor,
  borderColor: checkboxBorderColor,
  borderRadius: checkboxBorderRadius,
  borderWidth: checkboxBorderWidth,
  iconName: checkboxIconName,
  iconVendor: checkboxIconVendor,
  children: checkboxChildren,
  ariaLabel: checkboxAriaLabel,
  name: checkboxName,
  theme: checkboxTheme,
} satisfies Record<string, ComponentExample>

/** Checkbox facets in Docs-page order. */
export const checkboxExampleList: ComponentExample[] = Object.values(checkboxExamples)
