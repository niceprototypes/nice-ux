// Field example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `fieldExamples`
// is the Field/Docs-page order; each Field/<facet>.mdx renders one entry.
import { useState } from "react"
import { Field, Fieldset, useField, mergeDescribedBy } from "nice-react-field"
import Input from "nice-react-input"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/** Validates on blur; sets `error` and `invalid` together. */
const ValidatedEmail = () => {
  const [value, setValue] = useState("")
  const [error, setError] = useState<string | undefined>(undefined)
  const validate = () => setError(value.includes("@") ? undefined : "Enter an email address with an @.")
  return (
    <Field
      label="Email"
      description="Validated when you leave the field."
      error={error}
      invalid={!!error}
    >
      <Input
        type="email"
        value={value}
        status={error ? "error" : "base"}
        onChange={setValue}
        onBlur={validate}
      />
    </Field>
  )
}

/** A custom control that applies the Field context itself. */
const VolumeSlider = ({
  "aria-describedby": ownDescribedBy,
  value,
  onChange,
}: {
  "aria-describedby"?: string
  value: number
  onChange: (value: number) => void
}) => {
  const field = useField()
  return (
    <input
      type="range"
      min={0}
      max={100}
      value={value}
      onChange={event => onChange(Number(event.target.value))}
      id={field?.id}
      aria-describedby={mergeDescribedBy(field?.describedBy, ownDescribedBy)}
      aria-invalid={field?.invalid ? true : undefined}
      required={field?.required}
    />
  )
}

const VolumeDemo = () => {
  const [volume, setVolume] = useState(40)
  return (
    <Field
      label="Volume"
      description={<span id="volume-hint">{volume}%</span>}
    >
      <VolumeSlider
        value={volume}
        onChange={setVolume}
      />
    </Field>
  )
}

export const fieldLabel = {
  name: "label",
  description:
    "Required. Visible label content, rendered in a native <label htmlFor={id}>, so it is the control's accessible name and clicking it focuses the control.",
  variants: ["base"],
  preview: () => (
    <Field label="Full name">
      <Input autoComplete="name" />
    </Field>
  ),
  code: () => `<Field label="Full name">
  <Input autoComplete="name" />
</Field>`,
} satisfies ComponentExample

export const fieldDescription = {
  name: "description",
  description:
    "Helper text rendered below the control. Its id is the first entry of the control's aria-describedby, so screen readers read it after the label.",
  variants: ["base"],
  preview: () => (
    <Field
      label="Username"
      description="Letters and digits, 3–16 characters."
    >
      <Input
        minLength={3}
        maxLength={16}
      />
    </Field>
  ),
  code: () => `<Field
  label="Username"
  description="Letters and digits, 3–16 characters."
>
  <Input minLength={3} maxLength={16} />
</Field>`,
} satisfies ComponentExample

export const fieldError = {
  name: "error",
  description:
    "Error message in an always-mounted polite live region below the description, so it is announced when it appears. While present, its id follows the description id in aria-describedby. Set it with invalid after a validation attempt. Leave the field empty and tab out to see it.",
  variants: ["onBlur"],
  default: "none",
  preview: () => <ValidatedEmail />,
  code: () => `<Field
  label="Email"
  error={error}
  invalid={!!error}
>
  <Input
    type="email"
    status={error ? "error" : "base"}
    onBlur={validate}
  />
</Field>`,
} satisfies ComponentExample

export const fieldInvalid = {
  name: "invalid",
  description:
    "Sets aria-invalid=\"true\" on the control while true, and no aria-invalid attribute otherwise (never \"false\"). It changes no visual style — set status=\"error\" on the control for that.",
  variants: ["false", "true"],
  default: "false",
  preview: (variant: string) =>
    variant === "true" ? (
      <Field
        label="Postcode"
        error="Enter a postcode like 1012 AB."
        invalid
      >
        <Input
          width="10"
          status="error"
          defaultValue="1012"
        />
      </Field>
    ) : (
      <Field label="Postcode">
        <Input
          width="10"
          defaultValue="1012 AB"
        />
      </Field>
    ),
  code: (variant: string) =>
    variant === "true"
      ? `<Field
  label="Postcode"
  error="Enter a postcode like 1012 AB."
  invalid
>
  <Input width="10" status="error" />
</Field>`
      : `<Field label="Postcode">
  <Input width="10" />
</Field>`,
} satisfies ComponentExample

export const fieldRequired = {
  name: "required",
  description:
    "Makes the control natively required (Input reads it from the Field context). The label renders no asterisk; optionalLabel renders only while required is false.",
  variants: ["false", "true"],
  default: "false",
  preview: (variant: string) => (
    <Field
      label="Last name"
      required={variant === "true"}
      optionalLabel="(optional)"
    >
      <Input autoComplete="family-name" />
    </Field>
  ),
  code: (variant: string) =>
    variant === "true"
      ? `<Field
  label="Last name"
  required
  optionalLabel="(optional)"
>
  <Input />
</Field>`
      : `<Field
  label="Last name"
  optionalLabel="(optional)"
>
  <Input />
</Field>`,
} satisfies ComponentExample

export const fieldOptionalLabel = {
  name: "optionalLabel",
  description:
    "Content rendered after the label, in the light text colour, when required is false. Nothing renders when it is unset or the Field is required.",
  variants: ["(optional)"],
  default: "none",
  preview: () => (
    <Field
      label="Company"
      optionalLabel="(optional)"
    >
      <Input autoComplete="organization" />
    </Field>
  ),
  code: () => `<Field
  label="Company"
  optionalLabel="(optional)"
>
  <Input />
</Field>`,
} satisfies ComponentExample

export const fieldFieldset = {
  name: "Fieldset",
  description:
    "Groups related Fields under a native <fieldset>. legend (required) names the group; description follows it and is referenced by the fieldset's aria-describedby. disabled is the native attribute: it disables every control inside without changing their status style.",
  variants: ["base", "disabled"],
  preview: (variant: string) => (
    <Fieldset
      legend="Shipping address"
      description="Where the order is delivered."
      disabled={variant === "disabled"}
    >
      <Field label="Street and number">
        <Input autoComplete="street-address" />
      </Field>
      <Field label="Postcode">
        <Input
          width="10"
          autoComplete="postal-code"
        />
      </Field>
    </Fieldset>
  ),
  code: (variant: string) => `<Fieldset
  legend="Shipping address"
  description="Where the order is delivered."${variant === "disabled" ? "\n  disabled" : ""}
>
  <Field label="Street and number">
    <Input autoComplete="street-address" />
  </Field>
  <Field label="Postcode">
    <Input width="10" autoComplete="postal-code" />
  </Field>
</Fieldset>`,
} satisfies ComponentExample

export const fieldUseField = {
  name: "useField",
  description:
    "Returns the enclosing Field's wiring — { id, labelId, descriptionId?, errorId?, describedBy?, invalid, required } — or null outside a Field. Input already applies it; a custom control applies it itself, merging its own aria-describedby with mergeDescribedBy.",
  variants: ["custom control"],
  default: "none",
  preview: () => <VolumeDemo />,
  code: () => `const VolumeSlider = ({ "aria-describedby": own, ...props }) => {
  const field = useField()
  return (
    <input
      type="range"
      {...props}
      id={field?.id}
      aria-describedby={mergeDescribedBy(field?.describedBy, own)}
      aria-invalid={field?.invalid ? true : undefined}
      required={field?.required}
    />
  )
}`,
} satisfies ComponentExample

/** Every Field example facet — key order is the Field/Docs-page order. */
export const fieldExamples = {
  label: fieldLabel,
  description: fieldDescription,
  error: fieldError,
  invalid: fieldInvalid,
  required: fieldRequired,
  optionalLabel: fieldOptionalLabel,
  Fieldset: fieldFieldset,
  useField: fieldUseField,
} satisfies Record<string, ComponentExample>

/** Field facets in Docs-page order. */
export const fieldExampleList: ComponentExample[] = Object.values(fieldExamples)
