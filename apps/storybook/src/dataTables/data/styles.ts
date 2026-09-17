import styled, { keyframes } from "styled-components"
import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import { DOT_SIZE } from "./constants"

// ─── animationDuration ────────────────────────────────────────────────────────

// Slide the dot to the right and back, pausing at each end. The travel distance
// is the container's own width (100cqw, set by container-type on the track
// below) minus the dot's width — so it adapts to any cell width instead of a
// hard-coded pixel value.
export const slide = keyframes`
  0%, 17% { transform: translateX(0); }
  33%, 67% { transform: translateX(calc(100cqw - ${DOT_SIZE})); }
  84%, 100% { transform: translateX(0); }
`

// The animated dot. Duration scales with the variant's animationDuration token
// (×6 so the motion reads at a glance); base alone is delayed by one duration so
// the three rows visibly stagger.
export const Dot = styled.div<{ $variant: string }>`
  width: ${DOT_SIZE};
  height: ${DOT_SIZE};
  border-radius: 50%;
  background-color: ${getToken("color", "light")};
  animation: ${slide} calc(${({ $variant }) => getToken("animationDuration", $variant)} * 6)
    ${getToken("animationEasing")} infinite;
  animation-delay: ${({ $variant }) => ($variant === "base" ? getToken("animationDuration", $variant) : "0s")};
`

// The bordered track. `container-type: inline-size` makes it the query container
// the dot's 100cqw resolves against (its content box, i.e. the area inside the
// padding) — the exact span the dot should travel.
export const Track = styled(Flex)`
  container-type: inline-size;
  background-color: ${getToken("backgroundColor", "raised")};
  border: 1px solid ${getToken("borderColor")};
  border-radius: 8px;
  padding: ${getToken("gap", "smaller")};
`

// ─── animationEasing ──────────────────────────────────────────────────────────

// The easing-curve chart: a full-width SVG with a 120:48 aspect ratio, and a
// round-capped stroke painted with the `color--light` token.
export const EasingSvg = styled.svg`
  width: 100%;
  aspect-ratio: 120 / 48;
`

export const EasingPath = styled.path`
  fill: none;
  stroke: ${getToken("color", "light")};
  stroke-linecap: round;
  stroke-width: 2px;
  vector-effect: non-scaling-stroke;
`
