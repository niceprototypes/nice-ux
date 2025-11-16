import * as React from "react"
import Flex from "nice-react-flex"
import { TileProps } from "./types"
import { OuterStyled, InnerStyled } from "./styles"
import TileLayout from "./TileLayout"
import TileSlot from "./TileSlot"

const Tile: React.FC<TileProps> = ({
  children,
  breakpointMd,
  breakpointLg,
  className,
  style,
  backgroundImage,
  backgroundColor,
  backgroundPosition = "center",
  backgroundSize = "cover",
  backgroundAttachment = "fixed",
  fullWidth = false,
  contentLeft: TileLeft,
  contentRight: TileRight,
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
        direction="column"
        grow={1}
        spacing={spacing}
        $breakpointMd={breakpointMd}
        $breakpointLg={breakpointLg}
      >
        {TileLeft || TileRight ? (
          <TileLayout
            contentLeft={TileLeft}
            contentRight={TileRight}
          >
            {children}
          </TileLayout>
        ) : (
          <TileSlot>
            {children}
          </TileSlot>
        )}
      </InnerStyled>
    </OuterStyled>
  )
}

export default Tile