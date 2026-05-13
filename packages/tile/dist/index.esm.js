import { getReactToken, getBreakpoint, withBreakpoints, getComponentToken } from 'nice-react-styles';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import 'react';
import styled, { css } from 'styled-components';
import Flex from 'nice-react-flex';
import Typography from 'nice-react-typography';

const OuterFlex$1 = styled(Flex).withConfig({
    shouldForwardProp: (prop) => !prop.startsWith('$'),
}) `
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${({ $mode }) => getReactToken("backgroundColor", "base", $mode).var};
  color: ${({ $mode }) => getReactToken("foregroundColor", "base", $mode).var};

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

/**
 * ContentMain
 *
 * Renders the Tile's primary content column — title, optional center slot,
 * and description (string or array of strings). Extracted from TileContent
 * so the title/description layout can be reused or swapped independently.
 */
const ContentMain = ({ contentCenter, description, descriptionProps, gap, mode, title, titleProps, }) => (jsxs(Flex, { direction: "column", gap: gap, style: { width: "100%" }, children: [title && (jsx(Typography, { as: "h3", weight: "semibold", mode: mode, ...titleProps, children: title })), contentCenter, description && (Array.isArray(description)
            ? (jsx(Flex, { direction: "column", children: description.map((text, index) => (jsx(Typography, { color: "light", mode: mode, ...descriptionProps, children: text }, index))) }))
            : (jsx(Typography, { color: "light", mode: mode, ...descriptionProps, children: description })))] }));

const TileContent = ({ children, contentTop, contentCenter, title, titleProps, description, descriptionProps, mode, gap, alignItems, justifyContent, }) => {
    const hasContentMain = !!title || !!description || !!contentCenter;
    return (jsxs(Flex, { direction: "column", grow: 1, gap: gap, alignItems: alignItems, justifyContent: justifyContent, children: [contentTop, hasContentMain && (jsx(ContentMain, { title: title, titleProps: titleProps, contentCenter: contentCenter, description: description, descriptionProps: descriptionProps, mode: mode, gap: gap })), children] }));
};

const renderMaxWidthValue = (value) => value === "none" ? css `max-width: none;` : css `max-width: ${value}px;`;
const renderResponsiveMaxWidth = ($maxWidth) => {
    if ($maxWidth === undefined)
        return null;
    // Bare value applies at every breakpoint
    if (typeof $maxWidth === "number" || $maxWidth === "none") {
        return renderMaxWidthValue($maxWidth);
    }
    // Per-breakpoint object: small is base, medium/large emit media queries
    const { small, medium, large } = $maxWidth;
    return css `
    ${small !== undefined ? renderMaxWidthValue(small) : null}
    ${medium !== undefined
        ? css `
          ${getBreakpoint("tablet")} {
            ${renderMaxWidthValue(medium)}
          }
        `
        : null}
    ${large !== undefined
        ? css `
          ${getBreakpoint("laptop")} {
            ${renderMaxWidthValue(large)}
          }
        `
        : null}
  `;
};
const OuterFlex = styled(Flex).withConfig({
    shouldForwardProp: (prop) => !prop.startsWith('$'),
}) `
  margin: 0 auto;
  width: 100%;

  ${({ $maxWidth }) => renderResponsiveMaxWidth($maxWidth)}
`;

const TileLayout = ({ children, contentTop, contentRight: TileRight, contentCenter, contentLeft: TileLeft, title, titleProps, description, descriptionProps, mode, gap, spacing, maxWidth, alignItems, justifyContent, }) => {
    return (jsx(OuterFlex, { direction: "column", grow: 1, spacing: spacing, alignItems: alignItems, justifyContent: justifyContent, gap: gap, "$maxWidth": maxWidth, breakpoints: {
            "laptop+": {
                direction: "row",
            },
        }, children: !!TileLeft || !!TileRight ? (jsxs(Fragment, { children: [TileLeft, jsx(TileContent, { gap: gap, contentTop: contentTop, contentCenter: contentCenter, title: title, titleProps: titleProps, description: description, descriptionProps: descriptionProps, mode: mode, alignItems: alignItems, justifyContent: justifyContent, children: children }), TileRight] })) : (jsx(TileContent, { contentTop: contentTop, contentCenter: contentCenter, title: title, titleProps: titleProps, description: description, descriptionProps: descriptionProps, mode: mode, gap: gap, alignItems: alignItems, justifyContent: justifyContent, children: children })) }));
};

const Tile$1 = ({ alignItems, backgroundAttachment = "fixed", backgroundColor, backgroundImage, backgroundPosition = "center", backgroundSize = "cover", children, className, contentCenter, contentLeft: TileLeft, contentRight: TileRight, contentTop, description, descriptionProps, foregroundColor, gap, justifyContent, maxWidth, mode, spacing, style, title, titleProps, }) => {
    return (jsx(OuterFlex$1, { "$backgroundAttachment": backgroundAttachment, "$backgroundColor": backgroundColor, "$backgroundImage": backgroundImage, "$backgroundPosition": backgroundPosition, "$backgroundSize": backgroundSize, "$foregroundColor": foregroundColor, "$mode": mode, className: className, style: style, children: jsx(TileLayout, { alignItems: alignItems, contentCenter: contentCenter, contentLeft: TileLeft, contentRight: TileRight, contentTop: contentTop, description: description, descriptionProps: descriptionProps, gap: gap, justifyContent: justifyContent, maxWidth: maxWidth, mode: mode, spacing: spacing, title: title, titleProps: titleProps, children: children }) }));
};

const TileTypes = {};

// Explicit return-type annotation — without it, TS declaration emit can leave
// an unbound generic `<P>` in dist or collapse to `any`, erasing the
// `breakpoints` prop on consumers.
const Tile = withBreakpoints(Tile$1);

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

export { TileStyles, TileTypes, Tile as default, getTileToken };
//# sourceMappingURL=index.esm.js.map
