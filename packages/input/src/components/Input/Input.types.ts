import * as React from "react"
import { CellHeightType, BorderWidthType, ModeType } from "nice-react-styles"

/**
 * InputBorderRadiusType
 *
 * Border radius variants for the input.
 *
 * Values:
 * - "small": Subtle rounded corners
 * - "base": Default rounded corners
 * - "large": More pronounced rounded corners
 */
export type InputBorderRadiusType = "small" | "base" | "large"

/**
 * InputStateType
 *
 * Interactive state of the input. Affects styling based on context.
 *
 * Values:
 * - "base": Default state
 * - "disabled": Non-interactive, dimmed
 * - "error": Validation error
 * - "success": Validation success
 * - "warning": Validation warning
 */
export type InputStateType = "base" | "disabled" | "error" | "success" | "warning"

/**
 * InputStatusType
 *
 * Visual status/variant of the input.
 *
 * Values:
 * - "primary": Outlined input on a base background (default form input look)
 * - "secondary": Filled input on an alternate background (no border)
 */
export type InputStatusType = "primary" | "secondary"

/**
 * InputElementType
 *
 * HTML input type attribute. MVP scope — text-style inputs only.
 *
 * Values:
 * - "text": Default single-line text
 * - "email": Email address
 * - "password": Obscured value
 * - "number": Numeric value
 * - "search": Search query
 * - "tel": Telephone number
 * - "url": URL
 */
export type InputElementType = "text" | "email" | "password" | "number" | "search" | "tel" | "url"

/**
 * InputDisabledType
 *
 * Whether the input is disabled.
 */
export type InputDisabledType = boolean

/**
 * InputReadOnlyType
 *
 * Whether the input is read-only (visible but uneditable).
 */
export type InputReadOnlyType = boolean

/**
 * InputRequiredType
 *
 * Whether the input is required for form submission.
 */
export type InputRequiredType = boolean

/**
 * InputAutoFocusType
 *
 * Whether the input should auto-focus on mount.
 */
export type InputAutoFocusType = boolean

/**
 * InputValueType
 *
 * Controlled value.
 */
export type InputValueType = string

/**
 * InputDefaultValueType
 *
 * Uncontrolled initial value.
 */
export type InputDefaultValueType = string

/**
 * InputPlaceholderType
 *
 * Placeholder text shown when the input is empty.
 */
export type InputPlaceholderType = string

/**
 * InputNameType
 *
 * Form field name attribute.
 */
export type InputNameType = string

/**
 * InputIdType
 *
 * DOM id attribute.
 */
export type InputIdType = string

/**
 * InputAutoCompleteType
 *
 * Browser autocomplete hint.
 */
export type InputAutoCompleteType = string

/**
 * InputMaxLengthType
 *
 * Maximum number of characters.
 */
export type InputMaxLengthType = number

/**
 * InputMinLengthType
 *
 * Minimum number of characters.
 */
export type InputMinLengthType = number

/**
 * InputPatternType
 *
 * Regex pattern the value must match.
 */
export type InputPatternType = string

/**
 * InputOnChangeType
 *
 * Change handler. Receives the new string value and the underlying event.
 */
export type InputOnChangeType = (value: string, event: React.ChangeEvent<HTMLInputElement>) => void

/**
 * InputOnFocusType
 *
 * Focus handler.
 */
export type InputOnFocusType = (event: React.FocusEvent<HTMLInputElement>) => void

/**
 * InputOnBlurType
 *
 * Blur handler.
 */
export type InputOnBlurType = (event: React.FocusEvent<HTMLInputElement>) => void

/**
 * InputOnKeyDownType
 *
 * Key-down handler.
 */
export type InputOnKeyDownType = (event: React.KeyboardEvent<HTMLInputElement>) => void

/**
 * InputClassNameType
 *
 * CSS class name applied to the root element.
 */
export type InputClassNameType = string

/**
 * InputAriaLabelType
 *
 * Accessible label when no visible label is associated.
 */
export type InputAriaLabelType = string

/**
 * InputAriaDescribedByType
 *
 * Id reference to descriptive text (e.g., helper or error message).
 */
export type InputAriaDescribedByType = string

/**
 * InputTestIdType
 *
 * Test selector.
 */
export type InputTestIdType = string

/**
 * InputProps
 *
 * Complete prop definition for the Input component.
 */
export interface InputProps {
  /** Controlled value */
  value?: InputValueType

  /** Uncontrolled initial value */
  defaultValue?: InputDefaultValueType

  /** Change handler — receives the new string value and the event */
  onChange?: InputOnChangeType

  /** Focus handler */
  onFocus?: InputOnFocusType

  /** Blur handler */
  onBlur?: InputOnBlurType

  /** Key-down handler */
  onKeyDown?: InputOnKeyDownType

  /** HTML input type — text-style inputs only in MVP */
  type?: InputElementType

  /** Placeholder text shown when the input is empty */
  placeholder?: InputPlaceholderType

  /** Form field name attribute */
  name?: InputNameType

  /** DOM id attribute */
  id?: InputIdType

  /** Browser autocomplete hint */
  autoComplete?: InputAutoCompleteType

  /** Auto-focus on mount */
  autoFocus?: InputAutoFocusType

  /** Read-only state */
  readOnly?: InputReadOnlyType

  /** Required for form submission */
  required?: InputRequiredType

  /** Maximum character length */
  maxLength?: InputMaxLengthType

  /** Minimum character length */
  minLength?: InputMinLengthType

  /** Regex pattern the value must match */
  pattern?: InputPatternType

  /**
   * Visual status/variant
   * @default "primary"
   */
  status?: InputStatusType

  /** Size variant — uses CellHeightType from nice-styles */
  size?: CellHeightType

  /**
   * Interactive state
   * @default "base"
   */
  state?: InputStateType

  /**
   * Border radius
   * @default "base"
   */
  borderRadius?: InputBorderRadiusType

  /**
   * Border width
   * @default "base"
   */
  borderWidth?: BorderWidthType

  /** Pin token resolution to a specific mode instead of responding to media query */
  mode?: ModeType

  /** Override background color (CSS value or var reference) */
  backgroundColor?: string

  /** Override border color (CSS value or var reference) */
  borderColor?: string

  /** CSS class name applied to the root element */
  className?: InputClassNameType

  /** Inline styles applied to the root element */
  style?: React.CSSProperties

  /** Accessible label when no visible label is associated */
  "aria-label"?: InputAriaLabelType

  /** Id reference to descriptive text */
  "aria-describedby"?: InputAriaDescribedByType

  /** Test selector */
  "data-testid"?: InputTestIdType
}

const InputTypes = {} as const

namespace InputTypes {
  export type BorderRadius = InputBorderRadiusType
  export type State = InputStateType
  export type Status = InputStatusType
  export type Element = InputElementType
  export type Disabled = InputDisabledType
  export type ReadOnly = InputReadOnlyType
  export type Required = InputRequiredType
  export type AutoFocus = InputAutoFocusType
  export type Value = InputValueType
  export type DefaultValue = InputDefaultValueType
  export type Placeholder = InputPlaceholderType
  export type Name = InputNameType
  export type Id = InputIdType
  export type AutoComplete = InputAutoCompleteType
  export type MaxLength = InputMaxLengthType
  export type MinLength = InputMinLengthType
  export type Pattern = InputPatternType
  export type OnChange = InputOnChangeType
  export type OnFocus = InputOnFocusType
  export type OnBlur = InputOnBlurType
  export type OnKeyDown = InputOnKeyDownType
  export type ClassName = InputClassNameType
  export type AriaLabel = InputAriaLabelType
  export type AriaDescribedBy = InputAriaDescribedByType
  export type TestId = InputTestIdType
  export type Mode = ModeType
  export type Props = InputProps
}

export default InputTypes