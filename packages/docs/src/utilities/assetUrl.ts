/**
 * A public asset's URL under the app's base: `/rasters/…` where the app is served from the
 * root (the docs site, Storybook in dev), `./rasters/…` in Storybook's relative build (served
 * under `/ui/`). A bare relative path would resolve against the page's own path instead.
 *
 * @param path - The asset's path in the public folder, without a leading slash
 */
export const assetUrl = (path: string): string => `${import.meta.env.BASE_URL}${path}`
