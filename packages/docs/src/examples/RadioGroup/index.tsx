// RadioGroup example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). ComponentDocs renders each entry as a section of the
// RadioGroup docs page, sorted by name.
import { useState } from "react"
import { Radio, RadioGroup } from "@niceprototypes/radio"
import { Field } from "@niceprototypes/field"
import Form from "@niceprototypes/form"
import Button from "@niceprototypes/button"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import { Theme, getToken } from "@niceprototypes/styles"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/** The three Radios every example renders. */
const Plans = () => (
  <>
    <Radio value="free">Free</Radio>
    <Radio value="pro">Pro</Radio>
    <Radio value="team">Team</Radio>
  </>
)

/** The Radios' JSX in code snippets, indented one level. */
const PLANS_CODE = `  <Radio value="free">Free</Radio>
  <Radio value="pro">Pro</Radio>
  <Radio value="team">Team</Radio>`

/** A controlled RadioGroup whose parent state starts at `initial`. */
const ControlledGroup = ({ initial }: { initial: string }) => {
  const [value, setValue] = useState(initial)
  return (
    <RadioGroup
      aria-label="Plan"
      value={value}
      onChange={setValue}
    >
      <Plans />
    </RadioGroup>
  )
}

/** Shows the value onChange receives. */
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
        <Plans />
      </RadioGroup>
      <Ink code>{last === null ? "–" : `onChange("${last}")`}</Ink>
    </Flex>
  )
}

export const radioGroupValue = {
  name: "value",
  description: "Value of the checked Radio, controlled by the parent. Pair it with onChange; without onChange the group is read-only.",
  variants: ["free", "pro"],
  default: "free",
  preview: variant => <ControlledGroup initial={variant} />,
  code: variant => `const [value, setValue] = useState("${variant}")

<RadioGroup aria-label="Plan" value={value} onChange={setValue}>
${PLANS_CODE}
</RadioGroup>`,
} satisfies ComponentExample

export const radioGroupDefaultValue = {
  name: "defaultValue",
  description: "Value of the Radio checked at first, when the group keeps its own state (uncontrolled). Without it, no Radio starts checked.",
  variants: ["none", "pro"],
  default: "none",
  preview: variant => (
    <RadioGroup
      aria-label="Plan"
      defaultValue={variant === "none" ? undefined : variant}
    >
      <Plans />
    </RadioGroup>
  ),
  code: variant => `<RadioGroup aria-label="Plan"${variant === "none" ? "" : ` defaultValue="${variant}"`}>
${PLANS_CODE}
</RadioGroup>`,
} satisfies ComponentExample

export const radioGroupOnChange = {
  name: "onChange",
  description: "Called with the newly checked Radio's value first, then the native change event.",
  variants: ["handler"],
  default: "handler",
  preview: () => <ReportingGroup />,
  code: () => `<RadioGroup aria-label="Plan" onChange={(value, event) => setLast(value)}>
${PLANS_CODE}
</RadioGroup>`,
} satisfies ComponentExample

export const radioGroupName = {
  name: "name",
  description: "Form field name shared by every native radio in the group, so the checked value submits with its form. Defaults to a generated id.",
  variants: ["plan"],
  default: "plan",
  preview: variant => (
    <RadioGroup
      aria-label="Plan"
      name={variant}
      defaultValue="free"
    >
      <Plans />
    </RadioGroup>
  ),
  code: variant => `<RadioGroup aria-label="Plan" name="${variant}" defaultValue="free">
${PLANS_CODE}
</RadioGroup>`,
} satisfies ComponentExample

export const radioGroupDisabled = {
  name: "disabled",
  description: "Disables every Radio in the group. A Radio's own disabled wins.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <RadioGroup
      aria-label="Plan"
      defaultValue="free"
      disabled={variant === "true"}
    >
      <Plans />
    </RadioGroup>
  ),
  code: variant => `<RadioGroup aria-label="Plan" defaultValue="free"${variant === "true" ? " disabled" : ""}>
${PLANS_CODE}
</RadioGroup>`,
} satisfies ComponentExample

export const radioGroupRequired = {
  name: "required",
  description:
    "Native required on every radio: the form does not submit until one is checked. Defaults to the enclosing Field's required. Press Continue with nothing checked to see the browser's message.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <Form aria-label="Plan">
      <Flex
        direction="column"
        gap="small"
      >
        <RadioGroup
          aria-label="Plan"
          required={variant === "true"}
        >
          <Plans />
        </RadioGroup>
        <Button type="submit">Continue</Button>
      </Flex>
    </Form>
  ),
  code: variant => `<Form aria-label="Plan">
  <RadioGroup aria-label="Plan"${variant === "true" ? " required" : ""}>
  ${PLANS_CODE.replace(/\n/g, "\n  ")}
  </RadioGroup>
  <Button type="submit">Continue</Button>
</Form>`,
} satisfies ComponentExample

export const radioGroupDirection = {
  name: "direction",
  description: "Stacks the Radios or sets them side by side.",
  variants: ["column", "row"],
  default: "column",
  preview: variant => (
    <RadioGroup
      aria-label="Plan"
      defaultValue="free"
      direction={variant}
    >
      <Plans />
    </RadioGroup>
  ),
  code: variant => `<RadioGroup aria-label="Plan" defaultValue="free"${variant === "column" ? "" : ` direction="${variant}"`}>
${PLANS_CODE}
</RadioGroup>`,
} satisfies ComponentExample

export const radioGroupGap = {
  name: "gap",
  description: "Space between Radios, from the core gap tokens.",
  variants: ["none", "smaller", "small", "base", "large", "larger"],
  default: "small",
  preview: variant => (
    <RadioGroup
      aria-label="Plan"
      defaultValue="free"
      gap={variant}
    >
      <Plans />
    </RadioGroup>
  ),
  code: variant => `<RadioGroup aria-label="Plan" defaultValue="free"${variant === "small" ? "" : ` gap="${variant}"`}>
${PLANS_CODE}
</RadioGroup>`,
} satisfies ComponentExample

export const radioGroupSize = {
  name: "size",
  description: "Circle and dot size of every Radio, from the radio.size and radio.dot.size component tokens. A Radio's own size wins.",
  variants: ["smaller", "small", "base", "large", "larger"],
  default: "base",
  preview: variant => (
    <RadioGroup
      aria-label="Plan"
      defaultValue="free"
      size={variant}
    >
      <Plans />
    </RadioGroup>
  ),
  code: variant => `<RadioGroup aria-label="Plan" defaultValue="free"${variant === "base" ? "" : ` size="${variant}"`}>
${PLANS_CODE}
</RadioGroup>`,
} satisfies ComponentExample

export const radioGroupBackgroundColor = {
  name: "backgroundColor",
  description: "Fill of the checked circle for every Radio, from the radio.backgroundColor component tokens. A Radio's own backgroundColor wins.",
  variants: ["base", "link", "success", "highlight", "warning", "error"],
  default: "base",
  preview: variant => (
    <RadioGroup
      aria-label="Plan"
      defaultValue="free"
      backgroundColor={variant}
    >
      <Plans />
    </RadioGroup>
  ),
  code: variant =>
    `<RadioGroup aria-label="Plan" defaultValue="free"${variant === "base" ? "" : ` backgroundColor="${variant}"`}>
${PLANS_CODE}
</RadioGroup>`,
} satisfies ComponentExample

export const radioGroupBorderColor = {
  name: "borderColor",
  description: "Border of the unchecked circles for every Radio, from the radio.borderColor component tokens. A Radio's own borderColor wins.",
  variants: ["base", "subtle", "strong", "stronger", "success", "highlight", "warning", "error", "link"],
  default: "base",
  preview: variant => (
    <RadioGroup
      aria-label="Plan"
      defaultValue="free"
      borderColor={variant}
    >
      <Plans />
    </RadioGroup>
  ),
  code: variant =>
    `<RadioGroup aria-label="Plan" defaultValue="free"${variant === "base" ? "" : ` borderColor="${variant}"`}>
${PLANS_CODE}
</RadioGroup>`,
} satisfies ComponentExample

export const radioGroupChildren = {
  name: "children",
  description: "The Radios. Each one's value is what the group checks and reports.",
  variants: ["Radio"],
  default: "Radio",
  preview: () => (
    <RadioGroup
      aria-label="Plan"
      defaultValue="free"
    >
      <Plans />
    </RadioGroup>
  ),
  code: () => `<RadioGroup aria-label="Plan" defaultValue="free">
${PLANS_CODE}
</RadioGroup>`,
} satisfies ComponentExample

export const radioGroupAriaLabel = {
  name: "aria-label",
  description:
    "The group needs an accessible name: aria-label, aria-labelledby pointing at the element that names it, or a Field, whose label names the group.",
  variants: ["aria-label", "aria-labelledby", "Field"],
  default: "aria-label",
  preview: variant =>
    variant === "aria-label" ? (
      <RadioGroup
        aria-label="Plan"
        defaultValue="free"
      >
        <Plans />
      </RadioGroup>
    ) : variant === "aria-labelledby" ? (
      <Flex
        direction="column"
        gap="small"
      >
        <Ink id="radio-group-plan-name">Plan</Ink>
        <RadioGroup
          aria-labelledby="radio-group-plan-name"
          defaultValue="free"
        >
          <Plans />
        </RadioGroup>
      </Flex>
    ) : (
      <Field label="Plan">
        <RadioGroup defaultValue="free">
          <Plans />
        </RadioGroup>
      </Field>
    ),
  code: variant =>
    variant === "aria-label"
      ? `<RadioGroup aria-label="Plan" defaultValue="free">
${PLANS_CODE}
</RadioGroup>`
      : variant === "aria-labelledby"
        ? `<Ink id="plan-name">Plan</Ink>
<RadioGroup aria-labelledby="plan-name" defaultValue="free">
${PLANS_CODE}
</RadioGroup>`
        : `<Field label="Plan">
  <RadioGroup defaultValue="free">
  ${PLANS_CODE.replace(/\n/g, "\n  ")}
  </RadioGroup>
</Field>`,
} satisfies ComponentExample

export const radioGroupTheme = {
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
        <RadioGroup
          aria-label="Plan"
          defaultValue="free"
          theme={variant}
        >
          <Plans />
        </RadioGroup>
      </Flex>
    </Theme>
  ),
  code: variant => `<RadioGroup aria-label="Plan" defaultValue="free" theme="${variant}">
${PLANS_CODE}
</RadioGroup>`,
} satisfies ComponentExample

/** Every RadioGroup example facet — each one a section of the RadioGroup docs page. */
export const radioGroupExamples = {
  value: radioGroupValue,
  defaultValue: radioGroupDefaultValue,
  onChange: radioGroupOnChange,
  name: radioGroupName,
  disabled: radioGroupDisabled,
  required: radioGroupRequired,
  direction: radioGroupDirection,
  gap: radioGroupGap,
  size: radioGroupSize,
  backgroundColor: radioGroupBackgroundColor,
  borderColor: radioGroupBorderColor,
  children: radioGroupChildren,
  "aria-label": radioGroupAriaLabel,
  theme: radioGroupTheme,
} satisfies Record<string, ComponentExample>
