import * as React from "react"
import type { TileProps } from "./types"
import { OuterFlex } from "./styles"
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
  foregroundColor,
  gap,
  justifyContent,
  maxWidth,
  mode,
  spacing,
  style,
  title,
  titleProps,
}) => {
  return (
    <OuterFlex
      $backgroundAttachment={backgroundAttachment}
      $backgroundColor={backgroundColor}
      $backgroundImage={backgroundImage}
      $backgroundPosition={backgroundPosition}
      $backgroundSize={backgroundSize}
      $foregroundColor={foregroundColor}
      $mode={mode}
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
        mode={mode}
        spacing={spacing}
        title={title}
        titleProps={titleProps}
      >
        {children}
      </TileLayout>
    </OuterFlex>
  )
}

export default Tile
