// DateField example configs — one ComponentExample per facet, shaped like
// Button's (src/dataTables/data/tables/componentDemoTable). Key order in
// `dateFieldExamples` is the DateField/Docs-page order; each
// DateField/<facet>.mdx renders one entry.
import { useState } from "react"
import { DateField } from "nice-react-calendar"
import { Field } from "nice-react-field"
import Button from "nice-react-button"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/** Controlled DateField that prints the ISO value it holds. */
const ControlledDateField = () => {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div>
      <DateField
        aria-label="Start date"
        value={value}
        onChange={setValue}
        width="20"
      />
      <code>value: {JSON.stringify(value)}</code>
    </div>
  )
}

/** Submits the form and prints its FormData — the hidden input carries the ISO date. */
const FormDataDemo = () => {
  const [submitted, setSubmitted] = useState<Record<string, FormDataEntryValue> | null>(null)
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        setSubmitted(Object.fromEntries(new FormData(event.currentTarget)))
      }}
    >
      <DateField
        name="start"
        aria-label="Start date"
        defaultValue="2026-09-24"
        width="20"
      />
      <Button type="submit">Submit</Button>
      <code>FormData: {submitted ? JSON.stringify(submitted) : "—"}</code>
    </form>
  )
}

export const dateFieldValue = {
  name: "value",
  description:
    "Selected ISO YYYY-MM-DD date, or null for empty. The field is read-only and shows the value formatted for the locale; the calendar button opens the picker. onChange receives the ISO string. min, max, isDateDisabled and locale are passed to the Calendar.",
  variants: ["controlled", "uncontrolled"],
  default: "none",
  preview: variant =>
    variant === "controlled" ? (
      <ControlledDateField />
    ) : (
      <DateField
        aria-label="Booking date"
        defaultValue="2026-09-24"
        min="2026-09-01"
        max="2026-10-31"
        locale="de-DE"
        width="20"
      />
    ),
  code: variant =>
    variant === "controlled"
      ? `const [value, setValue] = useState(null)

<DateField
  aria-label="Start date"
  value={value}
  onChange={setValue}
/>`
      : `<DateField
  aria-label="Booking date"
  defaultValue="2026-09-24"
  min="2026-09-01"
  max="2026-10-31"
  locale="de-DE"
/>`,
} satisfies ComponentExample

export const dateFieldName = {
  name: "name",
  description:
    "Form field name, placed on a hidden input whose value is the ISO date (or \"\" when empty), so FormData receives YYYY-MM-DD rather than the formatted text. The visible input has no name.",
  variants: ["start"],
  default: "none",
  preview: () => <FormDataDemo />,
  code: () => `<form onSubmit={handleSubmit}>
  <DateField name="start" defaultValue="2026-09-24" />
  <Button type="submit">Submit</Button>
</form>

// new FormData(form).get("start") → "2026-09-24"`,
} satisfies ComponentExample

export const dateFieldInsideField = {
  name: "inside Field",
  description:
    "DateField renders through Input, so inside a Field the visible input takes the Field's id, label, description and error wiring, aria-invalid and required. No aria-label is needed.",
  variants: ["base", "invalid"],
  preview: variant =>
    variant === "invalid" ? (
      <Field
        label="Start date"
        error="Choose a start date."
        invalid
        required
      >
        <DateField
          name="start"
          status="error"
          width="20"
        />
      </Field>
    ) : (
      <Field
        label="Start date"
        description="The first day of the booking."
      >
        <DateField
          name="start"
          min="2026-09-01"
          width="20"
        />
      </Field>
    ),
  code: variant =>
    variant === "invalid"
      ? `<Field
  label="Start date"
  error="Choose a start date."
  invalid
  required
>
  <DateField name="start" status="error" />
</Field>`
      : `<Field
  label="Start date"
  description="The first day of the booking."
>
  <DateField name="start" min="2026-09-01" />
</Field>`,
} satisfies ComponentExample

/** Every DateField example facet — key order is the DateField/Docs-page order. */
export const dateFieldExamples = {
  value: dateFieldValue,
  name: dateFieldName,
  insideField: dateFieldInsideField,
} satisfies Record<string, ComponentExample>

/** DateField facets in Docs-page order. */
export const dateFieldExampleList: ComponentExample[] = Object.values(dateFieldExamples)
