import * as React from "react"
import Flex from "nice-react-flex"
import ResetDemoItem from "./ResetDemoItem"

/** One reset stylesheet loaded into a demo frame. */
export interface ResetLayer {
  /** Filename shown in the import table (e.g. "reset.spacing.css"). */
  file: string
  /** Raw CSS injected into the iframe for this layer. */
  css: string
}

/** One demo frame: the page rendered under a given stack of reset layers. */
export interface ResetExample {
  /** Accessible iframe title — must be unique. */
  title: string
  /** Heading above the frame (e.g. "Standard CSS", "Reset + Colors"). */
  label: string
  /** Render at mobile width (390px) instead of the desktop frame. */
  mobile?: boolean
  /** Reset stylesheets loaded, in order; empty/omitted renders raw browser defaults. */
  layers?: ResetLayer[]
}

interface ResetDemoProps {
  /** The HTML document body rendered inside every frame. */
  pageHtml: string
  /** Token stylesheet, prepended before any reset layer so its var() references resolve. */
  tokensCss: string
  /** The demo frames — one {@link ResetDemoItem} rendered per example. */
  examples: ResetExample[]
}

// The iframe document: viewport meta + the composed CSS, then the demo page.
const frame = (pageHtml: string, css: string): string =>
  `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${css ? `<style>${css}</style>` : ""}</head><body><div style="padding:16px">${pageHtml}</div></body></html>`

/**
 * A vertical stack of reset demo frames — the same page rendered under a
 * progressively larger stack of reset stylesheets. Each example declares its
 * `layers`; the composed `srcDoc` (tokens + those layers) and the import table's
 * file list are both derived here, so the story only declares intent.
 */
const ResetDemo: React.FC<ResetDemoProps> = ({ pageHtml, tokensCss, examples }) => (
  <Flex direction="column">
    {examples.map(example => {
      const layers = example.layers ?? []
      const css = layers.length ? [tokensCss, ...layers.map(layer => layer.css)].join("\n") : ""
      return (
        <React.Fragment key={example.title}>
          <ResetDemoItem
            label={example.label}
            title={example.title}
            mobile={example.mobile}
            files={layers.map(layer => layer.file)}
            srcDoc={frame(pageHtml, css)}
          />
          <hr/>
        </React.Fragment>
      )
    })}
  </Flex>
)

export default ResetDemo
