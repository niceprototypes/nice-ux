import * as React from "react"
import type { ThemeType } from "nice-react-styles"

/**
 * FieldsetLegendType
 *
 * Group label, rendered inside a native `<legend>` — the fieldset's
 * accessible name.
 */
export type FieldsetLegendType = React.ReactNode

/**
 * FieldsetDescriptionType
 *
 * Helper text rendered after the legend and referenced by the fieldset's
 * `aria-describedby`.
 */
export type FieldsetDescriptionType = React.ReactNode

/**
 * FieldsetDisabledType
 *
 * Native `disabled` on the `<fieldset>`; disables every form control inside it.
 */
export type FieldsetDisabledType = boolean

/**
 * FieldsetThemeType
 *
 * Re-export of ThemeType from nice-styles.
 * Pin token resolution to a specific theme.
 * Extensible for consumer-defined custom themes.
 */
export type FieldsetThemeType = ThemeType

/**
 * FieldsetProps
 *
 * Complete prop definition for the Fieldset component.
 */
export interface FieldsetProps {
  /** Group label, rendered in a native `<legend>` */
  legend: FieldsetLegendType
  /** Helper text after the legend, referenced by `aria-describedby` */
  description?: FieldsetDescriptionType
  /** Grouped controls (typically Fields) */
  children: React.ReactNode
  /** Disables every control inside the fieldset */
  disabled?: FieldsetDisabledType
  /** CSS class name applied to the root element */
  className?: string
  /** Pin token resolution to a specific theme */
  theme?: FieldsetThemeType
  /** Ref to the `<fieldset>` element */
  ref?: React.Ref<HTMLFieldSetElement>
}

// Declaration merging: const + namespace creates exportable type namespace
const FieldsetTypes = {} as const

namespace FieldsetTypes {
  export type Legend = FieldsetLegendType
  export type Description = FieldsetDescriptionType
  export type Disabled = FieldsetDisabledType
  export type Theme = FieldsetThemeType
  export type Props = FieldsetProps
}

export default FieldsetTypes
