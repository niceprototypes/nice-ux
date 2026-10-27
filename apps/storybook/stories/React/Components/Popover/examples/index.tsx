// Popover example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `popoverExamples`
// is the Popover/Docs-page order; each Popover/<facet>.mdx renders one entry.
import * as React from "react"
import { useRef, useState } from "react"
import Popover from "nice-react-popover"
import type { PopoverAlignType, PopoverPositionType } from "nice-react-popover"
import Button from "nice-react-button"
import { List, ListItem } from "nice-react-list"
import Flex from "nice-react-flex"
import Ink from "nice-react-ink"
import type { ComponentExample } from "./examples.types"
import type { LifecycleStep } from "../../../../../src/components/LifecycleStory"

export type { ComponentExample, ExampleVariant } from "./examples.types"

type AnchorElement = HTMLButtonElement | HTMLAnchorElement | HTMLDivElement

const options = ["Rename", "Duplicate", "Delete"]

/** Popover content: a List of options. Popover sets no padding of its own. */
const OptionList = () => (
  <List aria-label="Options">
    {options.map(option => (
      <ListItem key={option}>{option}</ListItem>
    ))}
  </List>
)

type DemoPopoverProps = {
  label?: string
  position?: PopoverPositionType
  align?: PopoverAlignType
  matchAnchorWidth?: boolean
  role?: string
  theme?: string
  withOnOpenChange?: boolean
  withIgnoredTrigger?: boolean
  labelledBy?: string
  content?: React.ReactNode
}

/**
 * A trigger Button that toggles a controlled Popover anchored to it.
 * onOpenChange closes it on Escape or an outside pointerdown, unless
 * withOnOpenChange is false.
 */
const DemoPopover = ({
  label = "Options",
  position,
  align,
  matchAnchorWidth,
  role,
  theme,
  withOnOpenChange = true,
  withIgnoredTrigger,
  labelledBy,
  content,
}: DemoPopoverProps) => {
  const anchorRef = useRef<AnchorElement>(null)
  const triggerRef = useRef<AnchorElement>(null)
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(current => !current)
  return (
    <Flex gap="small">
      <Button
        ref={anchorRef}
        id={labelledBy}
        onClick={withIgnoredTrigger ? undefined : toggle}
      >
        {label}
      </Button>
      {withIgnoredTrigger ? (
        <Button
          ref={triggerRef}
          onClick={toggle}
        >
          Toggle
        </Button>
      ) : null}
      <Popover
        open={open}
        onOpenChange={withOnOpenChange ? setOpen : undefined}
        anchorRef={anchorRef}
        ignoreOutsideRefs={withIgnoredTrigger ? [triggerRef] : undefined}
        position={position}
        align={align}
        matchAnchorWidth={matchAnchorWidth}
        role={role}
        theme={theme}
        aria-label={labelledBy ? undefined : "Options"}
        aria-labelledby={labelledBy}
      >
        {content ?? <OptionList />}
      </Popover>
    </Flex>
  )
}

const usage = `const anchorRef = useRef(null)
const [open, setOpen] = useState(false)

<Button ref={anchorRef} onClick={() => setOpen(o => !o)}>Options</Button>
<Popover open={open} onOpenChange={setOpen} anchorRef={anchorRef}>
  …
</Popover>`

export const popoverOpen = {
  name: "open",
  description:
    "Whether the popover is rendered. Controlled by the consumer: Popover renders nothing while false, and in a portal at <body> with position: fixed while true. Required.",
  variants: ["toggle"],
  default: "toggle",
  preview: () => <DemoPopover />,
  code: () => usage,
} satisfies ComponentExample

export const popoverAnchorRef = {
  name: "anchorRef",
  description:
    "Ref to the element the popover is positioned against, re-measured on scroll (capture phase) and resize. A pointerdown on it does not dismiss, and it receives focus back on close when focus was inside the popover. Required.",
  variants: ["Button"],
  default: "Button",
  preview: () => <DemoPopover />,
  code: () => `const anchorRef = useRef(null)

<Button ref={anchorRef}>Options</Button>
<Popover open={open} anchorRef={anchorRef}>
  …
</Popover>`,
} satisfies ComponentExample

export const popoverOnOpenChange = {
  name: "onOpenChange",
  description:
    "Called with false on Escape or a pointerdown outside the popover, the anchor and ignoreOutsideRefs. Without it the popover closes only when the consumer sets open to false (here: the trigger).",
  variants: ["setOpen", "none"],
  default: "setOpen",
  preview: variant => <DemoPopover withOnOpenChange={variant === "setOpen"} />,
  code: variant =>
    variant === "setOpen"
      ? `<Popover open={open} onOpenChange={setOpen} anchorRef={anchorRef}>\n  …\n</Popover>`
      : `<Popover open={open} anchorRef={anchorRef}>\n  …\n</Popover>`,
} satisfies ComponentExample

export const popoverIgnoreOutsideRefs = {
  name: "ignoreOutsideRefs",
  description:
    "Refs to elements where a pointerdown does not count as outside, besides the popover and the anchor — for a trigger beside the anchor, so pressing it does not dismiss the popover before its own toggle runs. Here the anchor is the Options button and Toggle is the trigger.",
  variants: ["none", "trigger"],
  default: "none",
  preview: variant => <DemoPopover withIgnoredTrigger={variant === "trigger"} />,
  code: variant =>
    variant === "trigger"
      ? `<Button ref={anchorRef}>Options</Button>
<Button ref={triggerRef} onClick={toggle}>Toggle</Button>
<Popover
  open={open}
  onOpenChange={setOpen}
  anchorRef={anchorRef}
  ignoreOutsideRefs={[triggerRef]}
>
  …
</Popover>`
      : `<Popover open={open} onOpenChange={setOpen} anchorRef={anchorRef}>\n  …\n</Popover>`,
} satisfies ComponentExample

export const popoverPosition = {
  name: "position",
  description: "Side of the anchor the popover is placed on, popover.offset away from it.",
  variants: ["top", "bottom", "left", "right"],
  default: "bottom",
  preview: variant => (
    <DemoPopover
      label={variant}
      position={variant}
    />
  ),
  code: variant =>
    variant === "bottom"
      ? `<Popover open={open} anchorRef={anchorRef}>\n  …\n</Popover>`
      : `<Popover open={open} anchorRef={anchorRef} position="${variant}">\n  …\n</Popover>`,
} satisfies ComponentExample

export const popoverAlign = {
  name: "align",
  description: "Alignment along the anchor's cross axis: its left / center / right edge for top and bottom, its top / middle / bottom edge for left and right.",
  variants: ["start", "center", "end"],
  default: "start",
  preview: variant => (
    <DemoPopover
      label={variant}
      align={variant}
    />
  ),
  code: variant =>
    variant === "start"
      ? `<Popover open={open} anchorRef={anchorRef}>\n  …\n</Popover>`
      : `<Popover open={open} anchorRef={anchorRef} align="${variant}">\n  …\n</Popover>`,
} satisfies ComponentExample

export const popoverMatchAnchorWidth = {
  name: "matchAnchorWidth",
  description:
    "Makes the popover at least as wide as the anchor: its min-width is the anchor's measured width, re-measured with the position. Wider content still widens it.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <DemoPopover
      label="A wide anchor button"
      matchAnchorWidth={variant === "true"}
    />
  ),
  code: variant =>
    variant === "true"
      ? `<Popover open={open} anchorRef={anchorRef} matchAnchorWidth>\n  …\n</Popover>`
      : `<Popover open={open} anchorRef={anchorRef}>\n  …\n</Popover>`,
} satisfies ComponentExample

export const popoverRole = {
  name: "role",
  description:
    "ARIA role of the popover element. Name it with aria-label or aria-labelledby; give it an id for the anchor's aria-controls.",
  variants: ["dialog", "listbox"],
  default: "dialog",
  preview: variant => <DemoPopover role={variant} />,
  code: variant =>
    variant === "dialog"
      ? `<Popover open={open} anchorRef={anchorRef} aria-label="Options">\n  …\n</Popover>`
      : `<Popover open={open} anchorRef={anchorRef} role="${variant}" aria-label="Options">\n  …\n</Popover>`,
} satisfies ComponentExample

export const popoverChildren = {
  name: "children",
  description: "Popover content. The surface has no padding of its own: a List fills it edge to edge, other content brings its own spacing.",
  variants: ["List", "Flex"],
  default: "List",
  preview: variant => (
    <DemoPopover
      content={
        variant === "Flex" ? (
          <Flex padding="small">
            <Ink>Saved 2 minutes ago.</Ink>
          </Flex>
        ) : undefined
      }
    />
  ),
  code: variant =>
    variant === "Flex"
      ? `<Popover open={open} anchorRef={anchorRef}>
  <Flex padding="small">
    <Ink>Saved 2 minutes ago.</Ink>
  </Flex>
</Popover>`
      : `<Popover open={open} anchorRef={anchorRef}>
  <List>
    <ListItem>Rename</ListItem>
    <ListItem>Duplicate</ListItem>
    <ListItem>Delete</ListItem>
  </List>
</Popover>`,
} satisfies ComponentExample

export const popoverAriaLabel = {
  name: "aria-label",
  description:
    "Accessible name of the popover element. Use aria-labelledby instead to point at a visible element that names it — here the anchor button.",
  variants: ["aria-label", "aria-labelledby"],
  default: "aria-label",
  preview: variant => <DemoPopover labelledBy={variant === "aria-labelledby" ? "popover-options-name" : undefined} label="Options" />,
  code: variant =>
    variant === "aria-label"
      ? `<Popover open={open} anchorRef={anchorRef} aria-label="Options">\n  …\n</Popover>`
      : `<Button ref={anchorRef} id="options-name">Options</Button>\n<Popover open={open} anchorRef={anchorRef} aria-labelledby="options-name">\n  …\n</Popover>`,
} satisfies ComponentExample

export const popoverTheme = {
  name: "theme",
  description: "Pins token resolution to a theme; the surface takes that theme's raised background and base text color.",
  variants: ["day", "night"],
  default: "day",
  preview: variant => <DemoPopover theme={variant} />,
  code: variant => `<Popover open={open} anchorRef={anchorRef} theme="${variant}">\n  …\n</Popover>`,
} satisfies ComponentExample

/** Every Popover example facet — key order is the Popover/Docs-page order. */
export const popoverExamples = {
  open: popoverOpen,
  anchorRef: popoverAnchorRef,
  onOpenChange: popoverOnOpenChange,
  ignoreOutsideRefs: popoverIgnoreOutsideRefs,
  position: popoverPosition,
  align: popoverAlign,
  matchAnchorWidth: popoverMatchAnchorWidth,
  role: popoverRole,
  children: popoverChildren,
  ariaLabel: popoverAriaLabel,
  theme: popoverTheme,
} satisfies Record<string, ComponentExample>

/** Popover facets in Docs-page order. */
export const popoverExampleList: ComponentExample[] = Object.values(popoverExamples)

/** Props a Popover lifecycle step drives: open, and the side it opens on. */
type PopoverLifecycleProps = { open: boolean; position?: PopoverPositionType }

/**
 * Popover's lifecycle reachable through props, in order: closed → open →
 * open on the right → closed again by the loop. Escape and outside-pointerdown
 * dismissal are user events with no controlling prop, so they are not shown.
 */
export const popoverLifecycleSteps: ReadonlyArray<LifecycleStep<PopoverLifecycleProps>> = [
  { label: "closed", props: { open: false } },
  { label: "open", props: { open: true }, duration: "long" },
  { label: "open, right", props: { open: true, position: "right" }, duration: "long" },
]

/** The anchor Button and its Popover for one lifecycle step. */
const LifecyclePopover = ({ open, position }: PopoverLifecycleProps) => {
  const anchorRef = useRef<AnchorElement>(null)
  return (
    <Flex>
      <Button ref={anchorRef}>Options</Button>
      <Popover
        open={open}
        anchorRef={anchorRef}
        position={position}
        aria-label="Options"
      >
        <OptionList />
      </Popover>
    </Flex>
  )
}

/** Renders the anchored Popover for one lifecycle step. */
export const renderPopoverLifecycle = (props: PopoverLifecycleProps) => <LifecyclePopover {...props} />
