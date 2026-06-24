import styled from "styled-components"
import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import type { TokenTable } from "../TokenTable.types"

// The easing-curve chart: a full-width SVG with a 120:48 aspect ratio, and a
// round-capped stroke painted with the `color--lighter` token.
const EasingSvg = styled.svg`
  width: 100%;
  aspect-ratio: 120 / 48;
`

const EasingPath = styled.path`
  fill: none;
  stroke: ${getToken("color", "light")};
  stroke-linecap: round;
  stroke-width: 2px;
  vector-effect: non-scaling-stroke;
`

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
      spacing="smaller"
      style={{
        backgroundColor: getToken("backgroundColor", "dark"),
        border:`1px solid ${getToken("borderColor")}`,
        borderRadius: getToken("borderRadius", "small"),
      }}
    >
      <EasingSvg viewBox="0 0 60 24">
        <EasingPath d={path} />
      </EasingSvg>
    </Flex>
  ),
} satisfies TokenTable