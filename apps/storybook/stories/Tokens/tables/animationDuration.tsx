import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import type { TokenTable } from "./TokenTable.types"

export const animationDuration = {
  name: "animationDuration",
  description: "Timing values for CSS transitions and animations.",
  variants: ["fast", "base", "slow"],
  preview: (variant) => {
    const animationName = variant === "base" ? "slide" : "slideSlow"
    return (
      <Flex
        grow={1}
        style={{
          backgroundColor: getToken("backgroundColor", "dark"),
          border:`1px solid ${getToken("borderColor")}`,
          borderRadius: `calc(${getToken("cellHeight", "smaller")} / 2)`,
        }}
      >
        <Flex
          style={{
            backgroundColor: getToken("color", "lighter"),
            width: "16px",
            height: "16px",
            borderRadius: `calc(${getToken("cellHeight", "smaller")} / 2)`,
            animation: `${animationName} calc(${getToken("animationDuration", variant)} * 6) ${getToken("animationEasing")} infinite`,
            animationDelay: variant === "base" ? getToken("animationDuration", variant) : 0,
          }}
        />
      </Flex>
    )
  },
} satisfies TokenTable