import { Dot, Track } from "../../styles"
import type { TokenTable } from "./types"

export const animationDuration = {
  name: "animationDuration",
  description: "Timing values for CSS transitions and animations.",
  variants: ["fast", "base", "slow"],
  preview: (variant) => (
    <Track grow={1}>
      <Dot $variant={variant} />
    </Track>
  ),
} satisfies TokenTable
