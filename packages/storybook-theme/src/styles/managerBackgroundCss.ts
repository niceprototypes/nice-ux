import { getToken } from "@niceprototypes/styles"

const background = getToken("backgroundColor")

/**
 * Manager background reset — clears Storybook default backgrounds on the sidebar, main, and preview iframe so the manager background shows through.
 *
 * Injected into the manager document by the register (as a string, so the addon
 * self-contains and needs no CSS build step). Uses Nice `--np--*` tokens and
 * `[data-theme]`, which the consumer manager provides.
 */
export const managerBackgroundCss = `
/* Background color reset */
.sidebar-container,
main[role="main"],
main[role="main"] > div:has([role="progressbar"]),
main[role="main"] > div > div:has([role="progressbar"]),
#storybook-preview-iframe {
  background: none !important;
  background-color: transparent !important;
}

/* Toolbar and testing widget (@storybook/addon-vitest) paint the Storybook
   manager theme's bar/content colours; repaint them with the Nice background so
   they follow [data-theme] like the sidebar. The widget's fade is a box-shadow
   in the theme's app colour, exposed as custom properties. */
.sb-bar,
#storybook-testing-module,
[aria-labelledby="storybook-testing-widget-heading"] {
  background-color: ${background} !important;
}
#sidebar-bottom-wrapper > div {
  --card-box-shadow: 0 -5px 20px 10px ${background};
  --sb-sidebar-bottom-card-box-shadow: 0 -5px 20px 10px ${background};
}`
