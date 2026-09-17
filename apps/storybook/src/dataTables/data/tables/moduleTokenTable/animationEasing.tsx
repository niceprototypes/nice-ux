import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import { EasingSvg, EasingPath } from "../../styles"
import type { TokenTable } from "./types"

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
      padding="smaller"
      style={{
        backgroundColor: getToken("backgroundColor", "raised"),
        border: `1px solid ${getToken("borderColor")}`,
        borderRadius: getToken("borderRadius", "small"),
      }}
    >
      <EasingSvg viewBox="0 0 60 24">
        <EasingPath d={path} />
      </EasingSvg>
    </Flex>
  ),
} satisfies TokenTable
