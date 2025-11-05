'use strict';

var React = require('react');
var Flex = require('nice-react-flex');
var styled = require('styled-components');
var Typography = require('nice-react-typography');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const OuterStyled = styled.div `
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${({ $fullWidth }) => $fullWidth && styled.css `width: 100%;`}

  ${({ $backgroundColor }) => {
    if ($backgroundColor) {
        return styled.css `
        background-color: ${$backgroundColor};
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
const InnerStyled = styled.div `
  margin: 0 auto;
  width: 100%;
  
  @media (min-width: ${({ $breakpointMd }) => $breakpointMd}px) {
    /* Medium breakpoint styles can be added here if needed */
  }
  
  @media (min-width: ${({ $breakpointLg }) => $breakpointLg}px) {
    width: ${({ $breakpointLg }) => $breakpointLg}px;
  }
`;

const TileSlot = ({ children, title, titleAlign = "left", titleColor, }) => {
    return (React__namespace.createElement(Flex, { direction: "column", gap: 5 },
        title && (React__namespace.createElement(Flex, { direction: "column", spacing: { sm: { horizontal: 4 }, md: { horizontal: 0 } } },
            React__namespace.createElement(Typography, { as: "h4", size: 5, align: titleAlign, color: titleColor }, title))),
        children));
};

const TileTop = ({ children, title, titleAlign = "left", titleColor, contentLeft, contentRight, spacing = "var(--nice-tile-spacing, 8rem)", }) => {
    return (React__namespace.createElement(Flex, { direction: "column", gap: 6 }, !!contentLeft || !!contentRight ? (React__namespace.createElement(Flex, { direction: { sm: "column", md: "row" }, alignItems: "center", gap: 5, spacing: { vertical: spacing } },
        contentLeft,
        React__namespace.createElement(Flex, { direction: "column", grow: 1 },
            React__namespace.createElement(TileSlot, { title: title, titleAlign: titleAlign, titleColor: titleColor }, children)),
        contentRight)) : (React__namespace.createElement(Flex, { direction: "column", spacing: { vertical: spacing } },
        React__namespace.createElement(TileSlot, { title: title, titleAlign: titleAlign, titleColor: titleColor }, children)))));
};

// Default breakpoint values from helpshelf-ui
const DEFAULT_BREAKPOINT_MD = 980;
const DEFAULT_BREAKPOINT_LG = 1280;
const Tile = ({ children, breakpointMd = DEFAULT_BREAKPOINT_MD, breakpointLg = DEFAULT_BREAKPOINT_LG, className, style, backgroundImage, backgroundColor, backgroundPosition = "center", backgroundSize = "cover", backgroundAttachment = "fixed", fullWidth = false, title, titleAlign = "left", titleColor, contentLeft: TileLeft, contentRight: TileRight, contentBottom: TileBottom, spacing, }) => {
    return (React__namespace.createElement(OuterStyled, { as: Flex, className: className, style: style, "$backgroundImage": backgroundImage, "$backgroundColor": backgroundColor, "$backgroundPosition": backgroundPosition, "$backgroundSize": backgroundSize, "$backgroundAttachment": backgroundAttachment, "$fullWidth": fullWidth },
        React__namespace.createElement(InnerStyled, { as: Flex, direction: "column", grow: 1, "$breakpointMd": breakpointMd, "$breakpointLg": breakpointLg }, title || TileLeft || TileRight || TileBottom ? (React__namespace.createElement(Flex, { direction: "column" },
            React__namespace.createElement(TileTop, { title: title, titleAlign: titleAlign, titleColor: titleColor, contentLeft: TileLeft, contentRight: TileRight, spacing: spacing }, children),
            TileBottom)) : (React__namespace.createElement(TileSlot, { title: title, titleAlign: titleAlign, titleColor: titleColor }, children)))));
};

module.exports = Tile;
//# sourceMappingURL=index.js.map
