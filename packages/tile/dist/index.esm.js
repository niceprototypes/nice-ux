import { getToken, Theme, withBreakpoints, getComponentToken } from 'nice-react-styles';
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
  background-color: ${getToken("backgroundColor", { variant: "base" })};
  color: ${getToken("color", { variant: "base" })};

  ${({ $minWidth }) => $minWidth && css `min-width: ${$minWidth};`}
  ${({ $minHeight }) => $minHeight && css `min-height: ${$minHeight};`}
  ${({ $maxHeight }) => $maxHeight && css `max-height: ${$maxHeight};`}

  ${({ $backgroundColor }) => {
    if ($backgroundColor) {
        return css `
        background-color: ${getToken("backgroundColor", { variant: $backgroundColor })};
      `;
    }
}}

  ${({ $color }) => {
    if ($color) {
        return css `
        color: ${getToken("color", { variant: $color })};
      `;
    }
}}

  ${({ $backgroundImage, $backgroundPosition, $backgroundSize, $backgroundAttachment }) => {
    if ($backgroundImage) {
        return css `
        background-image: ${$backgroundImage};
        background-size: ${$backgroundSize ? getToken("backgroundSize", { variant: $backgroundSize }) : "cover"};
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
const ContentMain = ({ contentCenter, description, descriptionProps, gap, theme, title, titleProps, }) => (jsxs(Flex, { direction: "column", gap: gap, style: { width: "100%" }, children: [title && (jsx(Typography, { as: "h3", weight: "semibold", theme: theme, ...titleProps, children: title })), contentCenter, description && (Array.isArray(description)
            ? (jsx(Flex, { direction: "column", children: description.map((text, index) => (jsx(Typography, { color: "light", theme: theme, ...descriptionProps, children: text }, index))) }))
            : (jsx(Typography, { color: "light", theme: theme, ...descriptionProps, children: description })))] }));

const TileContent = ({ children, contentTop, contentCenter, title, titleProps, description, descriptionProps, theme, gap, alignItems, justifyContent, }) => {
    const hasContentMain = !!title || !!description || !!contentCenter;
    return (jsxs(Flex, { direction: "column", grow: 1, gap: gap, alignItems: alignItems, justifyContent: justifyContent, children: [contentTop, hasContentMain && (jsx(ContentMain, { title: title, titleProps: titleProps, contentCenter: contentCenter, description: description, descriptionProps: descriptionProps, theme: theme, gap: gap })), children] }));
};

const OuterFlex = styled(Flex).withConfig({
    shouldForwardProp: (prop) => !prop.startsWith('$'),
}) `
  margin: 0 auto;
  width: 100%;

  ${({ $maxWidth }) => 
// $maxWidth is a full CSS length ("980px") or "none" — both valid as-is.
// Per-breakpoint variation is handled by the withBreakpoints wrapper.
$maxWidth && css `max-width: ${$maxWidth};`}
`;

const TileLayout = ({ children, contentTop, contentRight: TileRight, contentCenter, contentLeft: TileLeft, title, titleProps, description, descriptionProps, theme, gap, spacing, maxWidth, alignItems, justifyContent, }) => {
    return (jsx(OuterFlex, { direction: "column", grow: 1, spacing: spacing, alignItems: alignItems, justifyContent: justifyContent, gap: gap, "$maxWidth": maxWidth, breakpoints: {
            "laptop+": {
                direction: "row",
            },
        }, children: !!TileLeft || !!TileRight ? (jsxs(Fragment, { children: [TileLeft, jsx(TileContent, { gap: gap, contentTop: contentTop, contentCenter: contentCenter, title: title, titleProps: titleProps, description: description, descriptionProps: descriptionProps, theme: theme, alignItems: alignItems, justifyContent: justifyContent, children: children }), TileRight] })) : (jsx(TileContent, { contentTop: contentTop, contentCenter: contentCenter, title: title, titleProps: titleProps, description: description, descriptionProps: descriptionProps, theme: theme, gap: gap, alignItems: alignItems, justifyContent: justifyContent, children: children })) }));
};

const Tile$1 = ({ alignItems, backgroundAttachment = "fixed", backgroundColor, backgroundImage, backgroundPosition = "center", backgroundSize = "cover", children, className, contentCenter, contentLeft: TileLeft, contentRight: TileRight, contentTop, description, descriptionProps, color, gap, justifyContent, maxWidth, minWidth, minHeight, maxHeight, theme, spacing, style, title, titleProps, }) => {
    const tile = (jsx(OuterFlex$1, { "$backgroundAttachment": backgroundAttachment, "$backgroundColor": backgroundColor, "$backgroundImage": backgroundImage, "$backgroundPosition": backgroundPosition, "$backgroundSize": backgroundSize, "$color": color, "$minWidth": minWidth, "$minHeight": minHeight, "$maxHeight": maxHeight, className: className, style: style, children: jsx(TileLayout, { alignItems: alignItems, contentCenter: contentCenter, contentLeft: TileLeft, contentRight: TileRight, contentTop: contentTop, description: description, descriptionProps: descriptionProps, gap: gap, justifyContent: justifyContent, maxWidth: maxWidth, spacing: spacing, title: title, titleProps: titleProps, children: children }) }));
    return theme ? jsx(Theme, { name: theme, children: tile }) : tile;
};

const TileTypes = {};

// Explicit return-type annotation — without it, TS declaration emit can leave
// an unbound generic `<P>` in dist or collapse to `any`, erasing the
// `breakpoints` prop on consumers.
const Tile = withBreakpoints(Tile$1);

/** Returns the `var(--np--tile--…)` reference. */
function getTileToken(nameOrPath, variantOrTheme, theme) {
    if (Array.isArray(nameOrPath)) {
        return getComponentToken("tile", { token: nameOrPath, mode: variantOrTheme });
    }
    return getComponentToken("tile", { token: nameOrPath, variant: variantOrTheme, mode: theme });
}

export { TileTypes, Tile as default, getTileToken };
//# sourceMappingURL=index.esm.js.map
