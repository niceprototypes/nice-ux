import * as React from "react"
import Flex from "nice-react-flex"
import Typography, { AlignType } from "nice-react-typography"
import { TileProps, TileHeaderAlignType } from "./types"
import { OuterStyled, InnerStyled } from "./styles"
import { TileStyles } from "./tokens"
import TileLayout from "./TileLayout"
import TileSlot from "./TileSlot"

/**
 * Resolves responsive header alignment to a simple alignment value
 * For responsive values, returns the mobile value as the base
 */
const resolveHeaderAlign = (
  align: TileHeaderAlignType | undefined
): AlignType => {
  if (!align) return "center"
  if (typeof align === "string") return align
  return align.mobile || "center"
}

const Tile: React.FC<TileProps> = ({
  children,
  breakpointMd,
  breakpointLg,
  className,
  style,
  backgroundImage,
  backgroundColor,
  foregroundColor,
  backgroundPosition = "center",
  backgroundSize = "cover",
  backgroundAttachment = "fixed",
  contentLeft: TileLeft,
  contentRight: TileRight,
  spacing,
  title,
  titleAs = "h2",
  description,
  headerAlign,
  headerColor,
  headerStyle,
}) => {
  const hasHeader = title || description
  const resolvedAlign = resolveHeaderAlign(headerAlign)
  const textStyle = headerColor
    ? { color: headerColor, ...headerStyle }
    : headerStyle

  const HeaderContent = hasHeader ? (
    <Flex direction="column" gap="small">
      {title && (
        <Typography
          as={titleAs}
          size="large"
          align={resolvedAlign}
          style={textStyle}
        >
          {title}
        </Typography>
      )}
      {description && (
        <Typography
          size="base"
          align={resolvedAlign}
          style={textStyle}
        >
          {description}
        </Typography>
      )}
    </Flex>
  ) : null

  const ContentWithHeader = hasHeader ? (
    <Flex direction="column" gap="large">
      {HeaderContent}
      {children}
    </Flex>
  ) : (
    children
  )

  return (
    <>
    <TileStyles />
    <OuterStyled
      className={className}
      style={style}
      $backgroundImage={backgroundImage}
      $backgroundColor={backgroundColor}
      $foregroundColor={foregroundColor}
      $backgroundPosition={backgroundPosition}
      $backgroundSize={backgroundSize}
      $backgroundAttachment={backgroundAttachment}
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
            {ContentWithHeader}
          </TileLayout>
        ) : (
          <TileSlot>
            {ContentWithHeader}
          </TileSlot>
        )}
      </InnerStyled>
    </OuterStyled>
    </>
  )
}

export default Tile