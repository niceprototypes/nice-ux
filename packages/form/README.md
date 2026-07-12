# nice-react-form

Stateless form container for the Nice ecosystem. Renders a semantic `<form>`,
stacks its children vertically, and forwards the submit event. It applies no
spacing of its own — wrap children in a [`Flex`](https://github.com/niceprototypes/nice-react-flex)
if you want a gap. It owns no field state — you manage values yourself (for example
via [nice-react-input](https://github.com/niceprototypes/nice-react-input)'s
controlled `value` / `onChange`).

## Install

```bash
npm install nice-react-form
```

## Usage

```tsx
import * as React from "react"
import Form from "nice-react-form"
import Input from "nice-react-input"
import Button from "nice-react-button"

function ContactForm() {
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")

  return (
    <Form onSubmit={() => console.log({ email, name })}>
      <Input value={email} onChange={setEmail} type="email" placeholder="Email" />
      <Input value={name} onChange={setName} placeholder="Name" />
      <Button type="submit">Save</Button>
    </Form>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Fields and content, stacked vertically |
| `onSubmit` | `(event) => void` | — | Submit handler (event is default-prevented unless `preventDefault` is false) |
| `preventDefault` | `boolean` | `true` | Call `event.preventDefault()` before `onSubmit` |
| `noValidate` | `boolean` | — | Disable native browser validation |
| `autoComplete` | `"on" \| "off"` | — | Browser autocomplete hint |
| `name` | `string` | — | Form name attribute |
| `id` | `string` | — | DOM id attribute |
| `theme` | `ThemeType` | — | Pin token resolution to `"day"` / `"night"` |
| `className` | `string` | — | Class applied to the root form element |
| `style` | `React.CSSProperties` | — | Inline styles on the root form element |
| `aria-label` | `string` | — | Accessible label |
| `aria-describedby` | `string` | — | Id reference to descriptive text |
| `data-testid` | `string` | — | Test selector |

Every prop also accepts per-viewport overrides through the `breakpoints` prop
(via `withBreakpoints`).

## Scope

This is a layout container only. Field state, validation, and submission logic
live in the consumer. Validation and a stateful `useForm` hook are intentionally
out of scope for this version.
