import type * as React from "react"
import type { BorderColorType, ColorTokenProp, GapType, SizeType, ThemeType } from "@niceprototypes/styles"

/**
 * RadioGroupValueType
 *
 * Value of the checked Radio (controlled). Pair it with `onChange`.
 */
export type RadioGroupValueType = string

/**
 * RadioGroupDefaultValueType
 *
 * Value of the Radio checked at first (uncontrolled).
 */
export type RadioGroupDefaultValueType = string

/**
 * RadioGroupOnChangeType
 *
 * Change handler: the newly checked Radio's value first, then the native change event.
 */
export type RadioGroupOnChangeType = (value: string, event: React.ChangeEvent<HTMLInputElement>) => void

/**
 * RadioGroupNameType
 *
 * Form field name shared by every native radio in the group. Defaults to a generated id.
 */
export type RadioGroupNameType = string

/**
 * RadioGroupDisabledType
 *
 * Whether every Radio in the group is disabled.
 */
export type RadioGroupDisabledType = boolean

/**
 * RadioGroupRequiredType
 *
 * Whether a choice is required: native `required` on every radio. Defaults to the enclosing
 * Field's `required`.
 */
export type RadioGroupRequiredType = boolean

/**
 * RadioGroupDirectionType
 *
 * Flex direction of the Radios.
 *
 * Values:
 * - "row": side by side
 * - "column": stacked (default)
 */
export type RadioGroupDirectionType = "row" | "column"

/**
 * RadioGroupGapType
 *
 * Re-export of GapType from @niceprototypes/styles.
 * Space between Radios, from the core `gap` tokens.
 */
export type RadioGroupGapType = GapType

/**
 * RadioSizeType
 *
 * Re-export of SizeType from @niceprototypes/styles.
 * Circle and dot size, from the `radio.size` and `radio.dot.size` component tokens.
 *
 * Values:
 * - "smaller"
 * - "small"
 * - "base": default
 * - "large"
 * - "larger"
 */
export type RadioSizeType = SizeType

/**
 * RadioBackgroundColorType
 *
 * Fill of the circle when checked, from the `radio.backgroundColor` component tokens.
 *
 * Values:
 * - "base": the base text color, default
 * - "link"
 * - "success"
 * - "highlight"
 * - "warning"
 * - "error"
 */
export type RadioBackgroundColorType = "base" | "link" | "success" | "highlight" | "warning" | "error"

/**
 * RadioBorderColorType
 *
 * Re-export of BorderColorType from @niceprototypes/styles.
 * Border of the circle when unchecked, from the `radio.borderColor` component tokens.
 */
export type RadioBorderColorType = BorderColorType

/**
 * RadioGroupSizeType
 *
 * Size of every Radio in the group; a Radio's own `size` wins.
 */
export type RadioGroupSizeType = RadioSizeType

/**
 * RadioGroupBackgroundColorType
 *
 * Checked fill of every Radio in the group; a Radio's own `backgroundColor` wins.
 */
export type RadioGroupBackgroundColorType = ColorTokenProp<RadioBackgroundColorType>

/**
 * RadioGroupBorderColorType
 *
 * Unchecked border of every Radio in the group; a Radio's own `borderColor` wins.
 */
export type RadioGroupBorderColorType = ColorTokenProp<RadioBorderColorType>

/**
 * RadioGroupChildrenType
 *
 * The Radios.
 */
export type RadioGroupChildrenType = React.ReactNode

/**
 * RadioGroupAriaLabelType
 *
 * Accessible name of the group when no Field label names it.
 */
export type RadioGroupAriaLabelType = string

/**
 * RadioGroupAriaLabelledByType
 *
 * id(s) of the element(s) that name the group. Inside a Field, defaults to the Field label.
 */
export type RadioGroupAriaLabelledByType = string

/**
 * RadioGroupThemeType
 *
 * Re-export of ThemeType from @niceprototypes/styles.
 * Pin token resolution to a specific theme.
 */
export type RadioGroupThemeType = ThemeType

/**
 * RadioGroupRefType
 *
 * Ref to the `role="radiogroup"` element (React 19 ref-as-prop).
 */
export type RadioGroupRefType = React.Ref<HTMLDivElement>

/**
 * RadioGroupProps
 *
 * Complete prop definition for the RadioGroup component: a `role="radiogroup"` flex container
 * whose Radios share one native radio `name`.
 */
export interface RadioGroupProps {
  /** Checked value (controlled) */
  value?: RadioGroupValueType
  /** Initial checked value (uncontrolled) */
  defaultValue?: RadioGroupDefaultValueType
  /** Change handler: new value, then the native event */
  onChange?: RadioGroupOnChangeType
  /** Form field name shared by the radios */
  name?: RadioGroupNameType
  /** Disables every Radio */
  disabled?: RadioGroupDisabledType
  /** Native `required` on every radio */
  required?: RadioGroupRequiredType
  /**
   * Stack or row
   * @default "column"
   */
  direction?: RadioGroupDirectionType
  /**
   * Space between Radios
   * @default "small"
   */
  gap?: RadioGroupGapType
  /**
   * Circle and dot size
   * @default "base"
   */
  size?: RadioGroupSizeType
  /** @token Fill when checked. Token-bound — accepts RadioBackgroundColorType variants only. */
  backgroundColor?: RadioGroupBackgroundColorType
  /** @token Border when unchecked. Token-bound — accepts BorderColorType variants only. */
  borderColor?: RadioGroupBorderColorType
  /** The Radios */
  children?: RadioGroupChildrenType
  /** Accessible name when no Field label names the group */
  "aria-label"?: RadioGroupAriaLabelType
  /** id(s) of the element(s) that name the group */
  "aria-labelledby"?: RadioGroupAriaLabelledByType
  /** Pin token resolution to a specific theme */
  theme?: RadioGroupThemeType
  /** Ref to the radiogroup element */
  ref?: RadioGroupRefType
}

// Declaration merging: const + namespace creates exportable type namespace
const RadioGroupTypes = {} as const

namespace RadioGroupTypes {
  export type Value = RadioGroupValueType
  export type DefaultValue = RadioGroupDefaultValueType
  export type OnChange = RadioGroupOnChangeType
  export type Name = RadioGroupNameType
  export type Disabled = RadioGroupDisabledType
  export type Required = RadioGroupRequiredType
  export type Direction = RadioGroupDirectionType
  export type Gap = RadioGroupGapType
  export type Size = RadioGroupSizeType
  export type BackgroundColor = RadioGroupBackgroundColorType
  export type BorderColor = RadioGroupBorderColorType
  export type Children = RadioGroupChildrenType
  export type AriaLabel = RadioGroupAriaLabelType
  export type AriaLabelledBy = RadioGroupAriaLabelledByType
  export type Theme = RadioGroupThemeType
  export type Ref = RadioGroupRefType
  export type Props = RadioGroupProps
}

export default RadioGroupTypes
