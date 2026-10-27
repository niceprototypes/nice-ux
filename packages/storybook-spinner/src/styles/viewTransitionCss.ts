import { SPINNER_CSS } from "../generated/spinner"
import { SNAPSHOT_ID, VT_HOLD_CLASS, VT_RELEASE_CLASS, VT_RELEASE_MS } from "../constants"
import { spinnerSurfaceCss } from "./spinnerSurfaceCss"

/** Long enough to outlast any real boot; the release replaces these animations. */
const HOLD_DURATION = "3600s"

const hold = `html.${VT_HOLD_CLASS}`
const release = `html.${VT_RELEASE_CLASS}`

/**
 * Manager head stylesheet (permanent, only when the `viewTransition` option is
 * on). Opts the manager into cross-document View Transitions and defines the
 * two phases the boot script switches between with a class on <html>:
 *
 * - Hold: the previous page's snapshot (`::view-transition-old(root)`) stays at
 *   full opacity, the live new root stays invisible, and the snapshot spinner is
 *   shown above them. No-op animations keep the pseudo tree alive.
 * - Release: a short cross-fade from the snapshot to the rendered page, with the
 *   spinner fading out.
 */
export const viewTransitionCss =
  `@view-transition{navigation:auto}` +
  `@keyframes nsb-vt-on{from{opacity:1}to{opacity:1}}` +
  `@keyframes nsb-vt-off{from{opacity:0}to{opacity:0}}` +
  `@keyframes nsb-vt-out{from{opacity:1}to{opacity:0}}` +
  `@keyframes nsb-vt-in{from{opacity:0}to{opacity:1}}` +
  `${hold}::view-transition-group(root){animation:none}` +
  `${hold}::view-transition-old(root){animation:nsb-vt-on ${HOLD_DURATION} linear both}` +
  `${hold}::view-transition-new(root){animation:nsb-vt-off ${HOLD_DURATION} linear both}` +
  `${hold}::view-transition-new(${SNAPSHOT_ID}){animation:nsb-vt-on ${HOLD_DURATION} linear both}` +
  `${release}::view-transition-group(root){animation:none}` +
  `${release}::view-transition-old(root){animation:nsb-vt-out ${VT_RELEASE_MS}ms ease both}` +
  `${release}::view-transition-new(root){animation:nsb-vt-in ${VT_RELEASE_MS}ms ease both}` +
  `${release}::view-transition-new(${SNAPSHOT_ID}){animation:nsb-vt-out ${VT_RELEASE_MS}ms ease both}`

/**
 * Snapshot spinner stylesheet: the build-time spinner centred on a transparent
 * full-viewport surface (token size and theme colour, no background), captured
 * into the transition under its own `view-transition-name`. Lives only while the
 * snapshot spinner is mounted.
 */
export const snapshotCss =
  `#${SNAPSHOT_ID}{display:flex;pointer-events:none;view-transition-name:${SNAPSHOT_ID}}` +
  spinnerSurfaceCss(SNAPSHOT_ID, false) +
  SPINNER_CSS
