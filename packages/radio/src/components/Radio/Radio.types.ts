import type * as React from "react"
import type { ColorTokenProp } from "@niceprototypes/styles"
import type { RadioBackgroundColorType, RadioBorderColorType, RadioSizeType } from "../RadioGroup/RadioGroup.types"

/**
 * RadioValueType
 *
 * The value this Radio stands for; the group reports it to `onChange` when it is checked.
 */
export type RadioValueType = string

/**
 * RadioDisabledType
 *
 * Whether this Radio is disabled. Defaults to the group's `disabled`.
 */
export type RadioDisabledType = boolean

/**
 * RadioChildrenType
 *
 * Visible label next to the circle; the root is a `<label>`, so clicking the text checks it.
 */
export type RadioChildrenType = React.ReactNode

/**
 * RadioIdType
 *
 * id of the native radio.
 */
export type RadioIdType = string

/**
 * RadioRefType
 *
 * Ref to the native `<input type="radio">` (React 19 ref-as-prop).
 */
export type RadioRefType = React.Ref<HTMLInputElement>

/**
 * RadioProps
 *
 * Complete prop definition for the Radio component: a native `<input type="radio">` inside a
 * RadioGroup, visually replaced by a token-driven circle and dot. `size`, `backgroundColor` and
 * `borderColor` override the group's.
 */
export interface RadioProps {
  /** The value this Radio stands for */
  value: RadioValueType
  /** Disabled state; defaults to the group's */
  disabled?: RadioDisabledType
  /** Visible label next to the circle */
  children?: RadioChildrenType
  /** Circle and dot size; defaults to the group's */
  size?: RadioSizeType
  /** @token Fill when checked; defaults to the group's. Token-bound — accepts RadioBackgroundColorType variants only. */
  backgroundColor?: ColorTokenProp<RadioBackgroundColorType>
  /** @token Border when unchecked; defaults to the group's. Token-bound — accepts BorderColorType variants only. */
  borderColor?: ColorTokenProp<RadioBorderColorType>
  /** id of the native radio */
  id?: RadioIdType
  /** Ref to the native `<input type="radio">` */
  ref?: RadioRefType
}

// Declaration merging: const + namespace creates exportable type namespace
const RadioTypes = {} as const

namespace RadioTypes {
  export type Value = RadioValueType
  export type Disabled = RadioDisabledType
  export type Children = RadioChildrenType
  export type Size = RadioSizeType
  export type BackgroundColor = RadioBackgroundColorType
  export type BorderColor = RadioBorderColorType
  export type Id = RadioIdType
  export type Ref = RadioRefType
  export type Props = RadioProps
}

export default RadioTypes
