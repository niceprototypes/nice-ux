// Form example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `formExamples`
// is the Form/Docs-page order; each Form/<facet>.mdx renders one entry.
import * as React from "react"
import { useState } from "react"
import Form from "nice-react-form"
import { Field } from "nice-react-field"
import Input from "nice-react-input"
import Button from "nice-react-button"
import Flex from "nice-react-flex"
import Ink from "nice-react-ink"
import { Theme, getToken } from "nice-react-styles"
import type { ComponentExample } from "./examples.types"
import type { LifecycleStep } from "../../../../../src/components/LifecycleStory"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/** An email Field with a submit Button, spaced by a Flex (Form applies no gap). */
const EmailFields = ({ error }: { error?: string }) => (
  <Flex
    direction="column"
    gap="small"
  >
    <Field
      label="Email"
      error={error}
      invalid={!!error}
    >
      <Input
        type="email"
        name="email"
        required
      />
    </Field>
    <Button type="submit">Subscribe</Button>
  </Flex>
)

/** Validates in onSubmit: an empty email shows the Field error. */
const ValidatedForm = ({ preventDefault }: { preventDefault?: boolean }) => {
  const [error, setError] = useState<string | undefined>(undefined)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // preventDefault={false} hands the event to the handler; this demo still
    // stops navigation so the docs page stays in place.
    if (preventDefault === false) event.preventDefault()
    const email = new FormData(event.currentTarget).get("email")
    setError(email ? undefined : "Enter an email address.")
  }
  return (
    <Form
      aria-label="Newsletter"
      noValidate
      preventDefault={preventDefault}
      onSubmit={onSubmit}
    >
      <EmailFields error={error} />
    </Form>
  )
}

export const formChildren = {
  name: "children",
  description:
    "Form fields and other content, stacked vertically in a column. Form applies no spacing between children — wrap them in a Flex for a gap.",
  variants: ["Flex", "none"],
  default: "Flex",
  preview: variant =>
    variant === "Flex" ? (
      <Form aria-label="Newsletter">
        <EmailFields />
      </Form>
    ) : (
      <Form aria-label="Newsletter">
        <Field label="Email">
          <Input
            type="email"
            name="email"
          />
        </Field>
        <Button type="submit">Subscribe</Button>
      </Form>
    ),
  code: variant =>
    variant === "Flex"
      ? `<Form>
  <Flex direction="column" gap="small">
    <Field label="Email">
      <Input type="email" name="email" />
    </Field>
    <Button type="submit">Subscribe</Button>
  </Flex>
</Form>`
      : `<Form>
  <Field label="Email">
    <Input type="email" name="email" />
  </Field>
  <Button type="submit">Subscribe</Button>
</Form>`,
} satisfies ComponentExample

export const formOnSubmit = {
  name: "onSubmit",
  description:
    "Submit handler; receives the form event, default-prevented unless preventDefault is false. Form owns no field state — read values from the event (FormData) or from your own state. Here an empty email shows the Field error.",
  variants: ["validate"],
  default: "validate",
  preview: () => <ValidatedForm />,
  code: () => `const onSubmit = event => {
  const email = new FormData(event.currentTarget).get("email")
  setError(email ? undefined : "Enter an email address.")
}

<Form noValidate onSubmit={onSubmit}>
  …
</Form>`,
} satisfies ComponentExample

export const formPreventDefault = {
  name: "preventDefault",
  description:
    "true (default) calls event.preventDefault() before onSubmit, suppressing native navigation. false leaves the event to the handler, for a native form submission. The false preview's handler prevents navigation itself so this page stays in place.",
  variants: ["true", "false"],
  default: "true",
  preview: variant => <ValidatedForm preventDefault={variant === "true"} />,
  code: variant =>
    variant === "false"
      ? `<Form preventDefault={false} onSubmit={onSubmit}>\n  …\n</Form>`
      : `<Form onSubmit={onSubmit}>\n  …\n</Form>`,
} satisfies ComponentExample

export const formNoValidate = {
  name: "noValidate",
  description:
    "Disables native browser validation on submit. false (default) lets the browser block submission of the required, empty email; true submits and leaves validation to onSubmit.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <Form
      aria-label="Newsletter"
      noValidate={variant === "true"}
    >
      <EmailFields />
    </Form>
  ),
  code: variant => (variant === "true" ? `<Form noValidate>\n  …\n</Form>` : `<Form>\n  …\n</Form>`),
} satisfies ComponentExample

export const formAutoComplete = {
  name: "autoComplete",
  description:
    "Browser autocomplete hint for the whole form, following the WHATWG autofill grammar: on, off, or a token sequence such as section-billing.",
  variants: ["on", "off", "section-billing"],
  default: "on",
  preview: variant => (
    <Form
      aria-label="Newsletter"
      autoComplete={variant}
    >
      <EmailFields />
    </Form>
  ),
  code: variant => `<Form autoComplete="${variant}">\n  …\n</Form>`,
} satisfies ComponentExample

export const formName = {
  name: "name",
  description: "Name attribute of the form element, which registers it in document.forms.",
  variants: ["newsletter"],
  default: "newsletter",
  preview: variant => (
    <Form
      aria-label="Newsletter"
      name={variant}
    >
      <EmailFields />
    </Form>
  ),
  code: variant => `<Form name="${variant}">\n  …\n</Form>`,
} satisfies ComponentExample

export const formAriaLabel = {
  name: "aria-label",
  description:
    "Accessible name when no visible heading labels the form; a named form is exposed as a form landmark.",
  variants: ["Newsletter"],
  default: "Newsletter",
  preview: variant => (
    <Form aria-label={variant}>
      <EmailFields />
    </Form>
  ),
  code: variant => `<Form aria-label="${variant}">\n  …\n</Form>`,
} satisfies ComponentExample

export const formAriaDescribedBy = {
  name: "aria-describedby",
  description: "Id of the element whose text describes the form, announced after its name.",
  variants: ["newsletter-note"],
  default: "newsletter-note",
  preview: variant => (
    <Flex
      direction="column"
      gap="small"
    >
      <Ink id={variant}>One email a month. Unsubscribe any time.</Ink>
      <Form
        aria-label="Newsletter"
        aria-describedby={variant}
      >
        <EmailFields />
      </Form>
    </Flex>
  ),
  code: variant => `<Ink id="${variant}">One email a month. Unsubscribe any time.</Ink>
<Form aria-label="Newsletter" aria-describedby="${variant}">
  …
</Form>`,
} satisfies ComponentExample

export const formTheme = {
  name: "theme",
  description:
    "Pins token resolution to a theme for the form and its children. The form has no background, so each preview sits on its theme's base background.",
  variants: ["day", "night"],
  default: "day",
  preview: variant => (
    <Theme name={variant}>
      <Flex
        padding="small"
        style={{ backgroundColor: getToken("backgroundColor", "base") }}
      >
        <Form
          aria-label="Newsletter"
          theme={variant}
        >
          <EmailFields />
        </Form>
      </Flex>
    </Theme>
  ),
  code: variant => `<Form theme="${variant}">\n  …\n</Form>`,
} satisfies ComponentExample

/** Every Form example facet — key order is the Form/Docs-page order. */
export const formExamples = {
  children: formChildren,
  onSubmit: formOnSubmit,
  preventDefault: formPreventDefault,
  noValidate: formNoValidate,
  autoComplete: formAutoComplete,
  name: formName,
  ariaLabel: formAriaLabel,
  ariaDescribedBy: formAriaDescribedBy,
  theme: formTheme,
} satisfies Record<string, ComponentExample>

/** Form facets in Docs-page order. */
export const formExampleList: ComponentExample[] = Object.values(formExamples)

/** Props a Form lifecycle step drives: the controlled email value and the Field error. */
type FormLifecycleProps = { value: string; error?: string }

/**
 * Form's lifecycle reachable through its children's props, in order: empty →
 * filled → invalid. Form itself has no visual state; submission is a user
 * event with no controlling prop, so it is not shown.
 */
export const formLifecycleSteps: ReadonlyArray<LifecycleStep<FormLifecycleProps>> = [
  { label: "empty", props: { value: "" } },
  { label: "filled", props: { value: "ada@example.com" } },
  { label: "invalid", props: { value: "ada", error: "Enter an email address with an @." }, duration: "long" },
]

/** Renders the newsletter Form with a controlled email for one lifecycle step. */
export const renderFormLifecycle = ({ value, error }: FormLifecycleProps) => (
  <Form aria-label="Newsletter">
    <Flex
      direction="column"
      gap="small"
    >
      <Field
        label="Email"
        error={error}
        invalid={!!error}
      >
        <Input
          type="email"
          name="email"
          value={value}
          onChange={() => {}}
        />
      </Field>
      <Button type="submit">Subscribe</Button>
    </Flex>
  </Form>
)
