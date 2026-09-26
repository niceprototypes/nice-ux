import styled from "styled-components"
import { getToken } from "nice-react-styles"

/**
 * Alpha of the demo overlay surface. The real overlay is fully opaque (1); the
 * demo lets the Storybook UI underneath show through so the reader can see what
 * the spinner covers. Change this one value to tune it.
 */
export const SPINNER_DEMO_OVERLAY_OPACITY = 0.8

/** Pixel size of `rasters/storybook-blocks.png`, used for the frame's aspect ratio. */
const IMAGE_WIDTH = 1511
const IMAGE_HEIGHT = 1041

/**
 * Docs images are capped at this width by `.storybook/preview-docs.css`; the
 * frame takes the same cap so the image fills it instead of leaving a gap.
 */
const DOCS_IMAGE_MAX_WIDTH = "800px"

/**
 * The frame: sized to the image's aspect ratio, clipped to the token radius, and
 * the positioning context for the overlay.
 */
export const SpinnerDemoDiv = styled.div`
  position: relative;
  width: 100%;
  max-width: ${DOCS_IMAGE_MAX_WIDTH};
  aspect-ratio: ${IMAGE_WIDTH} / ${IMAGE_HEIGHT};
  overflow: hidden;
  border: ${getToken("borderWidth", "small")} solid ${getToken("borderColor")};
  border-radius: ${getToken("borderRadius")};
`

/** The "page" underneath the overlay: the illustrated Storybook UI. */
export const SpinnerDemoImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

/**
 * The overlay surface, in the page background colour so it flips day / night
 * through the token cascade, with its alpha set to {@link SPINNER_DEMO_OVERLAY_OPACITY}.
 */
export const SpinnerDemoOverlayDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${getToken("backgroundColor", "base", {
    transform: [null, null, null, SPINNER_DEMO_OVERLAY_OPACITY],
  })};
`
