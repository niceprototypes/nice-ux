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
 * Flat lookup — for tokens at depth 1 (e.g., "backgroundColor", "foregroundColor"):
 * ```ts
 * getTileToken("backgroundColor", "base")
 * ```
 *
 * Path lookup — for nested tokens:
 * ```ts
 * getTileToken(["group", "variant", "parameter"])
 * ```
 */
function getTileToken(nameOrPath, variantOrMode, mode) {
    if (Array.isArray(nameOrPath)) {
        return getComponentToken("tile", nameOrPath, variantOrMode);
    }
    return getComponentToken("tile", nameOrPath, variantOrMode, mode);
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

const TileContent = ({ children, contentTop, contentCenter, title, titleProps, description, descriptionProps, align, mode, }) => {
    const hasContentMain = !!title || !!description || !!contentCenter;
    return (jsxs(Flex, { direction: "column", gap: "none", children: [contentTop, hasContentMain && (jsxs(Flex, { direction: "column", children: [title && (jsx(Typography, { as: "h3", weight: "semibold", mode: mode, ...titleProps, children: title })), contentCenter, description && (Array.isArray(description)
                        ? (jsx(Flex, { direction: "column", children: description.map((text, index) => (jsx(Typography, { color: "light", mode: mode, ...descriptionProps, children: text }, index))) }))
                        : (jsx(Typography, { color: "light", mode: mode, ...descriptionProps, children: description })))] })), children] }));
};

const TileLayout = ({ children, contentTop, contentRight: TileRight, contentCenter, contentLeft: TileLeft, title, titleProps, description, descriptionProps, mode, }) => {
    const content = (jsx(TileContent, { contentTop: contentTop, contentCenter: contentCenter, title: title, titleProps: titleProps, description: description, descriptionProps: descriptionProps, mode: mode, children: children }));
    return (jsx(Flex, { direction: "column", gap: "larger", children: !!TileLeft || !!TileRight ? (jsxs(Flex, { direction: { mobile: "column", tablet: "row" }, gap: "large", children: [TileLeft, jsx(Flex, { direction: "column", grow: 1, children: content }), TileRight] })) : content }));
};

const Tile = ({ children, contentTop, contentCenter, contentLeft: TileLeft, contentRight: TileRight, title, titleProps, description, descriptionProps, spacing, maxWidthTablet, maxWidthDesktop, alignItems, justifyContent, backgroundImage, backgroundColor, backgroundPosition = "center", backgroundSize = "cover", backgroundAttachment = "fixed", foregroundColor, mode, className, style, }) => {
    return (jsx(OuterFlex, { className: className, style: style, "$backgroundImage": backgroundImage, "$backgroundColor": backgroundColor, "$foregroundColor": foregroundColor, "$backgroundPosition": backgroundPosition, "$backgroundSize": backgroundSize, "$backgroundAttachment": backgroundAttachment, children: jsx(InnerFlex, { direction: "column", grow: 1, spacing: spacing, alignItems: alignItems, justifyContent: justifyContent, "$maxWidthTablet": maxWidthTablet, "$maxWidthDesktop": maxWidthDesktop, children: jsx(TileLayout, { contentTop: contentTop, contentCenter: contentCenter, contentLeft: TileLeft, contentRight: TileRight, title: title, titleProps: titleProps, description: description, descriptionProps: descriptionProps, mode: mode, children: children }) }) }));
};

const TileTypes = {};

export { TileStyles, TileTypes, Tile as default, getTileToken };
//# sourceMappingURL=index.esm.js.map
