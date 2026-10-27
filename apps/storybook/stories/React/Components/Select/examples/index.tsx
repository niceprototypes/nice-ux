// Select example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `selectExamples`
// is the Select/Docs-page order; each Select/<facet>.mdx renders one entry.
import Select from "nice-react-select"
import { Field } from "nice-react-field"
import Icon from "nice-react-icon"
import { cap } from "../../../../../src/dataTables/utilities"
import type { ComponentExample } from "./examples.types"
import type { LifecycleStep } from "../../../../../src/components/LifecycleStory"

export type { ComponentExample, ExampleVariant } from "./examples.types"

const countries = [
  { value: "nl", label: "Netherlands" },
  { value: "eg", label: "Egypt" },
  { value: "us", label: "United States" },
]

const sizes = [
  { value: "s", label: "Small" },
  { value: "m", label: "Medium" },
  { value: "l", label: "Large" },
]

// An array, not a Fragment: combobox mode reads only direct <option> /
// <optgroup> children (React.Children flattens arrays, not Fragments).
const timeZoneGroups = [
  <optgroup
    key="europe"
    label="Europe"
  >
    <option value="Europe/Amsterdam">Amsterdam</option>
    <option value="Europe/Berlin">Berlin</option>
  </optgroup>,
  <optgroup
    key="africa"
    label="Africa"
  >
    <option value="Africa/Cairo">Cairo</option>
    <option value="Africa/Lagos">Lagos</option>
  </optgroup>,
]

export const selectNative = {
  name: "native",
  description:
    "false (default) renders a WAI-ARIA select-only combobox: a read-only Input with role=\"combobox\" opening a Popover that holds a role=\"listbox\" List. true renders the platform <select> through Input's field chrome.",
  variants: ["combobox", "native"],
  default: "combobox",
  // Branch rather than native={boolean}: SelectProps is discriminated on
  // `native: true` vs `native?: false`.
  preview: variant =>
    variant === "native" ? (
      <Select
        native
        aria-label="Country"
        placeholder="Choose a country"
        options={countries}
      />
    ) : (
      <Select
        aria-label="Country"
        placeholder="Choose a country"
        options={countries}
      />
    ),
  code: variant =>
    variant === "native" ? `<Select native options={countries} />` : `<Select options={countries} />`,
} satisfies ComponentExample

export const selectOptions = {
  name: "options",
  description:
    "Array of { value, label, disabled?, start?, end? } in display order. A disabled option is listed but cannot be chosen. start / end render before / after the label in the combobox listbox only; a native <option> renders text only. Ignored when children are given.",
  variants: ["labels", "disabled", "start / end"],
  default: "labels",
  preview: variant => {
    if (variant === "disabled")
      return (
        <Select
          aria-label="Plan"
          defaultValue="team"
          options={[
            { value: "free", label: "Free" },
            { value: "team", label: "Team" },
            { value: "enterprise", label: "Enterprise", disabled: true },
          ]}
        />
      )
    if (variant === "start / end")
      return (
        <Select
          aria-label="Plan"
          defaultValue="team"
          options={[
            { value: "free", label: "Free", start: <Icon name="heart" /> },
            { value: "team", label: "Team", start: <Icon name="star" /> },
            { value: "enterprise", label: "Enterprise", start: <Icon name="lightning" />, end: "new" },
          ]}
        />
      )
    return (
      <Select
        aria-label="Plan"
        defaultValue="team"
        options={[
          { value: "free", label: "Free" },
          { value: "team", label: "Team" },
        ]}
      />
    )
  },
  code: variant => {
    if (variant === "disabled")
      return `<Select
  options={[
    { value: "free", label: "Free" },
    { value: "team", label: "Team" },
    { value: "enterprise", label: "Enterprise", disabled: true },
  ]}
/>`
    if (variant === "start / end")
      return `<Select
  options={[
    { value: "free", label: "Free", start: <Icon name="heart" /> },
    { value: "team", label: "Team", start: <Icon name="star" /> },
    {
      value: "enterprise",
      label: "Enterprise",
      start: <Icon name="lightning" />,
      end: "new",
    },
  ]}
/>`
    return `<Select
  options={[
    { value: "free", label: "Free" },
    { value: "team", label: "Team" },
  ]}
/>`
  },
} satisfies ComponentExample

export const selectChildren = {
  name: "children",
  description:
    "<option> / <optgroup> elements; they win over options. native renders them as-is. The combobox maps each <option> to a listbox option and flattens <optgroup> (options kept, group heading not rendered) — prefer options there.",
  variants: ["combobox", "native"],
  default: "combobox",
  preview: variant =>
    variant === "native" ? (
      <Select
        native
        aria-label="Time zone"
        defaultValue="Europe/Amsterdam"
      >
        {timeZoneGroups}
      </Select>
    ) : (
      <Select
        aria-label="Time zone"
        defaultValue="Europe/Amsterdam"
      >
        {timeZoneGroups}
      </Select>
    ),
  code: variant => `<Select${variant === "native" ? " native" : ""} defaultValue="Europe/Amsterdam">
  <optgroup label="Europe">
    <option value="Europe/Amsterdam">Amsterdam</option>
    <option value="Europe/Berlin">Berlin</option>
  </optgroup>
  <optgroup label="Africa">
    <option value="Africa/Cairo">Cairo</option>
    <option value="Africa/Lagos">Lagos</option>
  </optgroup>
</Select>`,
} satisfies ComponentExample

export const selectPlaceholder = {
  name: "placeholder",
  description:
    "Shown while the value is \"\" — the initial value when neither value nor defaultValue is given. It cannot be picked; a controlled select returns to it with value=\"\". Without a placeholder the first enabled option is selected.",
  variants: ["Pick a size", "none"],
  default: "none",
  preview: variant => (
    <Select
      aria-label="Size"
      placeholder={variant === "none" ? undefined : variant}
      options={sizes}
    />
  ),
  code: variant =>
    variant === "none" ? `<Select options={sizes} />` : `<Select placeholder="${variant}" options={sizes} />`,
} satisfies ComponentExample

export const selectSize = {
  name: "size",
  description:
    "Sizes the field chrome (through Input), the chevron (select.chevron.size) and the listbox items.",
  variants: ["smaller", "small", "base", "large", "larger"],
  preview: variant => (
    <Select
      size={variant}
      aria-label={cap(variant)}
      placeholder={cap(variant)}
      options={sizes}
    />
  ),
  code: variant => (variant === "base" ? `<Select />` : `<Select size="${variant}" />`),
} satisfies ComponentExample

export const selectStatus = {
  name: "status",
  description:
    "Passed through to Input's semantic chrome styles. disabled also stops the control from opening (or disables the native select) and dims the chevron; the disabled prop has the same effect.",
  variants: ["base", "disabled", "error", "success", "warning"],
  preview: variant => (
    <Select
      status={variant}
      aria-label={cap(variant)}
      placeholder={cap(variant)}
      options={sizes}
    />
  ),
  code: variant => (variant === "base" ? `<Select />` : `<Select status="${variant}" />`),
} satisfies ComponentExample

export const selectWidth = {
  name: "width",
  description:
    "Width of the field chrome, passed to Input (input.width token scale): numeric variants hold that many characters, full (default) fills the container. In combobox mode the listbox is at least as wide as the field.",
  variants: ["2", "3", "4", "5", "10", "20", "full"],
  default: "full",
  preview: variant => (
    <Select
      width={variant}
      aria-label={`Width ${variant}`}
      options={sizes}
    />
  ),
  code: variant => (variant === "full" ? `<Select />` : `<Select width="${variant}" />`),
} satisfies ComponentExample

export const selectInsideField = {
  name: "inside Field",
  description:
    "Inside a Field the control takes the Field's id, label, description and error wiring, aria-invalid and required — inherited from Input, so no aria-label is needed. In combobox mode the listbox is labelled by the Field label. invalid also shows the error status unless status is set.",
  variants: ["base", "invalid"],
  preview: variant =>
    variant === "invalid" ? (
      <Field
        label="Country"
        error="Choose a country to continue."
        invalid
      >
        <Select
          name="country"
          placeholder="Choose a country"
          options={countries}
        />
      </Field>
    ) : (
      <Field
        label="Country"
        description="Used for shipping and tax."
      >
        <Select
          name="country"
          placeholder="Choose a country"
          options={countries}
        />
      </Field>
    ),
  code: variant =>
    variant === "invalid"
      ? `<Field
  label="Country"
  error="Choose a country to continue."
  invalid
>
  <Select name="country" options={countries} />
</Field>`
      : `<Field
  label="Country"
  description="Used for shipping and tax."
>
  <Select name="country" options={countries} />
</Field>`,
} satisfies ComponentExample

/** Every Select example facet — key order is the Select/Docs-page order. */
export const selectExamples = {
  native: selectNative,
  options: selectOptions,
  children: selectChildren,
  placeholder: selectPlaceholder,
  size: selectSize,
  status: selectStatus,
  width: selectWidth,
  insideField: selectInsideField,
} satisfies Record<string, ComponentExample>

/** Select facets in Docs-page order. */
export const selectExampleList: ComponentExample[] = Object.values(selectExamples)

/** Props a Select lifecycle step drives: the controlled value, disabled, and the Field's invalid. */
type SelectLifecycleProps = { value: string; disabled?: boolean; invalid?: boolean }

/**
 * Select's lifecycle reachable through props, in order: rest → selected →
 * disabled → invalid. Hover, focus, open, option hover / active and close are
 * internal state with no controlling prop, so they are not shown.
 */
export const selectLifecycleSteps: ReadonlyArray<LifecycleStep<SelectLifecycleProps>> = [
  { label: "rest", props: { value: "" } },
  { label: "selected", props: { value: "nl" } },
  { label: "disabled", props: { value: "nl", disabled: true } },
  { label: "invalid", props: { value: "", invalid: true }, duration: "long" },
]

/** Renders the custom (combobox) Select inside a Field for one lifecycle step. */
export const renderSelectLifecycle = ({ value, disabled, invalid }: SelectLifecycleProps) => (
  <Field
    label="Country"
    error={invalid ? "Choose a country to continue." : undefined}
    invalid={invalid}
  >
    <Select
      name="country"
      placeholder="Choose a country"
      options={countries}
      value={value}
      disabled={disabled}
    />
  </Field>
)
