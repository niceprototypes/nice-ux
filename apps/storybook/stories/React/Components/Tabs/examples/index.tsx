// Tabs example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `tabsExamples` is the
// Tabs/Docs-page order; each Tabs/<facet>.mdx renders one entry.
import { useState } from "react"
import Tabs, { type TabsItemType } from "nice-react-tabs"
import Input from "nice-react-input"
import Button from "nice-react-button"
import Flex from "nice-react-flex"
import { Theme, getToken } from "nice-react-styles"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

const PAGES: TabsItemType[] = [
  { id: "page-1", label: "Page 1" },
  { id: "page-2", label: "Page 2" },
  { id: "page-3", label: "Page 3" },
]

/** A tab whose label is a ghost Input: the page name, editable in place. */
const EditableTabs = () => {
  const [name, setName] = useState("Page 1")
  return (
    <Tabs
      aria-label="Pages"
      items={[
        { id: "page-1", label: <Input ghost size="small" aria-label="Page name" value={name} onChange={setName} /> },
        { id: "page-2", label: "Page 2" },
      ]}
    />
  )
}

/** Controlled Tabs: the parent owns the selected id. */
const ControlledTabs = ({ initial }: { initial: string }) => {
  const [selected, setSelected] = useState(initial)
  return (
    <Tabs aria-label="Pages" items={PAGES} selected={selected} onSelect={setSelected}>
      {selected}
    </Tabs>
  )
}

/** Shows what onSelect receives. */
const ReportingTabs = () => {
  const [last, setLast] = useState("–")
  return (
    <Tabs aria-label="Pages" items={PAGES} onSelect={(id, event) => setLast(`onSelect("${id}", ${event.type})`)}>
      <code>{last}</code>
    </Tabs>
  )
}

export const tabsItems = {
  name: "items",
  description:
    "The tabs, in order: an id, a label and an optional disabled flag. A label is any node, including a ghost Input; tabs are not buttons, so they may contain one.",
  variants: ["text", "input", "disabled"],
  default: "text",
  preview: variant =>
    variant === "input" ? (
      <EditableTabs />
    ) : (
      <Tabs aria-label="Pages" items={variant === "disabled" ? [PAGES[0], { ...PAGES[1], disabled: true }, PAGES[2]] : PAGES} />
    ),
  code: variant =>
    variant === "input"
      ? `<Tabs\n  items={[\n    { id: "page-1", label: <Input ghost size="small" aria-label="Page name" value={name} onChange={setName} /> },\n    { id: "page-2", label: "Page 2" },\n  ]}\n/>`
      : variant === "disabled"
        ? `<Tabs\n  items={[\n    { id: "page-1", label: "Page 1" },\n    { id: "page-2", label: "Page 2", disabled: true },\n    { id: "page-3", label: "Page 3" },\n  ]}\n/>`
        : `<Tabs\n  items={[\n    { id: "page-1", label: "Page 1" },\n    { id: "page-2", label: "Page 2" },\n    { id: "page-3", label: "Page 3" },\n  ]}\n/>`,
} satisfies ComponentExample

export const tabsSelected = {
  name: "selected",
  description: "id of the selected tab, controlled by the parent. Pair it with onSelect.",
  variants: ["page-1", "page-2"],
  default: "page-1",
  preview: variant => <ControlledTabs initial={variant} />,
  code: variant =>
    `const [selected, setSelected] = useState("${variant}")\n\n<Tabs items={pages} selected={selected} onSelect={setSelected}>\n  {panel}\n</Tabs>`,
} satisfies ComponentExample

export const tabsDefaultSelected = {
  name: "defaultSelected",
  description: "id of the tab selected first, when Tabs keeps its own state (uncontrolled). Defaults to the first enabled tab.",
  variants: ["first enabled", "page-3"],
  default: "first enabled",
  preview: variant => (
    <Tabs aria-label="Pages" items={PAGES} defaultSelected={variant === "page-3" ? "page-3" : undefined} />
  ),
  code: variant => (variant === "page-3" ? `<Tabs items={pages} defaultSelected="page-3" />` : `<Tabs items={pages} />`),
} satisfies ComponentExample

export const tabsOnSelect = {
  name: "onSelect",
  description: "Called with the selected tab's id first, then the click or key event.",
  variants: ["handler"],
  default: "handler",
  preview: () => <ReportingTabs />,
  code: () => `<Tabs items={pages} onSelect={(id, event) => setPage(id)} />`,
} satisfies ComponentExample

export const tabsEnd = {
  name: "end",
  description: "Content of the tab row after the last tab, such as an add button. It is not a tab and is not in the tab list.",
  variants: ["button"],
  default: "button",
  preview: () => (
    <Tabs aria-label="Pages" items={PAGES.slice(0, 1)} end={<Button iconLeft="plus" size="small" aria-label="Add page" />} />
  ),
  code: () => `<Tabs\n  items={pages}\n  end={<Button iconLeft="plus" size="small" aria-label="Add page" />}\n/>`,
} satisfies ComponentExample

export const tabsChildren = {
  name: "children",
  description: "The selected tab's panel, rendered under the tab row with role=\"tabpanel\" and labelled by the selected tab.",
  variants: ["panel"],
  default: "panel",
  preview: () => <ControlledTabs initial="page-1" />,
  code: () => `<Tabs items={pages} selected={selected} onSelect={setSelected}>\n  {panels[selected]}\n</Tabs>`,
} satisfies ComponentExample

export const tabsSize = {
  name: "size",
  description: "Tab padding, gap and font size, from the tabs.padding, tabs.gap and tabs.fontSize component tokens.",
  variants: ["smaller", "small", "base", "large", "larger"],
  default: "base",
  preview: variant => <Tabs aria-label={variant} size={variant} items={PAGES.slice(0, 2)} />,
  code: variant => (variant === "base" ? `<Tabs items={pages} />` : `<Tabs size="${variant}" items={pages} />`),
} satisfies ComponentExample

export const tabsJustifyContent = {
  name: "justifyContent",
  description:
    "Places the tab list, and the end content after it, along the tab row. The nice-react-flex justifyContent values; space-between puts end at the row's end. Unset, the tabs start at the row's start.",
  variants: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
  default: "flex-start",
  preview: variant => (
    <Tabs
      aria-label={variant}
      justifyContent={variant === "flex-start" ? undefined : variant}
      items={PAGES.slice(0, 2)}
      end={<Button iconLeft="plus" size="small" aria-label="Add page" />}
    />
  ),
  code: variant =>
    variant === "flex-start"
      ? `<Tabs items={pages} end={addButton} />`
      : `<Tabs justifyContent="${variant}" items={pages} end={addButton} />`,
} satisfies ComponentExample

export const tabsGap = {
  name: "gap",
  description:
    "Gap between tabs, and between the tab list and end, from the gap core token. Unset, the tabs.gap token for the size applies.",
  variants: ["unset", "none", "smaller", "small", "base", "large", "larger"],
  default: "unset",
  preview: variant => (
    <Tabs aria-label={variant} gap={variant === "unset" ? undefined : variant} items={PAGES.slice(0, 2)} />
  ),
  code: variant => (variant === "unset" ? `<Tabs items={pages} />` : `<Tabs gap="${variant}" items={pages} />`),
} satisfies ComponentExample

export const tabsVariant = {
  name: "variant",
  description:
    "Tab look. underline: a bottom border under the row and an underline under the selected tab. pill: a rounded border per tab from the tabs.pill tokens, transparent at rest, colored on hover and when selected; no row border or underline.",
  variants: ["underline", "pill"],
  default: "underline",
  preview: variant => <Tabs aria-label={variant} variant={variant} items={PAGES.slice(0, 2)} />,
  code: variant => (variant === "underline" ? `<Tabs items={pages} />` : `<Tabs variant="pill" items={pages} />`),
} satisfies ComponentExample

export const tabsAriaLabel = {
  name: "aria-label",
  description: "Accessible name of the tab list, announced when focus enters it.",
  variants: ["Pages"],
  default: "Pages",
  preview: () => <Tabs aria-label="Pages" items={PAGES.slice(0, 2)} />,
  code: () => `<Tabs aria-label="Pages" items={pages} />`,
} satisfies ComponentExample

export const tabsTheme = {
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
        <Tabs
          aria-label="Pages"
          items={PAGES.slice(0, 2)}
          theme={variant}
        />
      </Flex>
    </Theme>
  ),
  code: variant => `<Tabs aria-label="Pages" items={pages} theme="${variant}" />`,
} satisfies ComponentExample

/** Every Tabs example facet — key order is the Tabs/Docs-page order. */
export const tabsExamples = {
  items: tabsItems,
  selected: tabsSelected,
  defaultSelected: tabsDefaultSelected,
  onSelect: tabsOnSelect,
  end: tabsEnd,
  children: tabsChildren,
  size: tabsSize,
  justifyContent: tabsJustifyContent,
  gap: tabsGap,
  variant: tabsVariant,
  ariaLabel: tabsAriaLabel,
  theme: tabsTheme,
} satisfies Record<string, ComponentExample>

/** Tabs facets in Docs-page order. */
export const tabsExampleList: ComponentExample[] = Object.values(tabsExamples)
