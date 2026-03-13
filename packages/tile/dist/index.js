'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
require('react');
var styled = require('styled-components');
var Flex = require('nice-react-flex');
var niceReactStyles = require('nice-react-styles');
var Typography = require('nice-react-typography');

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
    return niceReactStyles.getComponentToken("tile", name, variant, mode);
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
const InnerFlex = styled(Flex).withConfig({
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

const TileContent = ({ children, contentTop, contentCenter, title, titleAs, titleSize, description, descriptionSize, align, gap, mode, }) => {
    return (jsxRuntime.jsxs(Flex, { direction: "column", gap: gap, children: [contentTop, title && (jsxRuntime.jsx(Typography, { as: titleAs, size: titleSize, weight: "semibold", align: align, mode: mode, children: title })), contentCenter, description && (jsxRuntime.jsx(Typography, { color: "light", size: descriptionSize, align: align, mode: mode, children: description })), children] }));
};

const TileLayout = ({ children, contentTop, contentCenter, contentLeft: TileLeft, contentRight: TileRight, title, titleAs, titleSize, description, descriptionSize, align, gap, mode, }) => {
    const content = (jsxRuntime.jsx(TileContent, { contentTop: contentTop, contentCenter: contentCenter, title: title, titleAs: titleAs, titleSize: titleSize, description: description, descriptionSize: descriptionSize, align: align, gap: gap, mode: mode, children: children }));
    return (jsxRuntime.jsx(Flex, { direction: "column", gap: "larger", children: !!TileLeft || !!TileRight ? (jsxRuntime.jsxs(Flex, { direction: { mobile: "column", tablet: "row" }, alignItems: "center", gap: "large", children: [TileLeft, jsxRuntime.jsx(Flex, { direction: "column", grow: 1, children: content }), TileRight] })) : content }));
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
    return (jsxRuntime.jsx(OuterFlex, { className: className, style: style, "$backgroundImage": backgroundImage, "$backgroundColor": backgroundColor, "$foregroundColor": foregroundColor, "$backgroundPosition": backgroundPosition, "$backgroundSize": backgroundSize, "$backgroundAttachment": backgroundAttachment, children: jsxRuntime.jsx(InnerFlex, { direction: "column", grow: 1, spacing: spacing, "$maxWidthTablet": maxWidthTablet, "$maxWidthDesktop": maxWidthDesktop, children: jsxRuntime.jsx(TileLayout, { contentTop: contentTop, contentCenter: contentCenter, contentLeft: TileLeft, contentRight: TileRight, title: title, titleAs: titleAs, titleSize: titleSize, description: description, descriptionSize: descriptionSize, align: resolvedAlign, gap: gap, mode: mode, children: children }) }) }));
};

exports.TileStyles = TileStyles;
exports.default = Tile;
exports.getTileToken = getTileToken;
//# sourceMappingURL=index.js.map
