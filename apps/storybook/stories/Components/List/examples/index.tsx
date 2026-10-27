// List example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `listExamples`
// is the List/Docs-page order; each List/<facet>.mdx renders one entry.
import { List, ListItem } from "@niceprototypes/list"
import Flex from "@niceprototypes/flex"
import Icon from "@niceprototypes/icon"
import { Theme, getToken } from "@niceprototypes/styles"
import type { ComponentExample } from "./examples.types"
import type { LifecycleStep } from "../../../../src/components/LifecycleStory"

export type { ComponentExample, ExampleVariant } from "./examples.types"

const plans = ["Free", "Team", "Enterprise"]

const cities = ["Amsterdam", "Berlin", "Cairo", "Lagos", "Lisbon", "Madrid", "Nairobi", "Oslo", "Paris", "Rome"]

export const listChildren = {
  name: "children",
  description:
    "The list's items, typically ListItem elements. A divider is rendered between each pair of adjacent rendered children, never before the first or after the last; null, undefined and boolean children are skipped.",
  variants: ["ListItem"],
  default: "ListItem",
  preview: () => (
    <List aria-label="Plans">
      {plans.map(plan => (
        <ListItem key={plan}>{plan}</ListItem>
      ))}
    </List>
  ),
  code: () => `<List>
  <ListItem>Free</ListItem>
  <ListItem>Team</ListItem>
  <ListItem>Enterprise</ListItem>
</List>`,
} satisfies ComponentExample

export const listScrollable = {
  name: "scrollable",
  description: "Caps the height at the list.maxHeight token and scrolls vertically.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <List
      aria-label="Cities"
      scrollable={variant === "true"}
    >
      {cities.map(city => (
        <ListItem key={city}>{city}</ListItem>
      ))}
    </List>
  ),
  code: variant => (variant === "true" ? `<List scrollable>\n  …\n</List>` : `<List>\n  …\n</List>`),
} satisfies ComponentExample

export const listSize = {
  name: "size",
  description: "Item padding scale (list.padding.block / list.padding.inline), passed to every ListItem through context.",
  variants: ["smaller", "small", "base", "large", "larger"],
  preview: variant => (
    <List
      aria-label="Plans"
      size={variant}
    >
      {plans.map(plan => (
        <ListItem key={plan}>{plan}</ListItem>
      ))}
    </List>
  ),
  code: variant => (variant === "base" ? `<List>\n  …\n</List>` : `<List size="${variant}">\n  …\n</List>`),
} satisfies ComponentExample

export const listTheme = {
  name: "theme",
  description:
    "Pins token resolution to a theme. The list background is transparent, so each preview sits on its theme's base background.",
  variants: ["day", "night"],
  default: "day",
  preview: variant => (
    <Theme name={variant}>
      <Flex
        padding="small"
        style={{ backgroundColor: getToken("backgroundColor", "base") }}
      >
        <List
          aria-label="Plans"
          theme={variant}
        >
          <ListItem>Free</ListItem>
          <ListItem selected>Team</ListItem>
          <ListItem disabled>Enterprise</ListItem>
        </List>
      </Flex>
    </Theme>
  ),
  code: variant => `<List theme="${variant}">\n  …\n</List>`,
} satisfies ComponentExample

export const listItemStart = {
  name: "ListItem start",
  description: "ListItem content before the main content, such as an icon.",
  variants: ["none", "icon"],
  default: "none",
  preview: variant => (
    <List aria-label="Plans">
      <ListItem start={variant === "icon" ? <Icon name="heart" /> : undefined}>Free</ListItem>
      <ListItem start={variant === "icon" ? <Icon name="star" /> : undefined}>Team</ListItem>
    </List>
  ),
  code: variant =>
    variant === "icon" ? `<ListItem start={<Icon name="heart" />}>Free</ListItem>` : `<ListItem>Free</ListItem>`,
} satisfies ComponentExample

export const listItemEnd = {
  name: "ListItem end",
  description: "ListItem content after the main content, such as a count or a shortcut.",
  variants: ["none", "text"],
  default: "none",
  preview: variant => (
    <List aria-label="Inbox">
      <ListItem end={variant === "text" ? "3" : undefined}>Inbox</ListItem>
      <ListItem end={variant === "text" ? "12" : undefined}>Archive</ListItem>
    </List>
  ),
  code: variant => (variant === "text" ? `<ListItem end="3">Inbox</ListItem>` : `<ListItem>Inbox</ListItem>`),
} satisfies ComponentExample

export const listItemSelected = {
  name: "ListItem selected",
  description: "Visual selected state (list.backgroundColor.selected / list.color.selected). It sets no ARIA attribute; the consumer adds aria-selected where the role needs it.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <List aria-label="Plans">
      <ListItem>Free</ListItem>
      <ListItem selected={variant === "true"}>Team</ListItem>
    </List>
  ),
  code: variant => (variant === "true" ? `<ListItem selected>Team</ListItem>` : `<ListItem>Team</ListItem>`),
} satisfies ComponentExample

export const listItemActive = {
  name: "ListItem active",
  description: "Visual highlight for the keyboard or pointer target (list.backgroundColor.active).",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <List aria-label="Plans">
      <ListItem>Free</ListItem>
      <ListItem active={variant === "true"}>Team</ListItem>
    </List>
  ),
  code: variant => (variant === "true" ? `<ListItem active>Team</ListItem>` : `<ListItem>Team</ListItem>`),
} satisfies ComponentExample

export const listItemDisabled = {
  name: "ListItem disabled",
  description: "Visual disabled state (list.color.disabled) plus aria-disabled.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <List aria-label="Plans">
      <ListItem>Free</ListItem>
      <ListItem disabled={variant === "true"}>Enterprise</ListItem>
    </List>
  ),
  code: variant =>
    variant === "true" ? `<ListItem disabled>Enterprise</ListItem>` : `<ListItem>Enterprise</ListItem>`,
} satisfies ComponentExample

/** Every List example facet — key order is the List/Docs-page order. */
export const listExamples = {
  children: listChildren,
  scrollable: listScrollable,
  size: listSize,
  theme: listTheme,
  itemStart: listItemStart,
  itemEnd: listItemEnd,
  itemSelected: listItemSelected,
  itemActive: listItemActive,
  itemDisabled: listItemDisabled,
} satisfies Record<string, ComponentExample>

/** List facets in Docs-page order. */
export const listExampleList: ComponentExample[] = Object.values(listExamples)

/** Props a List lifecycle step drives: which item is active, which is selected, and whether the last is disabled. */
type ListLifecycleProps = { active?: string; selected?: string; disabled?: boolean }

/**
 * List's lifecycle reachable through ListItem props, in order: rest → active →
 * selected → disabled. List has no internal state; every state is a prop.
 */
export const listLifecycleSteps: ReadonlyArray<LifecycleStep<ListLifecycleProps>> = [
  { label: "rest", props: {} },
  { label: "active", props: { active: "Team" } },
  { label: "selected", props: { selected: "Team" } },
  { label: "disabled", props: { selected: "Team", disabled: true } },
]

/** Renders a List of plans for one lifecycle step. */
export const renderListLifecycle = ({ active, selected, disabled }: ListLifecycleProps) => (
  <List aria-label="Plans">
    {plans.map(plan => (
      <ListItem
        key={plan}
        active={plan === active}
        selected={plan === selected}
        disabled={disabled && plan === "Enterprise"}
      >
        {plan}
      </ListItem>
    ))}
  </List>
)
