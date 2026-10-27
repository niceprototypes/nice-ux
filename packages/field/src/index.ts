/**
 * @niceprototypes/field — form field composition for nice-react.
 *
 * Multi-component package (named exports, no default). `Field` wires a label,
 * description and error to one control through `useField()`; `Fieldset`
 * groups controls under a legend.
 */

export { Field, FieldContext, FieldTypes } from "./components/Field"
export type {
  FieldContextValue,
  FieldDescriptionType,
  FieldErrorType,
  FieldIdType,
  FieldInvalidType,
  FieldLabelType,
  FieldOptionalLabelType,
  FieldProps,
  FieldRequiredType,
  FieldThemeType,
} from "./components/Field"

export { Fieldset, FieldsetTypes } from "./components/Fieldset"
export type {
  FieldsetDescriptionType,
  FieldsetDisabledType,
  FieldsetLegendType,
  FieldsetProps,
  FieldsetThemeType,
} from "./components/Fieldset"

export { useField } from "./hooks/useField"

export { mergeDescribedBy } from "./services"
