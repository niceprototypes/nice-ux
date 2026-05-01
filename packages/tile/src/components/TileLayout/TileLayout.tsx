import * as React from "react"
import Flex from "nice-react-flex"
import TileContent from "../TileContent"
import type { TileLayoutProps } from "./types"
import { OuterFlex } from "./styles"

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
  mode,
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
      breakpoints={[
        {
          min: "large",
          props: {
            direction: "row",
          },
        },
      ]}
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
            mode={mode}
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
          mode={mode}
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
