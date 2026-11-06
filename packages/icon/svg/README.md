# @niceprototypes/icon/svg

## Install

```sh
pnpm add @niceprototypes/icon
```

## Usage

The `@niceprototypes/icon/svg` entry returns icons and illustrations as SVG markup strings and base64 data URIs: the vanilla counterparts of `<Icon>` and `<Illustration>`. The second argument is the glyph variant; options come third.

```js
import { getIcon, getIconEncoded, getIllustration, iconNames, iconVariants } from "@niceprototypes/icon/svg"

getIcon("check")                                                      // SVG markup
getIcon("check", "base", { size: "large", color: "link", strokeWidth: "small" })
getIconEncoded("check", "base", { theme: "night" })                  // "data:image/svg+xml;base64,…"
getIllustration("nice-heart")
```

| Function | Returns | Types |
|---|---|---|
| `getIcon(name, variant?, options?)` | SVG markup | `src/svg/services/getIcon.d.ts` |
| `getIconEncoded(name, variant?, options?)`, `getIconEncodedKey` | base64 data URI; bare payload | `src/svg/services/getIconEncoded.d.ts` |
| `getIllustration(name, variant?, options?)` | SVG markup | `src/svg/services/getIllustration.d.ts` |
| `getIllustrationEncoded(name, variant?)`, `getIllustrationEncodedKey` | base64 data URI; bare payload | `src/svg/services/getIllustrationEncoded.d.ts` |

Names and variants: `iconNames`, `iconVariants`, `illustrationNames`, `illustrationVariants` from the same entry. React components: [`../README.md`](../README.md).

## License

MIT
