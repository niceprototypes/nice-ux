import styled, { keyframes } from "styled-components"
import { getToken, type AnimationDurationType } from "@niceprototypes/styles"
import Flex from "@niceprototypes/flex"
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
export const Dot = styled.div<{ $variant: AnimationDurationType }>`
  width: ${DOT_SIZE};
  height: ${DOT_SIZE};
  border-radius: 50%;
  background-color: ${getToken("color", "light")};
  animation: ${slide} calc(${({ $variant }) => getToken("animationDuration", $variant)} * 6)
    ${getToken("animationEasing")} infinite;
  animation-delay: ${({ $variant }) => ($variant === "base" ? getToken("animationDuration", $variant) : "0s")};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
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

// The easing-curve chart: a full-width SVG with a 120:48 aspect ratio, a round-capped stroke
// in the border colour, and a ball riding the curve (EasingBall).
export const EasingSvg = styled.svg`
  width: 100%;
  aspect-ratio: 120 / 48;
`

export const EasingPath = styled.path`
  fill: none;
  stroke: ${getToken("borderColor")};
  stroke-linecap: round;
  stroke-width: 2px;
  vector-effect: non-scaling-stroke;
`

/** The CSS keyword easings as cubic-bezier control points (their values in the CSS spec). */
const KEYWORD_BEZIERS: Record<string, number[]> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
}

/** An easing value's control points: a keyword's, or a cubic-bezier()'s own. */
const bezierOf = (easing: string): number[] =>
  /cubic-bezier\(([^)]+)\)/.exec(easing)?.[1].split(",").map(Number) ?? KEYWORD_BEZIERS[easing.trim()] ?? KEYWORD_BEZIERS.linear

/**
 * The ball's vertical motion for one easing, in the duration dot's rhythm (hold, travel, hold,
 * travel back, hold): up the curve on the easing, back down on the same curve reversed, so the
 * ball stays on the drawn path both ways. Created once per easing.
 */
const riseOf = (() => {
  const made = new Map<string, ReturnType<typeof keyframes>>()
  return (easing: string) => {
    const there = bezierOf(easing)
    const back = [1 - there[2], 1 - there[3], 1 - there[0], 1 - there[1]]
    if (!made.has(easing))
      made.set(
        easing,
        keyframes`
          0%, 17% { top: 100%; animation-timing-function: cubic-bezier(${there.join(", ")}); }
          33% { top: 0%; }
          67% { top: 0%; animation-timing-function: cubic-bezier(${back.join(", ")}); }
          84%, 100% { top: 100%; }
        `,
      )
    return made.get(easing)!
  }
})()

/** The ball's horizontal motion: linear, in the same rhythm, so time runs along the chart's x axis. */
const across = keyframes`
  0%, 17% { left: 0%; }
  33%, 67% { left: 100%; }
  84%, 100% { left: 0%; }
`

/** The base duration × 6, the duration dots' pace. */
const RIDE = `calc(${getToken("animationDuration")} * 6)`

/** The chart: the curve's SVG with the ball's rail over it. */
export const EasingChart = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`

/** Where the curve runs in the 60 × 24 viewBox: x from 1 to 60, y from 23 up to 1. */
export const EasingRail = styled.div`
  position: absolute;
  left: calc(100% / 60);
  right: 0;
  top: calc(100% / 24);
  bottom: calc(100% / 24);
`

/** The ball's x: linear across the rail. */
export const EasingAcross = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  animation: ${across} ${RIDE} linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

/** The ball's y: the easing up the rail and back. */
export const EasingRise = styled.div<{ $easing: string }>`
  position: absolute;
  top: 100%;
  animation: ${({ $easing }) => riseOf($easing)} ${RIDE} infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

/** The ball: the duration dot's size and day colour; the text's near-white at night. */
export const EasingBall = styled.div`
  width: ${DOT_SIZE};
  height: ${DOT_SIZE};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: ${getToken("color", "light")};

  :root[data-theme="night"] & {
    background-color: ${getToken("color")};
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="day"]) & {
      background-color: ${getToken("color")};
    }
  }
`
