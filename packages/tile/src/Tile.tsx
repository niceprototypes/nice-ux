import * as React from "react"
import Flex from "nice-react-flex"
import { TileProps } from "./types"
import { OuterStyled, InnerStyled } from "./styles"

// Default breakpoint values from helpshelf-ui
const DEFAULT_BREAKPOINT_MD = 980
const DEFAULT_BREAKPOINT_LG = 1280

const Tile: React.FC<TileProps> = ({
  children,
  breakpointMd = DEFAULT_BREAKPOINT_MD,
  breakpointLg = DEFAULT_BREAKPOINT_LG,
  className,
  style,
  backgroundImage,
  backgroundColor,
  isMobile = false
}) => {
  return (
    <OuterStyled
      as={Flex}
      className={className}
      style={style}
      $backgroundImage={backgroundImage}
      $backgroundColor={backgroundColor}
      $isMobile={isMobile}
    >
      <InnerStyled
        as={Flex}
        direction="column"
        grow={1}
        $breakpointMd={breakpointMd}
        $breakpointLg={breakpointLg}
      >
        {children}
      </InnerStyled>
    </OuterStyled>
  )
}

export default Tile