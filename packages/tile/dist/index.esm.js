import { jsx, jsxs } from 'react/jsx-runtime';
import 'react';
import Flex from 'nice-react-flex';
import Typography from 'nice-react-typography';
import styled, { css } from 'styled-components';
import { getComponentToken } from 'nice-styles';

/**
 * No-op component — tile CSS custom properties are now generated
 * at build time in nice-styles dist/variables.css.
 * Kept for backward compatibility.
 */
const TileStyles = () => null;

/**
 * Get a tile component token.
 *
 * @param name - Token name (e.g., "backgroundColor", "foregroundColor")
 * @param variant - Variant within token (defaults to "base")
 * @param mode - Optional theme mode suffix
 * @returns TokenResult with key, var, and value properties
 */
function getTileToken(name, variant, mode) {
    return getComponentToken("tile", name, variant, mode);
}

const OuterStyled = styled(Flex).withConfig({
    shouldForwardProp: (prop) => !prop.startsWith('$'),
}) `
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${getTileToken("backgroundColor").var};
  color: ${getTileToken("foregroundColor").var};

  ${({ $backgroundColor }) => {
    if ($backgroundColor) {
        return css `
        background-color: ${$backgroundColor};
      `;
    }
}}

  ${({ $foregroundColor }) => {
    if ($foregroundColor) {
        return css `
        color: ${$foregroundColor};
      `;
    }
}}

  ${({ $backgroundImage, $backgroundPosition, $backgroundSize, $backgroundAttachment }) => {
    if ($backgroundImage) {
        return css `
        background-image: ${$backgroundImage};
        background-size: ${$backgroundSize || "cover"};
        background-position: ${$backgroundPosition || "center"};
        background-repeat: no-repeat;

        @media (orientation: landscape) {
          background-attachment: ${$backgroundAttachment || "fixed"};
        }
      `;
    }
}}
`;
const InnerStyled = styled(Flex).withConfig({
    shouldForwardProp: (prop) => !prop.startsWith('$'),
}) `
  margin: 0 auto;
  width: 100%;

  ${({ $maxWidthTablet }) => $maxWidthTablet && css `
    @media (min-width: ${$maxWidthTablet}px) {
      width: ${$maxWidthTablet}px;
    }
  `}

  ${({ $maxWidthDesktop }) => $maxWidthDesktop && css `
    @media (min-width: ${$maxWidthDesktop}px) {
      width: ${$maxWidthDesktop}px;
    }
  `}
`;

const TileSlot = ({ children, }) => {
    return (jsx(Flex, { direction: "column", gap: "large", children: children }));
};

const TileLayout = ({ children, contentLeft: LeftRendered, contentRight: RightRendered, }) => {
    const SlotRendered = (jsx(TileSlot, { children: children }));
    return (jsx(Flex, { direction: "column", gap: "larger", children: !!LeftRendered || !!RightRendered ? (jsxs(Flex, { direction: { mobile: "column", tablet: "row" }, alignItems: "center", gap: "large", children: [LeftRendered, jsx(Flex, { direction: "column", grow: 1, children: SlotRendered }), RightRendered] })) : SlotRendered }));
};

/**
 * Resolves responsive header alignment to a simple alignment value
 * For responsive values, returns the mobile value as the base
 */
const resolveHeaderAlign = (align) => {
    if (!align)
        return "center";
    if (typeof align === "string")
        return align;
    return align.mobile || "center";
};
const Tile = ({ children, maxWidthTablet, maxWidthDesktop, className, style, backgroundImage, backgroundColor, foregroundColor, backgroundPosition = "center", backgroundSize = "cover", backgroundAttachment = "fixed", contentLeft: TileLeft, contentRight: TileRight, spacing, title, titleAs = "h3", description, align, mode, }) => {
    const hasHeader = title || description;
    const resolvedAlign = resolveHeaderAlign(align);
    const HeaderContent = hasHeader ? (jsxs(Flex, { direction: "column", gap: "base", children: [title && (jsx(Typography, { as: titleAs, size: "large", weight: "semibold", align: resolvedAlign, mode: mode, children: title })), description && (jsx(Typography, { size: "base", align: resolvedAlign, mode: mode, children: description }))] })) : null;
    const ContentWithHeader = hasHeader ? (jsxs(Flex, { direction: "column", gap: "large", children: [HeaderContent, children] })) : (children);
    return (jsx(OuterStyled, { className: className, style: style, "$backgroundImage": backgroundImage, "$backgroundColor": backgroundColor, "$foregroundColor": foregroundColor, "$backgroundPosition": backgroundPosition, "$backgroundSize": backgroundSize, "$backgroundAttachment": backgroundAttachment, children: jsx(InnerStyled, { direction: "column", grow: 1, spacing: spacing, "$maxWidthTablet": maxWidthTablet, "$maxWidthDesktop": maxWidthDesktop, children: TileLeft || TileRight ? (jsx(TileLayout, { contentLeft: TileLeft, contentRight: TileRight, children: ContentWithHeader })) : (jsx(TileSlot, { children: ContentWithHeader })) }) }));
};

export { TileStyles, Tile as default, getTileToken };
//# sourceMappingURL=index.esm.js.map
