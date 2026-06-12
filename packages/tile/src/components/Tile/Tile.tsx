import * as React from "react"
import { Theme } from "nice-react-styles"
import type { TileProps } from "./Tile.types"
import { OuterFlex } from "./Tile.styles"
import TileLayout from "../TileLayout"

const Tile: React.FC<TileProps> = ({
  alignItems,
  backgroundAttachment = "fixed",
  backgroundColor,
  backgroundImage,
  backgroundPosition = "center",
  backgroundSize = "cover",
  children,
  className,
  contentCenter,
  contentLeft: TileLeft,
  contentRight: TileRight,
  contentTop,
  description,
  descriptionProps,
  color,
  gap,
  justifyContent,
  maxWidth,
  minWidth,
  minHeight,
  maxHeight,
  theme,
  spacing,
  style,
  title,
  titleProps,
}) => {
  const tile = (
    <OuterFlex
      $backgroundAttachment={backgroundAttachment}
      $backgroundColor={backgroundColor}
      $backgroundImage={backgroundImage}
      $backgroundPosition={backgroundPosition}
      $backgroundSize={backgroundSize}
      $color={color}
      $minWidth={minWidth}
      $minHeight={minHeight}
      $maxHeight={maxHeight}
      className={className}
      style={style}
    >
      <TileLayout
        alignItems={alignItems}
        contentCenter={contentCenter}
        contentLeft={TileLeft}
        contentRight={TileRight}
        contentTop={contentTop}
        description={description}
        descriptionProps={descriptionProps}
        gap={gap}
        justifyContent={justifyContent}
        maxWidth={maxWidth}
        spacing={spacing}
        title={title}
        titleProps={titleProps}
      >
        {children}
      </TileLayout>
    </OuterFlex>
  )

  return theme ? <Theme name={theme}>{tile}</Theme> : tile
}

export default Tile
