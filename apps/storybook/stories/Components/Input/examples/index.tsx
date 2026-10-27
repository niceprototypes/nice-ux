// Input example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `inputExamples`
// is the Input/Docs-page order; each Input/<facet>.mdx renders one entry.
import { useState } from "react"
import Input from "@niceprototypes/input"
import Button from "@niceprototypes/button"
import Icon from "@niceprototypes/icon"
import { cap } from "../../../../src/dataTables/utilities"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/** An interactive `end` slot: a clear button with its own accessible name. */
const ClearableInput = () => {
  const [value, setValue] = useState("Amsterdam")
  return (
    <Input
      aria-label="City"
      value={value}
      onChange={setValue}
      end={
        value ? (
          <Button
            iconLeft="x"
            size="smaller"
            aria-label="Clear city"
            onClick={() => setValue("")}
          />
        ) : null
      }
    />
  )
}

const typePlaceholder: Record<string, string> = {
  text: "Plain text",
  email: "name@example.com",
  password: "secret",
  number: "42",
  search: "Search…",
  tel: "+1 555 0100",
  url: "https://example.com",
}

export const inputType = {
  name: "type",
  description:
    "Sets the HTML type attribute of the native input. Text-style inputs only: text, email, password, number, search, tel and url.",
  variants: ["text", "email", "password", "number", "search", "tel", "url"],
  default: "text",
  preview: variant => (
    <Input
      type={variant}
      aria-label={cap(variant)}
      placeholder={typePlaceholder[variant]}
    />
  ),
  code: variant => (variant === "text" ? `<Input />` : `<Input type="${variant}" />`),
} satisfies ComponentExample

export const inputPlaceholder = {
  name: "placeholder",
  description:
    "Hint text shown while the input is empty. Its colour follows the status token matrix and dims further when disabled.",
  variants: ["name@example.com"],
  default: "none",
  preview: variant => (
    <Input
      aria-label="Email"
      placeholder={variant}
    />
  ),
  code: variant => `<Input placeholder="${variant}" />`,
} satisfies ComponentExample

export const inputFilled = {
  name: "filled",
  description:
    "Renders the input on the raised background with no border (a status-coloured border for error, success and warning) instead of the default outline.",
  variants: ["outline", "filled"],
  default: "outline",
  preview: variant => (
    <Input
      filled={variant === "filled"}
      aria-label={cap(variant)}
      placeholder={cap(variant)}
    />
  ),
  code: variant => (variant === "filled" ? `<Input filled />` : `<Input />`),
} satisfies ComponentExample

export const inputGhost = {
  name: "ghost",
  description:
    "Transparent background and border, so only the text and padding show. true: until the input is focused, then its normal colours. Per state (rest, hover, focus): e.g. ghosted while focused too, where the field keeps a focus outline from the input.focusRing tokens.",
  variants: ["outline", "ghost", "ghost when focused"],
  default: "outline",
  preview: variant => (
    <Input
      ghost={
        variant === "ghost"
          ? true
          : variant === "ghost when focused"
            ? { rest: true, hover: true, focus: true }
            : false
      }
      aria-label={cap(variant)}
      defaultValue={cap(variant)}
    />
  ),
  code: variant =>
    variant === "ghost"
      ? `<Input ghost />`
      : variant === "ghost when focused"
        ? `<Input ghost={{ rest: true, hover: true, focus: true }} />`
        : `<Input />`,
} satisfies ComponentExample

export const inputSize = {
  name: "size",
  description: "Scales the input's height, padding and font size using size tokens.",
  variants: ["smaller", "small", "base", "large", "larger"],
  preview: variant => (
    <Input
      size={variant}
      aria-label={cap(variant)}
      placeholder={cap(variant)}
    />
  ),
  code: variant => (variant === "base" ? `<Input />` : `<Input size="${variant}" />`),
} satisfies ComponentExample

export const inputStatus = {
  name: "status",
  description:
    "Applies a semantic status style (disabled, error, success or warning). disabled also disables the native control.",
  variants: ["base", "disabled", "error", "success", "warning"],
  preview: variant => (
    <Input
      status={variant}
      aria-label={cap(variant)}
      placeholder={cap(variant)}
    />
  ),
  code: variant => (variant === "base" ? `<Input />` : `<Input status="${variant}" />`),
} satisfies ComponentExample

export const inputDisabled = {
  name: "disabled",
  description:
    "Disables the native control and applies the disabled styling. Combined with status=\"disabled\": either one disables the input, as in Button, and a disabled input shows the disabled styling whatever its status.",
  variants: ["enabled", "disabled"],
  default: "enabled",
  preview: variant => (
    <Input
      disabled={variant === "disabled"}
      aria-label={cap(variant)}
      placeholder={cap(variant)}
    />
  ),
  code: variant => (variant === "disabled" ? `<Input disabled />` : `<Input />`),
} satisfies ComponentExample

export const inputBorderRadius = {
  name: "borderRadius",
  description: "Controls the corner rounding of the field chrome.",
  variants: ["none", "smaller", "small", "base", "large", "larger"],
  preview: variant => (
    <Input
      borderRadius={variant}
      aria-label={cap(variant)}
      placeholder={cap(variant)}
    />
  ),
  code: variant => (variant === "base" ? `<Input />` : `<Input borderRadius="${variant}" />`),
} satisfies ComponentExample

const widthPlaceholder: Record<string, string> = {
  "2": "12",
  "3": "123",
  "4": "1234",
  "5": "12345",
  "10": "0123456789",
  "20": "Street and number",
  full: "Full width",
}

export const inputWidth = {
  name: "width",
  description:
    "Width of the field chrome from the input.width token scale. Numeric variants hold that many characters at every size, hinting at the expected answer length; full (default) fills the container.",
  variants: ["2", "3", "4", "5", "10", "20", "full"],
  default: "full",
  preview: variant => (
    <Input
      width={variant}
      aria-label={`Width ${variant}`}
      placeholder={widthPlaceholder[variant]}
    />
  ),
  code: variant => (variant === "full" ? `<Input />` : `<Input width="${variant}" />`),
} satisfies ComponentExample

export const inputStart = {
  name: "start",
  description:
    "Content inside the field chrome before the native control, on the inline-start side. Input adds no aria-hidden: hide decorative content yourself, and give interactive content its own accessible name.",
  variants: [
    { variant: "search", type: "search", icon: "search", label: "Search" },
    { variant: "email", type: "email", icon: "mail", label: "Email" },
  ],
  default: "none",
  preview: item => (
    <Input
      type={item.type}
      aria-label={item.label}
      placeholder={item.label}
      start={
        <span aria-hidden="true">
          <Icon name={item.icon} />
        </span>
      }
    />
  ),
  code: item => `<Input
  type="${item.type}"
  aria-label="${item.label}"
  start={
    <span aria-hidden="true">
      <Icon name="${item.icon}" />
    </span>
  }
/>`,
} satisfies ComponentExample

export const inputEnd = {
  name: "end",
  description:
    "Content inside the field chrome after the native control, on the inline-end side. A button here stays in the tab order after the control; give it an aria-label that says what it does.",
  variants: ["clear", "decorative"],
  default: "none",
  preview: variant =>
    variant === "clear" ? (
      <ClearableInput />
    ) : (
      <Input
        aria-label="Website"
        placeholder="example.com"
        end={
          <span aria-hidden="true">
            <Icon name="link" />
          </span>
        }
      />
    ),
  code: variant =>
    variant === "clear"
      ? `<Input
  aria-label="City"
  value={value}
  onChange={setValue}
  end={
    <Button
      iconLeft="x"
      size="smaller"
      aria-label="Clear city"
      onClick={() => setValue("")}
    />
  }
/>`
      : `<Input
  aria-label="Website"
  end={
    <span aria-hidden="true">
      <Icon name="link" />
    </span>
  }
/>`,
} satisfies ComponentExample

export const inputAs = {
  name: "as",
  description:
    "Selects the native control inside the field chrome: input (default), select or textarea. ref points at that control. type and pattern apply to input, rows (a minimum; the textarea grows) to textarea, children to select. For options, a placeholder and a chevron, use @niceprototypes/select.",
  variants: ["input", "select", "textarea"],
  default: "input",
  preview: variant => {
    if (variant === "select")
      return (
        <Input
          as="select"
          aria-label="Country"
          defaultValue="nl"
        >
          <option value="nl">Netherlands</option>
          <option value="eg">Egypt</option>
        </Input>
      )
    if (variant === "textarea")
      return (
        <Input
          as="textarea"
          rows={3}
          aria-label="Notes"
          placeholder="Multiple lines"
        />
      )
    return (
      <Input
        aria-label="Name"
        placeholder="Single line"
      />
    )
  },
  code: variant => {
    if (variant === "select")
      return `<Input as="select">
  <option value="nl">Netherlands</option>
  <option value="eg">Egypt</option>
</Input>`
    if (variant === "textarea") return `<Input as="textarea" rows={3} />`
    return `<Input />`
  },
} satisfies ComponentExample

const inputModePlaceholder: Record<string, string> = {
  none: "No virtual keyboard",
  text: "Standard keyboard",
  tel: "Telephone keypad",
  url: "URL keyboard",
  email: "Email keyboard",
  numeric: "Digits 0–9",
  decimal: "Digits and separator",
  search: "Search keyboard",
}

export const inputInputMode = {
  name: "inputMode",
  description:
    "Virtual-keyboard hint (HTML inputmode). It changes which on-screen keyboard a touch device shows; it does not validate the value. Desktop browsers ignore it.",
  variants: ["none", "text", "tel", "url", "email", "numeric", "decimal", "search"],
  // No inputmode attribute by default; "none" is a real variant (no keyboard).
  default: "unset",
  preview: variant => (
    <Input
      inputMode={variant}
      aria-label={`inputMode ${variant}`}
      placeholder={inputModePlaceholder[variant]}
    />
  ),
  code: variant => `<Input inputMode="${variant}" />`,
} satisfies ComponentExample

export const inputEnterKeyHint = {
  name: "enterKeyHint",
  description:
    "Label hint for the virtual keyboard's enter key (HTML enterkeyhint). It changes only the key's label; the key still fires Enter and the action is yours. Visible on touch devices only.",
  variants: ["enter", "done", "go", "next", "previous", "search", "send"],
  default: "unset",
  preview: variant => (
    <Input
      enterKeyHint={variant}
      aria-label={`enterKeyHint ${variant}`}
      placeholder={variant}
    />
  ),
  code: variant => `<Input enterKeyHint="${variant}" />`,
} satisfies ComponentExample

export const inputDir = {
  name: "dir",
  description:
    "Text direction of the native control (HTML dir): ltr, rtl or auto (from the value's first strong character). The chrome and its slots follow the surrounding markup. dirName submits the resolved direction as a second form field.",
  variants: ["ltr", "rtl", "auto", "dirName"],
  default: "unset",
  preview: variant => {
    if (variant === "rtl")
      return (
        <Input
          dir="rtl"
          aria-label="الاسم"
          placeholder="الاسم الكامل"
        />
      )
    if (variant === "auto")
      return (
        <Input
          dir="auto"
          aria-label="Comment"
          defaultValue="مرحبا — typed text sets the direction"
        />
      )
    if (variant === "dirName")
      return (
        <Input
          dir="auto"
          name="comment"
          dirName="comment.dir"
          aria-label="Comment"
          placeholder="Comment"
        />
      )
    return (
      <Input
        dir="ltr"
        aria-label="Name"
        placeholder="Full name"
      />
    )
  },
  code: variant =>
    variant === "dirName"
      ? `<Input
  dir="auto"
  name="comment"
  dirName="comment.dir"
/>`
      : `<Input dir="${variant}" />`,
} satisfies ComponentExample

/** Every Input example facet — key order is the Input/Docs-page order. */
export const inputExamples = {
  type: inputType,
  placeholder: inputPlaceholder,
  filled: inputFilled,
  ghost: inputGhost,
  size: inputSize,
  status: inputStatus,
  disabled: inputDisabled,
  borderRadius: inputBorderRadius,
  width: inputWidth,
  start: inputStart,
  end: inputEnd,
  as: inputAs,
  inputMode: inputInputMode,
  enterKeyHint: inputEnterKeyHint,
  dir: inputDir,
} satisfies Record<string, ComponentExample>

/** Input facets in Docs-page order. */
export const inputExampleList: ComponentExample[] = Object.values(inputExamples)
