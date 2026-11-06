# @niceprototypes/image-vendor

## Install

```sh
pnpm add @niceprototypes/image @niceprototypes/image-vendor
```

## Usage

Import once at the app entry. The import registers `resolveVendorImage` with `@niceprototypes/image`, so `<Image vendor />` resolves its `src`, `width` and `height` to a picsum.photos URL.

```tsx
import "@niceprototypes/image-vendor"
import { Image } from "@niceprototypes/image"

<Image vendor alt="Placeholder" width="400px" height="300px" />
```

## Docs

Resolver rules: `resolveVendorImage` JSDoc in `src/services/resolveVendorImage.ts`. Image props: [`../image/README.md`](../image/README.md).

## License

MIT
