import * as React from "react"
import Flex from "nice-react-flex"
import { TileProps } from "./types"
import { OuterStyled, InnerStyled } from "./styles"
import TileLayout from "./TileLayout"
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
  spacing = "var(--nice-tile-spacing, 8rem)",
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
        spacing={{ sm: { vertical: spacing, horizontal: 4 }, md: { horizontal: null } }}
      >
        {title || TileLeft || TileRight ? (
          <TileLayout
            title={title}
            titleAlign={titleAlign}
            titleColor={titleColor}
            contentLeft={TileLeft}
            contentRight={TileRight}
          >
            {children}
          </TileLayout>
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