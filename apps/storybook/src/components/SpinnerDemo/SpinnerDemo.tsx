import * as React from "react"
import Icon from "nice-react-icon"
import { SpinnerDemoDiv, SpinnerDemoImg, SpinnerDemoOverlayDiv } from "./SpinnerDemo.styles"

/**
 * Illustrates the spinner overlay: an illustrated Storybook UI as the page, and
 * on top of it the overlay surface with the real `<Icon name="spinner" />`
 * centred. The surface is translucent here only so the page shows through.
 *
 * The image path is relative so it resolves against `iframe.html` from the
 * `public/` static dir, both at `/` in dev and under `/ui/` when deployed.
 */
const SpinnerDemo: React.FC = () => (
  <SpinnerDemoDiv>
    <SpinnerDemoImg
      src="rasters/storybook-blocks.png"
      alt="Illustrated Storybook UI behind the loading overlay"
    />
    <SpinnerDemoOverlayDiv>
      <Icon name="spinner" size="larger" />
    </SpinnerDemoOverlayDiv>
  </SpinnerDemoDiv>
)

export default SpinnerDemo
