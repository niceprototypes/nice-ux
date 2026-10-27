// Toggle example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `toggleExamples` is the
// Toggle/Docs-page order; each Toggle/<facet>.mdx renders one entry.
import { useState } from "react"
import Toggle from "nice-react-toggle"
import Flex from "nice-react-flex"
import { Theme, getToken } from "nice-react-styles"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/** A controlled Toggle whose parent state starts at `initial`. */
const ControlledToggle = ({ initial }: { initial: boolean }) => {
  const [checked, setChecked] = useState(initial)
  return <Toggle aria-label="Hidden" checked={checked} onChange={setChecked} />
}

/** Shows the value onChange receives. */
const ReportingToggle = () => {
  const [last, setLast] = useState<boolean | null>(null)
  return (
    <Toggle onChange={setLast}>{last === null ? "Toggle me" : `onChange(${last})`}</Toggle>
  )
}

export const toggleChecked = {
  name: "checked",
  description: "Whether the switch is on, controlled by the parent. Pair it with onChange; without onChange the switch is read-only.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => <ControlledToggle initial={variant === "true"} />,
  code: variant =>
    `const [checked, setChecked] = useState(${variant})\n\n<Toggle aria-label="Hidden" checked={checked} onChange={setChecked} />`,
} satisfies ComponentExample

export const toggleDefaultChecked = {
  name: "defaultChecked",
  description: "Whether the switch starts on, when the switch keeps its own state (uncontrolled).",
  variants: ["false", "true"],
  default: "false",
  preview: variant => <Toggle aria-label="Sync" defaultChecked={variant === "true"} />,
  code: variant => (variant === "true" ? `<Toggle aria-label="Sync" defaultChecked />` : `<Toggle aria-label="Sync" />`),
} satisfies ComponentExample

export const toggleOnChange = {
  name: "onChange",
  description: "Called with the new on/off value first, then the native change event.",
  variants: ["handler"],
  default: "handler",
  preview: () => <ReportingToggle />,
  code: () => `<Toggle onChange={(checked, event) => setLast(checked)}>\n  Toggle me\n</Toggle>`,
} satisfies ComponentExample

export const toggleDisabled = {
  name: "disabled",
  description: "Disables the switch: it can't be focused or toggled, and is drawn at the toggle.disabledOpacity token.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <Toggle defaultChecked disabled={variant === "true"}>
      Sync
    </Toggle>
  ),
  code: variant =>
    variant === "true" ? `<Toggle defaultChecked disabled>Sync</Toggle>` : `<Toggle defaultChecked>Sync</Toggle>`,
} satisfies ComponentExample

export const toggleSize = {
  name: "size",
  description: "Track and thumb size, from the toggle.track.width, toggle.track.height and toggle.thumb.size component tokens.",
  variants: ["smaller", "small", "base", "large", "larger"],
  default: "base",
  preview: variant => <Toggle aria-label={variant} size={variant} defaultChecked />,
  code: variant => (variant === "base" ? `<Toggle defaultChecked />` : `<Toggle size="${variant}" defaultChecked />`),
} satisfies ComponentExample

export const toggleChildren = {
  name: "children",
  description:
    "A visible label next to the switch; clicking it toggles the switch. Without children, pass aria-label, or aria-labelledby pointing at the element that names it, so the switch has an accessible name.",
  variants: ["label", "aria-label", "aria-labelledby"],
  default: "aria-label",
  preview: variant =>
    variant === "label" ? (
      <Toggle>Notifications</Toggle>
    ) : variant === "aria-label" ? (
      <Toggle aria-label="Notifications" />
    ) : (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5em" }}>
        <Toggle aria-labelledby="toggle-notifications-name" />
        <span id="toggle-notifications-name">Notifications</span>
      </span>
    ),
  code: variant =>
    variant === "label"
      ? `<Toggle>Notifications</Toggle>`
      : variant === "aria-label"
        ? `<Toggle aria-label="Notifications" />`
        : `<Toggle aria-labelledby="notifications-name" />\n<span id="notifications-name">Notifications</span>`,
} satisfies ComponentExample

export const toggleName = {
  name: "name",
  description: "Form field name of the native checkbox, so it submits with its form (\"on\" while checked) and appears in FormData.",
  variants: ["notifications"],
  default: "notifications",
  preview: variant => (
    <Toggle
      name={variant}
      defaultChecked
    >
      Notifications
    </Toggle>
  ),
  code: variant => `<Toggle name="${variant}">Notifications</Toggle>`,
} satisfies ComponentExample

export const toggleTheme = {
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
        <Toggle
          theme={variant}
          defaultChecked
        >
          Notifications
        </Toggle>
      </Flex>
    </Theme>
  ),
  code: variant => `<Toggle theme="${variant}" defaultChecked>Notifications</Toggle>`,
} satisfies ComponentExample

/** Every Toggle example facet — key order is the Toggle/Docs-page order. */
export const toggleExamples = {
  checked: toggleChecked,
  defaultChecked: toggleDefaultChecked,
  onChange: toggleOnChange,
  disabled: toggleDisabled,
  size: toggleSize,
  children: toggleChildren,
  name: toggleName,
  theme: toggleTheme,
} satisfies Record<string, ComponentExample>

/** Toggle facets in Docs-page order. */
export const toggleExampleList: ComponentExample[] = Object.values(toggleExamples)
