import type { ButtonInteractionStateType } from "../components/Button/Button.types"

/** CSS declarations per interaction state; a state left out gets no rule. */
export type StateDeclarations = Partial<Record<ButtonInteractionStateType, string>>

/**
 * Each interaction state's selector. They are mutually exclusive — active, then focus, then
 * hover, then rest — so exactly one applies at a time.
 */
const STATE_SELECTORS: Record<ButtonInteractionStateType, string> = {
  rest: "&:not(:hover):not(:focus-visible):not(:active)",
  hover: "&:hover:not(:focus-visible):not(:active)",
  focus: "&:focus-visible:not(:active)",
  active: "&:active",
}

/**
 * Rules applying each state's declarations under that state's selector. A disabled button
 * takes no interaction state, so its rest declarations apply unconditionally and the others
 * not at all.
 *
 * @param declarations - CSS declarations keyed by state
 * @param disabled - Whether the button is disabled
 * @returns CSS for a styled-components block
 */
export function stateRules(declarations: StateDeclarations, disabled: boolean): string {
  if (disabled) return declarations.rest ?? ""
  return (Object.keys(STATE_SELECTORS) as ButtonInteractionStateType[])
    .filter((state) => declarations[state])
    .map((state) => `${STATE_SELECTORS[state]} { ${declarations[state]} }`)
    .join("\n")
}
