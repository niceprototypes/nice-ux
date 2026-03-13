import * as React from "react"
import type { TileProps } from "./types"
import { OuterFlex, InnerFlex } from "./styles"
import TileLayout from "../TileLayout"
import { resolveHeaderAlign } from "../../utilities/resolveHeaderAlign"

const Tile: React.FC<TileProps> = ({
  children,
  contentTop,
  contentCenter,
  contentLeft: TileLeft,
  contentRight: TileRight,
  title,
  titleAs = "h3",
  titleSize,
  description,
  descriptionSize,
  align,
  gap = "base",
  spacing,
  maxWidthTablet,
  maxWidthDesktop,
  backgroundImage,
  backgroundColor,
  backgroundPosition = "center",
  backgroundSize = "cover",
  backgroundAttachment = "fixed",
  foregroundColor,
  mode,
  className,
  style,
}) => {
  const resolvedAlign = resolveHeaderAlign(align)

  return (
    <OuterFlex
      className={className}
      style={style}
      $backgroundImage={backgroundImage}
      $backgroundColor={backgroundColor}
      $foregroundColor={foregroundColor}
      $backgroundPosition={backgroundPosition}
      $backgroundSize={backgroundSize}
      $backgroundAttachment={backgroundAttachment}
    >
      <InnerFlex
        direction="column"
        grow={1}
        spacing={spacing}
        $maxWidthTablet={maxWidthTablet}
        $maxWidthDesktop={maxWidthDesktop}
      >
        <TileLayout
          contentTop={contentTop}
          contentCenter={contentCenter}
          contentLeft={TileLeft}
          contentRight={TileRight}
          title={title}
          titleAs={titleAs}
          titleSize={titleSize}
          description={description}
          descriptionSize={descriptionSize}
          align={resolvedAlign}
          gap={gap}
          mode={mode}
        >
          {children}
        </TileLayout>
      </InnerFlex>
    </OuterFlex>
  )
}

export default Tile
