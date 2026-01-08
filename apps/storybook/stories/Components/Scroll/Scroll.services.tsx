import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import { getToken } from "nice-styles"
import { useScroll } from "nice-react-scroll"

export const ScrollPositionDisplay = () => {
  const scrollY = useScroll()
  return (
    <Typography size="small" color="medium">
      Scroll position: {Math.round(scrollY)}px
    </Typography>
  )
}

export const SectionContent = ({ title, color }: { title: string; color: string }) => (
  <Flex
    direction="column"
    gap="base"
    style={{
      padding: getToken("gap", "large").var,
      minHeight: "50vh",
      backgroundColor: color,
    }}
  >
    <Typography as="h2" weight="bold" size="larger">
      {title}
    </Typography>
    <Typography color="medium">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris.
    </Typography>
  </Flex>
)
