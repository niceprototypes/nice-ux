import * as React from 'react';
import Flex from 'nice-react-flex';
import styled, { css } from 'styled-components';

const OuterStyled = styled.div `
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${({ $backgroundImage }) => {
    if ($backgroundImage) {
        return css `
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
    return (React.createElement(OuterStyled, { as: Flex, className: className, style: style, "$backgroundImage": backgroundImage },
        React.createElement(InnerStyled, { as: Flex, direction: "column", grow: 1, "$breakpointMd": breakpointMd, "$breakpointLg": breakpointLg }, children)));
};

export { Tile as default };
//# sourceMappingURL=index.esm.js.map
