import * as React from "react"
import { Theme } from "nice-react-styles"
import Ink from "nice-react-ink"
import { StyledFieldset, StyledFieldsetDescription, StyledFieldsetLegend } from "./Fieldset.styles"
import type { FieldsetProps } from "./Fieldset.types"

/**
 * Fieldset
 *
 * Groups related controls under a native `<fieldset>` + `<legend>`. The
 * optional description follows the legend and is referenced by the
 * fieldset's `aria-describedby`. `disabled` is the native attribute and
 * disables every control inside.
 *
 * @example
 * ```tsx
 * <Fieldset legend="Delivery address" description="Where should we send it?">
 *   <Field label="Street">…</Field>
 *   <Field label="City">…</Field>
 * </Fieldset>
 * ```
 */
const Fieldset: React.FC<FieldsetProps> = ({
  legend,
  description,
  children,
  disabled,
  className,
  theme,
  ref,
}) => {
  const descriptionId = React.useId()
  const hasDescription = description !== undefined && description !== null && description !== false

  const fieldset = (
    <StyledFieldset
      ref={ref}
      className={className}
      disabled={disabled}
      aria-describedby={hasDescription ? descriptionId : undefined}
    >
      <StyledFieldsetLegend>
        <Ink as="span">{legend}</Ink>
      </StyledFieldsetLegend>
      {hasDescription ? (
        <StyledFieldsetDescription id={descriptionId}>
          <Ink as="span" color="light">
            {description}
          </Ink>
        </StyledFieldsetDescription>
      ) : null}
      {children}
    </StyledFieldset>
  )

  return theme ? <Theme name={theme}>{fieldset}</Theme> : fieldset
}

export default Fieldset
