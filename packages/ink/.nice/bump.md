[2026-09-14 22:30] major: Remove getInkToken export and src/tokens wrappers — component tokens are read with getToken(name, variant, { prefix: "ink" }) from nice-react-styles
[2026-09-16 15:11] patch: getToken call sites migrated to the token address form
[2026-09-16 16:21] minor: color prop accepts the object form — { name, transform } for channel-adjusted colours
[2026-09-25 19:10] patch: Declare nice-* runtime packages as peer dependencies with a file: devDependency for local builds
