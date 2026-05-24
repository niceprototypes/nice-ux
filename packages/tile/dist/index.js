'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var niceReactStyles = require('nice-react-styles');
var jsxRuntime = require('react/jsx-runtime');
require('react');
var styled = require('styled-components');
var Flex = require('nice-react-flex');
var Typography = require('nice-react-typography');

const OuterFlex$1 = styled(Flex).withConfig({
    shouldForwardProp: (prop) => !prop.startsWith('$'),
}) `
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${niceReactStyles.getToken("backgroundColor", "base")};
  color: ${niceReactStyles.getToken("color", "base")};

  ${({ $backgroundColor }) => {
    if ($backgroundColor) {
        return styled.css `
        background-color: ${niceReactStyles.getToken("backgroundColor", $backgroundColor)};
      `;
    }
}}

  ${({ $color }) => {
    if ($color) {
        return styled.css `
        color: ${niceReactStyles.getToken("color", $color)};
      `;
    }
}}

  ${({ $backgroundImage, $backgroundPosition, $backgroundSize, $backgroundAttachment }) => {
    if ($backgroundImage) {
        return styled.css `
        background-image: ${$backgroundImage};
        background-size: ${$backgroundSize ? niceReactStyles.getToken("backgroundSize", $backgroundSize) : "cover"};
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
const ContentMain = ({ contentCenter, description, descriptionProps, gap, mode, title, titleProps, }) => (jsxRuntime.jsxs(Flex, { direction: "column", gap: gap, style: { width: "100%" }, children: [title && (jsxRuntime.jsx(Typography, { as: "h3", weight: "semibold", mode: mode, ...titleProps, children: title })), contentCenter, description && (Array.isArray(description)
            ? (jsxRuntime.jsx(Flex, { direction: "column", children: description.map((text, index) => (jsxRuntime.jsx(Typography, { color: "light", mode: mode, ...descriptionProps, children: text }, index))) }))
            : (jsxRuntime.jsx(Typography, { color: "light", mode: mode, ...descriptionProps, children: description })))] }));

const TileContent = ({ children, contentTop, contentCenter, title, titleProps, description, descriptionProps, mode, gap, alignItems, justifyContent, }) => {
    const hasContentMain = !!title || !!description || !!contentCenter;
    return (jsxRuntime.jsxs(Flex, { direction: "column", grow: 1, gap: gap, alignItems: alignItems, justifyContent: justifyContent, children: [contentTop, hasContentMain && (jsxRuntime.jsx(ContentMain, { title: title, titleProps: titleProps, contentCenter: contentCenter, description: description, descriptionProps: descriptionProps, mode: mode, gap: gap })), children] }));
};

const renderMaxWidthValue = (value) => value === "none" ? styled.css `max-width: none;` : styled.css `max-width: ${value}px;`;
const renderResponsiveMaxWidth = ($maxWidth) => {
    if ($maxWidth === undefined)
        return null;
    // Bare value applies at every breakpoint
    if (typeof $maxWidth === "number" || $maxWidth === "none") {
        return renderMaxWidthValue($maxWidth);
    }
    // Per-breakpoint object: small is base, medium/large emit media queries
    const { small, medium, large } = $maxWidth;
    return styled.css `
    ${small !== undefined ? renderMaxWidthValue(small) : null}
    ${medium !== undefined
        ? styled.css `
          ${niceReactStyles.getBreakpoint("tablet")} {
            ${renderMaxWidthValue(medium)}
          }
        `
        : null}
    ${large !== undefined
        ? styled.css `
          ${niceReactStyles.getBreakpoint("laptop")} {
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
    return (jsxRuntime.jsx(OuterFlex, { direction: "column", grow: 1, spacing: spacing, alignItems: alignItems, justifyContent: justifyContent, gap: gap, "$maxWidth": maxWidth, breakpoints: {
            "laptop+": {
                direction: "row",
            },
        }, children: !!TileLeft || !!TileRight ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [TileLeft, jsxRuntime.jsx(TileContent, { gap: gap, contentTop: contentTop, contentCenter: contentCenter, title: title, titleProps: titleProps, description: description, descriptionProps: descriptionProps, mode: mode, alignItems: alignItems, justifyContent: justifyContent, children: children }), TileRight] })) : (jsxRuntime.jsx(TileContent, { contentTop: contentTop, contentCenter: contentCenter, title: title, titleProps: titleProps, description: description, descriptionProps: descriptionProps, mode: mode, gap: gap, alignItems: alignItems, justifyContent: justifyContent, children: children })) }));
};

const Tile$1 = ({ alignItems, backgroundAttachment = "fixed", backgroundColor, backgroundImage, backgroundPosition = "center", backgroundSize = "cover", children, className, contentCenter, contentLeft: TileLeft, contentRight: TileRight, contentTop, description, descriptionProps, color, gap, justifyContent, maxWidth, mode, spacing, style, title, titleProps, }) => {
    const tile = (jsxRuntime.jsx(OuterFlex$1, { "$backgroundAttachment": backgroundAttachment, "$backgroundColor": backgroundColor, "$backgroundImage": backgroundImage, "$backgroundPosition": backgroundPosition, "$backgroundSize": backgroundSize, "$color": color, className: className, style: style, children: jsxRuntime.jsx(TileLayout, { alignItems: alignItems, contentCenter: contentCenter, contentLeft: TileLeft, contentRight: TileRight, contentTop: contentTop, description: description, descriptionProps: descriptionProps, gap: gap, justifyContent: justifyContent, maxWidth: maxWidth, spacing: spacing, title: title, titleProps: titleProps, children: children }) }));
    return mode ? jsxRuntime.jsx(niceReactStyles.Mode, { name: mode, children: tile }) : tile;
};

const TileTypes = {};

// Explicit return-type annotation — without it, TS declaration emit can leave
// an unbound generic `<P>` in dist or collapse to `any`, erasing the
// `breakpoints` prop on consumers.
const Tile = niceReactStyles.withBreakpoints(Tile$1);

/** Returns the `var(--np--tile--…)` reference. */
function getTileToken(nameOrPath, variantOrMode, mode) {
    if (Array.isArray(nameOrPath)) {
        return niceReactStyles.getComponentToken("tile", nameOrPath, variantOrMode);
    }
    return niceReactStyles.getComponentToken("tile", nameOrPath, variantOrMode, mode);
}

exports.TileTypes = TileTypes;
exports.default = Tile;
exports.getTileToken = getTileToken;
//# sourceMappingURL=index.js.map
