import * as React from "react"
import { Theme } from "nice-react-styles"
import Ink from "nice-react-ink"
import { FieldContext } from "./FieldContext"
import { StyledField, StyledFieldDescription, StyledFieldError, StyledFieldLabel } from "./Field.styles"
import type { FieldContextValue, FieldProps } from "./Field.types"
import { isDevelopment } from "../../utilities/isDevelopment"

/**
 * Field
 *
 * Wires a label, optional description and optional error to one control.
 * Renders a native `<label htmlFor={id}>`, then the control, then the
 * description, then an always-mounted polite live region that holds the
 * error while `error` is present. The region is mounted before any error so
 * screen readers observe it and announce the error when it is inserted; empty,
 * it takes no space. Its id joins `describedBy` only while an error is present.
 * The control reads its id and ARIA wiring from `useField()`.
 *
 * In non-production builds, a warning is logged once if no element inside
 * the Field carries the control id after mount — the child did not apply it,
 * so the label and description are not associated with it.
 *
 * @example
 * ```tsx
 * <Field label="Email" description="We never share it." error={error} invalid={!!error} required>
 *   <EmailControl />
 * </Field>
 * ```
 */
const Field: React.FC<FieldProps> = ({
  label,
  description,
  error,
  invalid = false,
  required = false,
  optionalLabel,
  id,
  children,
  className,
  theme,
  ref,
}) => {
  const generatedId = React.useId()
  const controlId = id ?? generatedId
  const labelId = `${controlId}-label`
  const hasDescription = description !== undefined && description !== null && description !== false
  const hasError = error !== undefined && error !== null && error !== false
  const descriptionId = hasDescription ? `${controlId}-description` : undefined
  const errorId = hasError ? `${controlId}-error` : undefined
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined

  const context = React.useMemo<FieldContextValue>(
    () => ({ id: controlId, labelId, descriptionId, errorId, describedBy, invalid, required }),
    [controlId, labelId, descriptionId, errorId, describedBy, invalid, required]
  )

  // Forward the root element to both the internal ref and the consumer's ref.
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const setRootNode = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  // Dev warning: the silent failure mode is a child that ignores the id.
  const warnedRef = React.useRef(false)
  React.useEffect(() => {
    if (warnedRef.current || !isDevelopment()) return
    const root = rootRef.current
    if (!root) return
    const applied = Array.from(root.querySelectorAll("[id]")).some((element) => element.id === controlId)
    if (!applied) {
      warnedRef.current = true
      console.warn(
        `nice-react-field: no element inside this Field has id "${controlId}". ` +
          `The child control must apply useField().id, or the label and description are not associated with it.`
      )
    }
  }, [controlId])

  const field = (
    <FieldContext.Provider value={context}>
      <StyledField ref={setRootNode} className={className}>
        <StyledFieldLabel id={labelId} htmlFor={controlId}>
          <Ink>{label}</Ink>
          {!required && optionalLabel !== undefined ? (
            <>
              {" "}
              <Ink color="light">
                {optionalLabel}
              </Ink>
            </>
          ) : null}
        </StyledFieldLabel>
        {children}
        {hasDescription ? (
          <StyledFieldDescription id={descriptionId}>
            <Ink color="light">
              {description}
            </Ink>
          </StyledFieldDescription>
        ) : null}
        <StyledFieldError id={`${controlId}-error`} aria-live="polite">
          {hasError ? (
            <Ink color="error">
              {error}
            </Ink>
          ) : null}
        </StyledFieldError>
      </StyledField>
    </FieldContext.Provider>
  )

  return theme ? <Theme name={theme}>{field}</Theme> : field
}

export default Field
