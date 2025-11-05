import * as React from 'react';
import Flex from 'nice-react-flex';
import styled, { css } from 'styled-components';
import Typography from 'nice-react-typography';

const OuterStyled = styled.div `
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${({ $fullWidth }) => $fullWidth && css `width: 100%;`}

  ${({ $backgroundColor }) => {
    if ($backgroundColor) {
        return css `
        background-color: ${$backgroundColor};
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
    return (React.createElement(Flex, { direction: "column", gap: 5 },
        title && (React.createElement(Flex, { direction: "column" },
            React.createElement(Typography, { as: "h4", size: 5, align: titleAlign, color: titleColor }, title))),
        children));
};

const TileLayout = ({ children, title, titleAlign = "left", titleColor, contentLeft, contentRight, }) => {
    return (React.createElement(Flex, { direction: "column", gap: 6 }, !!contentLeft || !!contentRight ? (React.createElement(Flex, { direction: { sm: "column", md: "row" }, alignItems: "center", gap: 5 },
        contentLeft,
        React.createElement(Flex, { direction: "column", grow: 1 },
            React.createElement(TileSlot, { title: title, titleAlign: titleAlign, titleColor: titleColor }, children)),
        contentRight)) : (React.createElement(TileSlot, { title: title, titleAlign: titleAlign, titleColor: titleColor }, children))));
};

// Default breakpoint values from helpshelf-ui
const DEFAULT_BREAKPOINT_MD = 980;
const DEFAULT_BREAKPOINT_LG = 1280;
const Tile = ({ children, breakpointMd = DEFAULT_BREAKPOINT_MD, breakpointLg = DEFAULT_BREAKPOINT_LG, className, style, backgroundImage, backgroundColor, backgroundPosition = "center", backgroundSize = "cover", backgroundAttachment = "fixed", fullWidth = false, title, titleAlign = "left", titleColor, contentLeft: TileLeft, contentRight: TileRight, spacing = "var(--nice-tile-spacing, 8rem)", }) => {
    return (React.createElement(OuterStyled, { as: Flex, className: className, style: style, "$backgroundImage": backgroundImage, "$backgroundColor": backgroundColor, "$backgroundPosition": backgroundPosition, "$backgroundSize": backgroundSize, "$backgroundAttachment": backgroundAttachment, "$fullWidth": fullWidth },
        React.createElement(InnerStyled, { as: Flex, direction: "column", grow: 1, "$breakpointMd": breakpointMd, "$breakpointLg": breakpointLg, spacing: { sm: { vertical: spacing, horizontal: 4 }, md: { horizontal: null } } }, title || TileLeft || TileRight ? (React.createElement(TileLayout, { title: title, titleAlign: titleAlign, titleColor: titleColor, contentLeft: TileLeft, contentRight: TileRight }, children)) : (React.createElement(TileSlot, { title: title, titleAlign: titleAlign, titleColor: titleColor }, children)))));
};

export { Tile as default };
//# sourceMappingURL=index.esm.js.map
