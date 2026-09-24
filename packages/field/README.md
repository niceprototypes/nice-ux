# nice-react-field

Form field composition for React. `Field` wires a label, description and error
to one control through `useField()`; `Fieldset` groups controls under a legend.
Part of the Nice Prototypes ecosystem.

## Install

```bash
npm install nice-react-field
```

Peer dependencies: `react`, `react-dom` (>=19.2), `styled-components` (>=6.1.18).

## Usage

```tsx
import { Field, Fieldset } from "nice-react-field"

<Fieldset legend="Contact">
  <Field label="Email" description="We never share it." error={error} invalid={!!error} required>
    <Input />
  </Field>
</Fieldset>
```

Multi-component package: named exports only, no default.

## Field

Renders a native `<label htmlFor={id}>`, the control, the description, and an
always-mounted polite live region (`aria-live="polite"`) that holds the error
while `error` is present. Empty, the region takes no space, and its id joins
`describedBy` only while an error is present.

| Prop | Type | Notes |
|---|---|---|
| `label` | `ReactNode` | Required. Rendered in the native `<label>` |
| `description` | `ReactNode` | Helper text below the control |
| `error` | `ReactNode` | Error message; shown in the always-mounted polite region |
| `invalid` | `boolean` | Control emits `aria-invalid="true"` only when true |
| `required` | `boolean` | Control emits native `required`. No asterisk is rendered |
| `optionalLabel` | `ReactNode` | Rendered after the label when `required` is false |
| `id` | `string` | Control id; defaults to `useId()` |
| `className`, `theme`, `ref`, `breakpoints` | | Standard |

In non-production builds, Field warns once if no element inside it carries the
control id after mount — the child did not apply `useField().id`.

## Fieldset

Native `<fieldset>` + `<legend>`. Props: `legend`, `description` (referenced by
`aria-describedby`), `disabled` (native), `children`, `className`, `theme`,
`ref`, `breakpoints`.

## Wiring a control

```tsx
import { useField, mergeDescribedBy } from "nice-react-field"

const Control = ({ "aria-describedby": describedBy, ...props }) => {
  const field = useField()
  return (
    <input
      {...props}
      id={field?.id ?? props.id}
      aria-describedby={mergeDescribedBy(field?.describedBy, describedBy)}
      aria-invalid={field?.invalid ? true : undefined}
      required={field?.required || props.required}
    />
  )
}
```

`useField()` returns `{ id, labelId, descriptionId?, errorId?, describedBy?, invalid, required }`,
or `null` outside a Field. `mergeDescribedBy` orders ids as
`[description, error, consumer]` and dedupes.

## Tokens

Spacing: `field.gap:label`, `field.gap:description`, `field.gap:error`.
Colours: core `color:light` (description, optional label), `color:error` (error), via Ink.

## License

MIT
