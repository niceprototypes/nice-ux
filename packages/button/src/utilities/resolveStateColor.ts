import type {
  ButtonColorStatesType,
  ButtonColorType,
  ButtonInteractionStateType,
} from "../components/Button/Button.types"

/** Every interaction state, for spreading one color across all of them. */
const STATES: ButtonInteractionStateType[] = ["rest", "hover", "focus", "active"]

/**
 * Expands a per-state color prop (`color`, `iconColor`) to a color per state: one color
 * applies in every state, an object sets only the states it names.
 */
export function resolveStateColor(value: ButtonColorType | undefined): ButtonColorStatesType {
  if (value === undefined) return {}
  if (typeof value === "string") return Object.fromEntries(STATES.map((state) => [state, value]))
  return value
}
