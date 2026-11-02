// Listbox example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). ComponentDocs renders each entry as a section of the
// Listbox docs page, sorted by name.
import { useState } from "react"
import Listbox from "@niceprototypes/listbox"
import type { ListboxActiveValueType, ListboxOptionsType } from "@niceprototypes/listbox"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import { Theme, getToken } from "@niceprototypes/styles"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/** The plain options most examples render. */
const LOOPS = [
  { value: "story", label: "Loop story" },
  { value: "chapter", label: "Loop chapter" },
  { value: "off", label: "No loop" },
] as const satisfies ListboxOptionsType

/** LOOPS in code snippets. */
const LOOPS_CODE = `const options = [
  { value: "story", label: "Loop story" },
  { value: "chapter", label: "Loop chapter" },
  { value: "off", label: "No loop" },
]`

/** The `options` variants: plain, grouped, and one disabled option. */
const OPTIONS: Record<string, { options: ListboxOptionsType; code: string }> = {
  flat: { options: LOOPS, code: LOOPS_CODE },
  grouped: {
    options: [
      {
        label: "Loop",
        options: [
          { value: "story", label: "Loop story" },
          { value: "chapter", label: "Loop chapter" },
        ],
      },
      { label: "Off", options: [{ value: "off", label: "No loop" }] },
    ],
    code: `const options = [
  {
    label: "Loop",
    options: [
      { value: "story", label: "Loop story" },
      { value: "chapter", label: "Loop chapter" },
    ],
  },
  { label: "Off", options: [{ value: "off", label: "No loop" }] },
]`,
  },
  disabled: {
    options: [
      { value: "story", label: "Loop story" },
      { value: "chapter", label: "Loop chapter", disabled: true },
      { value: "off", label: "No loop" },
    ],
    code: `const options = [
  { value: "story", label: "Loop story" },
  { value: "chapter", label: "Loop chapter", disabled: true },
  { value: "off", label: "No loop" },
]`,
  },
}

/** A controlled Listbox whose parent state starts at `initial`. */
const ControlledListbox = ({
  initial,
  options = LOOPS,
}: {
  initial: string
  options?: ListboxOptionsType
}) => {
  const [value, setValue] = useState(initial)
  return (
    <Listbox
      aria-label="Loop"
      options={options}
      value={value}
      onChange={setValue}
    />
  )
}

/** Shows the value onChange receives. */
const ReportingListbox = () => {
  const [value, setValue] = useState("story")
  const [last, setLast] = useState<string | null>(null)
  return (
    <Flex
      direction="column"
      gap="small"
    >
      <Listbox
        aria-label="Loop"
        options={LOOPS}
        value={value}
        onChange={next => {
          setValue(next)
          setLast(next)
        }}
      />
      <Ink code>{last === null ? "–" : `onChange("${last}")`}</Ink>
    </Flex>
  )
}

/** Shows the value onActiveChange receives. */
const ReportingActiveListbox = () => {
  const [last, setLast] = useState<ListboxActiveValueType | undefined>(undefined)
  return (
    <Flex
      direction="column"
      gap="small"
    >
      <Listbox
        aria-label="Loop"
        options={LOOPS}
        value="story"
        onActiveChange={setLast}
      />
      <Ink code>{last === undefined ? "–" : `onActiveChange(${last === null ? "null" : `"${last}"`})`}</Ink>
    </Flex>
  )
}

export const listboxOptions = {
  name: "options",
  description:
    "Required. Options and titled option groups, in array order. A disabled option is shown but cannot be chosen or made active; keyboard travel and typeahead skip group titles.",
  variants: ["flat", "grouped", "disabled"],
  default: "flat",
  preview: variant => (
    <ControlledListbox
      initial="story"
      options={OPTIONS[variant].options}
    />
  ),
  code: variant => `${OPTIONS[variant].code}

<Listbox aria-label="Loop" options={options} value={value} onChange={setValue} />`,
} satisfies ComponentExample

export const listboxValue = {
  name: "value",
  description:
    "Value of the selected option, controlled by the parent. Pair it with onChange. Undefined, or a value no option has, selects nothing.",
  variants: ["story", "off"],
  default: "story",
  preview: variant => <ControlledListbox initial={variant} />,
  code: variant => `const [value, setValue] = useState("${variant}")

<Listbox aria-label="Loop" options={options} value={value} onChange={setValue} />`,
} satisfies ComponentExample

export const listboxOnChange = {
  name: "onChange",
  description:
    "Called with the chosen option's value, then the click or Enter / Space keydown that chose it. It fires for the already selected option too.",
  variants: ["handler"],
  default: "handler",
  preview: () => <ReportingListbox />,
  code: () => `<Listbox
  aria-label="Loop"
  options={options}
  value={value}
  onChange={(value, event) => setValue(value)}
/>`,
} satisfies ComponentExample

export const listboxActiveValue = {
  name: "activeValue",
  description:
    "Value of the active option: the keyboard or pointer highlight. null is no active option; undefined lets the Listbox track it itself. Used with focusable={false} when another element drives the Listbox.",
  variants: ["chapter", "off"],
  default: "chapter",
  preview: variant => (
    <Listbox
      aria-label="Loop"
      options={LOOPS}
      value="story"
      focusable={false}
      activeValue={variant}
    />
  ),
  code: variant => `<Listbox
  aria-label="Loop"
  options={options}
  value="story"
  focusable={false}
  activeValue="${variant}"
/>`,
} satisfies ComponentExample

export const listboxOnActiveChange = {
  name: "onActiveChange",
  description:
    "Called with the option value that became active (pointer move, arrow keys, typeahead, focus), or null when the Listbox loses focus.",
  variants: ["handler"],
  default: "handler",
  preview: () => <ReportingActiveListbox />,
  code: () => `<Listbox
  aria-label="Loop"
  options={options}
  value="story"
  onActiveChange={value => setActive(value)}
/>`,
} satisfies ComponentExample

export const listboxFocusable = {
  name: "focusable",
  description:
    "True: the Listbox is a tab stop with its own keyboard handling (arrows, Home / End, PageUp / PageDown, Enter / Space, typeahead). False: another element keeps focus and drives activeValue, as in Select.",
  variants: ["true", "false"],
  default: "true",
  preview: variant =>
    variant === "true" ? (
      <ControlledListbox initial="story" />
    ) : (
      <Listbox
        aria-label="Loop"
        options={LOOPS}
        value="story"
        focusable={false}
      />
    ),
  code: variant =>
    variant === "true"
      ? `<Listbox aria-label="Loop" options={options} value={value} onChange={setValue} />`
      : `<Listbox aria-label="Loop" options={options} value="story" focusable={false} />`,
} satisfies ComponentExample

export const listboxSize = {
  name: "size",
  description: "Label text size, from the core fontSize tokens through Ink.",
  variants: ["smaller", "small", "base", "large", "larger"],
  default: "base",
  preview: variant => (
    <Listbox
      aria-label="Loop"
      options={LOOPS}
      value="story"
      size={variant}
    />
  ),
  code: variant =>
    variant === "base"
      ? `<Listbox aria-label="Loop" options={options} value="story" />`
      : `<Listbox aria-label="Loop" options={options} value="story" size="${variant}" />`,
} satisfies ComponentExample

export const listboxTheme = {
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
        <Listbox
          aria-label="Loop"
          options={LOOPS}
          value="story"
          theme={variant}
        />
      </Flex>
    </Theme>
  ),
  code: variant => `<Listbox aria-label="Loop" options={options} value="story" theme="${variant}" />`,
} satisfies ComponentExample

/** Every Listbox example facet — each one a section of the Listbox docs page. */
export const listboxExamples = {
  options: listboxOptions,
  value: listboxValue,
  onChange: listboxOnChange,
  activeValue: listboxActiveValue,
  onActiveChange: listboxOnActiveChange,
  focusable: listboxFocusable,
  size: listboxSize,
  theme: listboxTheme,
} satisfies Record<string, ComponentExample>
