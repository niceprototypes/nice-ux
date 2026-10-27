import type { ButtonGhostType, ButtonInteractionStateType } from "../components/Button/Button.types"

/** Whether each interaction state is ghosted. */
export type ResolvedGhost = Record<ButtonInteractionStateType, boolean>

/**
 * Expands the `ghost` prop to a flag per interaction state: `true` ghosts the rest state
 * only (revealed on hover, focus and press), `false` ghosts none, and an object ghosts the
 * states it sets to true.
 */
export function resolveGhost(ghost: ButtonGhostType): ResolvedGhost {
  if (typeof ghost === "boolean") return { rest: ghost, hover: false, focus: false, active: false }
  return {
    rest: ghost.rest ?? false,
    hover: ghost.hover ?? false,
    focus: ghost.focus ?? false,
    active: ghost.active ?? false,
  }
}
