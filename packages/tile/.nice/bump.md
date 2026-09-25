[2026-09-14 22:30] major: Remove getTileToken export and src/tokens wrappers — component tokens are read with getToken(name, variant, { prefix: "tile" }) from nice-react-styles
[2026-09-16 15:11] patch: getToken call sites migrated to the token address form
[2026-09-17 14:34] minor: backgroundColor and color accepts the object form — { name, transform } for channel-adjusted colours, resolved through resolveColorProp
[2026-09-25 19:11] patch: Declare nice-* runtime packages as peer dependencies with a file: devDependency for local builds
