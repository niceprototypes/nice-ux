import Typography from "../../../../src/nice/Typography"
import { useScroll } from "nice-react-scroll"

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
