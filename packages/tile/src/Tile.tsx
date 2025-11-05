import * as React from "react"
import Flex from "nice-react-flex"
import { TileProps } from "./types"
import { OuterStyled, InnerStyled } from "./styles"
import TileTop from "./TileTop"
import TileSlot from "./TileSlot"

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
  backgroundPosition = "center",
  backgroundSize = "cover",
  backgroundAttachment = "fixed",
  fullWidth = false,
  title,
  titleAlign = "left",
  titleColor,
  contentLeft: TileLeft,
  contentRight: TileRight,
  contentBottom: TileBottom,
  spacing,
}) => {
  return (
    <OuterStyled
      as={Flex}
      className={className}
      style={style}
      $backgroundImage={backgroundImage}
      $backgroundColor={backgroundColor}
      $backgroundPosition={backgroundPosition}
      $backgroundSize={backgroundSize}
      $backgroundAttachment={backgroundAttachment}
      $fullWidth={fullWidth}
    >
      <InnerStyled
        as={Flex}
        direction="column"
        grow={1}
        $breakpointMd={breakpointMd}
        $breakpointLg={breakpointLg}
      >
        {title || TileLeft || TileRight || TileBottom ? (
          <Flex direction="column">
            <TileTop
              title={title}
              titleAlign={titleAlign}
              titleColor={titleColor}
              contentLeft={TileLeft}
              contentRight={TileRight}
              spacing={spacing}
            >
              {children}
            </TileTop>
            {TileBottom}
          </Flex>
        ) : (
          <TileSlot title={title} titleAlign={titleAlign} titleColor={titleColor}>
            {children}
          </TileSlot>
        )}
      </InnerStyled>
    </OuterStyled>
  )
}

export default Tile