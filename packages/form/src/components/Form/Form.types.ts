import * as React from "react"
import type { ThemeType } from "nice-react-styles"

/**
 * FormOnSubmitType
 *
 * Submit handler. Receives the underlying form event. By default the
 * component calls `event.preventDefault()` before invoking this — see
 * FormPreventDefaultType.
 */
export type FormOnSubmitType = (event: React.FormEvent<HTMLFormElement>) => void

/**
 * FormPreventDefaultType
 *
 * Whether to call `event.preventDefault()` on submit before invoking
 * onSubmit. Defaults to true (single-page-app behavior — suppress native
 * navigation). Set false to allow a native form submission.
 */
export type FormPreventDefaultType = boolean

/**
 * FormNoValidateType
 *
 * Whether to disable native browser validation on submit.
 */
export type FormNoValidateType = boolean

/**
 * FormAutoCompleteType
 *
 * Browser autocomplete hint for the whole form, following the WHATWG autofill
 * grammar (a space-separated token sequence), so any string is accepted.
 *
 * Values:
 * - "on": Allow the browser to autocomplete fields
 * - "off": Disable autocomplete for fields
 * - token sequences: section and field tokens, e.g. "section-billing"
 *   or "shipping street-address"
 */
export type FormAutoCompleteType = string

/**
 * FormNameType
 *
 * Form name attribute.
 */
export type FormNameType = string

/**
 * FormIdType
 *
 * DOM id attribute.
 */
export type FormIdType = string

/**
 * FormClassNameType
 *
 * CSS class name applied to the root form element.
 */
export type FormClassNameType = string

/**
 * FormAriaLabelType
 *
 * Accessible label for the form when no visible label is associated.
 */
export type FormAriaLabelType = string

/**
 * FormAriaDescribedByType
 *
 * Id reference to descriptive text for the form.
 */
export type FormAriaDescribedByType = string

/**
 * FormTestIdType
 *
 * Test selector.
 */
export type FormTestIdType = string

/**
 * FormRefType
 *
 * Ref forwarded to the native `<form>` element. React 19 passes `ref` as a
 * plain prop to function components, so no forwardRef wrapper is involved.
 */
export type FormRefType = React.Ref<HTMLFormElement>

/**
 * FormProps
 *
 * Complete prop definition for the Form component. A stateless layout
 * container: it renders a semantic `<form>`, stacks its children vertically,
 * and forwards the submit event. It owns no field state — the consumer manages
 * values. Form applies no spacing between children; wrap them in a `Flex` if you
 * want a gap.
 */
export interface FormProps {
  /** Form fields and other content, stacked vertically */
  children: React.ReactNode

  /** Submit handler — receives the form event (default-prevented unless preventDefault is false) */
  onSubmit?: FormOnSubmitType

  /**
   * Call event.preventDefault() on submit before invoking onSubmit
   * @default true
   */
  preventDefault?: FormPreventDefaultType

  /** Disable native browser validation */
  noValidate?: FormNoValidateType

  /** Browser autocomplete hint */
  autoComplete?: FormAutoCompleteType

  /** Form name attribute */
  name?: FormNameType

  /** DOM id attribute */
  id?: FormIdType

  /** Pin token resolution to a specific theme instead of responding to media query */
  theme?: ThemeType

  /** CSS class name applied to the root form element */
  className?: FormClassNameType

  /** Inline styles applied to the root form element */
  style?: React.CSSProperties

  /** Accessible label when no visible label is associated */
  "aria-label"?: FormAriaLabelType

  /** Id reference to descriptive text */
  "aria-describedby"?: FormAriaDescribedByType

  /** Test selector */
  "data-testid"?: FormTestIdType

  /** Ref to the native `<form>` element */
  ref?: FormRefType
}

const FormTypes = {} as const

namespace FormTypes {
  export type OnSubmit = FormOnSubmitType
  export type PreventDefault = FormPreventDefaultType
  export type NoValidate = FormNoValidateType
  export type AutoComplete = FormAutoCompleteType
  export type Name = FormNameType
  export type Id = FormIdType
  export type ClassName = FormClassNameType
  export type AriaLabel = FormAriaLabelType
  export type AriaDescribedBy = FormAriaDescribedByType
  export type TestId = FormTestIdType
  export type Ref = FormRefType
  export type Theme = ThemeType
  export type Props = FormProps
}

export default FormTypes
