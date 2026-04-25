import * as React from "react"
import type { TileProps } from "./types"
import { OuterFlex, InnerFlex } from "./styles"
import TileLayout from "../TileLayout"

const Tile: React.FC<TileProps> = ({
  children,
  contentTop,
  contentCenter,
  contentLeft: TileLeft,
  contentRight: TileRight,
  title,
  titleProps,
  description,
  descriptionProps,
  spacing,
  maxWidthMedium,
  maxWidthLarge,
  alignItems,
  justifyContent,
  gap,
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
        alignItems={alignItems}
        justifyContent={justifyContent}
        $maxWidthMedium={maxWidthMedium}
        $maxWidthLarge={maxWidthLarge}
      >
        <TileLayout
          contentTop={contentTop}
          contentCenter={contentCenter}
          contentLeft={TileLeft}
          contentRight={TileRight}
          title={title}
          titleProps={titleProps}
          description={description}
          descriptionProps={descriptionProps}
          mode={mode}
          gap={gap}
        >
          {children}
        </TileLayout>
      </InnerFlex>
    </OuterFlex>
  )
}

export default Tile
