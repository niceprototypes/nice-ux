import * as React from "react"
import { Theme } from "nice-react-styles"
import { StyledForm } from "./Form.styles"
import { FormProps } from "./Form.types"

/**
 * Form component — a stateless layout container for form fields.
 *
 * Renders a semantic `<form>`, stacks its children vertically with
 * token-based spacing, and forwards the submit event. It owns no field
 * state; the consumer manages values (e.g. via nice-react-input's
 * controlled `value` / `onChange`).
 *
 * @example
 * ```tsx
 * <Form gap="large" onSubmit={() => save(values)}>
 *   <Input value={email} onChange={setEmail} placeholder="Email" />
 *   <Input value={name} onChange={setName} placeholder="Name" />
 *   <Button type="submit">Save</Button>
 * </Form>
 * ```
 */
const Form: React.FC<FormProps> = ({
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  autoComplete,
  children,
  className,
  "data-testid": testId,
  gap = "base",
  id,
  name,
  noValidate,
  onSubmit,
  preventDefault = true,
  style,
  theme,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Default to SPA behavior — suppress native navigation unless opted out
    if (preventDefault) event.preventDefault()
    onSubmit?.(event)
  }

  const form = (
    <StyledForm
      $gap={gap}
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      autoComplete={autoComplete}
      className={className}
      data-testid={testId}
      id={id}
      name={name}
      noValidate={noValidate}
      onSubmit={handleSubmit}
      style={style}
    >
      {children}
    </StyledForm>
  )

  // theme pin delegates to the [data-theme] cascade via Theme
  return theme ? <Theme name={theme}>{form}</Theme> : form
}

export default Form
