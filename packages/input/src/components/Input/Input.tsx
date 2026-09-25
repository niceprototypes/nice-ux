import * as React from "react"
import { Theme } from "nice-react-styles"
import { mergeDescribedBy, useField } from "nice-react-field"
import { StyledControl, StyledField } from "./Input.styles"
import { InputProps } from "./Input.types"
import { isDisabled } from "../../utilities/isDisabled"

const Input: React.FC<InputProps> = ({
  "aria-activedescendant": ariaActiveDescendant,
  "aria-autocomplete": ariaAutocomplete,
  "aria-controls": ariaControls,
  "aria-describedby": ariaDescribedBy,
  "aria-expanded": ariaExpanded,
  "aria-haspopup": ariaHasPopup,
  "aria-label": ariaLabel,
  as = "input",
  autoComplete,
  autoFocus = false,
  backgroundColor,
  borderColor,
  borderRadius = "base",
  borderWidth = "base",
  children,
  className,
  "data-testid": testId,
  defaultValue,
  dir,
  dirName,
  end,
  enterKeyHint,
  filled = false,
  id,
  inputMode,
  maxLength,
  minLength,
  theme,
  name,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  pattern,
  placeholder,
  readOnly = false,
  ref,
  required = false,
  role,
  rows,
  size = "base",
  spellCheck,
  start,
  status = "base",
  style,
  type = "text",
  value,
  width = "full",
}) => {
  const disabled = isDisabled(status)
  // Enclosing Field wiring (null outside a Field): id for the label, the
  // description/error ids, invalid and required.
  const fieldContext = useField()

  // Attributes that only exist on one element. `type` is an <input> attribute;
  // `rows` a <textarea> one; `pattern` does not apply to <select>/<textarea>.
  // React 19 has no camelCase mapping for `dirname`, so it is passed lowercase
  // (a camelCase `dirName` renders verbatim and triggers an unknown-prop warning).
  const elementProps =
    as === "input" ? { type, pattern } : as === "textarea" ? { rows } : {}
  const dirNameAttribute =
    dirName === undefined
      ? {}
      : ({ dirname: dirName } as Record<string, string>)

  const field = (
    <StyledField
      $as={as}
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
      $borderRadius={borderRadius}
      $borderWidth={borderWidth}
      $disabled={disabled}
      $filled={filled}
      $size={size}
      $status={status}
      $width={width}
      className={className}
      style={style}
    >
      {start}
      <StyledControl
        as={as}
        $as={as}
        $disabled={disabled}
        $rows={rows}
        $size={size}
        {...elementProps}
        {...dirNameAttribute}
        // StyledControl is typed as <input>; the rendered element is chosen at
        // runtime by `as`, and InputProps narrows `ref` per branch, so the
        // union is narrowed to the base element here (same as Button).
        ref={ref as React.Ref<HTMLInputElement>}
        // Combobox / popup semantics live on the native control (never the
        // wrapper) so Select can render a select-only combobox through Input.
        role={role}
        aria-activedescendant={ariaActiveDescendant}
        aria-autocomplete={ariaAutocomplete}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        aria-haspopup={ariaHasPopup}
        aria-describedby={mergeDescribedBy(
          fieldContext?.describedBy,
          ariaDescribedBy
        )}
        // Only ever "true" — never render aria-invalid="false"
        aria-invalid={fieldContext?.invalid ? true : undefined}
        aria-label={ariaLabel}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        data-testid={testId}
        defaultValue={defaultValue}
        dir={dir}
        disabled={disabled}
        enterKeyHint={enterKeyHint}
        id={id ?? fieldContext?.id}
        inputMode={inputMode}
        maxLength={maxLength}
        minLength={minLength}
        name={name}
        onBlur={onBlur}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange?.(event.target.value, event)
        }}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        // `placeholder` is not a valid <select> attribute — omitted for as="select"
        placeholder={as === "select" ? undefined : placeholder}
        readOnly={readOnly}
        required={required || fieldContext?.required}
        spellCheck={spellCheck}
        value={value}
      >
        {as === "select" ? children : undefined}
      </StyledControl>
      {end}
    </StyledField>
  )

  return theme ? <Theme name={theme}>{field}</Theme> : field
}

export default Input
