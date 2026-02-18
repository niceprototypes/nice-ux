'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
require('react');
var Flex = require('nice-react-flex');
var Typography = require('nice-react-typography');
var styled = require('styled-components');
var niceStyles = require('nice-styles');

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
    return niceStyles.getComponentToken("tile", name, variant, mode);
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
        return styled.css `
        background-color: ${$backgroundColor};
      `;
    }
}}

  ${({ $foregroundColor }) => {
    if ($foregroundColor) {
        return styled.css `
        color: ${$foregroundColor};
      `;
    }
}}

  ${({ $backgroundImage, $backgroundPosition, $backgroundSize, $backgroundAttachment }) => {
    if ($backgroundImage) {
        return styled.css `
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

  ${({ $maxWidthTablet }) => $maxWidthTablet && styled.css `
    @media (min-width: ${$maxWidthTablet}px) {
      width: ${$maxWidthTablet}px;
    }
  `}

  ${({ $maxWidthDesktop }) => $maxWidthDesktop && styled.css `
    @media (min-width: ${$maxWidthDesktop}px) {
      width: ${$maxWidthDesktop}px;
    }
  `}
`;

const TileSlot = ({ children, }) => {
    return (jsxRuntime.jsx(Flex, { direction: "column", gap: "large", children: children }));
};

const TileLayout = ({ children, contentLeft: LeftRendered, contentRight: RightRendered, }) => {
    const SlotRendered = (jsxRuntime.jsx(TileSlot, { children: children }));
    return (jsxRuntime.jsx(Flex, { direction: "column", gap: "larger", children: !!LeftRendered || !!RightRendered ? (jsxRuntime.jsxs(Flex, { direction: { mobile: "column", tablet: "row" }, alignItems: "center", gap: "large", children: [LeftRendered, jsxRuntime.jsx(Flex, { direction: "column", grow: 1, children: SlotRendered }), RightRendered] })) : SlotRendered }));
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
    const HeaderContent = hasHeader ? (jsxRuntime.jsxs(Flex, { direction: "column", gap: "base", children: [title && (jsxRuntime.jsx(Typography, { as: titleAs, size: "large", weight: "semibold", align: resolvedAlign, mode: mode, children: title })), description && (jsxRuntime.jsx(Typography, { size: "base", align: resolvedAlign, mode: mode, children: description }))] })) : null;
    const ContentWithHeader = hasHeader ? (jsxRuntime.jsxs(Flex, { direction: "column", gap: "large", children: [HeaderContent, children] })) : (children);
    return (jsxRuntime.jsx(OuterStyled, { className: className, style: style, "$backgroundImage": backgroundImage, "$backgroundColor": backgroundColor, "$foregroundColor": foregroundColor, "$backgroundPosition": backgroundPosition, "$backgroundSize": backgroundSize, "$backgroundAttachment": backgroundAttachment, children: jsxRuntime.jsx(InnerStyled, { direction: "column", grow: 1, spacing: spacing, "$maxWidthTablet": maxWidthTablet, "$maxWidthDesktop": maxWidthDesktop, children: TileLeft || TileRight ? (jsxRuntime.jsx(TileLayout, { contentLeft: TileLeft, contentRight: TileRight, children: ContentWithHeader })) : (jsxRuntime.jsx(TileSlot, { children: ContentWithHeader })) }) }));
};

exports.TileStyles = TileStyles;
exports.default = Tile;
exports.getTileToken = getTileToken;
//# sourceMappingURL=index.js.map
