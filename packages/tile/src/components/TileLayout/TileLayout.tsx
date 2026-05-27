import * as React from "react"
import Flex from "nice-react-flex"
import TileContent from "../TileContent"
import type { TileLayoutProps } from "./TileLayout.types"
import { OuterFlex } from "./TileLayout.styles"

const TileLayout: React.FC<TileLayoutProps> = ({
  children,
  contentTop,
  contentRight: TileRight,
  contentCenter,
  contentLeft: TileLeft,
  title,
  titleProps,
  description,
  descriptionProps,
  theme,
  gap,
  spacing,
  maxWidth,
  alignItems,
  justifyContent,
}) => {
  return (
    <OuterFlex
      direction="column"
      grow={1}
      spacing={spacing}
      alignItems={alignItems}
      justifyContent={justifyContent}
      gap={gap}
      $maxWidth={maxWidth}
      breakpoints={{
        "laptop+": {
            direction: "row",
          },
      }}
    >
      {!!TileLeft || !!TileRight ? (
        <>
          {TileLeft}
          <TileContent
            gap={gap}
            contentTop={contentTop}
            contentCenter={contentCenter}
            title={title}
            titleProps={titleProps}
            description={description}
            descriptionProps={descriptionProps}
            theme={theme}
            alignItems={alignItems}
            justifyContent={justifyContent}
          >
            {children}
          </TileContent>
          {TileRight}
        </>
      ) : (
        <TileContent
          contentTop={contentTop}
          contentCenter={contentCenter}
          title={title}
          titleProps={titleProps}
          description={description}
          descriptionProps={descriptionProps}
          theme={theme}
          gap={gap}
          alignItems={alignItems}
          justifyContent={justifyContent}
        >
          {children}
        </TileContent>
      )}
    </OuterFlex>
  )
}

export default TileLayout
