// Fieldset example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). ComponentDocs renders each entry as a section of the
// Fieldset docs page, sorted by name.
import { Field, Fieldset } from "@niceprototypes/field"
import { Radio, RadioGroup } from "@niceprototypes/radio"
import Input from "@niceprototypes/input"
import Flex from "@niceprototypes/flex"
import { Theme, getToken } from "@niceprototypes/styles"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/** The grouped Fields most examples render. */
const AddressFields = () => (
  <>
    <Field label="Street and number">
      <Input autoComplete="street-address" />
    </Field>
    <Field label="Postcode">
      <Input
        width="10"
        autoComplete="postal-code"
      />
    </Field>
  </>
)

/** AddressFields' JSX in code snippets, indented one level. */
const ADDRESS_CODE = `  <Field label="Street and number">
    <Input autoComplete="street-address" />
  </Field>
  <Field label="Postcode">
    <Input width="10" autoComplete="postal-code" />
  </Field>`

export const fieldsetLegend = {
  name: "legend",
  description: "Required. Group label in a native <legend>; it is the fieldset's accessible name.",
  variants: ["base"],
  preview: () => (
    <Fieldset legend="Delivery address">
      <AddressFields />
    </Fieldset>
  ),
  code: () => `<Fieldset legend="Delivery address">
${ADDRESS_CODE}
</Fieldset>`,
} satisfies ComponentExample

export const fieldsetDescription = {
  name: "description",
  description: "Helper text after the legend, referenced by the fieldset's aria-describedby. Without it, no aria-describedby is set.",
  variants: ["none", "text"],
  default: "none",
  preview: variant => (
    <Fieldset
      legend="Delivery address"
      description={variant === "text" ? "Where the order is delivered." : undefined}
    >
      <AddressFields />
    </Fieldset>
  ),
  code: variant =>
    variant === "text"
      ? `<Fieldset
  legend="Delivery address"
  description="Where the order is delivered."
>
${ADDRESS_CODE}
</Fieldset>`
      : `<Fieldset legend="Delivery address">
${ADDRESS_CODE}
</Fieldset>`,
} satisfies ComponentExample

export const fieldsetChildren = {
  name: "children",
  description: "Required. The grouped controls, typically Fields.",
  variants: ["Field", "RadioGroup"],
  default: "Field",
  preview: variant =>
    variant === "Field" ? (
      <Fieldset legend="Delivery address">
        <AddressFields />
      </Fieldset>
    ) : (
      <Fieldset legend="Delivery">
        <Field label="Speed">
          <RadioGroup defaultValue="standard">
            <Radio value="standard">Standard</Radio>
            <Radio value="express">Express</Radio>
          </RadioGroup>
        </Field>
      </Fieldset>
    ),
  code: variant =>
    variant === "Field"
      ? `<Fieldset legend="Delivery address">
${ADDRESS_CODE}
</Fieldset>`
      : `<Fieldset legend="Delivery">
  <Field label="Speed">
    <RadioGroup defaultValue="standard">
      <Radio value="standard">Standard</Radio>
      <Radio value="express">Express</Radio>
    </RadioGroup>
  </Field>
</Fieldset>`,
} satisfies ComponentExample

export const fieldsetDisabled = {
  name: "disabled",
  description: "Native disabled on the <fieldset>: disables every form control inside it.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <Fieldset
      legend="Delivery address"
      disabled={variant === "true"}
    >
      <AddressFields />
    </Fieldset>
  ),
  code: variant => `<Fieldset legend="Delivery address"${variant === "true" ? " disabled" : ""}>
${ADDRESS_CODE}
</Fieldset>`,
} satisfies ComponentExample

export const fieldsetTheme = {
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
        <Fieldset
          legend="Delivery address"
          description="Where the order is delivered."
          theme={variant}
        >
          <AddressFields />
        </Fieldset>
      </Flex>
    </Theme>
  ),
  code: variant => `<Fieldset
  legend="Delivery address"
  description="Where the order is delivered."
  theme="${variant}"
>
${ADDRESS_CODE}
</Fieldset>`,
} satisfies ComponentExample

/** Every Fieldset example facet — each one a section of the Fieldset docs page. */
export const fieldsetExamples = {
  legend: fieldsetLegend,
  description: fieldsetDescription,
  children: fieldsetChildren,
  disabled: fieldsetDisabled,
  theme: fieldsetTheme,
} satisfies Record<string, ComponentExample>
