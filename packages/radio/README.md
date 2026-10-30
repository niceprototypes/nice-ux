# @niceprototypes/radio

`RadioGroup` and `Radio`. Each Radio is a native `<input type="radio">`, invisible over a
token-driven circle that shows a dot when checked, inside a `<label>` with its text. The Radios
of a group share one native `name`, so the browser supplies the keyboard model: one tab stop,
arrow keys move and check, Space checks.

## Install

```sh
npm install @niceprototypes/radio
```

Peer dependencies: `@niceprototypes/field`, `@niceprototypes/ink`, `@niceprototypes/styles`, `react`, `react-dom`, `styled-components`.

## Usage

```tsx
import { Radio, RadioGroup } from "@niceprototypes/radio"

// Uncontrolled
<RadioGroup aria-label="Plan" defaultValue="free">
  <Radio value="free">Free</Radio>
  <Radio value="pro">Pro</Radio>
</RadioGroup>

// Controlled: onChange receives the value first, then the native event
const [plan, setPlan] = useState("free")
<RadioGroup aria-label="Plan" value={plan} onChange={setPlan} direction="row">
  <Radio value="free">Free</Radio>
  <Radio value="pro" disabled>Pro</Radio>
</RadioGroup>
```

## Props

Prop types are `RadioGroupProps` and `RadioProps`; allowed values per prop are in
`manifest/agents/catalog.json`. `size`, `backgroundColor`, `borderColor` and `disabled` set on the
group reach every Radio; a Radio's own prop wins.

## Field and Fieldset

Inside a `Field` (@niceprototypes/field) the group takes the Field's id and is named by the Field
label through `aria-labelledby` (the label's `for` points at a `div`, which does not name it). It
is described by the Field's description and error, takes `aria-invalid="true"` when the Field is
invalid, and every radio takes the Field's `required`.

Inside a `Fieldset`, the legend names the group of controls, and `Fieldset disabled` disables
every radio natively.

## Tokens

`radio.*` in `@niceprototypes/styles` (`src/tokens/components/radio.json`). Sizes, border width,
disabled opacity and focus-ring width and offset alias the Checkbox tokens; colours alias the
same core colours Checkbox uses.
