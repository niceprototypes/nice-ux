import * as React from "react"
import {
  SizeType,
  BorderWidthType,
  ThemeType,
  BackgroundColorType,
  BorderColorType,
  ColorTokenProp,
} from "nice-react-styles"

/**
 * InputBackgroundColorType
 *
 * @token Re-export of BackgroundColorType from nice-styles. Token-bound —
 * raw CSS color strings are not accepted. Resolved through the
 * `input.backgroundColor` component group.
 *
 * Values:
 * - "base", "raised", "success", "highlight", "warning", "error", "link"
 */
export type InputBackgroundColorType = BackgroundColorType

/**
 * InputBorderColorType
 *
 * @token Re-export of BorderColorType from nice-styles. Token-bound —
 * raw CSS color strings are not accepted. Resolved through the
 * `input.borderColor` component group.
 *
 * Values:
 * - "base", "subtle", "strong", "stronger", "success", "highlight",
 *   "warning", "error", "link"
 */
export type InputBorderColorType = BorderColorType

/**
 * InputBorderRadiusType
 *
 * Border radius variants for the input.
 *
 * Values:
 * - "none": Square corners
 * - "smaller" / "small": Subtle rounded corners
 * - "base": Default rounded corners
 * - "large" / "larger": More pronounced rounded corners
 */
export type InputBorderRadiusType =
  | "none"
  | "smaller"
  | "small"
  | "base"
  | "large"
  | "larger"

/**
 * InputStatusType
 *
 * Interactive status of the input (semantic variant). Maps 1:1 to the core
 * `color` / `borderColor` variants. Named `status` because `state` collides with
 * React's component-state convention.
 *
 * Values:
 * - "base": Default status
 * - "disabled": Non-interactive, dimmed
 * - "error": Validation error
 * - "success": Validation success
 * - "warning": Validation warning
 */
export type InputStatusType =
  | "base"
  | "disabled"
  | "error"
  | "success"
  | "warning"

/**
 * InputFilledType
 *
 * Whether the input renders filled. When true, the input sits on the raised
 * background variant with no border (status-colored border for error / success /
 * warning); when false (default) it is an outline on the base background.
 */
export type InputFilledType = boolean

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
export type InputElementType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "search"
  | "tel"
  | "url"

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
 * Placeholder text shown when the input is empty. Rendered on `<input>` and
 * `<textarea>` only — `placeholder` is not a valid `<select>` attribute, so it
 * is omitted for `as="select"` (use a leading empty `<option>` instead).
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
 * InputControlElementType
 *
 * The native form control Input renders, selected by `as`.
 *
 * Values:
 * - HTMLInputElement: `as="input"` (default)
 * - HTMLSelectElement: `as="select"`
 * - HTMLTextAreaElement: `as="textarea"`
 */
export type InputControlElementType =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement

/**
 * InputOnChangeType
 *
 * Change handler. Receives the new string value and the underlying event from
 * whichever native control `as` renders.
 */
export type InputOnChangeType = (
  value: string,
  event: React.ChangeEvent<InputControlElementType>
) => void

/**
 * InputOnFocusType
 *
 * Focus handler for the native control.
 */
export type InputOnFocusType = (
  event: React.FocusEvent<InputControlElementType>
) => void

/**
 * InputOnBlurType
 *
 * Blur handler for the native control.
 */
export type InputOnBlurType = (
  event: React.FocusEvent<InputControlElementType>
) => void

/**
 * InputOnKeyDownType
 *
 * Key-down handler for the native control.
 */
export type InputOnKeyDownType = (
  event: React.KeyboardEvent<InputControlElementType>
) => void

/**
 * InputAsType
 *
 * Native control rendered inside the field chrome. All three share the same
 * wrapper (height, padding, border, radius, background, focus ring).
 *
 * Values:
 * - "input": Single-line `<input>` (default); `type` applies
 * - "select": Native `<select>`; options are passed as `children`
 * - "textarea": Multi-line `<textarea>`; grows with content (`field-sizing: content`)
 */
export type InputAsType = "input" | "select" | "textarea"

/**
 * InputRefType
 *
 * Ref to the native control (React 19 ref-as-prop — no forwardRef). The element
 * depends on `as`; each `as` branch of InputProps narrows it:
 * - "input" / omitted: HTMLInputElement
 * - "select": HTMLSelectElement
 * - "textarea": HTMLTextAreaElement
 */
export type InputRefType = React.Ref<InputControlElementType>

/**
 * InputStartType
 *
 * Content rendered inside the field chrome before the native control, on the
 * inline-start side (left in LTR, right in RTL). Not forced `aria-hidden` —
 * mark purely decorative content hidden yourself; interactive content (e.g. a
 * button) stays reachable.
 */
export type InputStartType = React.ReactNode

/**
 * InputEndType
 *
 * Content rendered inside the field chrome after the native control, on the
 * inline-end side (right in LTR, left in RTL). Same accessibility rule as
 * InputStartType.
 */
export type InputEndType = React.ReactNode

/**
 * InputWidthType
 *
 * Width of the field chrome, from the `input.width` token scale. Numeric
 * variants are keyed to the expected answer length in characters (`ch`).
 *
 * Values:
 * - "2" / "3" / "4" / "5" / "10" / "20": Room for that many characters
 * - "full": Fill the container (default)
 */
export type InputWidthType = "2" | "3" | "4" | "5" | "10" | "20" | "full"

/**
 * InputRowsType
 *
 * Minimum visible text lines for `as="textarea"`. The textarea grows with its
 * content past this floor. Ignored for other `as` values.
 */
export type InputRowsType = number

/**
 * InputChildrenType
 *
 * `<option>` / `<optgroup>` content for `as="select"`. Ignored for other `as` values.
 */
export type InputChildrenType = React.ReactNode

/**
 * InputInputModeType
 *
 * Virtual-keyboard hint (HTML `inputmode`).
 *
 * Values:
 * - "none", "text", "tel", "url", "email", "numeric", "decimal", "search"
 */
export type InputInputModeType =
  | "none"
  | "text"
  | "tel"
  | "url"
  | "email"
  | "numeric"
  | "decimal"
  | "search"

/**
 * InputEnterKeyHintType
 *
 * Label hint for the virtual keyboard's enter key (HTML `enterkeyhint`).
 *
 * Values:
 * - "enter", "done", "go", "next", "previous", "search", "send"
 */
export type InputEnterKeyHintType =
  | "enter"
  | "done"
  | "go"
  | "next"
  | "previous"
  | "search"
  | "send"

/**
 * InputSpellCheckType
 *
 * Whether the browser spell-checks the value (HTML `spellcheck`).
 */
export type InputSpellCheckType = boolean

/**
 * InputDirType
 *
 * Text direction of the native control (HTML `dir`).
 *
 * Values:
 * - "ltr": Left-to-right
 * - "rtl": Right-to-left
 * - "auto": Derived from the value's first strong character
 */
export type InputDirType = "ltr" | "rtl" | "auto"

/**
 * InputDirNameType
 *
 * Form field name under which the control's directionality is submitted
 * (HTML `dirname`, e.g. `"comment.dir"`). Rendered as the lowercase `dirname`
 * attribute — React 19 does not map a camelCase `dirName`.
 */
export type InputDirNameType = string

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
 * InputRoleType
 *
 * ARIA role for the native control (HTML `role`). Restricted to the roles an
 * `<input>` / `<textarea>` / `<select>` that still behaves as a text-like value
 * control may legitimately take (ARIA in HTML): any other role (e.g. "button",
 * "listbox", "presentation") would misrepresent a focusable form control whose
 * value is edited or chosen in place. "combobox" is the one Select uses for the
 * WAI-ARIA select-only combobox (`<Input as="input" readOnly role="combobox">`).
 * Subset of React's `AriaRole`.
 *
 * Values:
 * - "combobox": Control that pops up a listbox / grid / tree / dialog of choices
 * - "searchbox": Text control for search queries
 * - "spinbutton": Control whose value steps through a numeric range
 * - "textbox": Free-form text control (the implicit role of a text input)
 */
export type InputRoleType = Extract<
  React.AriaRole,
  "combobox" | "searchbox" | "spinbutton" | "textbox"
>

/**
 * InputAriaExpandedType
 *
 * Whether the popup the control owns or controls is open (`aria-expanded`).
 * React's `aria-expanded` attribute type.
 */
export type InputAriaExpandedType = React.AriaAttributes["aria-expanded"]

/**
 * InputAriaControlsType
 *
 * Id reference(s) to the element(s) the control controls, e.g. a combobox's
 * listbox (`aria-controls`). React's `aria-controls` attribute type.
 */
export type InputAriaControlsType = React.AriaAttributes["aria-controls"]

/**
 * InputAriaActiveDescendantType
 *
 * Id of the currently active descendant (e.g. the highlighted option of a
 * combobox's listbox) while DOM focus stays on the control
 * (`aria-activedescendant`). React's `aria-activedescendant` attribute type.
 */
export type InputAriaActiveDescendantType =
  React.AriaAttributes["aria-activedescendant"]

/**
 * InputAriaHasPopupType
 *
 * Kind of popup the control opens (`aria-haspopup`). React's `aria-haspopup`
 * attribute type.
 *
 * Values:
 * - true / "true" (menu), false / "false", "menu", "listbox", "tree", "grid", "dialog"
 */
export type InputAriaHasPopupType = React.AriaAttributes["aria-haspopup"]

/**
 * InputAriaAutocompleteType
 *
 * How typed input drives suggestions in the popup (`aria-autocomplete`).
 * React's `aria-autocomplete` attribute type.
 *
 * Values:
 * - "none", "inline", "list", "both"
 */
export type InputAriaAutocompleteType =
  React.AriaAttributes["aria-autocomplete"]

/**
 * InputTestIdType
 *
 * Test selector.
 */
export type InputTestIdType = string

/**
 * InputBaseProps
 *
 * Props shared by every `as` branch of Input.
 */
export interface InputBaseProps {
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

  /** Placeholder text shown when the input is empty — not emitted for `as="select"` */
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
   * Interactive status (semantic variant)
   * @default "base"
   */
  status?: InputStatusType

  /**
   * Render filled instead of outlined
   * @default false
   */
  filled?: InputFilledType

  /** Size variant — uses SizeType from nice-styles */
  size?: SizeType

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

  /** Pin token resolution to a specific theme instead of responding to media query */
  theme?: ThemeType

  /**
   * @token Override background color — a BackgroundColorType variant or
   * `{ name, theme?, breakpoint?, inverse?, transform? }`, resolved through
   * `input.backgroundColor`. Raw CSS color strings are not accepted.
   */
  backgroundColor?: ColorTokenProp<InputBackgroundColorType>

  /**
   * @token Override border color — a BorderColorType variant or
   * `{ name, theme?, breakpoint?, inverse?, transform? }`, resolved through
   * `input.borderColor`. Raw CSS color strings are not accepted.
   */
  borderColor?: ColorTokenProp<InputBorderColorType>

  /**
   * Content before the native control, inside the chrome (inline-start side)
   */
  start?: InputStartType

  /**
   * Content after the native control, inside the chrome (inline-end side)
   */
  end?: InputEndType

  /**
   * Width of the field chrome from the `input.width` token scale
   * @default "full"
   */
  width?: InputWidthType

  /** Virtual-keyboard hint (`inputmode`) */
  inputMode?: InputInputModeType

  /** Enter-key label hint (`enterkeyhint`) */
  enterKeyHint?: InputEnterKeyHintType

  /** Browser spell-checking (`spellcheck`) */
  spellCheck?: InputSpellCheckType

  /** Text direction of the native control (`dir`) */
  dir?: InputDirType

  /** Form field name for submitting the control's directionality (rendered as `dirname`) */
  dirName?: InputDirNameType

  /** CSS class name applied to the root (wrapper) element */
  className?: InputClassNameType

  /** Inline styles applied to the root (wrapper) element */
  style?: React.CSSProperties

  /** Accessible label when no visible label is associated */
  "aria-label"?: InputAriaLabelType

  /** Id reference to descriptive text */
  "aria-describedby"?: InputAriaDescribedByType

  /** ARIA role of the native control — text-like control roles only */
  role?: InputRoleType

  /** Whether the controlled popup is open (native control) */
  "aria-expanded"?: InputAriaExpandedType

  /** Id(s) of the element(s) the native control controls */
  "aria-controls"?: InputAriaControlsType

  /** Id of the active descendant while focus stays on the native control */
  "aria-activedescendant"?: InputAriaActiveDescendantType

  /** Kind of popup the native control opens */
  "aria-haspopup"?: InputAriaHasPopupType

  /** How typed input drives the popup's suggestions */
  "aria-autocomplete"?: InputAriaAutocompleteType

  /** Test selector */
  "data-testid"?: InputTestIdType
}

/**
 * InputAsInputProps
 *
 * Input rendered as a native `<input>` (default).
 */
export interface InputAsInputProps extends InputBaseProps {
  /** Native control to render @default "input" */
  as?: "input"
  /** Ref to the native `<input>` */
  ref?: React.Ref<HTMLInputElement>
  /** HTML input type — text-style inputs only */
  type?: InputElementType
  rows?: never
  children?: never
}

/**
 * InputAsSelectProps
 *
 * Input rendered as a native `<select>`.
 */
export interface InputAsSelectProps extends InputBaseProps {
  /** Native control to render */
  as: "select"
  /** Ref to the native `<select>` */
  ref?: React.Ref<HTMLSelectElement>
  /** `<option>` / `<optgroup>` elements */
  children?: InputChildrenType
  type?: never
  rows?: never
}

/**
 * InputAsTextareaProps
 *
 * Input rendered as a native `<textarea>`.
 */
export interface InputAsTextareaProps extends InputBaseProps {
  /** Native control to render */
  as: "textarea"
  /** Ref to the native `<textarea>` */
  ref?: React.Ref<HTMLTextAreaElement>
  /** Minimum visible lines; the textarea grows with content past this */
  rows?: InputRowsType
  type?: never
  children?: never
}

/**
 * InputProps
 *
 * Complete prop definition for the Input component — one branch per `as`, so
 * `ref`, `type`, `rows` and `children` are typed for the element rendered.
 */
export type InputProps =
  | InputAsInputProps
  | InputAsSelectProps
  | InputAsTextareaProps

const InputTypes = {} as const

namespace InputTypes {
  export type BorderRadius = InputBorderRadiusType
  export type Status = InputStatusType
  export type Filled = InputFilledType
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
  export type Role = InputRoleType
  export type AriaExpanded = InputAriaExpandedType
  export type AriaControls = InputAriaControlsType
  export type AriaActiveDescendant = InputAriaActiveDescendantType
  export type AriaHasPopup = InputAriaHasPopupType
  export type AriaAutocomplete = InputAriaAutocompleteType
  export type TestId = InputTestIdType
  export type Theme = ThemeType
  export type BackgroundColor = InputBackgroundColorType
  export type BorderColor = InputBorderColorType
  export type ControlElement = InputControlElementType
  export type As = InputAsType
  export type Ref = InputRefType
  export type Start = InputStartType
  export type End = InputEndType
  export type Width = InputWidthType
  export type Rows = InputRowsType
  export type Children = InputChildrenType
  export type InputMode = InputInputModeType
  export type EnterKeyHint = InputEnterKeyHintType
  export type SpellCheck = InputSpellCheckType
  export type Dir = InputDirType
  export type DirName = InputDirNameType
  export type BaseProps = InputBaseProps
  export type AsInputProps = InputAsInputProps
  export type AsSelectProps = InputAsSelectProps
  export type AsTextareaProps = InputAsTextareaProps
  export type Props = InputProps
}

export default InputTypes
