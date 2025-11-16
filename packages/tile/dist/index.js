'use strict';

var React = require('react');
var Flex = require('nice-react-flex');
var styled = require('styled-components');

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
const InnerStyled = styled(Flex) `
  margin: 0 auto;
  width: 100%;

  ${({ $breakpointLg }) => $breakpointLg && styled.css `
    @media (min-width: ${$breakpointLg}px) {
      width: ${$breakpointLg}px;
    }
  `}
`;

const TileSlot = ({ children, }) => {
    return (React__namespace.createElement(Flex, { direction: "column", gap: 5 }, children));
};

const TileLayout = ({ children, contentLeft: LeftRendered, contentRight: RightRendered, }) => {
    const SlotRendered = (React__namespace.createElement(TileSlot, null, children));
    return (React__namespace.createElement(Flex, { direction: "column", gap: 6 }, !!LeftRendered || !!RightRendered ? (React__namespace.createElement(Flex, { direction: { sm: "column", md: "row" }, alignItems: "center", gap: 5 },
        LeftRendered,
        React__namespace.createElement(Flex, { direction: "column", grow: 1 }, SlotRendered),
        RightRendered)) : SlotRendered));
};

const Tile = ({ children, breakpointMd, breakpointLg, className, style, backgroundImage, backgroundColor, backgroundPosition = "center", backgroundSize = "cover", backgroundAttachment = "fixed", fullWidth = false, contentLeft: TileLeft, contentRight: TileRight, spacing, }) => {
    return (React__namespace.createElement(OuterStyled, { as: Flex, className: className, style: style, "$backgroundImage": backgroundImage, "$backgroundColor": backgroundColor, "$backgroundPosition": backgroundPosition, "$backgroundSize": backgroundSize, "$backgroundAttachment": backgroundAttachment, "$fullWidth": fullWidth },
        React__namespace.createElement(InnerStyled, { direction: "column", grow: 1, spacing: spacing, "$breakpointMd": breakpointMd, "$breakpointLg": breakpointLg }, TileLeft || TileRight ? (React__namespace.createElement(TileLayout, { contentLeft: TileLeft, contentRight: TileRight }, children)) : (React__namespace.createElement(TileSlot, null, children)))));
};

module.exports = Tile;
//# sourceMappingURL=index.js.map
