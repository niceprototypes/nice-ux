import type { InputGhostStateType, InputGhostType } from "../components/Input/Input.types"

/** The `ghost` prop as one flag per state; `true` is ghosted until focused (rest and hover). */
export const resolveGhost = (ghost: InputGhostType): Record<InputGhostStateType, boolean> =>
  typeof ghost === "boolean"
    ? { rest: ghost, hover: ghost, focus: false }
    : { rest: Boolean(ghost.rest), hover: Boolean(ghost.hover), focus: Boolean(ghost.focus) }
