import { SPINNER_TOKENS } from "../generated/spinner"

const { keys, themes } = SPINNER_TOKENS

/**
 * The full-viewport surface the spinner sits on, for one element id: centred
 * flex box, the icon's custom properties set from build-time token values (size
 * per breakpoint, stroke width, animation duration), and the background / icon
 * colour per `data-theme`. Carries no `display`; the caller decides visibility.
 *
 * @param id - Element id the rules target
 * @param opaque - Paint the theme background (`false`: transparent surface, icon colour only)
 * @returns CSS text
 */
export function spinnerSurfaceCss(id: string, opaque = true): string {
  const selector = `#${id}`
  const background = (value: string) => (opaque ? `background:${value};` : "")
  const sizes = SPINNER_TOKENS.iconSizeBreakpoints
    .map(({ media, value }) => `${media}{${selector}{${keys.iconSize}:${value}}}`)
    .join("")
  return (
    `${selector}{position:fixed;inset:0;z-index:2147483647;align-items:center;justify-content:center;` +
    `${keys.iconSize}:${SPINNER_TOKENS.iconSize};` +
    `${keys.iconStrokeWidth}:${SPINNER_TOKENS.iconStrokeWidth};` +
    `${keys.iconAnimationDuration}:${SPINNER_TOKENS.iconAnimationDuration}}` +
    sizes +
    `${selector}[data-theme=day]{color-scheme:light;${background(themes.day.background)}${keys.iconColor}:${themes.day.color}}` +
    `${selector}[data-theme=night]{color-scheme:dark;${background(themes.night.background)}${keys.iconColor}:${themes.night.color}}` +
    `@media (prefers-reduced-motion:reduce){${selector} svg{animation-duration:2s!important}}`
  )
}
