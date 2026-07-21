'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var niceReactStyles = require('nice-react-styles');
var jsxRuntime = require('react/jsx-runtime');
require('react');
var styled = require('styled-components');
var Flex = require('nice-react-flex');
var Ink = require('nice-react-ink');

/** Returns the `var(--np--tile--…)` reference. */
function getTileToken(nameOrPath, variantOrTheme, theme) {
    if (Array.isArray(nameOrPath)) {
        return niceReactStyles.getComponentToken("tile", { token: nameOrPath, mode: variantOrTheme });
    }
    return niceReactStyles.getComponentToken("tile", { token: nameOrPath, variant: variantOrTheme, mode: theme });
}

const OuterFlex$1 = styled(Flex).withConfig({
    shouldForwardProp: (prop) => !prop.startsWith('$'),
}) `
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${niceReactStyles.getToken("backgroundColor", "base")};
  color: ${niceReactStyles.getToken("color", "base")};

  ${({ $minWidth }) => $minWidth && styled.css `min-width: ${$minWidth};`}
  ${({ $minHeight }) => $minHeight && styled.css `min-height: ${$minHeight};`}
  ${({ $maxHeight }) => $maxHeight && styled.css `max-height: ${$maxHeight};`}

  ${({ $backgroundColor }) => {
    if ($backgroundColor) {
        return styled.css `
        background-color: ${getTileToken("backgroundColor", $backgroundColor)};
      `;
    }
}}

  ${({ $color }) => {
    if ($color) {
        return styled.css `
        color: ${getTileToken("color", $color)};
      `;
    }
}}

  ${({ $backgroundImage, $backgroundPosition, $backgroundSize, $backgroundAttachment }) => {
    if ($backgroundImage) {
        return styled.css `
        background-image: ${$backgroundImage};
        background-size: ${$backgroundSize ? getTileToken("backgroundSize", $backgroundSize) : "cover"};
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
const ContentMain = ({ contentCenter, description, descriptionProps, gap, theme, title, titleProps, }) => (jsxRuntime.jsxs(Flex, { direction: "column", gap: gap, style: { width: "100%" }, children: [title && (jsxRuntime.jsx(Ink, { as: "h3", weight: "semibold", theme: theme, ...titleProps, children: title })), contentCenter, description && (Array.isArray(description)
            ? (jsxRuntime.jsx(Flex, { direction: "column", children: description.map((text, index) => (jsxRuntime.jsx(Ink, { color: "light", theme: theme, ...descriptionProps, children: text }, index))) }))
            : (jsxRuntime.jsx(Ink, { color: "light", theme: theme, ...descriptionProps, children: description })))] }));

const TileContent = ({ children, contentTop, contentCenter, title, titleProps, description, descriptionProps, theme, gap, alignItems, justifyContent, }) => {
    const hasContentMain = !!title || !!description || !!contentCenter;
    return (jsxRuntime.jsxs(Flex, { direction: "column", grow: 1, gap: gap, alignItems: alignItems, justifyContent: justifyContent, children: [contentTop, hasContentMain && (jsxRuntime.jsx(ContentMain, { title: title, titleProps: titleProps, contentCenter: contentCenter, description: description, descriptionProps: descriptionProps, theme: theme, gap: gap })), children] }));
};

const OuterFlex = styled(Flex).withConfig({
    shouldForwardProp: (prop) => !prop.startsWith('$'),
}) `
  margin: 0 auto;
  width: 100%;

  ${({ $maxWidth }) => 
// $maxWidth is a full CSS length ("980px") or "none" — both valid as-is.
// Per-breakpoint variation is handled by the withBreakpoints wrapper.
$maxWidth && styled.css `max-width: ${$maxWidth};`}
`;

const TileLayout = ({ children, contentTop, contentRight: TileRight, contentCenter, contentLeft: TileLeft, title, titleProps, description, descriptionProps, theme, gap, padding, maxWidth, alignItems, justifyContent, }) => {
    return (jsxRuntime.jsx(OuterFlex, { direction: "column", grow: 1, padding: padding, alignItems: alignItems, justifyContent: justifyContent, gap: gap, "$maxWidth": maxWidth, breakpoints: {
            "laptop+": {
                direction: "row",
            },
        }, children: !!TileLeft || !!TileRight ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [TileLeft, jsxRuntime.jsx(TileContent, { gap: gap, contentTop: contentTop, contentCenter: contentCenter, title: title, titleProps: titleProps, description: description, descriptionProps: descriptionProps, theme: theme, alignItems: alignItems, justifyContent: justifyContent, children: children }), TileRight] })) : (jsxRuntime.jsx(TileContent, { contentTop: contentTop, contentCenter: contentCenter, title: title, titleProps: titleProps, description: description, descriptionProps: descriptionProps, theme: theme, gap: gap, alignItems: alignItems, justifyContent: justifyContent, children: children })) }));
};

const Tile$1 = ({ alignItems, backgroundAttachment = "fixed", backgroundColor, backgroundImage, backgroundPosition = "center", backgroundSize = "cover", children, className, contentCenter, contentLeft: TileLeft, contentRight: TileRight, contentTop, description, descriptionProps, color, gap, justifyContent, maxWidth, minWidth, minHeight, maxHeight, theme, padding, style, title, titleProps, }) => {
    const tile = (jsxRuntime.jsx(OuterFlex$1, { "$backgroundAttachment": backgroundAttachment, "$backgroundColor": backgroundColor, "$backgroundImage": backgroundImage, "$backgroundPosition": backgroundPosition, "$backgroundSize": backgroundSize, "$color": color, "$minWidth": minWidth, "$minHeight": minHeight, "$maxHeight": maxHeight, className: className, style: style, children: jsxRuntime.jsx(TileLayout, { alignItems: alignItems, contentCenter: contentCenter, contentLeft: TileLeft, contentRight: TileRight, contentTop: contentTop, description: description, descriptionProps: descriptionProps, gap: gap, justifyContent: justifyContent, maxWidth: maxWidth, padding: padding, title: title, titleProps: titleProps, children: children }) }));
    return theme ? jsxRuntime.jsx(niceReactStyles.Theme, { name: theme, children: tile }) : tile;
};

const TileTypes = {};

// Explicit return-type annotation — without it, TS declaration emit can leave
// an unbound generic `<P>` in dist or collapse to `any`, erasing the
// `breakpoints` prop on consumers.
const Tile = niceReactStyles.withBreakpoints(Tile$1);

exports.TileTypes = TileTypes;
exports.default = Tile;
exports.getTileToken = getTileToken;
//# sourceMappingURL=index.js.map
