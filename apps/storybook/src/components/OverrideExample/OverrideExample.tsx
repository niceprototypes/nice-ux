import * as React from "react"

export interface OverrideExampleProps {
  /** The UI component to render (e.g. Button, Input). */
  component: React.ElementType
  /**
   * Demo-only CSS overrides, forwarded to the rendered component's `style` prop.
   * Use it to force a token that has no dedicated prop onto the CSS property it
   * drives (e.g. Button `spacing` → `padding`). Inline styles outrank the
   * component's styled-components class rules on specificity, so no `!important`
   * is needed — and `!important` inside a React style object is silently dropped
   * by the CSSOM anyway, so it must not be used here.
   */
  componentStyles?: React.CSSProperties
  /** Base props for the rendered component (placeholder, name, size, …). */
  componentProps?: Record<string, unknown>
  /** Rendered as the component's children. */
  children?: React.ReactNode
}

/**
 * Renders a live nice component with a demo-only inline style override, so
 * Tokens/Components can illustrate component tokens that have **no dedicated
 * prop** (Button/Input `spacing`, Form `gap`, …). Those tokens can't be varied
 * through a prop, so the example cell would otherwise be blank; this forces the
 * token's value onto the CSS property it drives, strictly to visualize the
 * scale — it is not a real usage pattern.
 *
 * Mechanism: the override is forwarded as the component's `style` prop, which
 * beats its styled-components class rules by specificity. Build the value with
 * `getComponentToken(prefix, { token, variant })` rather than hand-writing the
 * `var(--np--…)` name, so `base` (which is unsuffixed) resolves correctly.
 *
 * @example
 * <OverrideExample
 *   component={Button}
 *   componentStyles={{ padding: `0 ${getComponentToken("button", { token: "spacing", variant: "large" })}` }}
 * >
 *   Button
 * </OverrideExample>
 */
const OverrideExample = ({ component: Component, componentStyles, componentProps, children }: OverrideExampleProps) => (
  <Component
    {...componentProps}
    // Demo overrides win over any base style passed through componentProps.
    style={{ ...(componentProps?.style as React.CSSProperties | undefined), ...componentStyles }}
  >
    {children}
  </Component>
)

export default OverrideExample