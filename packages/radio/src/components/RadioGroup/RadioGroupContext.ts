import * as React from "react"
import type { ColorTokenProp } from "@niceprototypes/styles"
import type {
  RadioBackgroundColorType,
  RadioBorderColorType,
  RadioGroupOnChangeType,
  RadioSizeType,
} from "./RadioGroup.types"

/**
 * RadioGroupContextValue
 *
 * What a RadioGroup hands its Radios: the shared native `name`, the checked value (controlled)
 * or initial value (uncontrolled), the change handler, and the group-wide state and appearance.
 */
export interface RadioGroupContextValue {
  name: string
  value?: string
  defaultValue?: string
  onChange?: RadioGroupOnChangeType
  disabled: boolean
  required: boolean
  size: RadioSizeType
  backgroundColor: ColorTokenProp<RadioBackgroundColorType>
  borderColor: ColorTokenProp<RadioBorderColorType>
}

/** null outside a RadioGroup. */
export const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)
