import * as React from "react"
import type { ThemeType } from "@niceprototypes/styles"

/**
 * FieldLabelType
 *
 * Visible label content. Rendered inside a native `<label>` whose `htmlFor`
 * is the control id, so it is the control's accessible name.
 */
export type FieldLabelType = React.ReactNode

/**
 * FieldDescriptionType
 *
 * Helper text rendered below the control. When present, its id is the first
 * entry of `describedBy`.
 */
export type FieldDescriptionType = React.ReactNode

/**
 * FieldErrorType
 *
 * Error message rendered below the description in a polite live region.
 * The region is always mounted and empty without an error; its id follows
 * the description id in `describedBy` only while this is present.
 */
export type FieldErrorType = React.ReactNode

/**
 * FieldInvalidType
 *
 * Whether the control is invalid. Exposed through `useField().invalid`; the
 * control emits `aria-invalid="true"` only when this is true and never emits
 * `"false"`. Set it after a validation attempt, not on a pristine field.
 */
export type FieldInvalidType = boolean

/**
 * FieldRequiredType
 *
 * Whether the control is required. Exposed through `useField().required` for
 * the control's native `required` attribute. The label renders no asterisk.
 */
export type FieldRequiredType = boolean

/**
 * FieldOptionalLabelType
 *
 * Content rendered after the label when `required` is false, e.g.
 * "(optional)". Nothing is rendered when unset.
 */
export type FieldOptionalLabelType = React.ReactNode

/**
 * FieldIdType
 *
 * Id of the control. The child control must apply it (read it from
 * `useField().id`). Defaults to a `useId()` value.
 */
export type FieldIdType = string

/**
 * FieldThemeType
 *
 * Re-export of ThemeType from @niceprototypes/styles.
 * Pin token resolution to a specific theme.
 * Extensible for consumer-defined custom themes.
 */
export type FieldThemeType = ThemeType

/**
 * FieldContextValue
 *
 * Value returned by `useField()` inside a `Field`.
 *
 * - `id`: control id; the control must render it as its `id`
 * - `labelId`: id of the `<label>` element
 * - `descriptionId`: id of the description element, when a description is rendered
 * - `errorId`: id of the error region, only while an error is present
 * - `describedBy`: `[descriptionId, errorId]` (present ones) joined by a space;
 *   pass it with the control's own ids to `mergeDescribedBy`
 * - `invalid`: true only when the Field's `invalid` prop is true
 * - `required`: the Field's `required` prop, for the control's native `required`
 */
export interface FieldContextValue {
  id: string
  labelId: string
  descriptionId?: string
  errorId?: string
  describedBy?: string
  invalid: boolean
  required: boolean
}

/**
 * FieldProps
 *
 * Complete prop definition for the Field component.
 */
export interface FieldProps {
  /** Visible label, rendered in a native `<label htmlFor={id}>` */
  label: FieldLabelType
  /** Helper text below the control */
  description?: FieldDescriptionType
  /** Error message; shown in the always-mounted polite error region */
  error?: FieldErrorType
  /** Marks the control invalid (`aria-invalid="true"` via context) */
  invalid?: FieldInvalidType
  /** Marks the control required (native `required` via context) */
  required?: FieldRequiredType
  /** Rendered after the label when `required` is false */
  optionalLabel?: FieldOptionalLabelType
  /** Control id; defaults to `useId()` */
  id?: FieldIdType
  /** The control. It must apply `useField().id` as its `id` */
  children: React.ReactNode
  /** CSS class name applied to the root element */
  className?: string
  /** Pin token resolution to a specific theme */
  theme?: FieldThemeType
  /** Ref to the root element */
  ref?: React.Ref<HTMLDivElement>
}

// Declaration merging: const + namespace creates exportable type namespace
const FieldTypes = {} as const

namespace FieldTypes {
  export type Label = FieldLabelType
  export type Description = FieldDescriptionType
  export type Error = FieldErrorType
  export type Invalid = FieldInvalidType
  export type Required = FieldRequiredType
  export type OptionalLabel = FieldOptionalLabelType
  export type Id = FieldIdType
  export type Theme = FieldThemeType
  export type ContextValue = FieldContextValue
  export type Props = FieldProps
}

export default FieldTypes
