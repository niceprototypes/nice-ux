import Flex from "nice-react-flex"
import Typography from "../../../../src/nice/Typography"
import { useScroll } from "nice-react-scroll"
import { getReactToken } from "nice-react-styles"

export const ScrollPositionDisplay = () => {
  const scrollY = useScroll()
  return (
    <Typography
      size="small"
      color="light"
    >
      Scroll position: {Math.round(scrollY)}px
    </Typography>
  )
}

export const SectionContent = ({
  title,
  color,
}: {
  title: string
  color: string
}) => (
  <Flex
    direction="column"
    gap="base"
    style={{
      padding: getReactToken("gap", "large").var,
      minHeight: "50vh",
      backgroundColor: color,
    }}
  >
    <Typography
      as="h2"
      weight="bold"
      size="larger"
    >
      {title}
    </Typography>
    <Typography color="light">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris.
    </Typography>
  </Flex>
)
