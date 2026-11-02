// Radio example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). ComponentDocs renders each entry as a section of the
// Radio docs page, sorted by name. A Radio always renders inside a RadioGroup, which owns the checked state.
import { useState } from "react"
import { Radio, RadioGroup } from "@niceprototypes/radio"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/** Shows the value the group's onChange receives for the checked Radio. */
const ReportingGroup = () => {
  const [last, setLast] = useState<string | null>(null)
  return (
    <Flex
      direction="column"
      gap="small"
    >
      <RadioGroup
        aria-label="Plan"
        onChange={setLast}
      >
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
      </RadioGroup>
      <Ink code>{last === null ? "–" : `onChange("${last}")`}</Ink>
    </Flex>
  )
}

export const radioValue = {
  name: "value",
  description: "Required. The value this Radio stands for; the group reports it to onChange when the Radio is checked.",
  variants: ["base"],
  preview: () => <ReportingGroup />,
  code: () => `<RadioGroup aria-label="Plan" onChange={value => setLast(value)}>
  <Radio value="free">Free</Radio>
  <Radio value="pro">Pro</Radio>
</RadioGroup>`,
} satisfies ComponentExample

export const radioDisabled = {
  name: "disabled",
  description: "Disables this Radio only. Defaults to the group's disabled.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <RadioGroup
      aria-label="Plan"
      defaultValue="free"
    >
      <Radio value="free">Free</Radio>
      <Radio
        value="team"
        disabled={variant === "true"}
      >
        Team
      </Radio>
    </RadioGroup>
  ),
  code: variant => `<RadioGroup aria-label="Plan" defaultValue="free">
  <Radio value="free">Free</Radio>
  <Radio value="team"${variant === "true" ? " disabled" : ""}>Team</Radio>
</RadioGroup>`,
} satisfies ComponentExample

export const radioChildren = {
  name: "children",
  description: "Visible label next to the circle. The root is a label, so clicking the text checks the Radio.",
  variants: ["label"],
  default: "label",
  preview: () => (
    <RadioGroup aria-label="Plan">
      <Radio value="free">Free</Radio>
    </RadioGroup>
  ),
  code: () => `<RadioGroup aria-label="Plan">
  <Radio value="free">Free</Radio>
</RadioGroup>`,
} satisfies ComponentExample

export const radioSize = {
  name: "size",
  description: "Circle and dot size, from the radio.size and radio.dot.size component tokens. Defaults to the group's size.",
  variants: ["smaller", "small", "base", "large", "larger"],
  default: "base",
  preview: variant => (
    <RadioGroup
      aria-label="Plan"
      defaultValue="free"
    >
      <Radio
        value="free"
        size={variant}
      >
        Free
      </Radio>
    </RadioGroup>
  ),
  code: variant =>
    variant === "base"
      ? `<Radio value="free">Free</Radio>`
      : `<Radio value="free" size="${variant}">Free</Radio>`,
} satisfies ComponentExample

export const radioBackgroundColor = {
  name: "backgroundColor",
  description: "Fill of the circle when checked, from the radio.backgroundColor component tokens. Defaults to the group's backgroundColor.",
  variants: ["base", "link", "success", "highlight", "warning", "error"],
  default: "base",
  preview: variant => (
    <RadioGroup
      aria-label="Plan"
      defaultValue="free"
    >
      <Radio
        value="free"
        backgroundColor={variant}
      >
        Free
      </Radio>
    </RadioGroup>
  ),
  code: variant =>
    variant === "base"
      ? `<Radio value="free">Free</Radio>`
      : `<Radio value="free" backgroundColor="${variant}">Free</Radio>`,
} satisfies ComponentExample

export const radioBorderColor = {
  name: "borderColor",
  description: "Border of the circle when unchecked, from the radio.borderColor component tokens. Defaults to the group's borderColor.",
  variants: ["base", "subtle", "strong", "stronger", "success", "highlight", "warning", "error", "link"],
  default: "base",
  preview: variant => (
    <RadioGroup aria-label="Plan">
      <Radio
        value="free"
        borderColor={variant}
      >
        Free
      </Radio>
    </RadioGroup>
  ),
  code: variant =>
    variant === "base"
      ? `<Radio value="free">Free</Radio>`
      : `<Radio value="free" borderColor="${variant}">Free</Radio>`,
} satisfies ComponentExample

/** Every Radio example facet — each one a section of the Radio docs page. */
export const radioExamples = {
  value: radioValue,
  disabled: radioDisabled,
  children: radioChildren,
  size: radioSize,
  backgroundColor: radioBackgroundColor,
  borderColor: radioBorderColor,
} satisfies Record<string, ComponentExample>
