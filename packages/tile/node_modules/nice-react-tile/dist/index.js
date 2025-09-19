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

  ${({ $backgroundImage }) => {
    if ($backgroundImage) {
        return styled.css `
        background-image: ${$backgroundImage};
        background-attachment: fixed;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
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

// Default breakpoint values from helpshelf-ui
const DEFAULT_BREAKPOINT_MD = 980;
const DEFAULT_BREAKPOINT_LG = 1280;
const Tile = ({ children, breakpointMd = DEFAULT_BREAKPOINT_MD, breakpointLg = DEFAULT_BREAKPOINT_LG, className, style, backgroundImage }) => {
    return (React__namespace.createElement(OuterStyled, { as: Flex, className: className, style: style, "$backgroundImage": backgroundImage },
        React__namespace.createElement(InnerStyled, { as: Flex, direction: "column", grow: 1, "$breakpointMd": breakpointMd, "$breakpointLg": breakpointLg }, children)));
};

module.exports = Tile;
//# sourceMappingURL=index.js.map
