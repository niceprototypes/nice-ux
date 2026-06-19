import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import type { TokenTable } from "./TokenTable.types"

export const animationEasing = {
  name: "animationEasing",
  description: "Easing curves for CSS transitions and animations.",
  variants: [
    { variant: "base", path: "M 1 23 C 25.78 23, 35.22 1, 60 1" },
    { variant: "linear", path: "M 1 23 C 1 23, 60 1, 60 1" },
    { variant: "ease-in", path: "M 1 23 C 25.78 23, 60 1, 60 1" },
    { variant: "ease-out", path: "M 1 23 C 1 23, 35.22 1, 60 1" },
    { variant: "ease", path: "M 1 23 C 15.75 20.8, 15.75 1, 60 1" },
  ],
  preview: ({ path }) => (
    <Flex
      grow={1}
      spacing="small"
      style={{
        backgroundColor: getToken("backgroundColor", "dark"),
        border:`1px solid ${getToken("borderColor")}`,
        borderRadius: getToken("borderRadius", "small"),
      }}
    >
      <svg
        viewBox="0 0 60 24"
        style={{ aspectRatio: "120 / 48", width: "100%" }}
      >
        <path
          d={path}
          fill="none"
          stroke={getToken("color", "lighter")}
          strokeLinecap="round"
        />
      </svg>
    </Flex>
  ),
} satisfies TokenTable