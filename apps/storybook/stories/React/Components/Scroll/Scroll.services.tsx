import Ink from "../../../../src/nice/Ink"
import { useScroll } from "nice-react-scroll"

export const ScrollPositionDisplay = () => {
  const scrollY = useScroll()
  return (
    <Ink
      size="small"
      color="light"
    >
      Scroll position: {Math.round(scrollY)}px
    </Ink>
  )
}
