import { jsxs, jsx } from 'react/jsx-runtime';
import 'react';
import styled, { css } from 'styled-components';
import Flex from 'nice-react-flex';
import { getComponentToken } from 'nice-react-styles';
import Typography from 'nice-react-typography';

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

const OuterFlex = styled(Flex).withConfig({
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
const InnerFlex = styled(Flex).withConfig({
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

const TileContent = ({ children, contentTop, contentCenter, title, titleAs, titleSize, description, descriptionSize, align, gap, mode, }) => {
    return (jsxs(Flex, { direction: "column", gap: gap, children: [contentTop, title && (jsx(Typography, { as: titleAs, size: titleSize, weight: "semibold", align: align, mode: mode, children: title })), contentCenter, description && (Array.isArray(description)
                ? (jsx(Flex, { direction: "column", gap: descriptionSize, children: description.map((text, index) => (jsx(Typography, { color: "light", size: descriptionSize, align: align, mode: mode, children: text }, index))) }))
                : (jsx(Typography, { color: "light", size: descriptionSize, align: align, mode: mode, children: description }))), children] }));
};

const TileLayout = ({ children, contentTop, contentCenter, contentLeft: TileLeft, contentRight: TileRight, title, titleAs, titleSize, description, descriptionSize, align, gap, mode, }) => {
    const content = (jsx(TileContent, { contentTop: contentTop, contentCenter: contentCenter, title: title, titleAs: titleAs, titleSize: titleSize, description: description, descriptionSize: descriptionSize, align: align, gap: gap, mode: mode, children: children }));
    return (jsx(Flex, { direction: "column", gap: "larger", children: !!TileLeft || !!TileRight ? (jsxs(Flex, { direction: { mobile: "column", tablet: "row" }, alignItems: "center", gap: "large", children: [TileLeft, jsx(Flex, { direction: "column", grow: 1, children: content }), TileRight] })) : content }));
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

const Tile = ({ children, contentTop, contentCenter, contentLeft: TileLeft, contentRight: TileRight, title, titleAs = "h3", titleSize, description, descriptionSize, align, gap = "base", spacing, maxWidthTablet, maxWidthDesktop, backgroundImage, backgroundColor, backgroundPosition = "center", backgroundSize = "cover", backgroundAttachment = "fixed", foregroundColor, mode, className, style, }) => {
    const resolvedAlign = resolveHeaderAlign(align);
    return (jsx(OuterFlex, { className: className, style: style, "$backgroundImage": backgroundImage, "$backgroundColor": backgroundColor, "$foregroundColor": foregroundColor, "$backgroundPosition": backgroundPosition, "$backgroundSize": backgroundSize, "$backgroundAttachment": backgroundAttachment, children: jsx(InnerFlex, { direction: "column", grow: 1, spacing: spacing, "$maxWidthTablet": maxWidthTablet, "$maxWidthDesktop": maxWidthDesktop, children: jsx(TileLayout, { contentTop: contentTop, contentCenter: contentCenter, contentLeft: TileLeft, contentRight: TileRight, title: title, titleAs: titleAs, titleSize: titleSize, description: description, descriptionSize: descriptionSize, align: resolvedAlign, gap: gap, mode: mode, children: children }) }) }));
};

export { TileStyles, Tile as default, getTileToken };
//# sourceMappingURL=index.esm.js.map
